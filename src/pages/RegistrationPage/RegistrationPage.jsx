import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { useUserSignupMutation } from '../../redux/auth/auth';
import { setCredentials } from '../../redux/auth/auth-slice';
import IconButton from '../../components/IconButton';
import {
  Wrap,
  Title,
  Container,
  Form,
  Label,
  Input,
  OnVisibleIcon,
  OffVisibleIcon,
  Button,
} from './RegistrationPage.styled';

const RegistrationPage = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [userSignup, { isSuccess, data }] = useUserSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const toggleVisibility = () => {
    isVisiblePassword
      ? setIsVisiblePassword(false)
      : setIsVisiblePassword(true);
  };

  const onSubmit = formData => {
    const fetchData = { ...formData };
    userSignup(fetchData);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      toast.info('Check your email for the verification letter');
      toast.clearWaitingQueue();
      navigate('/login/null', { replace: true });
    }
  }, [data, dispatch, navigate, isSuccess]);

  return (
    <Wrap>
      <Title>Registration form</Title>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Name
            <Input
              {...register('name', {
                required: 'Name is required.',
                pattern: /[A-Za-z]{3}/,
                minLength: { value: 3 },
                maxLength: {
                  value: 25,
                  message: 'This input exceed maxLength.',
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
          </Label>
          <Label>
            Email
            <Input
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
          </Label>
          <Label>
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
          {errors.exampleRequired && <span>This field is required</span>}
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </Wrap>
  );
};

export default RegistrationPage;
