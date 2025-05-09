import React, { useEffect, useState } from 'react';
import style from './ProtectedRouting.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRouting(props) {
    if (localStorage.getItem('userToken') !== null) {
        return props.children;
    }
    else {
        return <Navigate to={'/login'} />;
    }
}
