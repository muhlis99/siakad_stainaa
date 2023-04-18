import React, { useEffect } from 'react'
import Layout from '../Layout'
import FakultasList from '../../components/fakultas/FakultasList'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Fakultas = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login")
        }
    }, [isError, navigate])

    return (
        <Layout><FakultasList /></Layout>
    )
}

export default Fakultas