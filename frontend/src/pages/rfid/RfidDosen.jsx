import React, { useEffect } from 'react'
import Layout from "../Layout"
import FormRfidDosen from '../../components/rfid/FormRfidDosen'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const RfidDosen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isError } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    if (isError) {
        return navigate("/login")
    }

    return (
        <Layout><title>RFID Dosen</title><FormRfidDosen /></Layout>
    )
}

export default RfidDosen