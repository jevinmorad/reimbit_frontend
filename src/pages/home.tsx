import { Button } from '@/components/ui/button';
import { signOut } from '@/features/auth/context/jwt';
import { useAuthContext } from '@/features/auth/hooks/use-auth-context';

export default function HomePage() {
  const { User, checkUserSession } = useAuthContext();

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Home</h1>
        <Button
          variant='outline'
          onClick={async () => {
            await signOut();
            await checkUserSession?.();
          }}
        >
          Sign out
        </Button>
      </div>
      <div className='mt-4 text-sm text-muted-foreground'>
        {User ? 'Authenticated' : 'No user loaded yet'}
      </div>
    </div>
  );
}
