'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { signInDefaultValues } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signInWithCredentials } from '@/lib/actions/users.actions';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const CredentialsSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: '',
  });

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
						data-testid='signInButton'
        disabled={pending}
        className='w-full'
        variant='default'>
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    );
  };

  return (
    <form action={action}>
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            data-testid='emailInput'
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
										data-testid='passwordInput'
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <SignInButton />
        <div className='text-sm text-center text-muted-foreground'>
          Don&apos;t have an account? {''}
          <Link
            href={'/sign-up'}
            target='_self'
            className='link'>
            Sign Up
          </Link>
        </div>
        {data && !data.success && (
          <div
										data-testid='invalidCredentialsText'
										 className='text-center text-destructive'>{data.message}</div>
        )}
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
