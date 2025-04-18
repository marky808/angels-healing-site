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
});