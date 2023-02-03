import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { useChangePasswordQuery } from '../../redux/auth/auth';
import { Title, Container, Form, Label, Input } from '../../generalStyles.styled'
import {
  Wrap,
  SubmitButton,
} from './ChangePasswordPage.styled';

interface FormValues {
  password: string;
  repeatedPassword: string;
}

const ChangePasswordPage = () => {
  const [skip, setSkip] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
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
    toast.clearWaitingQueue();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ criteriaMode: 'all' });
  return (
    <Wrap>
      <Title>Password reset</Title>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Password
            <Input
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
          </Label>
          <Label>
            Repeat Password
            <Input
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
                  message: 'Maximum number of symbols - 16',
                },
                minLength: {
                  value: 6,
                  message: 'Minimum number of symbols - 6',
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
          </Label>
          <SubmitButton type="submit">Change password</SubmitButton>
        </Form>
      </Container>
    </Wrap>
  );
};

export default ChangePasswordPage;
