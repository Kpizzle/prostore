import { test, expect } from '@playwright/test';
import { SignInPage } from '../pageObjectModels/signInPage';
import { HeaderPage } from '../pageObjectModels/headerPage';

test.describe('Header Section Functional Tests', {tag: ['@features', '@smoke'],}, () => {
		test.beforeEach(async ({ page }) => {
				const signInPage = new SignInPage(page);
				await signInPage.goto();
		});
		test('User can sign in and select user menu and sign out', async ({ page }) => {
				const signInPage = new SignInPage(page);

			
				await signInPage.completeSignInProcess('admin@test.com', 'Password1!');
				await expect(page).toHaveURL('/'); // Redirect to dashboard

				const headerSection = new HeaderPage(page)
				await expect(headerSection.userMenuDropdown).toBeVisible()
				await headerSection.selectUserMenu()
				await expect(headerSection.signOutButton).toBeVisible()
				await headerSection.selectSignOutButton()
				await expect(headerSection.signInButton).toBeVisible()
		});
		test('User can sign in and select user menu and view details', async ({ page }) => {
				const signInPage = new SignInPage(page);

			
				await signInPage.completeSignInProcess('admin@test.com', 'Password1!');
				await expect(page).toHaveURL('/'); // Redirect to dashboard

				const headerSection = new HeaderPage(page)
				await expect(headerSection.userMenuDropdown).toBeVisible()
				await headerSection.selectUserMenu()
				await expect(headerSection.userFirstName).toBeVisible()
				await expect(headerSection.userEmail).toBeVisible()
		});
})