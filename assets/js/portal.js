/**
 * portal.js - 利用者ポータル専用のJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - portal.js');
    
    // ポータル用基本機能の初期化
    setupPortalFeatures();
    
    // コンポーネント読み込み完了後のモバイルメニュー初期化
    document.addEventListener('componentsLoaded', function() {
        console.log('Componentsロード完了 - portal.js');
        // ポータル専用モバイルメニューの初期化
        setupPortalMobileMenu();
    });
    
    // カテゴリーをクリックした時のフィルタリング
    const categoryLinks = document.querySelectorAll('.category-card a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const category = this.getAttribute('href').split('=')[1];
            localStorage.setItem('selectedCategory', category);
        });
    });

    // URLパラメータ取得用関数
    function getParameterByName(name) {
        const url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    // セラピスト詳細ページでのURLパラメータ処理
    const therapistId = getParameterByName('id');
    if (therapistId && document.querySelector('.therapist-detail')) {
        // ここでは静的なHTML表示用に何もしないが
        // 実際のアプリケーションでは、ここでAPIリクエストを行い
        // セラピスト情報を動的に表示する処理を書く
    }

    // 予約ボタンのイベント
    const bookingButtons = document.querySelectorAll('.booking-button a, .booking-cta a');
    
    bookingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 外部リンク（LINE）に移動するので、特に処理は必要ないが
            // 予約前にセッションストレージに情報を保存したい場合などに使用
            const therapistName = document.getElementById('therapist-name')?.textContent;
            if (therapistName) {
                sessionStorage.setItem('selectedTherapist', therapistName);
            }
        });
    });
});

/**
 * ポータル専用のモバイルメニューセットアップ
 */
function setupPortalMobileMenu() {
    console.log('ポータル用モバイルメニューをセットアップします');
    
    // ハンバーガーボタン要素を取得
    const hamburgerBtn = document.querySelector('.portal-header .hamburger-menu');
    
    if (!hamburgerBtn) {
        console.warn('ポータル用ハンバーガーメニューボタンが見つかりません');
        return;
    }
    
    // 現在のナビゲーションメニュー要素を取得
    const navMenu = document.querySelector('.portal-header .nav-menu');
    
    if (!navMenu) {
        console.warn('ポータル用ナビゲーションメニューが見つかりません');
        return;
    }
    
    // headerコンポーネントに既に含まれているメニューオーバーレイを使用
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (!menuOverlay) {
        console.warn('ポータル用メニューオーバーレイが見つかりません');
        return;
    }
    
    // モバイルメニュー操作のイベント処理を設定
    hamburgerBtn.addEventListener('click', function() {
        document.body.classList.toggle('menu-open');
        hamburgerBtn.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // メニューオーバーレイをクリックした際にメニューを閉じる
    menuOverlay.addEventListener('click', function() {
        document.body.classList.remove('menu-open');
        hamburgerBtn.classList.remove('active');
        menuOverlay.classList.remove('active');
        navMenu.classList.remove('active');
    });
}

/**
 * ポータル用基本機能の初期化
 */
function setupPortalFeatures() {
    // ここにポータル特有の追加機能を実装
}