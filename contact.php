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

// 4. reCAPTCHA v3の必須検証（ポータル以外）
if (!$is_portal) {
    // reCAPTCHA v3トークンの取得
    $recaptcha_token = filter_input(INPUT_POST, 'g-recaptcha-response', FILTER_SANITIZE_STRING);
    
    if (empty($recaptcha_token)) {
        error_log('reCAPTCHA token missing. Referrer: ' . $referrer . ', IP: ' . $_SERVER['REMOTE_ADDR']);
        header('Location: form-error.html');
        exit;
    }
    
    // reCAPTCHA v3シークレットキー
    $recaptcha_secret = '6LeocfwrAAAAAG8PCr97naTbztmkv32BQTga8kCp';
    
    // Google reCAPTCHA APIに検証リクエストを送信
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_data = array(
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_token,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    );
    
    $options = array(
        'http' => array(
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($recaptcha_data),
            'timeout' => 10
        )
    );
    
    $context = stream_context_create($options);
    $verify_response = @file_get_contents($recaptcha_url, false, $context);
    
    if ($verify_response === false) {
        error_log('reCAPTCHA API connection failed. IP: ' . $_SERVER['REMOTE_ADDR']);
        header('Location: form-error.html');
        exit;
    }
    
    $response_data = json_decode($verify_response);
    
    // reCAPTCHA検証結果のチェック（スコア0.5未満は拒否）
    if (!$response_data->success || $response_data->score < 0.5) {
        error_log('reCAPTCHA verification failed. Score: ' . ($response_data->score ?? 'N/A') . ', IP: ' . $_SERVER['REMOTE_ADDR'] . ', Referrer: ' . $referrer);
        header('Location: form-error.html');
        exit;
    }
    
    // スコアをログに記録
    error_log('reCAPTCHA passed. Score: ' . $response_data->score . ', IP: ' . $_SERVER['REMOTE_ADDR']);
}

// フォームデータの取得と検証
$company = filter_input(INPUT_POST, 'company', FILTER_SANITIZE_STRING);
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$interest = filter_input(INPUT_POST, 'interest', FILTER_SANITIZE_STRING);
$inquiry = filter_input(INPUT_POST, 'inquiry', FILTER_SANITIZE_STRING); // ポータル用
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

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
    
    // エラー時も送信元に応じてリダイレクト
    if ($is_portal) {
        header('Location: user-portal/index.php?error=mail');
    } else {
        header('Location: form-error.html');
    }
}
?>
