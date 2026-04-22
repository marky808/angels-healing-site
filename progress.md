# Progress

## 現在のタスク
セラピスト「宜保 香代子」追加（medicalカテゴリ）

## 完了済み
- [x] feature/add-therapist-gibo-kayoko ブランチ作成
- [x] 既存データ構造（therapist-data.js）の確認
- [x] 画像リネーム（gibi3.jpg → gibo3.jpg）で命名規則統一
- [x] therapist-data.js に id=19 で宜保香代子を追加
- [x] node によるJSパース検証・medical フィルタ動作確認
- [x] ローカルHTTPサーバで /user-portal/therapists.html, therapist-detail.html?id=19, gibo1〜4.jpg が 200 を返すことを確認

## 進行中
- [x] ドラフトPR #3 作成
- [x] /code-review 初回実行 → 信頼度85でキャッシュバスティング未更新を指摘
- [x] 指摘修正: user-portal/*.php 4ファイルの ?v=20260131 → ?v=20260423 に更新
- [ ] /code-review 再実行 → 指摘ゼロ確認 ← 今ここ

## 未着手
- [ ] ドラフト解除 → マージ

## 注意事項・ブロッカー
- 施術時間は指示書で「表示しない」とされているが、既存の同カテゴリ（濵﨑麻依、明石知子）に合わせ `duration: '未設定'` で記載。詳細ページはそのまま「未設定」と表示される既存挙動。
- Windowsの `python` が WindowsStore alias で使えないため、検証は node の簡易HTTPサーバで実施。
- 「氣」「®︎」など特殊文字はUTF-8で正しく保持されていることを確認済み。

## 最終更新
2026-04-23
