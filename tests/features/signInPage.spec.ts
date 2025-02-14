import { test, expect } from '@playwright/test';
import { SignInPage } from '../pageObjectModels/signInPage';

test.describe('Login Page Functional Tests', {tag: '@features'}, () => {
  test.beforeEach(async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.goto();
  });
  test('User can log in with valid credentials', async ({ page }) => {
    const signInPage = new SignInPage(page);

   
    await signInPage.completeSignInProcess('admin@test.com', 'Password1!');
				await expect(page).toHaveURL('/'); // Redirect to dashboard
  });
		test('Error message displayed for invalid credentials ', async ({page}) => {
			const signInPage = new SignInPage(page);
			await signInPage.completeSignInProcess('wrongemail@domain.con', 'incorrectPassword')
			await expect(signInPage.invalidCredentialsText).toHaveText('Unable to verify login credentials')

		})

		test('Validation error displayed when submitting only email address', async ({page})=> {
			const signInPage = new SignInPage(page)
			await signInPage.fillEmailField('validEmail@domain.com')
			await signInPage.submitLogin()

			const validationMessage = await signInPage.getValidationMessage(signInPage.passwordInput)
			expect(validationMessage).toContain('Please fill out this field.')
		})

		test('Validation error displayed when submitting only a password', async ({page}) => {
			const signInPage = new SignInPage(page)
			await signInPage.fillPasswordField('validPassword1!')
			await signInPage.submitLogin()

			const validationMessage = await signInPage.getValidationMessage(signInPage.emailInput)
			expect(validationMessage).toContain('Please fill out this field.')
		})
		test('Validation error displayed when using an invalid email address', async ({page}) => {
			const signInPage = new SignInPage(page)
			await signInPage.fillEmailField('email')
			await signInPage.emailInput.press('Enter')
			

			const validationMessage = await signInPage.getValidationMessage(signInPage.emailInput)
			expect(validationMessage).toContain('Please include an \'@\' in the email address. \'email\' is missing an \'@\'')
		})
});