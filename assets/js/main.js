/**
 * main.js - 全ページで使用する共通のJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションのスクロール時の挙動
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // ハンバーガーメニュー機能
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // オーバーレイ要素を作成
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
    
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
});