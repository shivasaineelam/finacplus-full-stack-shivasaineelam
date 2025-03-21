import ClosedEyeIcon from "../assets/icons/ClosedEye"
import OpenEyeIcon from "../assets/icons/OpenEye"

const PasswordComponent = ({passwordVisible,handleChange,formData,togglePasswordVisibility,validationFeedback}) => {
  return (
    <div className="password-container">
              <div className='password-box-1'>
                <input 
                  type={passwordVisible ? "text" : "password"}  
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Password" 
                  required 
                  minLength="10" 
                />
                <span 
                  className="eye-icon" 
                  onClick={()=>togglePasswordVisibility()} 
                  style={{ cursor: 'pointer',color:'black' }}
                >
                {passwordVisible ? (
                  <ClosedEyeIcon  width="24" height="24"/>
                ) : (
                  <OpenEyeIcon width="24" height="24" />
                )}
                </span>
              </div>

              <div className="password">
                <span className={`password-element ${validationFeedback.lengthValid ? "password-valid" : "password-invalid"}`}>
                  Password must be at least 10 characters.
                </span>
                <span className={`password-element ${validationFeedback.lowercaseValid ? "password-valid" : "password-invalid"}`}>
                  Password must include at least one lowercase letter.
                </span>
                <span className={`password-element ${validationFeedback.uppercaseValid ? "password-valid" : "password-invalid"}`}>
                  Password must include at least one uppercase letter.
                </span>
                <span className={`password-element ${validationFeedback.numberValid ? "password-valid" : "password-invalid"}`}>
                  Password must include at least one number.
                </span>
                <span className={`password-element ${validationFeedback.symbolValid ? "password-valid" : "password-invalid"}`}>
                  Password must include at least one symbol (!@#$%^&*).
                </span>
              </div>

            </div>
  )
}

export default PasswordComponent