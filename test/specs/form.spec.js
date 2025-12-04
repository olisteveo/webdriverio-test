const LoginPage = require('../pageobjects/login.page');

describe('Input Field Tests', () => {
    
    it('should accept text input in form fields', async () => {
        await LoginPage.open();
        const testInput = 'MyTestInput123';
        await LoginPage.inputUsername.setValue(testInput);
        const value = await LoginPage.inputUsername.getValue();
        await expect(value).toBe(testInput);
    });

    it('should handle password fields securely', async () => {
        await LoginPage.open();
        const password = 'SecurePass123!';
        await LoginPage.inputPassword.setValue(password);
        const value = await LoginPage.inputPassword.getValue();
        await expect(value).toBe(password);
    });

    it('should clear input field values', async () => {
        await LoginPage.open();
        await LoginPage.inputUsername.setValue('ToBeCleared');
        await LoginPage.inputUsername.clearValue();
        const value = await LoginPage.inputUsername.getValue();
        await expect(value).toBe('');
    });

    it('should append text to existing field value', async () => {
        await LoginPage.open();
        await LoginPage.inputUsername.setValue('First');
        await LoginPage.inputUsername.addValue('Second');
        const value = await LoginPage.inputUsername.getValue();
        await expect(value).toBe('FirstSecond');
    });
});
