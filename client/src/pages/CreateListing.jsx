import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

function CreateListing() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {
    if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < images.length; i++) {
        promises.push(storeImage(images[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image Upload faild 2MB per image.");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 image per image.");
      setUploading(false);
    }
  };

  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storege = getStorage(app);
      const fileName = new Date().getTime() + "-" + image.name;
      const storageRef = ref(storege, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = async (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index)
    });
  }

  return (
    <div className="p-3 max-w-2xl mx-auto">
      <h1 className="text-center text-3xl font-semibold my-5">
        Create Listing
      </h1>
      <form className="flex flex-col gap-3 ">
        <input
          type="text"
          id="name"
          className="p-3 rounded-md focus:outline-none"
          placeholder="Name"
          required
        />
        <input
          type="text"
          id="description"
          className="p-3 rounded-md focus:outline-none"
          placeholder="Description"
          required
        />
        <input
          type="text"
          id="address"
          className="p-3 rounded-md focus:outline-none"
          placeholder="Address"
          required
        />
        <div className="p-3">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col gap-4">
              <p className="font-semibold">Type:</p>
              <div className="flex gap-4 pb-3">
                <div className="flex gap-2">
                  <input type="radio" id="sell" name="type" className="w-4" />
                  <span>Sell</span>
                </div>
                <div className="flex gap-2">
                  <input type="radio" id="rent" name="type" className="w-4" />
                  <span>Rent</span>
                </div>
              </div>

              <div className="flex gap-2 font-semibold">
                <span>Parking Spot</span>
                <input className="w-4" type="checkbox" id="parking" />
              </div>

              <div className="flex gap-2 font-semibold">
                <span>Furnished</span>
                <input className="w-4" type="checkbox" id="parking" />
              </div>

              <div className="flex gap-2 font-semibold">
                <span>Offer</span>
                <input className="w-4" type="checkbox" id="parking" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span>Number of Bedrooms * :</span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  id="bedrooms"
                  className=" p-1 rounded-sm focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-2 items-center">
                <span>Number of Bathrooms * :</span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  id="bathrooms"
                  className=" p-1 rounded-sm focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-2 items-center">
                <span>Regular Price * :</span>
                <input
                  type="number"
                  min="0"
                  id="regularPrice"
                  className=" p-1 rounded-sm focus:outline-none max-w-24"
                  required
                />
              </div>

              <div className="flex gap-2 items-center">
                <span>Discounted Price * :</span>
                <input
                  type="number"
                  min="0"
                  id="discountPrice"
                  className=" p-1 rounded-sm focus:outline-none max-w-24"
                  required
                />
              </div>
            </div>
          </div>

          <div className="py-5">
            <p>
              <span className="font-semibold">Image: </span>The file image will
              be cover and max 6 images.
            </p>
            <div className="items-center">
              <input
                onChange={(e) => setImages(e.target.files)}
                type="file"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                disabled={uploading}
                type="button"
                onClick={handleImageSubmit}
                className="border-2 rounded-md p-2 text-green-800 hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
              {imageUploadError && (
                <p className="text-red-700">{imageUploadError}</p>
              )}
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, index) => {
                  return (
                    <div
                      className="p-3 flex justify-between items-center border"
                      key={url}
                    >
                      <img
                        src={url}
                        alt="listing url"
                        className="w-24 h-24 object-contain rounded-lg"
                      />
                      <button onClick={() => handleRemoveImage(index)} type="button" className="text-red-700 rounded-md p-3">
                        Delete
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <button className=" text-center bg-emerald-800 text-white rounded-md p-3 font-semibold hover:opacity-90 disabled:opacity-75">
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
