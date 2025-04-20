/**
 * コンポーネント読み込み用スクリプト
 * データ属性に基づいてヘッダーとフッターを動的に読み込むための機能を提供します
 */

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
    
    // コンポーネント読み込み後のイベントハンドラをセットアップ
    setupEventHandlers();
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
        
        if (isInUserPortal) {
            adjustedPath = '../' + componentPath; // ユーザーポータル内の場合は上の階層に移動
        } else {
            adjustedPath = './' + componentPath; // 通常は現在の階層から相対パスで
        }
        
        // GitHubPagesでのリポジトリ名を考慮したパス調整（必要な場合）
        // リポジトリ名が判明している場合は以下のようにパスを調整できます
        // if (isGitHubPages) {
        //     const repoName = 'angels-healing-site'; // GitHubリポジトリ名
        //     adjustedPath = `/${repoName}/${componentPath}`;
        // }
        
        // コンポーネントのHTMLを取得
        console.log(`コンポーネントを読み込み中: ${adjustedPath}`);
        const response = await fetch(adjustedPath);
        
        if (!response.ok) {
            throw new Error(`コンポーネントの読み込みに失敗しました: ${adjustedPath} (${response.status})`);
        }
        
        const htmlContent = await response.text();
        
        // 要素にコンポーネントのHTMLを挿入
        element.innerHTML = htmlContent;
        
    } catch (error) {
        console.error('コンポーネント読み込みエラー:', error);
        element.innerHTML = `<p class="component-error">コンポーネントの読み込みに失敗しました</p>`;
    }
}

/**
 * コンポーネントのイベントハンドラをセットアップ
 */
function setupEventHandlers() {
    // ハンバーガーメニューのイベントハンドラ
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (hamburgerMenu && navMenu && menuOverlay) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('open');
            menuOverlay.classList.toggle('active');
        });
        
        menuOverlay.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('open');
            menuOverlay.classList.remove('active');
        });
    }
    
    // ポータル専用機能のセットアップ
    if (window.location.pathname.includes('/user-portal/')) {
        setupPortalFeatures();
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