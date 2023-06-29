import React, { useEffect } from 'react'
import ListJadwal from '../../components/jadwalKuliah/ListJadwal'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Jadwal = () => {
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
            <title>Jadwal Kuliah</title>
            <ListJadwal />
        </Layout>
    )
}

export default Jadwal