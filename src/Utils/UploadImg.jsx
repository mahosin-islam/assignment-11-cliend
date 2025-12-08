
import axios from "axios";

export const UploadImg = async (profile) => {
  const formData = new FormData();
  formData.append("image", profile);

  const url = `https://api.imgbb.com/1/upload?key=${
    import.meta.env.VITE_IMG_HOST
  }`;

  // 3. Upload image
  const imgRes = await axios.post(url, formData);
  return imgRes.data?.data?.url;
};





