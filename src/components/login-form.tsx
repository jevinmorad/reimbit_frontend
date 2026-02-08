import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

interface LoginFormProps extends React.ComponentProps<'div'> {
  loading?: boolean;
  errorMessage?: string | null;
}

export function LoginForm({ className, loading, errorMessage, ...props }: LoginFormProps) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Welcome back</CardTitle>
          <CardDescription>Login with your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Page-level error from server */}
          {errorMessage && (
            <div style={{ marginBottom: 12 }}>
              {errorMessage}
            </div>
          )}

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='Email'>Email</FieldLabel>
              <Input
                id='Email'
                type='email'
                placeholder='m@example.com'
                required
                {...register('Email')}
              />
              {errors?.Email && (
                <FieldDescription className='text-destructive text-sm'>
                  {String(errors.Email?.message)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <div className='flex items-center'>
                <FieldLabel htmlFor='Password'>Password</FieldLabel>
                <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
                  Forgot your password?
                </a>
              </div>
              <Input id='Password' type='password' required {...register('Password')} />
              {errors?.Password && (
                <FieldDescription className='text-destructive text-sm'>
                  {String(errors.Password?.message)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <Button type='submit' disabled={loading || isSubmitting}>
                {loading || isSubmitting ? 'Signing in...' : 'Login'}
              </Button>
              <FieldDescription className='text-center'>
                Don&apos;t have an account? <a href='sign-up'>Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
}
