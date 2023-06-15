export const delay = (miliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
};
