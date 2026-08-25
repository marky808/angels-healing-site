<?php
// contact.php（ルート直下）と同じセッションを参照できるようCookieパスを揃える
session_set_cookie_params(['path' => '/']);
session_start();

// パスワード設定（実際のパスワードに変更してください）
$correct_password = '104184';

// LINE公式アカウント用の特別アクセストークン
$line_access_token = 'LINE_ANGELS_HEALING_2024';

// トークンによる自動認証チェック（GETパラメータ）
if (isset($_GET['token']) && $_GET['token'] === $line_access_token) {
    $_SESSION['portal_authenticated'] = true;
    $_SESSION['authenticated_via'] = 'line_token';
    
    // トークンパラメータを除去したクリーンなURLにリダイレクト
    $clean_url = strtok($_SERVER['REQUEST_URI'], '?');
    if (empty($clean_url) || $clean_url === '/user-portal/' || $clean_url === '/user-portal') {
        $clean_url = '/user-portal/index.php';
    }
    header('Location: ' . $clean_url);
    exit;
}

// ログインチェック
function isLoggedIn() {
    return isset($_SESSION['portal_authenticated']) && $_SESSION['portal_authenticated'] === true;
}

// パスワード認証処理
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if ($_POST['password'] === $correct_password) {
        $_SESSION['portal_authenticated'] = true;
        $_SESSION['authenticated_via'] = 'password';
        
        // リダイレクト先を決定
        $redirect_to = isset($_SESSION['requested_page']) ? $_SESSION['requested_page'] : 'index.php';
        unset($_SESSION['requested_page']);
        
        header('Location: ' . $redirect_to);
        exit;
    } else {
        $error_message = 'パスワードが正しくありません。';
    }
}

// 認証が必要なページへのアクセス制御
function requireAuth($current_page = '') {
    if (!isLoggedIn()) {
        if ($current_page) {
            $_SESSION['requested_page'] = $current_page;
        }
        header('Location: login.php');
        exit;
    }
}

// ログアウト処理
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ../index.html');
    exit;
}
?>