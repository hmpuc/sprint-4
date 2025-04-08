const useImage = () => {
  const changeImageSize = async (
    image: File,
    w: number,
    h: number,
  ): Promise<File | null> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const imageObj = new Image();
    imageObj.src = URL.createObjectURL(image);

    return new Promise((resolve) => {
      imageObj.onload = () => {
        canvas.width = w;
        canvas.height = h;

        if (ctx) {
          ctx.drawImage(imageObj, 0, 0, w, h);
          canvasToFile(canvas, image.name).then(resolve);
        } else {
          resolve(null);
        }
      };

      imageObj.onerror = () => resolve(null);
    });
  };

  const canvasToFile = (
    canvas: HTMLCanvasElement,
    fileName: string,
  ): Promise<File | null> => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], fileName, { type: "image/jpeg" });
          resolve(file);
        } else {
          resolve(null);
        }
      }, "image/jpeg");
    });
  };

  return { changeImageSize, canvasToFile };
};

export default useImage;
