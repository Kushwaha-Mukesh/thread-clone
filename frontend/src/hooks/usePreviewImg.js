import { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const showToast = useShowToast();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Invalid file type", "Please select an image file", "error");
      setImageUrl(null);
      setImageFile(null);
    }
  };
  return { handleImageChange, imageUrl, imageFile, setImageUrl, setImageFile };
};

export default usePreviewImg;
