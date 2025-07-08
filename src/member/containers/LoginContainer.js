import React, { useCallback, useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginContainer = () => {
  const [form, setFrom] = useState({});
  const [errors, setErrors] = useState({});
  const onChange = useCallback((e) => {
    setFrom((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const errors = {};
      let hasErrors = false;
      const requiredFields = {
        email: '이메일을 입력하세요',
        password: '비밀번호를 입력하세요',
      };
      for (const [field, message] of Object.entries(requiredFields)) {
        if (form[field] || !form[field]?.trim()) {
          errors[field] = message;
          hasErrors = true;
        }
      }
      setErrors(errors);
      if (hasErrors) {
        return;
      }
    },
    [form],
  );
  return (
    <LoginForm
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};

export default React.memo(LoginContainer);
