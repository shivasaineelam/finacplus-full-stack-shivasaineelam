import axios from "axios";

export const loginUserApi = async (formData) => {
  try {
    const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/api/v1/login`;
    const response = await axios.post(url, formData, { withCredentials: true });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerUserApi = async (formData) => {
  try {
    const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/api/v1/register`;
    const response = await axios.post(url, formData, { withCredentials: true });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logoutUserApi = async () => {
  try {
    const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/api/v1/logout`;
    await axios.post(url, {}, { withCredentials: true });
  } catch (error) {
    return error;
  }
};

export const deleteUserApi = async () => {
  try {
    const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/api/v1/delete`;
    await axios.delete(url, { withCredentials: true });
  } catch (error) {
    return error;
  }
};

export const updateUserApi = async (updatedFields) => {
  try {
    const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/api/v1/update`;
    await axios.patch(url, updatedFields, { withCredentials: true });
  } catch (error) {
    return error;
  }
};

export const getUserApi = async () => {
  try {
    const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/api/v1/user`;
    const response = await axios.get(url, { withCredentials: true });
    return response;
  } catch (error) {
    return error;
  }
};
