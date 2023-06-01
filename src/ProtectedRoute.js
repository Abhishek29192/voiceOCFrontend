import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import cookie from "react-cookies";
import { Routes as AppRoute } from "./constants/RoutesNames";

export const ProtectedRoute = ({ children }) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"))

    const token = cookie.load("accessToken")

    if (userDetails && token) {
        return children;
    } else {
        return <Navigate to="/" />
    }
}


export const ProctectedRouteLoginSignUp = ({ children }) => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"))

    const token = cookie.load("accessToken")

    if (userDetails && token) {
        return <Navigate to={`${AppRoute.teamInbox}`} />;
    } else {
        return children
        // return navigate(`${AppRoute.register}`)
    }
}
