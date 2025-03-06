import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PasswordComponent from './PasswordComponent';
import { deleteUserApi, getUserApi, logoutUserApi, updateUserApi } from '../helpers/api_helpers';
import { validatePasswordfunction, validateEmail } from '../helpers/validationHelpers';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    about: '',
    password: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validationFeedback, setValidationFeedback] = useState({
    lengthValid: false,
    lowercaseValid: false,
    uppercaseValid: false,
    numberValid: false,
    symbolValid: false
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [messageText, setMessageText] = useState(''); 

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await getUserApi();
        setUserInfo(response?.data?.data);
        setFormData({
          name: response?.data?.data?.name || '',
          email: response?.data?.data?.email || '',
          age: response?.data?.data?.age || '',
          about: response?.data?.data?.about || '',
          password: ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate, isEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      if (value !== "" && isNaN(value) || Number(value) < 0 || Number(value) > 100) {
        setMessageText('Please enter a valid age');
      } else {
        setMessageText("");
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      password: value
    }));

    const {
      lengthCheck,
      lowerCaseCheck,
      upperCaseCheck,
      numberCheck,
      symbolCheck,
    } = validatePasswordfunction(value);

    setValidationFeedback({
      lengthValid: lengthCheck,
      lowercaseValid: lowerCaseCheck,
      uppercaseValid: upperCaseCheck,
      numberValid: numberCheck,
      symbolValid: symbolCheck,
    });
  };

  const handleUpdateProfile = async () => {
    const emailIsValid = validateEmail(formData.email);
    if (!emailIsValid) {
      setMessageText('Please enter a valid email');
      return;
    }
    if(formData.name.length<2){
      setMessageText('Please enter a valid name');
      return;
    }

    const passwordIsValid = validatePasswordfunction(formData.password).passwordValid;
    if (formData.password !== '' && !passwordIsValid) {
      setMessageText('Password does not meet the required criteria');
      return;
    }

    try {
      const updatedFields = {};

      if (formData.name !== userInfo.name) updatedFields.name = formData.name;
      if (formData.email !== userInfo.email) updatedFields.email = formData.email;
      if (formData.age !== userInfo.age) updatedFields.age = formData.age;
      if (formData.about !== userInfo.about) updatedFields.about = formData.about;
      if (formData.password !== '') updatedFields.password = formData.password;

      if (Object.keys(updatedFields).length > 0) {
        await updateUserApi(updatedFields);
        setIsEditing(false);
        setMessageText('Profile updated successfully');
      } else {
        setMessageText('No changes detected, nothing to update');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setMessageText('Error updating profile');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logoutUserApi();
      Cookies.remove('token');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserApi();
      Cookies.remove('token');
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const isSaveButtonDisabled = () => {
    const isPasswordEdited = formData.password !== '';
    if (isPasswordEdited) {
      return !(validationFeedback.lengthValid && validationFeedback.lowercaseValid && validationFeedback.uppercaseValid && validationFeedback.numberValid && validationFeedback.symbolValid);
    }
    return false;
  };

  if (!userInfo) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      {/* Show messageText at the top */}
      {messageText && <div className="message-text">{messageText}</div>}

      <div className="profile-card">
        <h2 className="welcome-text">Welcome, {userInfo?.name || 'User'}</h2>
        <div className="user-info">
          {isEditing ? (
            <div className="edit-form">
              <label>
                <strong>Name:</strong>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>Age:</strong>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                <strong>About:</strong>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                />
              </label>

              <PasswordComponent
                passwordVisible={passwordVisible}
                handleChange={handlePasswordChange}
                formData={formData}
                togglePasswordVisibility={togglePasswordVisibility}
                validationFeedback={validationFeedback}
              />

              <div className="edit-buttons">
                <button
                  onClick={handleUpdateProfile}
                  disabled={isSaveButtonDisabled()}
                >
                  Save Changes
                </button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p><strong>Email:</strong> {userInfo?.email}</p>
              <p><strong>Age:</strong> {userInfo?.age}</p>
              <p><strong>About:</strong> {userInfo?.about || 'No additional information provided.'}</p>
              <div className="edit-buttons">
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
                <button onClick={() => setShowDeleteConfirm(true)} className="delete-btn">Delete Account</button>
              </div>
            </>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="confirmation-modal-1">
          <div className="modal-content-1">
            <h3>Are you sure you want to delete your account?</h3>
            <div className="modal-actions-1">
              <button onClick={handleDeleteAccount} className="delete-confirm-1">Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="cancel-1">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
