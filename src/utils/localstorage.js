export const setLocalstorageData = ({ name, data }) => {
  localStorage.setItem(name, data);
};
export const removeLocalstorageData = (name) => {
  localStorage.removeItem(name);
};
export const clearLocalstorage = ({ name, data }) => {
  localStorage.setItem(name, data);
};
