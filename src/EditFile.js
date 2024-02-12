import React, { useState } from 'react';

const EditFile = ({ fileId, initialName, onSave }) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Валидация данных формы
    if (!name.trim()) {
      setError('Введите имя файла');
      return;
    }

    try {
      // Отправка запроса на сервер для обновления имени файла
      await fetch(`http://example.com/api/files/${fileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      // Вызов callback-функции для обновления списка файлов после успешного сохранения изменений
      onSave();
    } catch (error) {
      console.error('Ошибка сохранения изменений файла:', error);
    }
  };

  return (
    <div>
      <h2>Редактирование файла</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Новое имя файла:</label>
          <input
            type="text"
            value={name}
            onChange={handleChange}
          />
          {error && <span style={{ color: 'red' }}>{error}</span>}
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default EditFile;
