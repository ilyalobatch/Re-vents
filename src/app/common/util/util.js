export const delay = (miliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
};

export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};
