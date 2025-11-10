<?php
require_once 'auth.php';
requireAuth('line-access-info.php');

// LINE用アクセストークン（auth.phpと同じ値）
$line_access_token = 'LINE_ANGELS_HEALING_2024';

// 本番環境のドメイン（必要に応じて変更）
$production_domain = 'https://angels-healing.com';

// LINE用の直接アクセスURL
$line_direct_url = $production_domain . '/user-portal/?token=' . $line_access_token;
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>LINE公式アカウント用アクセス情報 - 天使たちの癒し</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/portal.css">
    <style>
        .info-container {
            max-width: 800px;
            margin: 50px auto;
            padding: 40px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .info-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 30px;
            color: var(--primary-color);
            border-bottom: 2px solid var(--primary-color);
            padding-bottom: 10px;
        }
        .url-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .url-label {
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }
        .url-display {
            background: white;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-family: monospace;
            word-break: break-all;
            margin-bottom: 10px;
        }
        .copy-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        .copy-btn:hover {
            opacity: 0.9;
        }
        .success-msg {
            display: none;
            color: #28a745;
            margin-top: 10px;
            font-weight: bold;
        }
        .instruction {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
        }
        .instruction h3 {
            margin-top: 0;
            color: #856404;
        }
        .back-link {
            display: inline-block;
            margin-top: 30px;
            color: var(--primary-color);
            text-decoration: none;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="info-container">
        <h1 class="info-title">📱 LINE公式アカウント用アクセス情報</h1>
        
        <div class="instruction">
            <h3>🔗 使用方法</h3>
            <p>以下のURLをLINE公式アカウントのリッチメニューに設定してください。</p>
            <p>このURLを使用すると、パスワード入力なしで利用者ポータルにアクセスできます。</p>
        </div>

        <div class="url-section">
            <div class="url-label">LINE用アクセスURL：</div>
            <div class="url-display" id="lineUrl"><?php echo htmlspecialchars($line_direct_url); ?></div>
            <button class="copy-btn" onclick="copyUrl()">📋 URLをコピー</button>
            <div class="success-msg" id="successMsg">✅ コピーしました！</div>
        </div>

        <div class="instruction">
            <h3>⚙️ 設定手順</h3>
            <ol>
                <li>LINE公式アカウントの管理画面にログイン</li>
                <li>「リッチメニュー」を選択</li>
                <li>「セラピスト一覧」などのメニューボタンを編集</li>
                <li>「アクション」タイプを「リンク」に設定</li>
                <li>上記のURLを貼り付け</li>
                <li>保存して公開</li>
            </ol>
        </div>

        <div class="instruction">
            <h3>🔒 セキュリティ情報</h3>
            <p><strong>アクセストークン：</strong> <code><?php echo htmlspecialchars($line_access_token); ?></code></p>
            <p>このトークンは厳重に管理してください。変更が必要な場合は、<code>auth.php</code>の<code>$line_access_token</code>を編集してください。</p>
        </div>

        <a href="index.php" class="back-link">← ポータルTOPに戻る</a>
    </div>

    <script>
        function copyUrl() {
            const urlText = document.getElementById('lineUrl').textContent;
            navigator.clipboard.writeText(urlText).then(function() {
                const successMsg = document.getElementById('successMsg');
                successMsg.style.display = 'block';
                setTimeout(function() {
                    successMsg.style.display = 'none';
                }, 3000);
            }).catch(function(err) {
                alert('コピーに失敗しました: ' + err);
            });
        }
    </script>
</body>
</html>
