import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { publicRequest } from '../requestMethods';
import { mq } from '../responsive';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 100px);
  padding: 40px 0;
  background: url('/images/clothes-hanging.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 16px;
  width: calc(100% - 40px);
  background: white;
  ${mq({ width: '540px' }, 600)}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin: 8px 0;
`;

const InputContainer = styled.div`
  flex: auto;
`;

const Label = styled.label`
  display: block;
  padding: 8px 0;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
`;

const Helper = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 8px;
`;

const Agreement = styled.p`
  font-size: 12px;
  padding: 8px 0;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 12px 16px;
  background: #319795;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  ${mq({ width: '40%' })}
  &:disabled {
    opacity: 0.6;
  }
`;

const Linkk = styled(Link)`
  margin: 8px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const ErrorText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: red;
  width: 100%;
`;

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errorServer, setErrorServer] = useState('');
  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorServer('');
    const registerUser = async () => {
      try {
        await publicRequest.post('/auth/register', {
          username: form.username,
          email: form.email,
          password: form.password,
        });
        navigate('/login', { state: { form } });
      } catch (err) {
        console.error(err);
        setErrorServer(
          'Error creating your account. Pick another username and/or email.'
        );
      }
    };
    registerUser();
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Register</Title>
          {/* TODO: add registration to server!! api/auth/register */}
          <Form onSubmit={handleRegister}>
            <InputContainer>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={form.name}
                onChange={handleForm}
                minLength="3"
              />
              <Helper>{form.name.length < 3 && 'Name length < 3'}</Helper>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last name"
                value={form.lastname}
                onChange={handleForm}
                minLength="3"
              />
              <Helper>
                {form.lastname.length < 3 && 'Last name length < 3'}
              </Helper>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={form.username}
                onChange={handleForm}
                minLength="3"
              />
              <Helper>
                {form.username.length < 3 && 'Username length < 3'}
              </Helper>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={handleForm}
              />
              <Helper>
                {(!form.email.includes('@') || !form.email.includes('.')) &&
                  'Must be an email'}
              </Helper>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleForm}
                minLength="6"
              />
              <Helper>
                {form.password.length < 6 && 'Password length < 6'}
              </Helper>
            </InputContainer>
            <InputContainer>
              <Label htmlFor="password2">Confirm password</Label>
              <Input
                type="password"
                name="password2"
                id="password2"
                placeholder="Confirm password"
                value={form.password2}
                onChange={handleForm}
                minLength="6"
              />
              <Helper>
                {form.password !== form.password2 && 'Passwords must match'}
              </Helper>
            </InputContainer>

            <Agreement>
              I agree to everything by creating an account in accordance to the
              privacy policy.
            </Agreement>

            <Button
              disabled={
                form.name.length >= 3 &&
                form.lastname.length >= 3 &&
                form.username.length >= 3 &&
                form.email.includes('@') &&
                form.email.includes('.') &&
                form.password.length >= 6 &&
                form.password === form.password2
                  ? false
                  : true
              }>
              Register
            </Button>

            {errorServer !== '' && <ErrorText>{errorServer}</ErrorText>}

            <Linkk to="/login">I already have an account</Linkk>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
