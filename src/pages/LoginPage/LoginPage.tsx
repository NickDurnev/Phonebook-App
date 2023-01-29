import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { CSSTransition } from 'react-transition-group';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import {
  useUserLoginMutation,
  useVerifyEmailQuery,
  useSendVerifyEmailQuery,
} from '../../redux/auth/auth';
import { setCredentials, setVerify } from '../../redux/auth/auth-slice';
import { setLoggedIn } from '../../redux/auth/logged-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkQueryHooks';
import { isErrorWithMessage } from '../../services/helpers';
import { light } from '../../config/themes';
import IconButton from '../../components/IconButton';
import Button from '../../components/Button';
import {
  Wrap,
  StyledTitle,
  StyledContainer,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledLink,
} from './LoginPage.styled';
import {
  OffVisibleIcon,
  OnVisibleIcon,
} from '../RegistrationPage/RegistrationPage.styled';

interface FormValues {
  email: string;
  password: string;
}


const LoginPage = () => {
  const [skipVerify, setSkipVerify] = useState<boolean>(true);
  const [skipVerifyEmailSent, setSkipVerifyEmailSent] = useState<boolean>(true);
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const [isVerifyButton, setIsVerifyButton] = useState<boolean>(false);

  const animationTimeOut = useRef<number>(parseInt(light.animationDuration));
  const buttonRef = useRef<HTMLButtonElement>(null);

  const params = useParams();
  const verificationToken = params.verificationToken!;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, verify } = useAppSelector(({ rootReducer }) => rootReducer.auth.user);

  const [userLogin, { data, isSuccess, error }] =
    useUserLoginMutation();

  const verifyEmailQuery = useVerifyEmailQuery(verificationToken, {
    skip: skipVerify,
  });

  const sendVerifyEmailQuery = useSendVerifyEmailQuery(email, {
    skip: skipVerifyEmailSent,
  });

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

  useEffect(() => {
    if (verificationToken !== 'null') {
      setSkipVerify(false);
    }
    if (!verify) {
      //TODO Fix - button should appearance in timeout if user didn't verify and disappear after click for a while
      setTimeout(() => {
        setIsVerifyButton(true);
      }, 10000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCredentials(data));
      dispatch(setLoggedIn(true));
      navigate('/contacts', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, isSuccess, error]);

  if (verifyEmailQuery.isSuccess) {
    setSkipVerify(true);
    dispatch(setVerify(true));
    toast.success('Verification success');
    toast.clearWaitingQueue();
  }

  if (sendVerifyEmailQuery.isSuccess) {
    setSkipVerifyEmailSent(true);
    toast.info('Check your email for the verification letter');
    toast.clearWaitingQueue();
  }

  const onSubmit: SubmitHandler<FormValues> = data => {
    const fetchData = { ...data };
    userLogin(fetchData);
    if (isErrorWithMessage(error)) {
      toast.error(`${error.message}`);
      toast.clearWaitingQueue();
    }
  };

  const onButton = () => {
    setSkipVerifyEmailSent(false);
    setIsVerifyButton(false);
  };

  return (
    <Wrap>
      <CSSTransition
        nodeRef={buttonRef}
        in={isVerifyButton}
        timeout={animationTimeOut.current}
        classNames="fade"
        unmountOnExit
      >
        <Button padding={'10px'} onClick={() => onButton()} ref={buttonRef}>
          Send verify email
        </Button>
      </CSSTransition>
      <StyledTitle>Login form</StyledTitle>
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledLabel>
            Email
            <StyledInput
              defaultValue={email}
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
          <StyledLabel>
            Password
            <IconButton width="8%">
              {isVisiblePassword ? (
                <OnVisibleIcon onClick={toggleVisibility} />
              ) : (
                <OffVisibleIcon onClick={toggleVisibility} />
              )}
            </IconButton>
            <StyledInput
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
          </StyledLabel>
          {(errors.email || errors.password) && <span>This field is required</span>}
          <div>
            <StyledLink to="/password">Forgot password</StyledLink>
            <StyledButton type="submit">Submit</StyledButton>
          </div>
        </StyledForm>
      </StyledContainer>
    </Wrap>
  );
};

export default LoginPage;
