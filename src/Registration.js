import React, { useState } from 'react';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    if (!formData.username.trim()) {
      validationErrors.username = 'Введите имя пользователя';
    }
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
      // Отправка запроса на сервер для регистрации пользователя
      // Например, используя fetch API
      const response = await fetch('http://127.0.0.1:8000/reg/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              // Добавьте любые другие заголовки, если необходимо
          },
          body: JSON.stringify({
              // Ваше тело запроса, например, данные пользователя для регистрации
              username: 'example',
              password: 'Example123',
              email: 'example@gmail.com',
              first_name: 'example',
              last_name: 'exaample', 
          }),
      });
  
      if (response.ok) {
          // Регистрация прошла успешно, перенаправление на экран входа
          window.location.href = 'http://127.0.0.1:8000/auth';
      } else {
          // Обработка ошибки, если запрос завершился неудачно
          const errorMessage = await response.text();
          throw new Error(`Ошибка регистрации: ${response.status} - ${errorMessage}`);
      }
    } catch (error) {
      // Обработка и вывод ошибки в консоль
      console.error('Ошибка регистрации:', error);
  }
  };

    return (
      <div className="registration-form">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Имя пользователя</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="first_name">Имя</label>
          <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Фамилия</label>
          <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
    )
};

export default Registration;