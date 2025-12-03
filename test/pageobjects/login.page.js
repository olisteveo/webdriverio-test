const BasePage = require('./base.page');

class LoginPage extends BasePage {

    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('[id="username"]');
    }

    get inputPassword () {
        return $('[id="password"]');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    get alertFlash () {
        return $('.flash');
    }

    /**
     * a method to login with username and password
     */
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
