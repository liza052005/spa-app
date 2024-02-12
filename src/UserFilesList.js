import React, { useState, useEffect } from 'react';

const UserFilesList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Получение списка файлов пользователя с сервера
    fetch('http://127.0.0.1:8000/api/files',{
      headers: {
        authorization: 'Token e6f7037621e2d10a8334de1b5040ca402db293b0'
      }
    })
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(error => console.error('Ошибка получения списка файлов:', error));
  }, []);

  const handleDelete = (fileId) => {
    // Отправка запроса на сервер для удаления файла по его идентификатору (fileId)
    // После успешного удаления файла, обновите список файлов
  };

  const handleEdit = (fileId) => {
    // Перенаправление на экран редактирования файла с передачей идентификатора файла (fileId)
  };

  const handleChangePermissions = (fileId) => {
    // Перенаправление на экран изменения прав доступа для файла с передачей идентификатора файла (fileId)
  };

  const handleDownload = (fileId) => {
    // Отправка запроса на сервер для скачивания файла по его идентификатору (fileId)
  };

  return (
    <div>
      <h2>Список файлов пользователя</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            {file.name} 
            <button onClick={() => handleDelete(file.id)}>Удалить</button>
            <button onClick={() => handleEdit(file.id)}>Редактировать</button>
            <button onClick={() => handleChangePermissions(file.id)}>Изменить права доступа</button>
            <button onClick={() => handleDownload(file.id)}>Скачать</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserFilesList;
