import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useResetPasswordQuery } from '../../redux/auth/auth';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {
  Wrap,
  StyledTitle,
  StyledContainer,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
} from './ForgotPasswordPage.styled';

interface FormValues {
  email: string;
}

const ForgotPasswordPage = () => {
  const [skip, setSkip] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const { data, isSuccess } = useResetPasswordQuery(email, { skip });

  const onSubmit: SubmitHandler<FormValues> = ({ email }: { email: string }) => {
    setEmail(email);
    setSkip(false);
    setTimeout(() => {
      setEmail('');
    }, 60000);
  };

  if (isSuccess && email) {
    toast.success(`${data.message}`);
    toast.clearWaitingQueue();
    setEmail('');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ criteriaMode: 'all' });
  return (
    <Wrap>
      <StyledTitle>Password reset</StyledTitle>
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledLabel>
            Email
            <StyledInput
              {...register('email', {
                required: 'Email is required.',
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                maxLength: {
                  value: 30,
                  message: 'This input exceed maxLength.',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </StyledLabel>
          {errors.email && <span>This field is required</span>}
          {email ? (
            <p>Check your email</p>
          ) : (
            <StyledButton type="submit">Send email</StyledButton>
          )}
        </StyledForm>
      </StyledContainer>
    </Wrap>
  );
};

export default ForgotPasswordPage;
