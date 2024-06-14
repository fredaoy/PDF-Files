import React, { useState } from 'react';
import '../CSS/Pdf.css';
import axios from 'axios';

const Pdf = () => {
  const [file, setFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  const submitPdf = async (e) => {
    e.preventDefault();
    if (file && file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('file', file);
      console.log(file)
      // alert("SUCCESS")

      try {
        const res = await axios.post('/form-data', formData, {
          timeout: 5000, // 5 seconds timeout
        });
        
        setResponseData(res.data);
        setError('');
      } catch (err) {
        console.error('Error uploading file:', err);
        setError('Failed to upload file');
      }
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const renderResponseData = (data) => {
    return Object.entries(data).map(([key, value]) => (
      <div key={key} className="response-item">
        <strong>{key}:</strong> <span>{value}</span>
        {/* {alert("สำเร็จแล้ว")} */}
      </div>
    ));
  };

  return (
    <div className="form-pdf">
      <div className="container-form">
      <form onSubmit={submitPdf}>
        <h1>Upload file PDF !</h1>
        <input
          type="file"
          name="pdf"
          id="pdf"
          accept="application/pdf"
          required
          onChange={(e) => {
            setFile(e.target.files[0]);
            setError('');
          }}
        />
        <input type="submit" value="Send file" />
      </form>
      </div>

      {responseData && (
        <div className="response-data">
          <h2>Response Data</h2>
          {renderResponseData(responseData)}
        </div>
      )}

      {error && (
        <div className="error-message">
          <h2>Error message</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Pdf;
