<?php
require_once 'auth.php';
requireAuth('thanks.php');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>お問い合わせありがとうございます - 天使たちの癒し</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/portal.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #4a6f8a;
            --primary-hover: #3d5a75;
        }
        
        body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
        }
        
        .thanks-container {
            text-align: center;
            max-width: 600px;
            width: 100%;
            background: white;
            border-radius: 15px;
            padding: 60px 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 30px;
        }
        
        .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        
        .thanks-title {
            font-size: 28px;
            margin-bottom: 20px;
            color: var(--primary-color);
            font-weight: 700;
        }
        
        .thanks-message {
            font-size: 16px;
            line-height: 1.8;
            color: #555;
            margin-bottom: 40px;
        }
        
        .thanks-message p {
            margin-bottom: 10px;
        }
        
        .back-links {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .back-link {
            display: inline-block;
            padding: 15px 30px;
            background: var(--primary-color);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            transition: all 0.3s ease;
            font-weight: 500;
            min-width: 160px;
        }
        
        .back-link:hover {
            background: var(--primary-hover);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(74,111,138,0.3);
        }
        
        .back-link.outline {
            background: transparent;
            color: var(--primary-color);
            border: 2px solid var(--primary-color);
        }
        
        .back-link.outline:hover {
            background: var(--primary-color);
            color: white;
        }
        
        @media (max-width: 768px) {
            .thanks-container {
                padding: 40px 20px;
                margin: 20px;
            }
            
            .thanks-title {
                font-size: 24px;
            }
            
            .back-links {
                flex-direction: column;
                align-items: center;
            }
            
            .back-link {
                width: 200px;
            }
        }
    </style>
</head>
<body>
    <!-- ヘッダーコンポーネント -->
    <div id="header" data-component="portal-header"></div>

    <main>
        <div class="thanks-container">
            <div class="logo">
                <img src="../assets/images/logo.png" alt="天使たちの癒し">
            </div>
            
            <h1 class="thanks-title">お問い合わせありがとうございます</h1>
            
            <div class="thanks-message">
                <p>お問い合わせフォームを送信いただき、ありがとうございます。</p>
                <p>内容を確認次第、担当者よりご連絡させていただきます。</p>
                <p>今しばらくお待ちください。</p>
            </div>
            
            <div class="back-links">
                <a href="index.php" class="back-link">ポータルトップに戻る</a>
                <a href="therapists.php" class="back-link outline">セラピスト一覧を見る</a>
            </div>
        </div>
    </main>

    <!-- フッターコンポーネント -->
    <div id="footer" data-component="portal-footer"></div>

    <!-- ログアウト用のリンク -->
    <div style="position: fixed; top: 10px; right: 10px; z-index: 1000;">
        <a href="?logout=1" style="background: rgba(0,0,0,0.1); padding: 5px 10px; border-radius: 5px; color: #666; text-decoration: none; font-size: 12px;">ログアウト</a>
    </div>

    <script src="../assets/js/load-components.js"></script>
</body>
</html>