/**
 * main.js - 全ページで使用する共通のJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初期設定
    setupCommonFeatures();
    
    // コンポーネント読み込み完了時のイベントリスナー
    document.addEventListener('componentsLoaded', function() {
        console.log('すべてのコンポーネントが読み込まれました - main.jsからの確認');
        setupNavigationFeatures();
    });
    
    // 個別コンポーネント読み込み完了時のイベントリスナー
    document.addEventListener('componentLoaded', function(e) {
        console.log(`コンポーネントが読み込まれました: ${e.detail.componentType}`);
        
        // ヘッダーコンポーネントが読み込まれたら特定の処理を実行
        if (e.detail.element.id === 'header') {
            setupHeaderFeatures();
        }
    });
});

/**
 * コンポーネントに依存しない共通機能のセットアップ
 */
function setupCommonFeatures() {
    // ナビゲーションのスクロール時の挙動
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header && window.scrollY > 100) {
            header.classList.add('sticky');
        } else if (header) {
            header.classList.remove('sticky');
        }
    });

    // 利用者ポータルのパスワード認証
    const portalLinks = document.querySelectorAll('.user-portal-link');
    portalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const password = prompt('パスワードを入力してください');
            
            if (password === '104184') {
                // パスワードが正しい場合、ポータルページへ移動
                window.location.href = this.getAttribute('href');
            } else if (password !== null) {
                // パスワードが間違っている場合（キャンセルではない）
                alert('パスワードが正しくありません');
            }
            // キャンセルの場合は何もしない
        });
    });
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 問い合わせフォームの検証
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // このデモでは実際に送信しない
            e.preventDefault();
            
            // フォームの検証
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // バリデーションOKならありがとうメッセージ表示
            if (isValid) {
                form.innerHTML = '<div class="thank-you-message"><h3>お問い合わせありがとうございます</h3><p>内容を確認次第、担当者からご連絡いたします。</p></div>';
            }
        });
    });
    
    // モーダル機能
    window.showModal = function(id, title, content) {
        // 既存のモーダルがあれば削除
        const existingModal = document.getElementById('info-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // モーダルの作成
        const modal = document.createElement('div');
        modal.id = 'info-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>${title}</h3>
                <div class="modal-body">
                    <p>${content}</p>
                </div>
            </div>
        `;
        
        // bodyに追加
        document.body.appendChild(modal);
        
        // モーダルを表示
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // 閉じるボタンの処理
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300); // トランジション時間分待つ
        });
        
        // モーダル外クリックで閉じる
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.remove();
                }, 300); // トランジション時間分待つ
            }
        });
    };
}

/**
 * ヘッダーコンポーネント関連の機能セットアップ
 */
function setupHeaderFeatures() {
    // オーバーレイ要素を作成
    const body = document.body;
    let overlay = document.querySelector('.menu-overlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        body.appendChild(overlay);
    }
}

/**
 * ナビゲーション関連の機能セットアップ（コンポーネント読み込み後）
 */
function setupNavigationFeatures() {
    // ハンバーガーメニュー機能
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    const overlay = document.querySelector('.menu-overlay');
    
    if (hamburger && navMenu && overlay) {
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
            overlay.classList.toggle('active');
            
            // メニュー開いている時はスクロール無効化
            if (navMenu.classList.contains('open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        }
        
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        // メニューリンククリック時の処理
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    } else {
        console.warn('ナビゲーション要素が見つかりません');
    }
}