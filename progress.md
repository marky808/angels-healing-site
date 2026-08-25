# Progress

## 現在のタスク
（なし - 直近タスク「問い合わせフォームのspam対策」はマージ完了）

## 完了済み
- [x] 問い合わせフォームの迷惑メール増加を調査
- [x] contact.php の reCAPTCHA バイパス脆弱性を発見（Referer偽装で検証を丸ごとスキップ可能だった）
- [x] fix/contact-form-spam-hardening ブランチで①セッションベース認証判定 ②ハニーポット ③タイムトラップ を実装
- [x] ローカルにPHP 8.3 + Composer環境を構築しPlaywrightでサーバーサイド/フロントエンド計12ケース検証
- [x] ドラフトPR #5 作成
- [x] Full review（5並列エージェント）実施、confidence80以上の指摘1件（ポータル共有パスワードがreCAPTCHA回避特権になりログイン試行のレート制限がない）
- [x] user-portal/auth.php にIPベースのログインレート制限を追加（5回失敗/15分でロックアウト）、Light reviewで確認
- [x] ドラフト解除してPR #5 マージ (commit c6689f8)、FTPデプロイ成功確認済み

## 進行中
- なし

## 未着手
- ④ 同一IP/メールアドレスのレート制限（contact.php本体、reCAPTCHAスコアログ確認後に着手予定）
- ⑤ reCAPTCHAスコア閾値の見直し（ロリポップ管理画面のエラーログ確認待ち、ユーザー調査中）

## 注意事項・ブロッカー
- 【緊急対応済み】components/from/fffm.php（認証なしPHPファイルマネージャ、$use_auth=false・$root_path=DOCUMENT_ROOT）を削除しPR #6でマージ・デプロイ完了(2026-08-26)。過去2回削除されたが2025-09-14のリファクタリングコミットで誤って復活していたもの。再発防止（deploy.ymlの除外リスト整備や定期棚卸し）は未着手、必要なら別途検討。
- dryrun_report.md は git 管理外のローカル一時資料（コミットせず）。
- ローカル検証用に C:\tools\php (PHP 8.3) と composer.phar を導入済み。vendor/, node_modules/, .env はテスト後に都度削除している。

## 最終更新
2026-08-26
