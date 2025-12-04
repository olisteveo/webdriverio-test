const BasePage = require('./base.page');

class FormPage extends BasePage {

    get inputFirstName () {
        return $('input[name="fname"]');
    }

    get inputLastName () {
        return $('input[name="lname"]');
    }

    get submitButton () {
        return $('input[type="submit"]');
    }

    get successMessage () {
        return $('p');
    }

    /**
     * Fill out the simple form
     */
    async fillForm (firstName, lastName) {
        await this.inputFirstName.setValue(firstName);
        await this.inputLastName.setValue(lastName);
        await this.submitButton.click();
    }

    /**
     * Open the form page
     */
    open () {
        return super.open('formelements');
    }
}

module.exports = new FormPage();
