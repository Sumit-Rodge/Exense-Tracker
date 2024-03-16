import React, { useContext, useState } from 'react'
import axios from 'axios';
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { CookieContext } from '../context/cookieContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

  const [encryptedCookieValue,setEncryptedCookieValue] = useContext(CookieContext);

  function setCookie(){
    setEncryptedCookieValue(document.cookie.split('=')[1]);
  }

  const initialValues = {
    email:'',
    password:''
  }
  const navigate = useNavigate();
  const [error,setError] = useState(false);
  const uri = 'http://localhost:4002';

  async function sendData(values){
    try {
      await axios.post(`${uri}/login`,{
        "email":values.email,
        "password":values.password
    },{
      withCredentials:true
    });
    setCookie();
    showLoginSuccess();
    navigate('/');
    } catch (error) {
      console.log("login denied from react");
      setError(true);
    }
  }

  const LoginSchema = yup.object().shape({
    email:yup.string().required().email(),
    password:yup.string().required().min('4')
  })

  const showLoginSuccess = () => {
    toast.success("Logged In !",{
      position:"bottom-center"
    });
  };
  return (
    <div className='bg-gray-900 h-screen w-full flex justify-center text-white items-center '>
      <ToastContainer/>
       <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values)=>{sendData(values)}}
       >
        {(formik)=>{
          const {isValid , dirty} = formik;
          return (
            <div className='w-1/4 text-sm'>
              <h1 className='text-3xl font-mono text-center'>Login</h1>
              <Form>

                <div className="flex flex-col my-4">
                  <label htmlFor="email">Email</label>
                  <Field
                   type="email"
                   name="email"
                   className="text-black bg-gray-200 p-2 rounded-lg font-mono"/>
                  <ErrorMessage name="email" component="span" className='text-red-500'/> 
                  
                </div>

                <div className="flex flex-col my-4">
                  <label htmlFor="password">Password</label>
                  <Field
                   type="password"
                   name="password"
                   className="text-black bg-gray-200 p-2 rounded-lg font-mono"/>
                  <ErrorMessage name="password" component="span" className='text-red-500'/> 
                  {error?<p className='text-red-500'>Invalid Email or Password</p>:''}
                </div>

              <Link to='/register' className='text-green-700 hover:text-blue-50'>Don't have an account?</Link>
              <div className='flex my-4'>
                <button
                  type="submit"
                  className={(isValid)?"bg-blue-600 px-6 py-3 mx-auto rounded-lg":'bg-red-600 px-6 py-3 mx-auto rounded-lg'}
                  disabled={!(dirty && isValid)}
                >
                  Log In
                </button>
              </div>
              </Form>

              
            </div>
          )
        }}
       </Formik>
    </div>
  )
}
