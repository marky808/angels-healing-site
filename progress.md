# Progress

## 現在のタスク
2026-10-22 23:15頃のサーバー巻き戻し（2025/11/01版 latest.zip の解凍とみられる）からの復元・再発防止。
重量タスク。branch: fix/restore-and-harden-deploy（ドラフトPR）。マージ＝本番デプロイなので、ユーザーのFTP作業が終わってからマージする。

## 完了済み
- [x] 調査（Actionsは無関係、サーバー静的31件が古い版、fffm.php復活、latest.zip/all.zip/.git/状態ファイルが公開）
- [x] .env 再構築（リポジトリ外 ~/angels-restore/.env、203バイト）
- [x] ルート .htaccess 追加（ドットファイル・バックアップ・テスト用ファイル拒否）
- [x] deploy.yml: workflow_dispatch（常にdry-run）、tests/ をデプロイ除外
- [x] tests/restore/verify-restore.js（ハッシュ照合＋非公開URL確認＋画面確認）

## 進行中
- [ ] ユーザーのFTP作業（latest.zip / all.zip / .git / 状態ファイル削除）→ マージ → .env アップロード → 検証

## 未着手
- [ ] 本番で verify-restore.js が全PASSすることの確認
- [ ] reCAPTCHAキー・SMTPパスワード再発行の判断
- [ ] アクセスログ確認（ユーザー作業）

## 注意事項・ブロッカー
- 状態ファイルを削除せずにマージすると差分ゼロで何も上書きされない。必ず削除してからマージ
- サーバーに既存のルート .htaccess があれば、マージ前に控えを取って内容を統合する（デプロイで上書きされる）
- clean-slate は使わない（サーバー固有ファイルが消える）

## 最終更新
2026-10-23
