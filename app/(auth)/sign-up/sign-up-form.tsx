'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { signUpDefaultValues } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signUpUser } from '@/lib/actions/users.actions';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

		const searchParams = useSearchParams();
		const callbackUrl = searchParams.get('callbackUrl') || '/' 

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
						  data-testid='signUpButton'
        disabled={pending}
        className='w-full'
        variant='default'>
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    );
  };

  return (
    <form action={action}>
					<input type="hidden" name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            data-testid='nameInput'
            id='name'
            name='name'
            type='text'
            // required
            autoComplete='name'
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            data-testid='emailInput'
            id='email'
            name='email'
            type='input'
            // required
            autoComplete='email'
            defaultValue={signUpDefaultValues.email}
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
            defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
										data-testid='confirmPasswordInput'
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='confirmPassword'
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        <SignUpButton />
        <div className='text-sm text-center text-muted-foreground'>
          Already have an account? {''}
          <Link
            href={'/sign-in'}
            target='_self'
            className='link'>
            Sign In
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

export default SignUpForm;
