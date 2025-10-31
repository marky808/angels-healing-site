<?php
// PHPによるお問い合わせフォーム処理

// 送信元のリファラーを検証
$referrer = $_SERVER['HTTP_REFERER'] ?? '';
// ローカル環境用にlocalhost/127.0.0.1も許可
if (strpos($referrer, 'angels-healing.com') === false && 
    strpos($referrer, 'frenchkiss.jp-angels-healing') === false &&
    strpos($referrer, 'localhost') === false && 
    strpos($referrer, '127.0.0.1') === false) {
    die('不正なリクエストです。');
}

// POSTデータの取得と検証
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
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
// ロリポップでは送信元メールアドレスは自分のドメインに存在するものにする必要があります
$from_email = 'info@angels-healing.com'; // ドメインのメールアドレスを使用
$headers = "From: {$from_email}\r\n";
$headers .= "Reply-To: {$email}\r\n"; // 返信先はユーザーのメールアドレス
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// ロリポップ用の日本語メール設定（必須）
mb_language("Japanese");
mb_internal_encoding("UTF-8");

// メール送信（ロリポップ環境に最適化）
if (function_exists('mb_send_mail')) {
    $mail_result = mb_send_mail($to, $subject, $mail_body, $headers);
} else {
    $mail_result = mail($to, $subject, $mail_body, $headers);
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

// 自動返信メールの送信（ロリポップ環境に最適化）
if (function_exists('mb_send_mail')) {
    $auto_mail_result = mb_send_mail($email, $auto_reply_subject, $auto_reply_body, $auto_headers);
} else {
    $auto_mail_result = mail($email, $auto_reply_subject, $auto_reply_body, $auto_headers);
}

// 結果に応じたリダイレクト
if ($mail_result && $auto_mail_result) {
    // 送信元に応じてリダイレクト先を変更
    if ($is_portal) {
        header('Location: user-portal/thanks.php?status=success');
    } else {
        header('Location: thanks.html?status=success');
    }
} else {
    // 詳細なエラー情報を表示
    echo "<!DOCTYPE html>";
    echo "<html><head><meta charset='UTF-8'><title>デバッグ情報</title></head><body>";
    echo "<h2>メール送信デバッグ情報</h2>";
    echo "<div style='background:#fff3cd;padding:20px;border:1px solid #ffc107;margin:20px;'>";
    
    echo "<h3>送信結果：</h3>";
    echo "<p>管理者メール送信: " . ($mail_result ? '✅ 成功' : '❌ 失敗') . "</p>";
    echo "<p>自動返信メール送信: " . ($auto_mail_result ? '✅ 成功' : '❌ 失敗') . "</p>";
    
    echo "<h3>送信パラメータ：</h3>";
    echo "<p>送信先: " . htmlspecialchars($to) . "</p>";
    echo "<p>送信元: " . htmlspecialchars($from_email) . "</p>";
    echo "<p>件名: " . htmlspecialchars($subject) . "</p>";
    echo "<p>Reply-To: " . htmlspecialchars($email) . "</p>";
    
    echo "<h3>PHP環境：</h3>";
    echo "<p>mb_send_mail関数: " . (function_exists('mb_send_mail') ? '✅ 利用可能' : '❌ 利用不可') . "</p>";
    echo "<p>PHP Version: " . phpversion() . "</p>";
    echo "<p>sendmail_path: " . ini_get('sendmail_path') . "</p>";
    
    echo "<h3>サーバー情報：</h3>";
    echo "<p>SERVER_NAME: " . $_SERVER['SERVER_NAME'] . "</p>";
    echo "<p>HTTP_REFERER: " . htmlspecialchars($referrer) . "</p>";
    
    echo "<hr>";
    echo "<p><strong>考えられる原因：</strong></p>";
    echo "<ul>";
    echo "<li>ロリポップのメールサーバー設定に問題がある</li>";
    echo "<li>info@angels-healing.comのメールボックスが満杯</li>";
    echo "<li>ロリポップ側で一時的なメール送信制限がかかっている</li>";
    echo "<li>SPF/DKIMレコードの問題</li>";
    echo "</ul>";
    
    echo "<p><a href='index.html' style='display:inline-block;padding:10px 20px;background:#007bff;color:white;text-decoration:none;border-radius:5px;margin-top:20px;'>トップページに戻る</a></p>";
    echo "</div>";
    echo "</body></html>";
    exit;
}
?>
