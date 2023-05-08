import React, { useEffect } from 'react'
import Layout from "./Layout";
import Beranda from '../components/Beranda';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isSuccess } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch]);

    if (isError) {
        return navigate("/login")
    }

    return (
        <Layout><Beranda /></Layout>
    )

}

export default Dashboard