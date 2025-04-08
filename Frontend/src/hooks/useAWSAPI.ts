import { useState } from "react";

const BASE_URL = "http://localhost:3000";

const useAWSAPI = () => {
  const [error, setError] = useState<string | null>(null);

  const getS3Link = async () => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/s3-link`);

      if (!response.ok) {
        throw new Error("Erro ao obter link seguro do S3");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError("Não foi possivel fazer o upload da imagem");
      return null;
    }
  };

  const postFileToS3 = async (file: File) => {
    const s3Link = await getS3Link();

    if (s3Link) {
      try {
        const uploadResponse = await fetch(s3Link.uploadURL, {
          method: "PUT",
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error("Erro ao fazer upload do arquivo");
        }

        return uploadResponse.url.split("?")[0];
      } catch (error) {
        setError("Erro ao fazer upload do arquivo");
        return null;
      }
    }
  };

  return {
    getS3Link,
    postFileToS3,
    error,
  };
};

export default useAWSAPI;
