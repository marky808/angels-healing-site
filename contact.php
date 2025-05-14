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
$company = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_STRING);
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$interest = filter_input(INPUT_POST, 'interest', FILTER_SANITIZE_STRING);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// 必須項目のチェック
if (empty($name) || empty($email) || empty($message)) {
    header('Location: index.html?error=required');
    exit;
}

// メールアドレスの形式チェック
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.html?error=email');
    exit;
}

// メールの件名と本文を作成
$subject = "【天使たちの癒し】お問い合わせがありました";

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

// 管理者へのメール送信
$to = 'info@angels-healing.com';
// ロリポップでは送信元メールアドレスは自分のドメインに存在するものにする必要があります
$from_email = 'info@angels-healing.com'; // ドメインのメールアドレスを使用
$headers = "From: {$from_email}\r\n";
$headers .= "Reply-To: {$email}\r\n"; // 返信先はユーザーのメールアドレス
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// メール送信（ロリポップ環境に最適化）
if (function_exists('mb_send_mail')) {
    $mail_result = mb_send_mail($to, $subject, $mail_body, $headers);
} else {
    $mail_result = mail($to, $subject, $mail_body, $headers);
}

// 自動返信メールの設定
$auto_reply_subject = "【天使たちの癒し】お問い合わせありがとうございます";

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
    header('Location: thanks.html?status=success');
} else {
    // エラーメッセージを作成
    $error_message = 'メール送信エラー: ';
    if (!$mail_result) {
        $error_message .= '管理者向けメール送信失敗。';
    }
    if (!$auto_mail_result) {
        $error_message .= '自動返信メール送信失敗。';
    }
    $error_message .= ' 送信先=' . $to . ', 送信元=' . $from_email;
    
    // エラーをログに記録
    error_log($error_message);
    
    // テスト環境またはデバッグモードの場合はエラーを表示
    if ($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1' || isset($_GET['debug'])) {
        echo "<h2>メール送信エラー</h2>";
        echo "<p>メールの送信に失敗しました。サーバーの設定を確認してください。</p>";
        echo "<p>エラー詳細：" . $error_message . "</p>";
        echo "<p>ロリポップでは、送信元メールアドレスはドメインに紐づいたアドレスを使用する必要があります。</p>";
        echo "<p><a href='index.html'>トップページに戻る</a></p>";
        exit;
    }
    
    header('Location: form-error.html');
}
?>
