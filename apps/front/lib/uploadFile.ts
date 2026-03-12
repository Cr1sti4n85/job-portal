const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/auto/upload`;

const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "job-portal");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.url;
};

export default uploadFile;
