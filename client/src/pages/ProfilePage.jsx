import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

// //firebase storege info
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if 
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*');
//     }
//   }
// }

function ProfilePage() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState("");
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = async (file) => {
    if (file.size > 2 * 1024 * 1024 || !file.type.startsWith("image/")) {
      setFileUploadError("File should be less than 2MB and only image.");
      return;
    }

    setFileUploadError("");

    const storage=getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError("Error uploading the file.");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({...formData, avatar: downloadURL});
      });
    },
  );
  };

  const handleChange = (e)=>{
    const {id, value} = e.target;
    setFormData({...formData, [id]: value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === false){
        return dispatch(updateUserFailure(data.message));        
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () =>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        return dispatch(deleteUserFailure(data.message));        
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center p-7">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(e)=>setFile(e.target.files[0])} 
          type="file" ref={fileRef} 
          hidden accept="image/*"
        />
        <img onClick={()=> fileRef.current.click()} 
          src={formData.avatar || currentUser.avatar} 
          alt="profile photo" 
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center m-3"
        />
        {fileUploadError && <span className=" text-center text-red-600">{fileUploadError}</span>}
        {filePerc > 0 && filePerc < 100 && <span className=" text-center text-emerald-600">{`Uploading... ${filePerc}%`}</span>}
        {filePerc === 100 && fileUploadError === false && <span className=" text-center text-emerald-600">Profile Image Successfuly Uploaded!</span>}
        <input
          onChange={handleChange}
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          id="username"
          className="p-3 border rounded-md focus:outline-none"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          id="email"
          className="p-3 border rounded-md focus:outline-none"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 border rounded-md focus:outline-none"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-emerald-600 text-white rounded-md uppercase p-3 font-semibold hover:opacity-90 disabled:opacity-75"
        >
          {loading ? "Loading..." : "Update"}
        </button>        
      </form>
      
      <div className="flex justify-between my-4">
        <span onClick={handleDeleteUser} className="text-red-600 cursor-pointer font-semibold">Delete accoute</span>
        <span className="text-red-600 cursor-pointer font-semibold">Logout</span>
      </div>
      
      {error && <p className="text-red-500 mt-6">{error}</p>}
      {updateSuccess && (<p className="text-green-500 mt-6">Profile successfully updated!</p>)}
    </div>
  );
}

export default ProfilePage;
