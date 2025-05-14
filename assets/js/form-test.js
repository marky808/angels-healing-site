/**
 * form-test.js - お問い合わせフォームのテスト用スクリプト
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('フォームテストスクリプトが読み込まれました');
    
    // お問い合わせフォームを取得
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.log('お問い合わせフォームが見つかりませんでした');
        return;
    }
    
    // フォームのローカルテスト用に設定を変更
    console.log('お問い合わせフォームをローカルテスト用に設定します');
    
    // オリジナルのアクション（FormSubmit）を保存
    contactForm.setAttribute('data-original-action', contactForm.getAttribute('action'));
    
    // テスト用に新しいボタンを追加
    const testButton = document.createElement('button');
    testButton.type = 'button';
    testButton.className = 'btn test-btn';
    testButton.style.marginLeft = '10px';
    testButton.style.backgroundColor = '#4CAF50';
    testButton.textContent = 'テスト送信';
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.parentNode.insertBefore(testButton, submitButton.nextSibling);
    
    // テストボタンのクリックイベント
    testButton.addEventListener('click', function() {
        // フォームの入力値をログに出力
        console.log('テスト送信がクリックされました');
        
        // 入力値を取得
        const formData = new FormData(contactForm);
        const formValues = {};
        
        for (const [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        
        console.log('フォーム入力値:', formValues);
        
        // テスト結果表示
        const resultElement = document.createElement('div');
        resultElement.className = 'form-test-result';
        resultElement.style.margin = '20px 0';
        resultElement.style.padding = '15px';
        resultElement.style.backgroundColor = '#f0f8ff';
        resultElement.style.border = '1px solid #b0e0e6';
        resultElement.style.borderRadius = '5px';
        
        resultElement.innerHTML = `
            <h3 style="margin-top: 0;">テスト結果</h3>
            <p>フォームの入力内容が確認できました。以下の内容でメール送信されます：</p>
            <ul>
                ${Object.entries(formValues)
                    .filter(([key]) => !key.startsWith('_'))
                    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
                    .join('')}
            </ul>
            <p>実際の送信は、このテストでは行われていません。</p>
            <p>FormSubmitを使用した実際の送信をテストする場合は、「送信する」ボタンを押してください。</p>
            <p>FormSubmitの初回使用時には確認メールが送られ、その認証後にフォームが完全に機能するようになります。</p>
        `;
        
        // 既存のテスト結果を削除
        const oldResult = document.querySelector('.form-test-result');
        if (oldResult) {
            oldResult.remove();
        }
        
        // テスト結果をフォームの後に追加
        contactForm.parentNode.insertBefore(resultElement, contactForm.nextSibling);
    });
});
