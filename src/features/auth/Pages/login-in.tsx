import { schemaUtils } from '@/components/hook-form/schema-utils';
import { LoginForm } from '@/components/login-form';
import { getErrorMessage } from '@/utils/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { login } from '../context/jwt';

import { Form } from '@/components/hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/use-auth-context';

export const LoginSchema = z.object({
  Email: schemaUtils.email(),
  Password: z
    .string({ error: 'Password is required' })
    .min(6, { error: 'Password must be at least 6 characters!' })
    .trim(),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function Page() {
  const navigate = useNavigate();
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { Email: '', Password: '' },
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { checkUserSession } = useAuthContext();

  const onSubmit = async (values: LoginFormValues) => {
    setErrorMessage(null);
    try {
      await login({ email: values.Email, password: values.Password });
      await checkUserSession?.();
      navigate('/');
    } catch (err: unknown) {
      setErrorMessage(getErrorMessage(err) || 'Login failed');
    }
  };

  return (
    <>
      <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
        <div className='w-full max-w-sm'>
          <Form methods={methods} onSubmit={onSubmit}>
            <LoginForm loading={methods.formState.isSubmitting} errorMessage={errorMessage} />
          </Form>
        </div>
      </div>
    </>
  );
}
