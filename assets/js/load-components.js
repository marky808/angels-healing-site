/**
 * コンポーネント読み込み用スクリプト
 * データ属性に基づいてヘッダーとフッターを動的に読み込むための機能を提供します
 */

// デバッグ用のフラグ - 読み込み問題の診断に使用
const DEBUG_MODE = true;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded: コンポーネント読み込み処理を開始します');
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
    
    try {
        // ヘッダーの読み込み
        if (headerElement) {
            const headerType = headerElement.getAttribute('data-component');
            if (headerType) {
                if (DEBUG_MODE) console.log(`ヘッダー(${headerType})の読み込みを試行します`);
                await loadComponent(headerElement, headerType);
            }
        }
        
        // フッターの読み込み
        if (footerElement) {
            const footerType = footerElement.getAttribute('data-component');
            if (footerType) {
                if (DEBUG_MODE) console.log(`フッター(${footerType})の読み込みを試行します`);
                await loadComponent(footerElement, footerType);
            }
        }
        
        // コンポーネント読み込み完了イベントを発火
        if (DEBUG_MODE) console.log('すべてのコンポーネント読み込み完了');
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    } catch (error) {
        console.error('コンポーネント読み込みに失敗しました:', error);
        showComponentError(headerElement || document.body, 'コンポーネント読み込みエラー: ' + error.message);
    }
}

/**
 * コンポーネント読み込みエラーを表示する関数
 */
function showComponentError(element, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'component-error-message';
    errorElement.innerHTML = `
        <div style="background-color: #ffdddd; color: #d32f2f; padding: 15px; margin: 10px 0; border-radius: 4px; border-left: 5px solid #d32f2f;">
            <strong>コンポーネント読み込みエラー</strong><br>
            ${message}<br>
            <button onclick="location.reload()" style="margin-top: 10px; padding: 5px 15px; background: #d32f2f; color: white; border: none; border-radius: 4px; cursor: pointer;">再読み込み</button>
        </div>
    `;
    
    // すでにエラーメッセージがある場合は置き換える
    const existingError = element.querySelector('.component-error-message');
    if (existingError) {
        element.replaceChild(errorElement, existingError);
    } else {
        // 新しいエラーメッセージを追加
        element.appendChild(errorElement);
    }
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
                throw new Error(`不明なコンポーネントタイプ: ${componentType}`);
        }
        
        // 現在のURLパスを取得して、適切な相対パスを決定
        let basePath = '';
        const currentPath = window.location.pathname;
        
        // URLにuser-portalが含まれている場合（ユーザーポータル内のページ）
        if (currentPath.includes('user-portal')) {
            basePath = '../';
            if (DEBUG_MODE) console.log('ユーザーポータル内のページを検出しました');
        }
        
        // 最終的なコンポーネントのパス
        const adjustedPath = basePath + componentPath;
        
        if (DEBUG_MODE) console.log(`コンポーネントを読み込み中: ${adjustedPath}`);
        
        // コンポーネントのHTMLを取得
        const response = await fetch(adjustedPath);
        
        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status} - ${adjustedPath}`);
        }
        
        const htmlContent = await response.text();
        
        // 空のコンテンツをチェック
        if (!htmlContent.trim()) {
            throw new Error('読み込まれたコンポーネントが空です');
        }
        
        // 要素にコンポーネントのHTMLを挿入
        element.innerHTML = htmlContent;
        
        // コンポーネント読み込み完了イベントを発火
        if (DEBUG_MODE) console.log(`コンポーネント読み込み成功: ${componentType}`);
        document.dispatchEvent(new CustomEvent('componentLoaded', { 
            detail: { 
                element: element, 
                componentType: componentType 
            }
        }));
        
        return true;
        
    } catch (error) {
        console.error(`コンポーネント(${componentType})読み込みエラー:`, error);
        element.innerHTML = `
            <div style="background-color: #ffdddd; color: #d32f2f; padding: 15px; margin: 10px 0; border-radius: 4px; border-left: 5px solid #d32f2f;">
                <strong>コンポーネントの読み込みに失敗しました</strong><br>
                ${error.message}
            </div>
        `;
        throw error; // エラーを上位に伝播
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