import React, { useContext, useEffect, useState } from 'react';
import style from './Navbar.module.css';
import logo from '../../assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';


export default function Navbar() {

    useEffect(() => { }, []);
    let navigate = useNavigate();
    let { userLogin, setUserLogin } = useContext(UserContext);
    function logOut() {
        localStorage.removeItem('userToken');
        setUserLogin(null);
        navigate('/login');
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return <>

        {/* Need Handle Hovering and Focusing */}

        <nav className="w-full bg-[#F8F9FA]">
            <div className="max-w-screen-xl container flex flex-wrap justify-between items-center mx-auto p-4">
                <img src={logo} alt="Fresh Cart Logo" />
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 lg:hidden" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full lg:flex lg:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col ps-4 md:ps-0 mt-2 lg:flex-row md:mt-0">
                        {userLogin !== null ? <>
                            <li className='mx-3'>
                                <NavLink to='' className='text-gray-800 text-lg'>Home</NavLink>
                            </li>
                            <li className='mx-3'>
                                <NavLink to='cart' className='text-gray-800 text-lg'>Cart</NavLink>
                            </li>
                            <li className='mx-3'>
                                <NavLink to='products' className='text-gray-800 text-lg'>Products</NavLink>
                            </li>
                            <li className='mx-3'>
                                <NavLink to='categories' className='text-gray-800 text-lg'>Categories</NavLink>
                            </li>
                            <li className='mx-3'>
                                <NavLink to='wishlist' className='text-gray-800 text-lg'>Wish List</NavLink>
                            </li>
                            <li className='mx-3'>
                                <NavLink to='brands' className='text-gray-800 text-lg'>Brands</NavLink>
                            </li>
                            <li className='mx-3'>
                                <NavLink to=''></NavLink>
                            </li>
                        </> : null}
                    </ul>
                    <ul className="font-medium flex ps-4 md:p-0 mt-1 lg:flex-row md:mt-0">
                        <li className='mx-2'>
                            <NavLink to='' className='text-gray-800 text-lg'>
                                <i className="fa-brands fa-instagram"></i>
                            </NavLink>
                        </li>
                        <li className='mx-2'>
                            <NavLink to='' className='text-gray-800 text-lg'>
                                <i className="fa-brands fa-facebook"></i>
                            </NavLink>
                        </li>
                        <li className='mx-2'>
                            <NavLink to='' className='text-gray-800 text-lg'>
                                <i className="fa-brands fa-tiktok"></i>
                            </NavLink>
                        </li>
                        <li className='mx-2'>
                            <NavLink to='' className='text-gray-800 text-lg'>
                                <i className="fa-brands fa-twitter"></i>
                            </NavLink>
                        </li>
                        <li className='mx-2'>
                            <NavLink to='' className='text-gray-800 text-lg'>
                                <i className="fa-brands fa-linkedin"></i>
                            </NavLink>
                        </li>
                        <li className='mx-2'>
                            <NavLink to='' className='text-gray-800 text-lg'>
                                <i className="fa-brands fa-youtube"></i>
                            </NavLink>
                        </li>
                        <li className='mx-2'>
                            <NavLink to='' className='text-gray-800 text-lg'></NavLink>
                        </li>
                    </ul>
                    <ul className="font-medium flex flex-col ps-4 md:ps-0 mt-2 lg:flex-row md:mt-0">
                        {userLogin === null ? <>
                            <li className='mx-2'>
                                <Link to='login' className='text-gray-800 text-lg'>Login</Link>
                            </li>
                            <li className='mx-2'>
                                <Link to='register' className='text-gray-800 text-lg'>Resgister</Link>
                            </li>
                        </> : <>
                            <li className='mx-2'>
                                <span onClick={logOut} className='text-gray-800 text-lg cursor-pointer'>Logout</span>
                            </li>
                        </>}
                    </ul>
                </div>
            </div>
        </nav>

    </>
}
