/**
 * main.js - 全ページで使用する共通のJavaScript
 */

// デバッグログを追加
console.log('main.js loaded');

// DOMの読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - main.js');
      // 基本機能のセットアップ
    setupCommonFeatures();
    
    // お問い合わせフォームの初期化 - 一時的に無効化
    // setupContactForm();
    
    // コンポーネント読み込み完了後にメニューを初期化
    document.addEventListener('componentsLoaded', function() {
        console.log('componentsLoaded イベントを受信 - main.js');
        // 新しいモバイルメニューの初期化
        setupNewMobileMenu();
        
        // 「上に戻る」ボタンの追加
        createBackToTopButton();
        
        // ポータルリンクのパスワード認証を設定
        setupPortalPasswordProtection();
    });
    
    // 個々のコンポーネント読み込み完了時の処理
    document.addEventListener('componentLoaded', function(e) {
        console.log(`componentLoaded イベントを受信: ${e.detail.componentType} - main.js`);
    });
});

/**
 * 利用者ポータルリンクのパスワード認証を設定
 */
function setupPortalPasswordProtection() {
    console.log('ポータルリンクのパスワード認証を設定します');
    // 利用者ポータルのパスワード認証
    const portalLinks = document.querySelectorAll('.user-portal-link');
    console.log('見つかったポータルリンク数:', portalLinks.length);
    
    portalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('ポータルリンクがクリックされました');
            
            const password = prompt('パスワードを入力してください');
            
            if (password === '104184') {
                // パスワードが正しい場合、ポータルページへ移動
                console.log('パスワードが正しいため、ポータルページに移動します');
                window.location.href = this.getAttribute('href');
            } else if (password !== null) {
                // パスワードが間違っている場合（キャンセルではない）
                console.log('パスワードが間違っています');
                alert('パスワードが正しくありません');
            } else {
                console.log('ログインがキャンセルされました');
            }
        });
    });
}

/**
 * 新しいモバイルメニューのセットアップ
 */
function setupNewMobileMenu() {
    console.log('新しいモバイルメニューをセットアップします');
    
    // ハンバーガーボタン要素を取得
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    
    if (!hamburgerBtn) {
        console.warn('ハンバーガーメニューボタンが見つかりません');
        return;
    }
    
    // 現在のナビゲーションメニュー要素を取得
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navMenu) {
        console.warn('ナビゲーションメニューが見つかりません');
        return;
    }
    
    // モバイルメニューのオーバーレイを作成
    let menuOverlay = document.querySelector('.mobile-menu-overlay');
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'mobile-menu-overlay';
        document.body.appendChild(menuOverlay);
    }
    
    // モバイルメニュー要素の確認
    let mobileMenu = document.querySelector('.mobile-menu');
    
    // モバイルメニューが存在しない場合は作成
    if (!mobileMenu) {
        // メニューのクローンを作成（元のメニューリンクを維持）
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = navMenu.innerHTML;
        document.body.appendChild(mobileMenu);
        console.log('モバイルメニュー要素を作成しました');
    }
    
    // ハンバーガーボタンのクリックイベント
    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // オーバーレイのクリックイベント
    menuOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // モバイルメニュー内の各リンクにイベントを設定
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('モバイルメニューリンクがクリックされました:', this.textContent);
            // メニューを閉じる
            closeMobileMenu();
        });
    });
    
    // ページのスクロール時にメニューを閉じる
    window.addEventListener('scroll', function() {
        if (document.body.classList.contains('mobile-menu-open')) {
            closeMobileMenu();
        }
    });
    
    console.log('モバイルメニューの初期化が完了しました');
}

/**
 * モバイルメニューを開閉する関数
 */
function toggleMobileMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (!hamburgerBtn || !mobileMenu || !menuOverlay) {
        console.warn('メニュー要素が見つかりません');
        return;
    }
    
    if (document.body.classList.contains('mobile-menu-open')) {
        closeMobileMenu();
    } else {
        document.body.classList.add('mobile-menu-open');
        hamburgerBtn.classList.add('active');
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('active');
        // スクロールを無効にする
        document.body.style.overflow = 'hidden';
        console.log('モバイルメニューを開きました');
    }
}

/**
 * モバイルメニューを閉じる関数
 */
function closeMobileMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (!hamburgerBtn || !mobileMenu || !menuOverlay) {
        console.warn('メニュー要素が見つかりません');
        return;
    }
    
    document.body.classList.remove('mobile-menu-open');
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    // スクロールを有効に戻す
    document.body.style.overflow = '';
    console.log('モバイルメニューを閉じました');
}

/**
 * 「上に戻る」ボタンを作成する関数
 */
function createBackToTopButton() {
    // すでに存在するボタンを確認
    let backToTopBtn = document.querySelector('.back-to-top');
    
    // ボタンがない場合は作成
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="arrow-up">↑</i>';
        backToTopBtn.setAttribute('aria-label', 'ページ上部へ戻る');
        
        // bodyに追加
        document.body.appendChild(backToTopBtn);
        
        console.log('「トップに戻る」ボタンを作成しました');
    }
    
    // スクロール位置に応じてボタンの表示/非表示を切り替え
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) { // 300px以上スクロールしたら表示
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // ボタンのクリックイベント
    backToTopBtn.addEventListener('click', function() {
        // スムーズにトップへスクロール
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 共通機能のセットアップ
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

    // 注：利用者ポータルのパスワード認証はsetupPortalPasswordProtection関数に移動しました
    
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
    });    // 問い合わせフォームの検証 - PHPで処理するフォームには適用しない
    // 以下のコードはPHPフォーム送信を妨げるため無効化
    /* 
    const contactForms = document.querySelectorAll('form:not([action="contact.php"])');
    
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
    */
    
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
 * お問い合わせフォームの初期化
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    console.log('お問い合わせフォームを初期化します');
    
    // エラー表示要素
    const formError = document.getElementById('formError');
    
    contactForm.addEventListener('submit', function(e) {
        console.log('フォームがサブミットされました');
        
        // エラー表示をクリア
        formError.style.display = 'none';
        formError.textContent = '';
          // 簡易バリデーション
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const message = document.getElementById('message');
        const messageValue = message ? message.value : ''; // messageが存在する場合のみ値を取得
        
        if (!email || !name) {
            e.preventDefault();
            formError.textContent = '必須項目をすべて入力してください';
            formError.style.display = 'block';
            return false;
        }
        
        // メールアドレス形式チェック
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            e.preventDefault();
            formError.textContent = '有効なメールアドレスを入力してください';
            formError.style.display = 'block';
            return false;
        }        // FormSubmitに送信される前にログ出力
        console.log('フォームデータを送信します:');
        console.log('- メール:', email);
        console.log('- 名前:', name);
        if (message) {
            console.log('- メッセージ長:', messageValue.length);
        }
        
        // 全ての項目をサーバーログに記録（開発環境のみ）
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            const formData = new FormData(contactForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            console.log('送信データ:', formDataObj);
        }
        
        // 送信処理はFormSubmitに任せる
        console.log('FormSubmitに送信開始します');
        
        // 送信状態の表示
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '送信中...';
        submitButton.disabled = true;
        
        // 送信中のUIフィードバック
        formError.textContent = '送信中です。このままお待ちください...';
        formError.style.display = 'block';
        formError.style.color = '#4a6f8a';
        formError.style.border = '1px solid #4a6f8a';
        
        // フォームデータ送信後の処理
        setTimeout(() => {
            // 8秒後に元に戻す（ネットワークエラー対策）
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            formError.style.display = 'none';
        }, 8000);
        
        return true;
    });
}