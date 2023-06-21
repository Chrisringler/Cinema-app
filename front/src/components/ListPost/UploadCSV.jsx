import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UploadCSV.css'; 

function UploadCSV() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('No se ha seleccionado ningún archivo');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile, selectedFile.name);

      await axios.post('http://localhost:3001/movies/upload', formData);

      alert('Archivo CSV enviado correctamente');
      navigate('/');
    } catch (error) {
      console.error('Error al enviar el archivo CSV', error);
      alert('Ocurrió un error al enviar el archivo CSV');
    }
  };

  return (
    <div class="container">
      <h2>Subir lista de películas</h2>
      <form onSubmit={handleSubmit}>
        <div class="file-input-container">
          <label for="csvFile" class="file-input-label">Seleccionar archivo CSV:</label>
          <input type="file" id="csvFile" accept=".csv" class="file-input" onChange={handleFileSelect} />
        </div>
        <button type="submit" class="button-submit">Enviar</button>
      </form>
    </div>
  )  
}

export default UploadCSV;
