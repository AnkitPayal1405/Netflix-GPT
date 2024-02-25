export const ValidateData = (email, password, confirmPassword) =>{
const ValidateEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
const ValidatePassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)

if(!ValidateEmail) return "Email is unvalid"
if(!ValidatePassword) return "Password is unvalid"
// if(ValidatePassword === !confirmPassword) return "Password doesn't match"

return null;

}