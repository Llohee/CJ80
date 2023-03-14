import React from 'react'
import './style.scss'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import BACKEND_DOMAIN_API from '../global/global'
import { useNavigate } from 'react-router-dom'


const validation = Yup.object ({
  email: Yup.string()
      .email('Bạn cần nhập đúng định dạng email')
      .required('Bạn cần cung cấp email!'),
  password: Yup.string().required('Bạn cần nhập mật khẩu'),
});
const Login = () => {
  const navigate = useNavigate();
    const { values, touched, isValid, errors, handleSubmit, handleChange, handleBlur } = useFormik ({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validation,
        onSubmit (values) {
            getAllUser(values);
        }
    });
    const getAllUser = async (user) => {
        const findAllUser = await axios.get(`${BACKEND_DOMAIN_API}/api/v1/users`);
        const findUserLogin = findAllUser.data.find((item) => item.email === user.email)
        if (findUserLogin && findUserLogin.password === user.password) {
            localStorage.setItem('userLogin', JSON.stringify(user));
            alert('Đăng nhập thành công')
            navigate('/home')

        } else {
            alert('Sai tài khoản hoặc mật khẩu')
        }
    }
  return (
    <div className="container">
      <img src="https://marcas-logos.net/wp-content/uploads/2022/07/Trello-logo.png" className="trello-logo" />
      <div className="container-wrapper">
        <div className="container-login">
          <h1>Log into Trello</h1>
          <form onSubmit= {handleSubmit}>
                <div className="row">
                    <label><strong className="reds"></strong></label>
                    <input type="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder='Enter email'/>
                </div>
                {touched.email && !isValid && errors.email && <p className="reds">{errors.email}</p>}
                <div className="row">
                    <label><strong className="reds"></strong></label>
                    <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder='Enter password'/>
                </div>
                {touched.password && !isValid && errors.password && <p className="reds">{errors.password}</p>}
                <div className="login-btn">
                  <button type="submit" className="btn">Đăng nhập</button>
                  <ul className="bottom-link">
                    <span className="sign-up" onClick={() =>{
                      navigate('/register')
                    }}>Sign up for account !</span>
                      
                  </ul>
                </div>
                
            </form>
        </div>
      </div>
      <div className="background">
        <div className="left-background">
          <img src="https://wallpapercave.com/wp/wp3610522.jpg" alt="backgrounf" />
        </div>
        
      </div>
    </div>
    
  )
}

export default Login