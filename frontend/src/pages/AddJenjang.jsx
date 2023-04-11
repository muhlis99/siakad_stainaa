import React, { useEffect } from 'react'
import Layout from "./Layout";
import FormAddJenjang from '../components/FormAddJenjang';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const AddJenjang = () => {
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
        <Layout>
            <FormAddJenjang />
        </Layout>
    )
}

export default AddJenjang