import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { useUserSignupMutation } from '../../redux/auth/auth';
import { setRegistrationCredentials } from '../../redux/auth/auth-slice';
import IconButton from '../../components/IconButton';
import { Title, Container, Input } from '../../generalStyles.styled'
import {
  Wrap,
  StyledForm,
  StyledLabel,
  OnVisibleIcon,
  OffVisibleIcon,
  Button,
} from './RegistrationPage.styled';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegistrationPage = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [userSignup, { isSuccess, data }] = useUserSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ criteriaMode: 'all' });

  const toggleVisibility = () => {
    isVisiblePassword
      ? setIsVisiblePassword(false)
      : setIsVisiblePassword(true);
  };

  const onSubmit: SubmitHandler<FormValues> = data => {
    const fetchData = { ...data };
    userSignup(fetchData);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setRegistrationCredentials(data));
      toast.info('Check your email for the verification letter');
      toast.clearWaitingQueue();
      navigate('/login/null', { replace: true });
    }
  }, [data, dispatch, navigate, isSuccess]);

  return (
    <Wrap>
      <Title>Registration</Title>
      <Container>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledLabel>
            Name
            <Input
              {...register('name', {
                required: 'Name is required.',
                pattern: /[A-Za-z]{3}/,
                minLength: {
                  value: 3, message: 'Minimum number of symbols - 3',
                },
                maxLength: {
                  value: 25,
                  message: 'Maximum number of symbols - 25',
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </StyledLabel>
          <StyledLabel>
            Email
            <Input
              {...register('email', {
                required: 'Email is required.',
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                maxLength: {
                  value: 30,
                  message: 'Maximum number of symbols - 30',
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
          <StyledLabel>
            Password
            <IconButton width="8%">
              {isVisiblePassword ? (
                <OnVisibleIcon onClick={toggleVisibility} />
              ) : (
                <OffVisibleIcon onClick={toggleVisibility} />
              )}
            </IconButton>
            <Input
              type={isVisiblePassword ? 'text' : 'password'}
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
              name="password"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type}>{message}</p>
                ))
              }
            />
          </StyledLabel>
          <Button type="submit">REGISTER</Button>
        </StyledForm>
      </Container>
    </Wrap>
  );
};

export default RegistrationPage;
