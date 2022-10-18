import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { useUserLoginMutation, useVerifyEmailQuery } from 'redux/auth/auth';
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
  StyledLink,
} from './LoginPage.styled';
import { setCredentials } from 'redux/auth/auth-slice';
import { setLoggedIn } from 'redux/auth/logged-slice';

const LoginPage = ({ setSkip }) => {
  const [skipVerify, setSkipVerify] = useState(true);
  const { verifyToken } = useParams();
  const [userLogin, { data, isError, isSuccess, error }] =
    useUserLoginMutation();
  const verifyEmailQuery = useVerifyEmailQuery(verifyToken, {
    skip: skipVerify,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector(({ auth }) => auth.user.email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  useEffect(() => {
    if (verifyToken !== 'null') {
      setSkipVerify(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (verifyEmailQuery.isSuccess) {
    setSkipVerify(true);
    toast.success('Verification success');
    toast.clearWaitingQueue();
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      dispatch(setLoggedIn(true));
      navigate('/contacts', { replace: true });
    }
    if (isError) {
      console.log(error.data.message);
      toast.error(`${error.data.message}`);
      toast.clearWaitingQueue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, setSkip, isSuccess, isError]);

  const onSubmit = formData => {
    const fetchData = { ...formData };
    userLogin(fetchData);
    setSkip();
  };

  return (
    <Wrap>
      <StyledTitle>Login form</StyledTitle>
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledLabel>
            Email
            <StyledInput
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
          </StyledLabel>
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
          {errors.exampleRequired && <span>This field is required</span>}
          <div>
            <StyledLink to="/password">Forgot password</StyledLink>
            <StyledButton type="submit">Submit</StyledButton>
          </div>
        </StyledForm>
      </StyledContainer>
    </Wrap>
  );
};

LoginPage.propTypes = {
  setSkip: PropTypes.func.isRequired,
};

export default LoginPage;
