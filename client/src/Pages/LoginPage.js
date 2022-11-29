import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { loginUser } from '../_actions/user_action';
import {Formik} from 'formik'
import * as Yup from 'yup'
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons'
const {Title} = Typography;

function LoginPage(props) {

    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)
  
    const handleRememberMe = () => {
      setRememberMe(!rememberMe)
    };
  
    const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    return (
        <Formik
          initialValues={{
            email: initialEmail,
            password: '',
          }}
          validationSchema={Yup.object().shape({//Yup으로 유효성 검사
            email: Yup.string()
              .email('Email is invalid')
              .required('Email is required'),
            password: Yup.string()
              .min(5, 'Password must be at least 5 characters')
              .required('Password is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {//setTimeOut,0.5초동안 로그인 작업을 수행
              let data = {//데이터를 객체로 만들고 dispatch 한다.
                email: values.email,
                password: values.password
              };
    
              dispatch(loginUser(data))
                .then(response => {
                  if (response.payload.loginSuccess) //로그인 성공
                  {
                    window.localStorage.setItem('userId', response.payload.userId);
                    if (rememberMe === true)//로그인성공, rememberme 참
                    {
                      window.localStorage.setItem('rememberMe', values.email);
                    }
                    else
                    {
                      localStorage.removeItem('rememberMe');
                    }
                    window.location.replace("/")
                  } 
                  else 
                  {
                    setFormErrorMessage('Check out your Account or Password again')
                  }
                })
                .catch(err => {
                  setFormErrorMessage('Check out your Account or Password again')
                  setTimeout(() => {
                    setFormErrorMessage("")
                  }, 3000);
                });
              setSubmitting(false);
            }, 500);
          }}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <div className='app' style={{position:'absolute'
              ,width:'300px'
              ,height:'400px'
              ,padding: '30px, 20px'
              ,backgroundColor:'#FFFFFF'
              ,top:'50%'
              ,left:'48%'
              ,transform: 'translate(-50%,-50%)'
              ,borderRadius: '15px' }} >
    
                <Title level={2} style={{textAlign:'center',margin:'30px'}}>로그인</Title>
                <form onSubmit={handleSubmit} style={{ width: '350px'}}>
                
                  <Form.Item required>
                    <Input
                      id="email"
                      prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Enter your email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email ? 'text-input error' : 'text-input'
                      }
                    />

                    {errors.email && touched.email && (
                      <div className="input-feedback" style={{color: "red"}}>{errors.email}</div>
                    )}

                  </Form.Item>
    
                  <Form.Item required>
                    <Input
                      id="password"
                      prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback" style={{color: "red"}} >{errors.password}</div>
                    )}
                  </Form.Item>
    
                  {formErrorMessage && (
                    <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                  )}
    
                  <Form.Item>
                    <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                    <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                      forgot password
                      </a>
                    <div>
                      <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                        Log in
                    </Button>
                    </div>
                    Or <a href="/register">register now!</a>
                  </Form.Item>
                </form>
              </div>
            );
          }}
        </Formik>
      );
}

export default LoginPage