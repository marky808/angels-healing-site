/**
 * コンポーネント読み込み用スクリプト
 * データ属性に基づいてヘッダーとフッターを動的に読み込むための機能を提供します
 * GitHub Pages対応版
 */

// リポジトリ名の設定（GitHub Pages用）
const REPO_NAME = 'angels-healing-site';

document.addEventListener('DOMContentLoaded', function() {
    // コンポーネント読み込み処理を開始
    loadComponents();
});

/**
 * コンポーネントを読み込む
 */
async function loadComponents() {
    // ヘッダーとフッターの要素を取得
    const headerElement = document.getElementById('header');
    const footerElement = document.getElementById('footer');
    
    // ヘッダーの読み込み
    if (headerElement) {
        const headerType = headerElement.getAttribute('data-component');
        if (headerType) {
            await loadComponent(headerElement, headerType);
        }
    }
    
    // フッターの読み込み
    if (footerElement) {
        const footerType = footerElement.getAttribute('data-component');
        if (footerType) {
            await loadComponent(footerElement, footerType);
        }
    }
    
    // コンポーネント読み込み完了イベントを発火
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
}

/**
 * 環境に応じたベースURLを取得する関数
 * @returns {string} ベースURL
 */
function getBaseUrl() {
    // GitHub Pagesかどうかチェック
    const isGitHubPages = location.hostname.includes('github.io');
    
    if (isGitHubPages) {
        return `/${REPO_NAME}`;
    }
    
    // ローカル環境の場合は空文字を返す
    return '';
}

/**
 * 指定された要素にコンポーネントを読み込む
 * @param {HTMLElement} element - コンポーネントを挿入する要素
 * @param {string} componentType - コンポーネントの種類（例: common-header, portal-footer）
 */
async function loadComponent(element, componentType) {
    try {
        // コンポーネントのパスを決定
        let componentPath;
        
        switch (componentType) {
            case 'common-header':
                componentPath = 'components/common/header.html';
                break;
            case 'common-footer':
                componentPath = 'components/common/footer.html';
                break;
            case 'portal-header':
                componentPath = 'components/portal/header.html';
                break;
            case 'portal-footer':
                componentPath = 'components/portal/footer.html';
                break;
            default:
                console.error(`不明なコンポーネントタイプ: ${componentType}`);
                return;
        }
        
        // GitHub Pagesかどうかを判定
        const isGitHubPages = location.hostname.includes('github.io');
        
        // パスの調整: user-portalディレクトリにいるかどうかを確認
        const isInUserPortal = window.location.pathname.includes('/user-portal/') || 
                              window.location.pathname.endsWith('user-portal/') || 
                              window.location.pathname.endsWith('user-portal/index.html') ||
                              window.location.pathname.endsWith('user-portal/therapists.html') ||
                              window.location.pathname.endsWith('user-portal/therapist-detail.html');
        
        // パスの調整
        let adjustedPath = '';
        
        // GitHub Pagesでのリポジトリ名を考慮したパス調整
        if (isGitHubPages) {
            if (isInUserPortal) {
                adjustedPath = `/${REPO_NAME}/${componentPath}`; // GitHub Pages上のユーザーポータル
            } else {
                adjustedPath = `/${REPO_NAME}/${componentPath}`; // GitHub Pages上の通常ページ
            }
        } else {
            // ローカル環境
            if (isInUserPortal) {
                adjustedPath = '../' + componentPath; // ユーザーポータル内の場合は上の階層に移動
            } else {
                adjustedPath = './' + componentPath; // 通常は現在の階層から相対パスで
            }
        }
        
        // コンポーネントのHTMLを取得
        console.log(`コンポーネントを読み込み中: ${adjustedPath}`);
        const response = await fetch(adjustedPath);
        
        if (!response.ok) {
            throw new Error(`コンポーネントの読み込みに失敗しました: ${adjustedPath} (${response.status})`);
        }
        
        const htmlContent = await response.text();
        
        // 要素にコンポーネントのHTMLを挿入
        element.innerHTML = htmlContent;
        
        // コンポーネント読み込み完了イベントを発火
        document.dispatchEvent(new CustomEvent('componentLoaded', { 
            detail: { 
                element: element, 
                componentType: componentType 
            }
        }));
        
    } catch (error) {
        console.error('コンポーネント読み込みエラー:', error);
        element.innerHTML = `<p class="component-error">コンポーネントの読み込みに失敗しました</p>`;
    }
}

/**
 * ポータル専用機能のセットアップ
 */
function setupPortalFeatures() {
    // ログアウトボタンのハンドラ
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            // ログアウト処理（仮実装）
            alert('ログアウト処理を実行します。');
            // sessionStorage.removeItem('user');
            // location.href = 'login.html';
        });
    }
    
    // ユーザー名表示
    const currentUserNameElement = document.getElementById('currentUserName');
    if (currentUserNameElement) {
        // セッションからユーザー情報を取得する実装（仮実装）
        // const user = JSON.parse(sessionStorage.getItem('user'));
        // currentUserNameElement.textContent = user ? user.name : 'ゲスト';
    }
}