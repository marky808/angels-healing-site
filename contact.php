<?php
// PHPによるお問い合わせフォーム処理

require 'vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// 送信元のリファラーを検証
$referrer = $_SERVER['HTTP_REFERER'] ?? '';
// ローカル環境用にlocalhost/127.0.0.1も許可
// if (strpos($referrer, 'angels-healing.com') === false && 
//     strpos($referrer, 'frenchkiss.jp-angels-healing') === false &&
//     strpos($referrer, 'localhost') === false && 
//     strpos($referrer, '127.0.0.1') === false) {
//     die('不正なリクエストです。');
// }

// POSTデータの取得と検証
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

// reCAPTCHA 検証（ユーザーポータルからのリクエストは除外）
$referrer = $_SERVER['HTTP_REFERER'] ?? '';
if (strpos($referrer, 'user-portal') === false) {
    $recaptcha_secret = $_ENV['RECAPTCHA_SECRET_KEY']; // シークレットキー
    $recaptcha_response = $_POST['recaptcha_response'] ?? '';

    if (empty($recaptcha_response)) {
        error_log('reCAPTCHAエラー: トークンが空です');
        header('Location: form-error.html');
        exit;
    }

    // reCAPTCHA検証リクエスト
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_data = [
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($recaptcha_data)
        ]
    ];

    $context = stream_context_create($options);
    $recaptcha_result = file_get_contents($recaptcha_url, false, $context);
    $recaptcha_result = json_decode($recaptcha_result, true);

    // 検証結果をログに記録
    // $score = 0.2;
    $score = $recaptcha_result['score'] ?? 0;
    $action = $recaptcha_result['action'] ?? '';
    $hostname = $recaptcha_result['hostname'] ?? '';
    $error_codes = isset($recaptcha_result['error-codes']) ? implode(', ', $recaptcha_result['error-codes']) : 'none';

    error_log(sprintf(
        'reCAPTCHA検証結果 - スコア: %.2f, アクション: %s, ホスト: %s, エラー: %s, IP: %s',
        $score,
        $action,
        $hostname,
        $error_codes,
        $_SERVER['REMOTE_ADDR']
    ));

    echo "RecaptchaScore: $score";

    // スコアが0.5未満の場合はボットとみなす
    if (!isset($recaptcha_result['success']) || $recaptcha_result['success'] !== true || $score < 0.5) {
        error_log('reCAPTCHA検証失敗: ボットと判定されました');
        header('Location: form-error.html');
        exit;
    }
}

// フォームデータの取得と検証
$company = isset($_POST['company']) ? htmlspecialchars($_POST['company'], ENT_QUOTES, 'UTF-8') : '';
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8') : '';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8') : '';
$interest = isset($_POST['interest']) ? htmlspecialchars($_POST['interest'], ENT_QUOTES, 'UTF-8') : '';
$inquiry = isset($_POST['inquiry']) ? htmlspecialchars($_POST['inquiry'], ENT_QUOTES, 'UTF-8') : ''; // ポータル用
$message = isset($_POST['message']) ? htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8') : '';

// 必須項目のチェック
if (empty($name) || empty($email) || empty($message)) {
    // リファラーに基づいてリダイレクト先を決定
    $referrer = $_SERVER['HTTP_REFERER'] ?? '';
    if (strpos($referrer, 'user-portal') !== false) {
        header('Location: user-portal/index.php?error=required');
    } else {
        header('Location: index.html?error=required');
    }
    exit;
}

// メールアドレスの形式チェック
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // リファラーに基づいてリダイレクト先を決定
    $referrer = $_SERVER['HTTP_REFERER'] ?? '';
    if (strpos($referrer, 'user-portal') !== false) {
        header('Location: user-portal/index.php?error=email');
    } else {
        header('Location: index.html?error=email');
    }
    exit;
}

// メールの件名と本文を作成
$subject = "【天使たちの癒し】お問い合わせがありました";

// ポータルからのお問い合わせか企業からのお問い合わせかを判定
$referrer = $_SERVER['HTTP_REFERER'] ?? '';
$is_portal = strpos($referrer, 'user-portal') !== false;

if ($is_portal) {
    // ポータル用のメール本文
    $mail_body = <<<EOT
天使たちの癒し（ユーザーポータル）へのお問い合わせがありました。

【お名前】
{$name}

【メールアドレス】
{$email}

【電話番号】
{$phone}

【お問い合わせ内容】
{$inquiry}

【メッセージ】
{$message}

※このメールは自動送信されています。
EOT;
} else {
    // 企業用のメール本文
    $mail_body = <<<EOT
天使たちの癒しへのお問い合わせがありました。

【会社名/施設名】
{$company}

【お名前】
{$name}

【メールアドレス】
{$email}

【電話番号】
{$phone}

【ご興味のある項目】
{$interest}

【お問い合わせ内容】
{$message}

※このメールは自動送信されています。
EOT;
}

// 管理者へのメール送信
$to = $_ENV['SMTP_USERNAME'];
// ロリポップでは送信元メールアドレスは自分のドメインに存在するものにする必要があります
$from_email = $_ENV['SMTP_USERNAME']; // ドメインのメールアドレスを使用
$headers = "From: {$from_email}\r\n";
// $headers .= "Reply-To: {$email}\r\n"; // 返信先はユーザーのメールアドレス
$headers .= "Reply-To:" . $_ENV['SMTP_USERNAME'] . "\r\n"; // 返信先はユーザーのメールアドレス
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ロリポップ用の日本語メール設定（必須）
mb_language("Japanese");
mb_internal_encoding("UTF-8");

// デバッグ：送信前の情報をログに記録
error_log("=== メール送信開始 ===");
error_log("To: " . $to);
error_log("From: " . $from_email);
error_log("Subject: " . $subject);
error_log("Reply-To: " . $email);
error_log("Headers: " . str_replace("\r\n", " | ", $headers));
error_log("Body length: " . strlen($mail_body));

// ini_set("SMTP", "smtp.lolipop.jp");
// ini_set("smtp_port", "465");
// ini_set("sendmail_from", $from_email);
// $mail_result = mb_send_mail($to, $subject, $mail_body, $headers);
// error_log("mb_send_mail() result: " . ($mail_result ? "TRUE" : "FALSE"));
// error_log("=== メール送信終了 ===");

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USERNAME'];
    $mail->Password = $_ENV['SMTP_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $_ENV['SMTP_PORT'];
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    $mail->setFrom($from_email);
    $mail->addAddress($to);
    $mail->Subject = $subject;
    $mail->Body = $mail_body;
    $mail->send();
    $mail_result = true;
    error_log("Mail success");
} catch (Exception $e) {
    $mail_result = false;
    error_log("Mail Error: {$mail->ErrorInfo}");
}

// 自動返信メールの設定
$auto_reply_subject = "【天使たちの癒し】お問い合わせありがとうございます";

if ($is_portal) {
    // ポータル用の自動返信メール
    $auto_reply_body = <<<EOT
{$name} 様

天使たちの癒し（ユーザーポータル）へのお問い合わせありがとうございます。
以下の内容でお問い合わせを受け付けました。

【お問い合わせ内容】
{$inquiry}

【メッセージ】
{$message}

内容を確認のうえ、担当者より折り返しご連絡いたします。
しばらくお待ちください。

※このメールは自動送信されています。
------------------------------
天使たちの癒し
info@angels-healing.com
https://angels-healing.com/
------------------------------
EOT;
} else {
    // 企業用の自動返信メール
    $auto_reply_body = <<<EOT
{$name} 様

天使たちの癒しへのお問い合わせありがとうございます。
以下の内容でお問い合わせを受け付けました。

【会社名/施設名】
{$company}

【お問い合わせ内容】
{$message}

内容を確認のうえ、担当者より折り返しご連絡いたします。
しばらくお待ちください。

※このメールは自動送信されています。
------------------------------
天使たちの癒し
info@angels-healing.com
https://angels-healing.com/
------------------------------
EOT;
}

// 自動返信メールの送信
$auto_headers = "From: " . $_ENV['SMTP_USERNAME'] . "\r\n";
$auto_headers .= "Reply-To: " . $_ENV['SMTP_USERNAME'] . "\r\n";
$auto_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// $auto_mail_result = mb_send_mail($email, $auto_reply_subject, $auto_reply_body, $auto_headers, $additional_params);

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USERNAME'];
    $mail->Password = $_ENV['SMTP_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $_ENV['SMTP_PORT'];
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';

    $mail->setFrom($from_email);
    $mail->addAddress($email);
    $mail->Subject = $auto_reply_subject;
    $mail->Body = $auto_reply_body;
    $mail->send();
    $auto_mail_result = true;
    error_log("Mail success 2");
} catch (Exception $e) {
    $auto_mail_result = false;
    error_log("Mail Error 2: {$mail->ErrorInfo}");
}

// 結果に応じたリダイレクト
if ($mail_result) {
    // 管理者向けメールが送信できればOK（自動返信は相手のメールサーバー次第）
    error_log("SUCCESS: メール送信成功、thanks.htmlにリダイレクト");
    if ($is_portal) {
        header('Location: user-portal/thanks.php?status=success');
    } else {
        header('Location: thanks.html?status=success');
    }
} else {
    // エラーをログに記録
    error_log('FAILED: メール送信失敗: To=' . $to . ', From=' . $from_email);
    $last_error = error_get_last();
    if ($last_error) {
        error_log('FAILED: PHPエラー: ' . $last_error['message']);
    }

    // 詳細なエラー情報を表示
    echo "<!DOCTYPE html>";
    echo "<html><head><meta charset='UTF-8'><title>メール送信エラー</title></head><body>";
    echo "<h2>❌ メール送信失敗</h2>";
    echo "<div style='background:#f8d7da;padding:20px;border:1px solid #f5c6cb;margin:20px;'>";
    echo "<p><strong>mb_send_mail()関数がFALSEを返しました</strong></p>";
    echo "<p>送信先: " . htmlspecialchars($to) . "</p>";
    echo "<p>送信元: " . htmlspecialchars($from_email) . "</p>";
    echo "<p>PHPバージョン: " . phpversion() . "</p>";
    echo "<p>sendmail_path: " . ini_get('sendmail_path') . "</p>";
    echo "<p>mb_send_mail利用可能: " . (function_exists('mb_send_mail') ? 'はい' : 'いいえ') . "</p>";
    echo "<p>ファイル更新時刻: " . date('Y-m-d H:i:s', filemtime(__FILE__)) . "</p>";
    if ($last_error) {
        echo "<p>最後のエラー: " . htmlspecialchars($last_error['message']) . "</p>";
    }
    echo "<hr>";
    echo "<h3>考えられる原因：</h3>";
    echo "<ul>";
    echo "<li><strong>ロリポップでメール送信が制限されている</strong></li>";
    echo "<li>info@angels-healing.comのメールアカウント設定に問題がある</li>";
    echo "<li>sendmailの実行権限がない</li>";
    echo "<li>セキュリティ設定でブロックされている</li>";
    echo "</ul>";
    echo "<h3>次のステップ：</h3>";
    echo "<ol>";
    echo "<li>ロリポップのユーザー専用ページ → エラーログを確認</li>";
    echo "<li>ロリポップのサポートに連絡してmail/mb_send_mail関数の使用可否を確認</li>";
    echo "<li>メール設定でinfo@angels-healing.comが有効か確認</li>";
    echo "</ol>";
    echo "<p><a href='index.html' style='display:inline-block;padding:10px 20px;background:#007bff;color:white;text-decoration:none;border-radius:5px;margin-top:20px;'>トップページに戻る</a></p>";
    echo "</div>";
    echo "</body></html>";
    exit;
}
