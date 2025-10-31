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
    
    // 日本語メール送信の設定
    mb_language("Japanese");
    mb_internal_encoding("UTF-8");
    
    // mb_send_mail()でテスト（元の動作していた方法）
    $headers = "From: info@angels-healing.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $result = mb_send_mail($to, $subject, $message, $headers);
    
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

// 日本語メール送信の設定
mb_language("Japanese");
mb_internal_encoding("UTF-8");

// シンプルなヘッダー
$headers = "From: {$from_email}\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// メール送信（mb_send_mailを使用、第5引数なし）
$mail_result = mb_send_mail($to, $subject, $mail_body, $headers);

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

// 自動返信のヘッダー
$auto_headers = "From: info@angels-healing.com\r\n";
$auto_headers .= "Reply-To: info@angels-healing.com\r\n";
$auto_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 自動返信メール送信（mb_send_mailを使用）
$auto_mail_result = mb_send_mail($email, $auto_reply_subject, $auto_reply_body, $auto_headers);

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
    echo "<hr>";
    echo "<h3>PHP設定：</h3>";
    echo "<p>PHP Version: " . phpversion() . "</p>";
    echo "<p>sendmail_path: " . ini_get('sendmail_path') . "</p>";
    echo "<p>SMTP: " . ini_get('SMTP') . "</p>";
    echo "<p>smtp_port: " . ini_get('smtp_port') . "</p>";
    echo "<hr>";
    echo "<h3>ファイルタイムスタンプ確認：</h3>";
    echo "<p>このファイルの最終更新: " . date('Y-m-d H:i:s', filemtime(__FILE__)) . "</p>";
    echo "<p>現在時刻: " . date('Y-m-d H:i:s') . "</p>";
    echo "<hr>";
    echo "<h3>対処方法：</h3>";
    echo "<p>今朝まで動作していたmb_send_mail()に戻しました。</p>";
    echo "<p>まだ失敗する場合は、ロリポップのサーバー設定が変更された可能性があります。</p>";
    echo "<p><a href='index.html' style='display:inline-block;padding:10px 20px;background:#007bff;color:white;text-decoration:none;border-radius:5px;margin-top:20px;'>トップページに戻る</a></p>";
    echo "</div>";
    echo "</body></html>";
    exit;
}
?>
