export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };
  
  export const validatePasswordfunction = (password) => {
    const lengthCheck = password.length >= 10;
    const lowerCaseCheck = /[a-z]/.test(password);
    const upperCaseCheck = /[A-Z]/.test(password);
    const numberCheck = /\d/.test(password);
    const symbolCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    return {
      lengthCheck,
      lowerCaseCheck,
      upperCaseCheck,
      numberCheck,
      symbolCheck,
      passwordValid: lengthCheck && lowerCaseCheck && upperCaseCheck && numberCheck && symbolCheck,
    };
  };
  