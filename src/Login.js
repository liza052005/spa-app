import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Валидация данных формы
    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = 'Введите адрес электронной почты';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Введите пароль';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      const response = await fetch('http://127.0.0.1:8000/auth', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Добавьте любые другие заголовки, если необходимо
          },
          body: JSON.stringify({
              // Ваше тело запроса, например, данные пользователя для регистрации
              password: 'Example123',
              email: 'example@gmail.com',
          }),
      });
  
      if (response.ok) {
          // Регистрация прошла успешно, перенаправление на экран входа
          window.location.href = 'http://127.0.0.1:8000/api/files';
      } else {
          // Обработка ошибки, если запрос завершился неудачно
          const errorMessage = await response.text();
          throw new Error(`Ошибка auth: ${response.status} - ${errorMessage}`);
      }
    } catch (error) {
      console.error('Ошибка аутентификации:', error);
    }
  };

  return (
    <div>
      <h2>Вход в систему</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Адрес электронной почты:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
