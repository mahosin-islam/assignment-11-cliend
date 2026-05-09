import axios from "axios";

export const UploadImg = async (imageFile) => {
const apiKey = "6acfef0a8898fa69d23ef4c70d549dff"; 

console.log("API:", apiKey);;

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    const imgRes = await axios.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    return imgRes.data.data.url;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};