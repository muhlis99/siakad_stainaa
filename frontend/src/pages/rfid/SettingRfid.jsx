import React, { useEffect } from 'react'
import Layout from "../Layout"
import FormSettingRfid from '../../components/rfid/FormSettingRfid'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const SettingRfid = () => {
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
        <Layout><title>Setting RFID</title><FormSettingRfid /></Layout>
    )
}

export default SettingRfid