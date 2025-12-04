const BasePage = require('./base.page');

class DropdownPage extends BasePage {

    get dropdown () {
        return $('select');
    }

    async selectOption (value) {
        const dropdown = await this.dropdown;
        await dropdown.selectByAttribute('value', value);
    }

    async selectOptionByText (text) {
        const dropdown = await this.dropdown;
        await dropdown.selectByVisibleText(text);
    }

    async getSelectedOption () {
        const dropdown = await this.dropdown;
        return await dropdown.getValue();
    }

    async getAllOptions () {
        const dropdown = await this.dropdown;
        const options = await dropdown.$$('option');
        const values = [];
        for (let option of options) {
            values.push(await option.getText());
        }
        return values;
    }

    open () {
        return super.open('dropdown');
    }
}

module.exports = new DropdownPage();
