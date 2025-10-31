<?php
// PHPによるお問い合わせフォーム処理

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
// ロリポップでは送信元メールアドレスは自分のドメインに存在するものにする必要があります
$from_email = 'info@angels-healing.com'; // ドメインのメールアドレスを使用
$headers = "From: {$from_email}\r\n";
$headers .= "Reply-To: {$email}\r\n"; // 返信先はユーザーのメールアドレス
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// メール送信前にログを記録
error_log("メール送信試行: To={$to}, From={$from_email}, Subject={$subject}");

// メール送信（シンプルなmail関数を使用）
$mail_result = mail($to, $subject, $mail_body, $headers);

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

// 自動返信メールの送信（シンプルなmail関数を使用）
$auto_mail_result = mail($email, $auto_reply_subject, $auto_reply_body, $auto_headers);

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
    // 管理者向けメール送信失敗時のみエラー
    error_log('管理者向けメール送信失敗: To=' . $to . ', From=' . $from_email);
    
    // テスト環境またはデバッグモードの場合はエラーを表示
    if ($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1' || isset($_GET['debug'])) {
        echo "<h2>メール送信エラー</h2>";
        echo "<p>メールの送信に失敗しました。</p>";
        echo "<p><a href='index.html'>トップページに戻る</a></p>";
        exit;
    }
    
    // エラー時のリダイレクト
    if ($is_portal) {
        header('Location: user-portal/index.php?error=mail');
    } else {
        header('Location: form-error.html');
    }
}
?>
