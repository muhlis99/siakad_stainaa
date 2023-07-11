import React, { useEffect } from 'react'
import Layout from '../Layout'
import ListJenjang from '../../components/jenjangPendidikan/ListJenjang';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Jenjang = () => {
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
            <title>Jenjang Pendidikan</title>
            <ListJenjang />
        </Layout>
    )
}

export default Jenjang