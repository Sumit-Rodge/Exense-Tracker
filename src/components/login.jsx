import React, { useState } from 'react'
import axios from 'axios';
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const Login = () => {

  const initialValues = {
    email:'',
    password:''
  }

  const uri = 'http://localhost:4002';

  async function sendData(e){
    // await axios.post(`${uri}/login`,{
    //     "username":username,
    //     "password":password
    // })
    // alert('datasent');
  }

  const LoginSchema = yup.object().shape({
    email:yup.string().required().email(),
    password:yup.string().required().min('4')
  })
  return (
    <div className='bg-gray-900 h-screen w-full flex justify-center text-white items-center '>
       <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values)=>{sendData(values)}}
       >
        {(formik)=>{
          const {isValid , dirty} = formik;
          return (
            <div className='w-96'>
              <h1 className='text-3xl font-mono text-center'>Login</h1>
              <Form>

                <div className="flex flex-col my-4">
                  <label htmlFor="email">Email</label>
                  <Field
                   type="email"
                   name="email"
                   className="text-black bg-gray-200 p-2 rounded-lg"/>
                  <ErrorMessage name="email" component="span" className='text-red-500'/> 
                </div>

                <div className="flex flex-col my-4">
                  <label htmlFor="password">Password</label>
                  <Field
                   type="password"
                   name="password"
                   className="text-black bg-gray-200 p-2 rounded-lg"/>
                  <ErrorMessage name="password" component="span" className='text-red-500'/> 
                </div>

              <div className='flex'>
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
