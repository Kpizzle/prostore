import { type Locator, type Page } from '@playwright/test';

export class SignUpPage {

	private readonly page: Page
	public readonly emailInput: Locator
	public readonly passwordInput: Locator
	public readonly ConfirmPasswordInput: Locator
	private readonly signUpButton: Locator
	public readonly invalidCredentialsText: Locator

	constructor(page: Page) {
		this.page = page;
		this.emailInput = page.getByTestId('emailInput')
		this.passwordInput = page.getByTestId('passwordInput')
		this.ConfirmPasswordInput = page.getByTestId('confirmPasswordInput')
		this.signUpButton = page.getByTestId('signUpButton')
		this.invalidCredentialsText = page.getByTestId('invalidCredentialsText')
	}


	//Functions to complete on the loginPage

	async goto() {
		await this.page.goto('/sign-in')
	}

	async fillEmailField(email: string){
		await this.emailInput.fill(email)

	}

	async fillPasswordField(password: string){
		await this.passwordInput.fill(password)
	
	}
	async fillconfirmPasswordField(password: string){
		await this.passwordInput.fill(password)
	}


	async submitLogin(){
		await this.signUpButton.click()
	}

	async completeSignInProcess(email: string, password: string) {
		await this.fillEmailField(email)
		await this.fillPasswordField(password)
		await this.submitLogin()
	}

		// Get HTML5 validation message for any input field
		async getValidationMessage(field: Locator): Promise<string> {
			return await field.evaluate(input => (input as HTMLInputElement).validationMessage);
		}
}
