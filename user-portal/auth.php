<?php
session_start();

// パスワード設定（実際のパスワードに変更してください）
$correct_password = '104184';

// ログインチェック
function isLoggedIn() {
    return isset($_SESSION['portal_authenticated']) && $_SESSION['portal_authenticated'] === true;
}

// パスワード認証処理
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    if ($_POST['password'] === $correct_password) {
        $_SESSION['portal_authenticated'] = true;
        
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