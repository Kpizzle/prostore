import CredentialsSignInForm from '@/components/auth/credentials-signin-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { JSX } from 'react';

export const metadata: Metadata = {
  title: 'Sign In',
};

const SignInPage = async (props: {
	searchParams: Promise<{
		callbackUrl: string
	}>
}): Promise<JSX.Element | null> => {
	const {callbackUrl} = await props.searchParams;
	const session = await auth();

  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link
            href='/'
            className='flex-center'>
            <Image
              src={'/images/logo.svg'}
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <CardTitle className='text-center '>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Sign into your account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
