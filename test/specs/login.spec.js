const LoginPage = require('../pageobjects/login.page');

describe('Login Page Tests', () => {
    it('should display login page title', async () => {
        await LoginPage.open();
        await expect(browser).toHaveTitle('The Internet');
    });

    it('should display login form elements', async () => {
        await LoginPage.open();
        await expect(LoginPage.inputUsername).toBeDisplayed();
        await expect(LoginPage.inputPassword).toBeDisplayed();
        await expect(LoginPage.btnSubmit).toBeDisplayed();
    });

    it('should show error message on invalid login', async () => {
        await LoginPage.open();
        await LoginPage.login('invalid', 'invalid');
        await expect(LoginPage.alertFlash).toBeDisplayed();
        await expect(LoginPage.alertFlash).toHaveText(expect.stringContaining('Your username is invalid!'));
    });
});
