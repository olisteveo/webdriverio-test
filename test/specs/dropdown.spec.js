const DropdownPage = require('../pageobjects/dropdown.page');

describe('Dropdown Tests', () => {

    it('should display dropdown on the page', async () => {
        await DropdownPage.open();
        await expect(DropdownPage.dropdown).toBeDisplayed();
    });

    it('should select option by value', async () => {
        await DropdownPage.open();
        await DropdownPage.selectOption('1');
        const selected = await DropdownPage.getSelectedOption();
        await expect(selected).toBe('1');
    });

    it('should select option by visible text', async () => {
        await DropdownPage.open();
        await DropdownPage.selectOptionByText('Option 2');
        const selected = await DropdownPage.getSelectedOption();
        await expect(selected).toBe('2');
    });

    it('should get all available options', async () => {
        await DropdownPage.open();
        const options = await DropdownPage.getAllOptions();
        await expect(options.length).toBeGreaterThan(0);
        // Verify specific options exist
        await expect(options).toContain('Please select an option');
    });

    it('should change dropdown selection', async () => {
        await DropdownPage.open();
        
        // Select first option
        await DropdownPage.selectOption('1');
        let selected = await DropdownPage.getSelectedOption();
        await expect(selected).toBe('1');
        
        // Change to second option
        await DropdownPage.selectOption('2');
        selected = await DropdownPage.getSelectedOption();
        await expect(selected).toBe('2');
    });

    it('should verify dropdown options are selectable', async () => {
        await DropdownPage.open();
        const options = await DropdownPage.getAllOptions();
        
        // Try selecting each option (except first which is usually placeholder)
        for (let i = 1; i < options.length; i++) {
            await DropdownPage.selectOption(String(i));
            const selected = await DropdownPage.getSelectedOption();
            await expect(selected).toBe(String(i));
        }
    });
});
