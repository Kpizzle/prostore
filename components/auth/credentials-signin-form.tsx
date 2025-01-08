'use client'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { signInDefaultValues } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signInWithCredentials } from '@/lib/actions/users.actions';
import { useActionState,  } from 'react';
import { useFormState } from 'react-dom';

const CredentialsSignInForm = () => {


	const [data, action] = useActionState(signInWithCredentials, {
		success: false,
		message: ''
	});

  return (
    <form action={action}>
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
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
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
												defaultValue={signInDefaultValues.password}
          />
        </div>
								<Button className ='w-full' variant={'default'}>Sign In</Button>
								<div className='text-sm text-center text-muted-foreground'>Don&apos;t have an account? {''}
									<Link href={'/sign-up'} target='_self' className='link'>Sign Up</Link>
								</div>
								{ data && !data.success && (
									<div className="text-center text-destructive">{data.message}</div>
								)}
      </div>
    </form>
  );
};

export default CredentialsSignInForm;