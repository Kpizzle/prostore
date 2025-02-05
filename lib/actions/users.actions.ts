'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signInFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';

//sign in the user with credentials
export async function signInWithCredentials(
  previousState: unknown,
  formData: FormData
) {
	
	console.log('email', formData.get('email'))
	console.log('password', formData.get('password'))
	try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });
				
				console.log('user', user);

    await signIn('credentials', user);
    return {
      success: true,
      message: 'Signed in successfully',
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
  }
  return { success: false, message: 'Unable to verify login credentials' };
}

export async function signOutUser() {
  await signOut();
}
