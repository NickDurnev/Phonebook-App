import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { useChangePasswordQuery } from '../../redux/auth/auth';
import {
  Wrap,
  StyledTitle,
  StyledContainer,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
} from './ChangePasswordPage.styled';

interface FormValues {
  password: string;
  repeatedPassword: string;
}

const ChangePasswordPage = () => {
  const [skip, setSkip] = useState(true);
  const [password, setPassword] = useState('');
  const params = useParams();
  const resetPasswordToken = params.resetPasswordToken!;
  const navigate = useNavigate();
  const { data, isSuccess } = useChangePasswordQuery(
    { password, resetPasswordToken },
    { skip }
  );

  const onSubmit: SubmitHandler<FormValues> = ({
    password,
    repeatedPassword,
  }) => {
    if (password !== repeatedPassword) {
      toast.error('Passwords has to match');
      return;
    }
    setPassword(password);
    setSkip(false);
  };

  if (isSuccess) {
    navigate('/login', { replace: true });
    toast.success(`${data.message}`);
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
            Password
            <StyledInput
              type="password"
              {...register('password', {
                required: 'Password is required.',
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  message:
                    'Your password should contain one number and one special character.',
                },
                maxLength: {
                  value: 16,
                  message: 'This input exceed maxLength.',
                },
                minLength: {
                  value: 6,
                  message: 'This input exceed maxLength.',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </StyledLabel>
          <StyledLabel>
            Repeat Password
            <StyledInput
              type="password"
              {...register('repeatedPassword', {
                required: 'Repeat your password',
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  message:
                    'Your password should contain one number and one special character.',
                },
                maxLength: {
                  value: 16,
                  message: 'This input exceed maxLength.',
                },
                minLength: {
                  value: 6,
                  message: 'This input exceed maxLength.',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="repeatedPassword"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </StyledLabel>
          {(errors.password || errors.repeatedPassword) && (
            <span>This field is required</span>
          )}
          <StyledButton type="submit">Change password</StyledButton>
        </StyledForm>
      </StyledContainer>
    </Wrap>
  );
};

export default ChangePasswordPage;
