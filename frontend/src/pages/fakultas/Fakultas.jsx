import React, { useEffect } from 'react'
import Layout from '../Layout'
import FakultasList from '../../components/fakultas/FakultasList'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Fakultas = () => {
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
        <Layout>
            <title>Fakultas</title>
            <FakultasList />
        </Layout>
    )
}

export default Fakultas