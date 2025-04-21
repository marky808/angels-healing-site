/**
 * portal.js - 利用者ポータル専用のJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - portal.js');
    
    // コンポーネント読み込み完了後のモバイルメニュー初期化
    document.addEventListener('componentsLoaded', function() {
        console.log('Componentsロード完了 - portal.js');
        // ポータル用モバイルメニューの初期化（main.js内の関数を使用）
        if (typeof setupNewMobileMenu === 'function') {
            setupNewMobileMenu();
        }
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