import './style.scss';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { uuid } from '../utils';
import BACKEND_DOMAIN_API from '../global/global';

const validation = Yup.object({
    email: Yup.string()
        .email('Bạn cần nhập đúng định dạng email')
        .required('Bạn cần cung cấp email'),
    password: Yup.string().required('Bạn cần nhập mật khẩu!'),
    
    
})
 const Register = () => {
    const navigate = useNavigate();
    const { values, touched, isValid, errors, handleSubmit, handleChange, handleBlur } = useFormik ({
        initialValues: {
            id: uuid(),
            email: '',
            password: ''
            
        },
        validationSchema: validation,
        onSubmit(values) {
            handleRegister(values);
        }
    });
    const handleRegister = async (user) => {
        const listPrevUser = await axios.get(`${BACKEND_DOMAIN_API}/api/v1/users`);
        const arrUser = listPrevUser.data;
        const findExitUser = arrUser.findIndex((item) => item.email === user.email);
        if (findExitUser >= 0) {
            alert('Email đã tồn tại');
        } else {
            const requestRegister = await axios.post(`${BACKEND_DOMAIN_API}/api/v1/users`, user)
            if (requestRegister.status === 201) {
                alert('Đăng ký thành công');
                
            }
        }
        // const requestRegister = await axios.post(`${BACKEND_DOMAIN_API}/api/v1/users`, user);
        // console.log(requestRegister);
    }
  return (
    <div className="container">
        <img src="https://marcas-logos.net/wp-content/uploads/2022/07/Trello-logo.png" className="trello-logo" />
        <div className="container-wrapper">
            <div className="container-register">
                <h1>Sign up in to Trello</h1>
                <form onSubmit= {handleSubmit}>
                    <div className="row">
                        <label> <strong className="reds"></strong></label>
                        <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder='Enter email'/>
                    </div>
                    {touched.email && !isValid && errors.email && <p className="reds">{errors.email}</p>}
                    <div className="row">
                        <label> <strong className="reds"></strong></label>
                        <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder='Enter password'/>
                    </div>
                    {touched.password && !isValid && errors.password && <p className="reds">{errors.password}</p>}
                    <div className="row">
                        <label> <strong className="reds"></strong></label>
                        <input type="passwords" name="passwords" value={values.passwords} onChange={handleChange} onBlur={handleBlur} placeholder='Enter the password'/>
                    </div>
                    {touched.password && !isValid && errors.password && <p className="reds">{errors.password}</p>}
                    <div className="login-btn">
                    <button type="submit" className="btn">Đăng ký</button>
                    <ul className="bottom-link">
                        <span className="sign-up" onClick={() =>{
                            navigate('/')
                        }}>Log in </span>
                      
                    </ul>
                    </div>
                
                </form>
            </div>
        </div>
        <div className="background">
            <div className="left-background">
                <img src="https://wallpapercave.com/wp/wp3610522.jpg" alt="background" />
            </div>
        </div>
    </div>
  )
}
export default Register;
