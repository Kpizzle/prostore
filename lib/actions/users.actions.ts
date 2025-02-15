'use server';

import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signInFormSchema, signUpFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';
import { hashSync } from 'bcrypt-ts-edge';
import { prisma } from '@/db/prisma';

//sign in the user with credentials
export async function signInWithCredentials(
  previousState: unknown,
  formData: FormData
) {
  console.log('email', formData.get('email'));
  console.log('password', formData.get('password'));
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

export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

				//storing plain text password to use to sign in user
    const plainPassword = user.password;

				//Hashing password and assigning hashed PW back to user object
    user.password = hashSync(user.password, 10);

				//saving user to db with hashed PW
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

				//Sign In action
    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    if (isRedirectError(error)) throw error;
  }
  return { success: false, message: 'User was not registered' };
}
