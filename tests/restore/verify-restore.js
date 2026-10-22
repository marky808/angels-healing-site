// 復元後の本番検証（読み取りのみ）
//   node tests/restore/verify-restore.js [ref=origin/main] [base=https://angels-healing.com]
// 1) mainのgit blobと本番の静的ファイルをSHA-256で照合
// 2) 公開してはいけないURLが開けないことを確認
// 3) Playwrightで主要ページの表示を確認（スクショは tmp/restore/ に保存）
const { execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const REF = process.argv[2] || 'origin/main';
const BASE = (process.argv[3] || 'https://angels-healing.com').replace(/\/$/, '');
const UA = 'Mozilla/5.0 (restore-verify)';
let pass = 0, fail = 0;
function check(label, cond, detail) {
    if (cond) { console.log(`✅ PASS: ${label}`); pass++; }
    else { console.log(`❌ FAIL: ${label} -- ${detail || ''}`); fail++; }
}
const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const enc = (p) => p.split('/').map(encodeURIComponent).join('/');
async function get(p, opts = {}) {
    return fetch(`${BASE}/${enc(p)}`, { redirect: 'manual', headers: { 'User-Agent': UA }, ...opts });
}

// デプロイ対象外（deploy.yml の exclude）と、.htaccess で拒否される静的ファイルは照合しない
const skip = (f) =>
    f.endsWith('.php') || f.endsWith('.md') || f.endsWith('.txt') && f !== 'robots.txt' ||
    /(^|\/)\./.test(f) || /^composer\./.test(f) || f === 'start-server.cmd' ||
    /^(debug-.*\.html|form-test\.html|index-backup\.html|index-clean\.html)$/.test(f) ||
    f === 'assets/js/form-test.js' || /^bot_script\//.test(f) || /^tests\//.test(f) ||
    f === 'user-portal/index-backup.html' ||
    /^user-portal\/(index|therapists|therapist-detail)\.html$/.test(f); // user-portal/.htaccess が .php へ301

(async () => {
    // ---- 1) ハッシュ照合 ----
    const files = execFileSync('git', ['ls-tree', '-r', '--name-only', '-z', REF], { maxBuffer: 1 << 26 })
        .toString('utf8').split('\0').filter(Boolean).filter((f) => !skip(f));
    console.log(`--- 静的ファイル照合: ${files.length}件 (ref=${REF}) ---`);
    const diffs = [];
    for (const f of files) {
        const blob = execFileSync('git', ['show', `${REF}:${f}`], { maxBuffer: 1 << 28 });
        const res = await get(f);
        const body = Buffer.from(await res.arrayBuffer());
        if (res.status !== 200 || sha(body) !== sha(blob)) diffs.push(`${f} (HTTP ${res.status}, ${body.length}B vs ${blob.length}B)`);
    }
    check(`mainの静的ファイル${files.length}件が本番と完全一致`, diffs.length === 0, `\n   ${diffs.join('\n   ')}`);

    // ---- 2) 開けてはいけないURL ----
    console.log('--- 非公開であるべきURL ---');
    const blocked = ['.git/config', '.git/HEAD', '.git/index', 'latest.zip', 'all.zip', '.ftp-deploy-sync-state.json',
        '.env', '.vscode/sftp.json', '.claude/', 'components/from/fffm.php', 'vendor/composer/installed.json',
        'debug-check.html', 'form-test.html', 'index-backup.html', 'RECAPTCHA_IMPLEMENTATION.md', 'composer.json'];
    for (const p of blocked) {
        const r = await get(p);
        check(`${p} は開けない`, [403, 404].includes(r.status), `HTTP ${r.status}`);
    }
    for (const p of ['robots.txt', 'index.html']) {
        const r = await get(p);
        check(`${p} は開ける`, r.status === 200, `HTTP ${r.status}`);
    }

    // ---- 3) 画面確認 ----
    console.log('--- 画面確認 (Playwright) ---');
    const { chromium } = require('playwright');
    const outDir = path.join('tmp', 'restore');
    fs.mkdirSync(outDir, { recursive: true });
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));

    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, 'top.png'), fullPage: true });
    check('トップ: 表示できる', (await page.title()).length > 0);
    check('トップ: 問い合わせフォームがある', (await page.locator('form').count()) > 0);
    check('トップ: honeypot(#website)がある(PR #5の版)', (await page.locator('#website').count()) === 1);

    await page.goto(`${BASE}/user-portal/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, 'portal-login.png') });
    check('user-portal: ログイン画面(パスワード入力)が出る', (await page.locator('input[name="password"]').count()) === 1, page.url());

    await page.goto(`${BASE}/user-portal/therapists.php`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(outDir, 'therapists-unauth.png') });
    check('セラピストページ: 未ログインはログイン画面へ', (await page.locator('input[name="password"]').count()) === 1, page.url());

    // 問い合わせフォーム: GETで直接開くとリダイレクトされる(送信はしない)
    const c = await get('contact.php');
    check('contact.php: GETは302(送信処理は動作中)', c.status === 302, `HTTP ${c.status}`);
    check('JSエラーなし', errors.length === 0, errors.join(' | '));
    await browser.close();

    console.log(`\n結果: ${pass} PASS / ${fail} FAIL`);
    process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
