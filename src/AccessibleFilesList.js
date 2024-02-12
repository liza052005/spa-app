import React, { useState, useEffect } from 'react';

const AccessibleFilesList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Получение списка файлов с доступом пользователя с сервера
    fetch('http://127.0.0.1/api/files')
      .then(response => response.json())
      .then(data => setFiles(data))
      .catch(error => console.error('Ошибка получения списка файлов с доступом:', error));
  }, []);

  const handleDownload = (fileId) => {
    // Отправка запроса на сервер для скачивания файла по его идентификатору (fileId)
  };

  return (
    <div>
      <h2>Список файлов с доступом</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            {file.name} 
            <button onClick={() => handleDownload(file.id)}>Скачать</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessibleFilesList;
