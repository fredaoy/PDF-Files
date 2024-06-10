import React from 'react'
import {useState, useEffect} from 'react'
import '../CSS/Pdf.css'
import axios from 'axios'

const Pdf = () => {

  const [file, setFile] = useState("")


  // useEffect(() => {
  //   const fetchApiPdf = async () => {
  //     try {
  //       const response = await axios.post("/form-data");
  //       setFile(response.data);
  //     } catch (error) {
  //       console.error("Error fetching cannot send file pdf:", error);
  //     }
  //   };

  //   fetchApiPdf();
  // }, []);
  

  const submitPdf = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    console.log(file)
  }

  return (
    <div className="form-pdf" onSubmit={submitPdf}>
      
        <form action="/pdf-data" method="post">
        <h1>Upload file PDF !</h1>
          <input 
          type="file" 
          name="pdf" 
          id="pdf"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])} />
        <input type="submit" value="Send file" />
        </form>
    </div>
  )
}

export default Pdf