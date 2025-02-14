import Link from 'next/link';
import { auth } from '@/auth';
import { signOutUser } from '@/lib/actions/users.actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserIcon } from 'lucide-react';

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button
        asChild
        data-testid='signInButton'>
        <Link href='/sign-in'>
          <UserIcon /> Sign In
        </Link>
      </Button>
    );
  }

  const firstInital = session.user?.name?.charAt(0).toLocaleUpperCase() ?? 'U';

  return (
    <div className='flex gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger data-testid='userProfileDropdown' asChild>
          <div className='flex items-center'>
            <Button
              
              variant='ghost'
              className='relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200'>
              {firstInital}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='w-56'
          align='end'
          forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <div data-testid='userFirstName' className='text-sm font-medium leading-none'>
                {session.user?.name}
              </div>
              <div data-testid='userEmail' className='text-sm text-muted-foreground leading-none'>
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className='p-0 mb-1'>
            <form
              action={signOutUser}
              className='w-full'>
              <Button
														data-testid="signOutButton"
                className='w-full py-4 px-2 h-4 justify-start'
                variant='ghost'>
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
