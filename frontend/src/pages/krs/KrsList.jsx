import React, { useEffect } from 'react'
import ListKrs from '../../components/krs/ListKrs'
import Layout from '../Layout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const KrsList = () => {
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
        <div>
            <title>Kartu Rencana Studi</title>
            <Layout>
                <ListKrs />
            </Layout>
        </div>
    )
}

export default KrsList