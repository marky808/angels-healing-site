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
- 【緊急・別件】レビュー中にPRと無関係な重大な脆弱性を発見: components/from/fffm.php が認証なし（$use_auth=false）のPHPファイルマネージャで、$root_path=DOCUMENT_ROOTのままリポジトリに残存し本番にもデプロイされている（deploy.ymlの除外対象外）。過去2回削除されたが2025-09-14のリファクタリングコミットで誤って復活。要早急対応。
- dryrun_report.md は git 管理外のローカル一時資料（コミットせず）。
- ローカル検証用に C:\tools\php (PHP 8.3) と composer.phar を導入済み。vendor/, node_modules/, .env はテスト後に都度削除している。

## 最終更新
2026-08-26
