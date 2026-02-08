import { FormProvider, type SubmitHandler, type UseFormReturn, type FieldValues } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props<T extends FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: Promise<void> | ((data: T) => void) | SubmitHandler<T>;
};

export default function Form<T extends FieldValues>({ children, methods, onSubmit }: Props<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit as SubmitHandler<T>) : undefined}>
        {children}
      </form>
    </FormProvider>
  );
}
