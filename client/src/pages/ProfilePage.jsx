import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

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
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = async (file) => {
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
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({...formData, avatar: downloadURL});
      });
    },
  );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center p-7">Profile</h1>

      <form className="flex flex-col gap-3">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/.*"/>
        <img onClick={()=> fileRef.current.click()} 
          src={formData.avatar || currentUser.avatar} alt="profile photo" 
          className="rounded-full w-24 h-24 object-cover cursor-pointer self-center m-3"
        />
        {fileUploadError && <span className=" text-center text-red-600">File upload error file should be less than 2MB and only image</span>}
        {filePerc > 0 && filePerc < 100 && <span className=" text-center text-emerald-600">{`Uploading... ${filePerc}%`}</span>}
        {filePerc === 100 && fileUploadError === false && <span className=" text-center text-emerald-600">Profile Image Successfuly Uploaded!</span>}
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="p-3 border rounded-md focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 border rounded-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 border rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white rounded-md uppercase p-3 font-semibold hover:opacity-90 disabled:opacity-75"
        >
          Update Profile
        </button>
      </form>

      <div className="flex justify-between my-4">
        <span className="text-red-600 cursor-pointer font-semibold">Delete accoute</span>
        <span className="text-red-600 cursor-pointer font-semibold">Logout</span>
      </div>
    </div>
  );
}

export default ProfilePage;
