import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { useUserLoginMutation } from 'redux/auth/auth';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';
import { light } from '../../themes';
import {
  Wrap,
  Title,
  Container,
  Form,
  UserLabel,
  UserInput,
  UserButton,
  Notification,
} from './LoginPage.styled';
import { setCredentials } from 'redux/auth/auth-slice';
import { setLoggedIn } from 'redux/auth/logged-slice';

const LoginPage = () => {
  const [userLogin, { status, data, isError }] = useUserLoginMutation();
  const notifyRef = useRef(null);
  const animationTimeOut = useRef(parseInt(light.animationDuration));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector(({ auth }) => auth.user.email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  const onSubmit = formData => {
    const fetchData = { ...formData };
    userLogin(fetchData);
  };

  useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(setCredentials(data));
      dispatch(setLoggedIn(true));
      console.log(data);
      toast.success('Login is successfull');
      navigate('/contacts', { replace: true });
    }
  }, [data, dispatch, navigate, status]);

  console.log(status);

  return (
    <Wrap>
      <CSSTransition
        nodeRef={notifyRef}
        in={isError}
        timeout={animationTimeOut.current}
        classNames="fade"
        unmountOnExit
      >
        <Notification>
          <h3>Wrong email or password</h3>
        </Notification>
      </CSSTransition>
      <Title>Login form</Title>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <UserLabel>
            Email
            <UserInput
              defaultValue={userEmail}
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
          </UserLabel>
          <UserLabel>
            Password
            <UserInput
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
          </UserLabel>
          {errors.exampleRequired && <span>This field is required</span>}
          <UserButton type="submit">Submit</UserButton>
        </Form>
      </Container>
    </Wrap>
  );
};

export default LoginPage;
