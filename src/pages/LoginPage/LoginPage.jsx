import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage } from '@hookform/error-message';
import { useUserLoginMutation } from 'redux/auth/auth';
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
  const [userLogin, { status, data, isError, error }] = useUserLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userEmail = useSelector(({ auth }) => auth.user.email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: 'all' });

  useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(setCredentials(data));
      dispatch(setLoggedIn(true));
      console.log(data);
      toast.success('Login is successfull', {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate('/contacts', { replace: true });
    }
  }, [data, dispatch, navigate, setSkip, status]);

  useEffect(() => {
    if (isError) {
      console.log(error.data.message);
      toast.error(`${error.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [error, isError]);

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
