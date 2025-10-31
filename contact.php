<?php
// 【デバッグ用】直接メール送信テスト
if (isset($_GET['test'])) {
    // エラー表示を有効化
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    echo "<h3>PHP Mail設定確認</h3>";
    echo "PHP Version: " . phpversion() . "<br>";
    echo "sendmail_path: " . ini_get('sendmail_path') . "<br>";
    echo "SMTP: " . ini_get('SMTP') . "<br>";
    echo "smtp_port: " . ini_get('smtp_port') . "<br><br>";
    
    $to = 'info@angels-healing.com';
    $subject = 'テスト送信 - ' . date('Y-m-d H:i:s');
    $message = 'これはPHPからのテストメールです。' . "\n\n";
    $message .= 'サーバー: ' . $_SERVER['SERVER_NAME'] . "\n";
    $message .= '送信時刻: ' . date('Y-m-d H:i:s');
    
    echo "<h3>メール送信テスト実行中...</h3>";
    
    // mail()関数でテスト
    $additional_params = '-f info@angels-healing.com';
    $encoded_subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= "From: info@angels-healing.com\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    $result = mail($to, $encoded_subject, $message, $headers, $additional_params);
    
    echo "mail()関数結果: " . ($result ? '✅ TRUE' : '❌ FALSE') . "<br><br>";
    
    if ($result) {
        echo "<div style='background:#d4edda;padding:15px;border:1px solid #c3e6cb;'>";
        echo "✅ <b>メール送信成功</b><br>";
        echo "info@angels-healing.com の受信トレイとスパムフォルダを確認してください。";
        echo "</div>";
    } else {
        echo "<div style='background:#f8d7da;padding:15px;border:1px solid #f5c6cb;'>";
        echo "❌ <b>メール送信失敗</b><br><br>";
        echo "<b>考えられる原因：</b><br>";
        echo "1. ロリポップでinfo@angels-healing.comのメールアドレスが作成されていない<br>";
        echo "2. PHPのmail()関数が無効化されている<br>";
        echo "3. サーバーのsendmail設定に問題がある<br>";
        echo "4. ファイアウォールやセキュリティ設定でブロックされている<br><br>";
        echo "<b>対処方法：</b><br>";
        echo "ロリポップのユーザー専用ページ → メール設定を確認してください。";
        echo "</div>";
    }
    
    exit;
}

// PHPによるお問い合わせフォーム処理

// エラー表示を一時的に有効化（デバッグ用）
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 1. POSTメソッドのチェック
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

// 2. リファラーの厳密な検証
$referrer = $_SERVER['HTTP_REFERER'] ?? '';
$allowed_referrers = [
    'https://angels-healing.com/',
    'https://www.angels-healing.com/',
    'https://frenchkiss.jp-angels-healing/',
    'http://localhost/',
    'http://127.0.0.1/'
];

$is_valid_referrer = false;
foreach ($allowed_referrers as $allowed) {
    if (strpos($referrer, $allowed) === 0) {
        $is_valid_referrer = true;
        break;
    }
}

if (!$is_valid_referrer && !empty($referrer)) {
    error_log('Invalid referrer blocked: ' . $referrer . ' from IP: ' . $_SERVER['REMOTE_ADDR']);
    die('不正なリクエストです。');
}

// 3. ユーザーポータルからのリクエストかを厳密に判定
$is_portal = false;
foreach ($allowed_referrers as $allowed) {
    if (strpos($referrer, $allowed . 'user-portal/') === 0) {
        $is_portal = true;
        break;
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
$to = 'info@angels-healing.com';
$from_email = 'info@angels-healing.com';

// メール送信前にログを記録
error_log("メール送信試行: To={$to}, From={$from_email}, Subject={$subject}");

// 件名を日本語対応にエンコード
$encoded_subject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

// ヘッダー構築
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "From: =?UTF-8?B?" . base64_encode('天使たちの癒し') . "?= <{$from_email}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// 追加パラメータ（エンベロープFrom）
$additional_params = "-f info@angels-healing.com";

// mail()関数で送信
$mail_result = mail($to, $encoded_subject, $mail_body, $headers, $additional_params);

// 送信結果をログに記録
if ($mail_result) {
    error_log("管理者向けメール送信成功");
} else {
    error_log("管理者向けメール送信失敗");
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
$auto_headers = "From: info@angels-healing.com\r\n";
$auto_headers .= "Reply-To: info@angels-healing.com\r\n";
$auto_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 自動返信メール送信前にログを記録
error_log("自動返信メール送信試行: To={$email}, From=info@angels-healing.com");

// 自動返信の件名をエンコード
$encoded_auto_subject = "=?UTF-8?B?" . base64_encode($auto_reply_subject) . "?=";

// 自動返信のヘッダー
$auto_headers = "MIME-Version: 1.0\r\n";
$auto_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$auto_headers .= "Content-Transfer-Encoding: 8bit\r\n";
$auto_headers .= "From: =?UTF-8?B?" . base64_encode('天使たちの癒し') . "?= <info@angels-healing.com>\r\n";
$auto_headers .= "Reply-To: info@angels-healing.com\r\n";
$auto_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// 自動返信メール送信
$auto_mail_result = mail($email, $encoded_auto_subject, $auto_reply_body, $auto_headers, $additional_params);

// 送信結果をログに記録
if ($auto_mail_result) {
    error_log("自動返信メール送信成功");
} else {
    error_log("自動返信メール送信失敗: To={$email}");
}

// 結果に応じたリダイレクト
if ($mail_result) {
    // 管理者向けメールが送信できればOK（自動返信は失敗してもエラーにしない）
    if ($is_portal) {
        header('Location: user-portal/thanks.php?status=success');
    } else {
        header('Location: thanks.html?status=success');
    }
} else {
    // 管理者向けメール送信失敗時のエラー詳細を表示
    error_log('管理者向けメール送信失敗: To=' . $to . ', From=' . $from_email);
    
    // エラー詳細を表示（デバッグ用）
    echo "<!DOCTYPE html>";
    echo "<html><head><meta charset='UTF-8'><title>メール送信エラー</title></head><body>";
    echo "<h2>❌ メール送信エラー</h2>";
    echo "<div style='background:#f8d7da;padding:20px;border:1px solid #f5c6cb;margin:20px;'>";
    echo "<h3>エラー詳細：</h3>";
    echo "<p><b>mb_send_mail()がFALSEを返しました</b></p>";
    echo "<p>送信先: " . htmlspecialchars($to) . "</p>";
    echo "<p>送信元: " . htmlspecialchars($from_email) . "</p>";
    echo "<p>件名: " . htmlspecialchars($subject) . "</p>";
    echo "<p>追加パラメータ: " . htmlspecialchars($additional_params) . "</p>";
    echo "<hr>";
    echo "<h3>PHP設定：</h3>";
    echo "<p>PHP Version: " . phpversion() . "</p>";
    echo "<p>sendmail_path: " . ini_get('sendmail_path') . "</p>";
    echo "<p>SMTP: " . ini_get('SMTP') . "</p>";
    echo "<p>smtp_port: " . ini_get('smtp_port') . "</p>";
    echo "<hr>";
    echo "<h3>考えられる原因：</h3>";
    echo "<ul>";
    echo "<li>ロリポップでinfo@angels-healing.comのメールアドレスが作成されていない</li>";
    echo "<li>PHPのmail()関数が無効化されている</li>";
    echo "<li>sendmail設定に問題がある</li>";
    echo "<li>ファイアウォールやセキュリティ設定でブロックされている</li>";
    echo "</ul>";
    echo "<p><a href='index.html' style='display:inline-block;padding:10px 20px;background:#007bff;color:white;text-decoration:none;border-radius:5px;margin-top:20px;'>トップページに戻る</a></p>";
    echo "</div>";
    echo "</body></html>";
    exit;
}
?>
