import React, { useEffect } from 'react'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"
import ListMakulJurnal from '../../components/jurnal/ListMakulJurnal'

const MakulJurnal = () => {
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
        <Layout>
            <title>Jurnal Kehadiran</title>
            <ListMakulJurnal />
        </Layout>
    )
}

export default MakulJurnal