import { type Locator, type Page } from '@playwright/test';

export class HeaderPage {

	private readonly page: Page
	private readonly cartMenuButton: Locator
	public readonly userMenuDropdown: Locator
	public readonly signInButton: Locator
	public readonly signOutButton: Locator
	public readonly userFirstName: Locator
	public readonly userEmail: Locator

	constructor(page: Page){
		this.page = page;
		this.cartMenuButton = page.getByTestId('shoppingCartButton')
		this.userMenuDropdown = page.getByTestId('userProfileDropdown')
		this.signInButton = page.getByTestId('signInButton')
		this.signOutButton = page.getByTestId('signOutButton')
		this.userFirstName = page.getByTestId('userFirstName')
		this.userEmail = page.getByTestId('userEmail')
	}

	async selectUserMenu(){
		await this.userMenuDropdown.isVisible()
		await this.userMenuDropdown.click({force: true})
	}

	async selectSignOutButton(){
		await this.signOutButton.click()
	}

}