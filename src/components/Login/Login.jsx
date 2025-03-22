import React, { useContext, useEffect, useState } from 'react';
import style from './Login.module.css';
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import * as yup from 'yup'
import { UserContext } from '../../context/UserContext';


export default function Login() {
    let {setUserLogin} = useContext(UserContext)
    const [apiError, setApiError] = useState(''); // store error messages
    const [isLoading, setIsLoading] = useState(false); // loading flag
    // Validation Schema |==> Validation template 
    let validationSchema = yup.object().shape({
        email: yup.string().email('Email not valid').required('Email is required'),
        password: yup.string().matches(/^[a-zA-z0-9]{6,}$/, 'Password must be at least 6 characters').required('Password is required'),
    })

    let navigate = useNavigate();
    async function handleLogin(formValues) {
        setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
            .then((apiResponse) => {
                setIsLoading(false);
                localStorage.setItem('userToken',apiResponse.data.token);
                navigate('/');
                setUserLogin(apiResponse.data.token);
                
            })
            .catch((apiResponse) => {
                setIsLoading(false);
                setApiError(apiResponse?.response?.data?.message);
            })
    }

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: handleLogin
    })

    return <>
        <div className="contianer mx-5 md:w-[80%] md:mx-auto my-5">
            {/* If there error after sending data */}
            {apiError ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{apiError}</span>
                </div>
            </div> : null}
            <h1 className='text-3xl font-semibold text-green-500'>Login:</h1>
            <form className='my-5' onSubmit={formik.handleSubmit}>
                {/* Email Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address:</label>
                </div>
                {/* Email Error MSG */}
                {formik.errors.email && formik.touched.email ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">{formik.errors.email}</span>
                    </div>
                </div> : null}
                {/* Password Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>
                </div>
                {/* Password Error MSG */}
                {formik.errors.password && formik.touched.password ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">{formik.errors.password}</span>
                    </div>
                </div> : null}
                {/* Submit Btn */}
                <Link to={'/forgotpassword'} className='text-blue-700 font-semibold text-sm flex justify-end my-2 cursor-pointer'>Forgot Password?</Link>
                <div className='flex justify-end'>
                    <button type="submit" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : 'Login'}
                    </button>
                </div>
            </form>
            <div className='flex justify-center items-center'>
                <p>Don't have an account? <span className='font-semibold text-blue-600'><Link to='/register'> Register Now </Link></span></p>
            </div>
        </div>
    </>
}
