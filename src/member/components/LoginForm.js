import React from 'react';
import styled from 'styled-components';
import { MediumButton } from '../../global/components/Buttons';
import color from '../../global/styles/color';
import fontsize from '../../global/styles/fontsize';
import LoginContainer from '../containers/LoginContainer';
import MessageBox from '../../global/components/MessageBox';

const { dark } = color;
const { medium } = fontsize;
const StyledForm = styled.form`
  min-width: 280px;
  max-width: 450px;
  width: 100%;
  margin: 200px auto 0;
  input {
    border: 1px solid ${dark};
    width: 100%;
    height: 55px;
    display: block;
    font-size: ${medium};
    border-radius: 3px;
    text-align: center;
    + input {
      margin-top: 10px;
    }
  }
  button {
    margin-top: 30px;
  }
`;
const LoginForm = ({ form, onChange, onSubmit, errors }) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off" errors={errors}>
      <input
        type="text"
        placeholder="이메일"
        name="email"
        value={form.email ?? ''}
        onChange={onChange}
      />
      <MessageBox items={errors.email}></MessageBox>
      <input
        type="password"
        placeholder="비밀번호"
        name="password"
        value={form.password ?? ''}
        onChange={onChange}
      />
      <MessageBox items={errors.email}></MessageBox>
      <MediumButton type="submit" width="100%">
        로그인
      </MediumButton>
    </StyledForm>
  );
};

export default React.memo(LoginForm);
