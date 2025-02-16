import { test, expect } from '@playwright/test';
import { SignUpPage } from '../pageObjectModels/signUpPage';
import { HeaderPage } from '../pageObjectModels/headerPage';
import { User } from '../utils/create-a-user';

test.describe(
  'Sign Up Functional Tests',
  { tag: ['@feature', '@smoke'] },
  () => {
    test.beforeEach(async ({ page }) => {
      const signupPage = new SignUpPage(page);
      await signupPage.goto();
    });

				test('User can sign up with valid login credentials', async({page})=> {
					const signUpPage = new SignUpPage(page)
					const user = User.create()
					await signUpPage.completeSignUpProcess(user.fullName, user.email, user.password)
					await page.setDefaultTimeout(5000)
					await expect(page).toHaveURL('/');


					const headerPage = new HeaderPage(page)
					await expect(headerPage.userMenuDropdown).toBeVisible();


    });
  });
