import React, { useState } from "react";
import { storage, fs } from "../configuration/config";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Addproduct = () => {
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState('');
  const [image, setImage] = useState(null);

  const [successMsg, setSuccessMsg] = useState('');
  const [uploadError, setUploadError] = useState('');
  const types = ['image/jpeg', 'image/jpg', 'image/png']; 

  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0]; 
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setUploadError('');
      } else {
        setImage(null);
        setUploadError('Please select a valid image file type (png or jpg)');
      }
    } else {
      console.log('Please select your file');
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();

    const uploadTask = storage.ref(`product-images/${image.name}`).put(image); 
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
    }, (error) => setUploadError(error.message), () => {
      storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
        fs.collection('products').add({
          title,
          description,
          price: Number(price),
          url
        }).then(() => {
          setSuccessMsg('Product added successfully');
          settitle('');
          setdescription('');
          setprice('');
          document.getElementById('file').value = '';
          setUploadError('');
          setTimeout(() => {
            setSuccessMsg('');
          }, 3000);
        }).catch(error => setUploadError(error.message));
      });
    });
  };

  return (
    <div className='container'>
  <br />
  <br />
  <h1>Add Products</h1>
  <hr />
  {successMsg && <>
    <div className='success-msg'>{successMsg}</div>
    <br />
  </>}
  <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
    <label>Product Title</label>
    <input type="text" className="form-control" required onChange={(e) => settitle(e.target.value)} value={title} />
    <label>Product Description</label>
    <input type="text" className="form-control" required onChange={(e) => setdescription(e.target.value)} value={description} />
    <label>Product Price</label>
    <input type="text" className="form-control" required onChange={(e) => setprice(e.target.value)} value={price} />
    <label className="input-group">
      Upload Product Image
      <input type="file" id="file" className='custom-file-input' required onChange={handleProductImg} />
    </label>
    {uploadError && <>
      <br />
      <div className='error-msg'>{uploadError}</div>
    </>}
    <br />
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button type="submit" className='btn btn-success btn-md'>
        SUBMIT
      </button>
    </div>
  </form>
  {uploadError &&
    <>
      <br></br>
      <div className='error-msg'>{uploadError}</div>
    </>}
</div>

  );
};












