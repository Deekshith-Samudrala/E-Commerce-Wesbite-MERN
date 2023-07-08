import * as Yup from 'yup';

let loginSchema = Yup.object({
    email : Yup.string().email("please enter valid e-mail").required("Enter your E-Mail"),
    password : Yup.string().required("Enter your password")
})

export default loginSchema;