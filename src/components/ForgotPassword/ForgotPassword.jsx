import React, { useContext, useEffect, useState } from 'react';
import style from './ForgotPassword.module.css';
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import * as yup from 'yup'
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
    let { userLogin, setUserLogin } = useContext(UserContext)
    const [apiError, setApiError] = useState(''); // store error messages
    const [isLoading, setIsLoading] = useState(false); // loading flag
    const [resetCodeSent, setResetCodeSent] = useState(false)
    const [resetCodeValid, setResetCodeValid] = useState(false)
    const [currentEmail, setCurrentEmail] = useState('')
    // Validation Schema |==> Validation template 
    let validationSchema = yup.object().shape({
        email: yup.string().email('Email not valid').required('Email is required'),
    })
    let resetPasswordSchema = yup.object().shape({
        email: yup.string().email('Email not valid').required('Email is required'),
        newPassword: yup.string().matches(/^[a-zA-z0-9]{6,}$/, 'Password must be at least 6 characters').required('Password is required'),
    })

    let resetCodeSchema = yup.object().shape({
        resetCode: yup.string().length(6, 'Reset code must be 6 digits')
    })

    let navigate = useNavigate();
    async function handleForgotPassword(formValues) {
        setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, formValues)
            .then((apiResponse) => {
                setIsLoading(false);
                setResetCodeSent(true)
                setApiError('')
                if (apiResponse.data.statusMsg === "success") {
                    toast.success(apiResponse.data.message, {
                        duration: 2000
                    });
                }
                else {
                    toast.error(apiResponse.data.message, {
                        duration: 2000
                    });
                }
            })
            .catch((apiResponse) => {
                setIsLoading(false);
                setApiError(apiResponse?.response?.data?.message);
            })
    }
    async function handleVerifyingCode(formValues) {
        setIsLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValues)
            .then((apiResponse) => {
                setIsLoading(false);
                setResetCodeValid(true)
                toast.success(apiResponse.data.status, {
                    duration: 4000
                });
            })
            .catch((apiResponse) => {
                setIsLoading(false);
                setResetCodeValid(false)
                toast.error(apiResponse?.response?.data?.message, {
                    duration: 5000
                });
            })
    }

    async function handleResetPassword(formValues) {
        setIsLoading(true);
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, formValues)
            .then((apiResponse) => {
                setIsLoading(false);
                toast.success('Password has been reset successfully',{
                    duration: 4000
                })
                setUserLogin(localStorage.setItem('userToken',apiResponse.data.token))
                navigate('/');
            })
            .catch((apiResponse) => {
                setIsLoading(false);
            })
    }
    
    
    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: handleForgotPassword
    })

    let verifyCodeFormik = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema: resetCodeSchema,
        onSubmit: handleVerifyingCode
    })

    let resetPassword = useFormik({
        initialValues: {
            email:"",
            newPassword:""
        },
        validationSchema: resetPasswordSchema,
        onSubmit:handleResetPassword
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
            <h1 className='text-3xl font-semibold text-green-500'>Forgot Password:</h1>
            {!resetCodeSent ? <form className='my-5' onSubmit={formik.handleSubmit}>
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
                {/* Submit Btn */}
                <div className='flex justify-end'>
                    <button type="submit" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : 'Send Code'}
                    </button>
                </div>
            </form> : null}
            {/* Verifying reset code */}
            {resetCodeSent && resetCodeValid == false ? <form className='my-5' onSubmit={verifyCodeFormik.handleSubmit}>
                {/* Code Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" value={verifyCodeFormik.values.resetCode} onChange={verifyCodeFormik.handleChange} onBlur={verifyCodeFormik.handleBlur} name="resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter reset code</label>
                </div>
                {/* Submit Btn */}
                <div className='flex justify-end'>
                    <button type="submit" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : 'Verify Code'}
                    </button>
                </div>
            </form> :
                // Enter new password
                resetCodeSent && resetCodeValid ? <form className='my-5' onSubmit={resetPassword.handleSubmit}>
                    {/* current Email Input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" value={resetPassword.values.email} onChange={resetPassword.handleChange} onBlur={resetPassword.handleBlur} name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email :</label>
                    </div>
                    {/* Email Error MSG */}
                    {resetPassword.errors.email && resetPassword.touched.email ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">{resetPassword.errors.email}</span>
                        </div>
                    </div> : null}
                    {/* Password Input */}
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" value={resetPassword.values.newPassword} onChange={resetPassword.handleChange} onBlur={resetPassword.handleBlur} name="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                        <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password:</label>
                    </div>
                    {/* Password Error MSG */}
                    {resetPassword.errors.newPassword && resetPassword.touched.newPassword ? <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">{updateUserPassword.errors.password}</span>
                        </div>
                    </div> : null}
                    {/* Submit Btn */}
                    <div className='flex justify-end'>
                        <button type="submit" className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            {isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : 'Reset Password'}
                        </button>
                    </div>
                </form> : null}
            {/* ================================================ */}
            <div className='flex justify-center items-center'>
                <p>Don't have an account? <span className='font-semibold text-blue-600'><Link to='/register'> Register Now </Link></span></p>
            </div>
        </div>
    </>
}
