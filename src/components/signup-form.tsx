import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <CardTitle className='text-xl'>Create your account</CardTitle>
          <CardDescription>Enter following details to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <Field className='grid grid-cols-2 gap-4'>
                  <Field>
                    <FieldLabel htmlFor='firstName'>
                      First Name<span className='text-red-600'>*</span>
                    </FieldLabel>
                    <Input id='firstName' type='text' placeholder='John' required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor='lastName'>
                      Last Name<span className='text-red-600'>*</span>
                    </FieldLabel>
                    <Input id='lastName' type='text' placeholder='Doe' required />
                  </Field>
                </Field>
              </Field>
              <Field>
                <Field className='grid grid-cols-2 gap-4'>
                  <Field>
                    <FieldLabel htmlFor='email'>
                      Email<span className='text-red-600'>*</span>
                    </FieldLabel>
                    <Input id='email' type='email' placeholder='m@example.com' required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor='mobileNo'>
                      Mobile No<span className='text-red-600'>*</span>
                    </FieldLabel>
                    <Input id='mobileNo' type='text' placeholder='9642123547' required />
                  </Field>
                </Field>
              </Field>
              <Field>
                <FieldLabel htmlFor='organizationName'>
                  Organization Name<span className='text-red-600'>*</span>
                </FieldLabel>
                <Input
                  id='organizationName'
                  type='text'
                  placeholder='Your Organization Name'
                  required
                />
              </Field>
              <Field>
                <Field className='grid grid-cols-2 gap-4'>
                  <Field>
                    <FieldLabel htmlFor='password'>
                      Password<span className='text-red-600'>*</span>
                    </FieldLabel>
                    <Input id='password' type='password' required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor='confirm-password'>
                      Confirm Password<span className='text-red-600'>*</span>
                    </FieldLabel>
                    <Input id='confirm-password' type='password' required />
                  </Field>
                </Field>
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              </Field>
              <Field>
                <Button type='submit'>Create Account</Button>
                <FieldDescription className='text-center'>
                  Already have an account? <a href='login'>Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
