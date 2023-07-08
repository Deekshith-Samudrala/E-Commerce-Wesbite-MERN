import * as Yup from 'yup';

let signupSchema = Yup.object({
    name : Yup.string().required("Enter your Name"),
    email : Yup.string().email("Enter valid email").required("Enter your E-Mail"),
    password : Yup.string().required("Enter your Password"),
    repass : Yup.string().oneOf([Yup.ref("password")],"Password and re-password does not match").required("Re-enter your Passoword"),
    address : Yup.string().required("Enter your Address"),
    gender : Yup.string().required("Select your Gender"),
    state : Yup.string().required("Select your State"),
    city : Yup.string().required("Select your City"),
    contact : Yup.number().min(7000000000,"Enter valid Number").max(9999999999,"Enter valid Number").typeError("Enter only numbers").required("Enter your Contact No.")
    });  

export default signupSchema