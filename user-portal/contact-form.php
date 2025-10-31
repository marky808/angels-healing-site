<?php
require_once 'auth.php';
requireAuth('contact-form.php');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>お問い合わせ - 利用者ポータル</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/portal.css">
</head>
<body>
    <!-- ヘッダーコンポーネント -->
    <div id="header" data-component="portal-header"></div>

    <section class="contact-form">
        <div class="container">
            <h2>お問い合わせ</h2>
            <p>ご質問やご相談がございましたら、下記フォームよりお気軽にお問い合わせください。</p>

            <!-- エラーメッセージ表示 -->
            <?php if (isset($_GET['error'])): ?>
                <div class="error-message">
                    <?php
                    switch ($_GET['error']) {
                        case 'required':
                            echo '必須項目が入力されていません。';
                            break;
                        case 'email':
                            echo 'メールアドレスの形式が正しくありません。';
                            break;
                        case 'mail':
                            echo 'メール送信に失敗しました。しばらく時間をおいて再度お試しください。';
                            break;
                    }
                    ?>
                </div>
            <?php endif; ?>

            <!-- 既存のcontact.phpに送信（リファラー判定でポータル用処理される） -->
            <form action="../contact.php" method="POST" class="contact-form-inner">
                <div class="form-group">
                    <label for="name">お名前 <span class="required">*</span></label>
                    <input type="text" id="name" name="name" required>
                </div>

                <div class="form-group">
                    <label for="email">メールアドレス <span class="required">*</span></label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="phone">電話番号</label>
                    <input type="tel" id="phone" name="phone">
                </div>

                <div class="form-group">
                    <label for="inquiry">お問い合わせ内容</label>
                    <select id="inquiry" name="inquiry">
                        <option value="">選択してください</option>
                        <option value="セラピスト予約について">セラピスト予約について</option>
                        <option value="料金について">料金について</option>
                        <option value="サービス内容について">サービス内容について</option>
                        <option value="その他">その他</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="message">メッセージ <span class="required">*</span></label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>

                <div class="form-submit">
                    <button type="submit" class="btn">送信する</button>
                </div>
            </form>

            <div class="back-link">
                <a href="index.php">← ポータルに戻る</a>
            </div>
        </div>
    </section>

    <!-- フッターコンポーネント -->
    <div id="footer" data-component="portal-footer"></div>

    <script src="../assets/js/load-components.js"></script>
</body>
</html>