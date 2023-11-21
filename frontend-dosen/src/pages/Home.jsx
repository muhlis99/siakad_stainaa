import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
// import { getMe } from "/../features/authSlice"
// import axios from 'axios'


const Home = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            if (user.data) {
                navigate('/dashboard')
            }
        } else {
            navigate('/login')
        }
    }, [user])

    return (
        <></>
    )
}

export default Home