const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image ${src}`));
    image.src = src;
  });
};

export default async (parameters) => {
  let result = "";

  try {
    // Required params
    const { file } = parameters;
    if (!file || !(file instanceof File)) throw new Error("No file provided");

    // Optional params
    const maxWidth = parameters.maxWidth || 500;
    const quality = parameters.quality || 1;

    // Create 2D canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Load the image
    const image = await loadImage(URL.createObjectURL(file));

    const ratio = maxWidth / image.width;

    // When the ratio is lower than 1, the image is larger than it should be and we need to resize it
    // Otherwise, we can just use the original image bounds
    canvas.width = ratio < 1 ? image.width * ratio : image.width;
    canvas.height = ratio < 1 ? image.height * ratio : image.height;

    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data url and return it
    result = canvas.toDataURL("image/jpeg", quality);
  } catch (error) {
    console.error(error);
  } finally {
    return result;
  }
};
