import axios from 'axios';

const registerUser = async (formData) => {
  try {
    const url = `${import.meta.env.VITE_USER_REGISTRATION_BACKEND}/api/v1/register`;
    const response = await axios.post(url, formData, { withCredentials: true });
    alert('User registered successfully!');
    return response;
  } catch (error) {
    alert('Error registering user: ' + error.message);
    throw error;
  }
};

export default registerUser;
