import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import PasswordComponent from './PasswordComponent';
import { deleteUserApi, getUserApi, logoutUserApi, updateUserApi } from '../helpers/api_helpers';
import { validatePasswordfunction, validateEmail, calculateAgeFromYear } from '../helpers/validationHelpers';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    about: '',
    password: '',
    dateofbirth: ''
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
          password: '',
          dateofbirth: response?.data?.data?.dateofbirth || ''
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate, isEditing]);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'age') {
      if (value !== "" && isNaN(value) || Number(value) < 0 || Number(value) > 100) {
        setMessageText('Please enter a valid age (between 0 and 100)');
      } else {
        setMessageText('');
      }
    }

    if (name === 'dateofbirth' && value) {
      const age = calculateAgeFromYear(value);
      setFormData({
        ...formData,
        [name]: value,
        age: age
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
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
    if (formData.name.length < 2) {
      setMessageText('Please enter a valid name');
      return;
    }
    const value = formData.age;
    if (value !== "" && isNaN(value) || Number(value) < 0 || Number(value) > 100) {
      setMessageText('Please enter a valid age (between 0 and 100)');
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
      if (formData.dateofbirth !== userInfo.dateofbirth) updatedFields.dateofbirth = formData.dateofbirth;

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
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="welcome-text">Welcome, {userInfo?.name || 'User'}</h2>
        {messageText && <div className="warning-text">{messageText}</div>}
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
                <strong>Date of Birth:</strong>
                <input
                  type="date"
                  name="dateofbirth"
                  value={formData.dateofbirth}
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

              <div className="profile-page-buttons">
                <button
                  className="button-red"
                  onClick={handleUpdateProfile}
                  disabled={isSaveButtonDisabled()}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setMessageText('');
                    setValidationFeedback({
                      lengthValid: false,
                      lowercaseValid: false,
                      uppercaseValid: false,
                      numberValid: false,
                      symbolValid: false
                    });
                    setIsEditing(false);
                  }}
                  className="button-green"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p><strong>Email:</strong> {userInfo?.email}</p>
              <p><strong>Age:</strong> {userInfo?.age}</p>
              <p><strong>Gender:</strong> {userInfo?.gender}</p>
              <p><strong>About:</strong> {userInfo?.about || 'No additional information provided.'}</p>
              <p><strong>Date of Birth:</strong> {formatDate(userInfo?.dateofbirth)}</p>
              <p><strong>Account Created:</strong> {formatDate(userInfo?.createdAt)}</p>
              <p><strong>Last Updated:</strong> {formatDate(userInfo?.updatedAt)}</p>
              <div className="edit-buttons">
                <button onClick={() => setIsEditing(true)} className="button-green">Edit Profile</button>
                <button onClick={handleLogout} className="button-lightred">Logout</button>
                <button onClick={() => setShowDeleteConfirm(true)} className="button-red">Delete Account</button>
              </div>
            </>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirmation-div">
          <div className="delete-confirmation-modal">
            <h3 className="delete-modal-h1">Are you sure you want to delete your account?</h3>
            <div className="delete-modal-div">
              <button onClick={handleDeleteAccount} className="button-red">Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="button-green">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
