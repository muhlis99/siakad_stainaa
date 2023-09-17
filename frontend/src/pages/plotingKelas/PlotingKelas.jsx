import React, { useEffect } from 'react'
import Layout from "../Layout"
import ListPlotingKelas from '../../components/plotingKelas/ListPlotingKelas'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMe } from "../../features/authSlice"

const PlotingKelas = () => {
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
            <title>Ploting Kelas</title><ListPlotingKelas />
        </Layout>
    )
}

export default PlotingKelas