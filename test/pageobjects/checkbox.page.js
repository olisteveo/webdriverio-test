const BasePage = require('./base.page');

class CheckboxPage extends BasePage {

    get checkboxes () {
        return $$('input[type="checkbox"]');
    }

    get checkboxOne () {
        return $('input[type="checkbox"]:nth-of-type(1)');
    }

    get checkboxTwo () {
        return $('input[type="checkbox"]:nth-of-type(2)');
    }

    async checkboxByLabel (label) {
        const checkbox = await $(`label=${label}`).parentElement();
        return checkbox.$('input[type="checkbox"]');
    }

    async toggleCheckbox (index) {
        const checkboxes = await this.checkboxes;
        await checkboxes[index].click();
    }

    async isCheckboxChecked (index) {
        const checkboxes = await this.checkboxes;
        return await checkboxes[index].isSelected();
    }

    open () {
        return super.open('checkboxes');
    }
}

module.exports = new CheckboxPage();
