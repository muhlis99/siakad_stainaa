import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Loading from '../Loading'
import { Link, useLocation } from "react-router-dom"
import moment from 'moment'

const MenuPresensi = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 500)
    // }, [])

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Presensi</h1>
            </section>
            <section>
                {/* <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                    <div className="card-body px-0"> */}
                <div className='border-b px-2 border-gray-500'>
                    <ul className="flex flex-wrap">
                        <li className="mr-2">
                            <Link to="/presensi/dosen" state={{ collaps: 'kuliah', activ: '/presensi' }} className={`inline-block ${location.pathname == '/presensi/dosen' ? 'bg-gray-300 font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'} rounded-t-lg py-2 px-4 text-sm font-medium text-center`}>Absen</Link>
                        </li>
                        <li className="mr-2">
                            <Link to="/presensi/validasi" state={{ collaps: 'kuliah', activ: '/presensi' }} className={`inline-block ${location.pathname == '/presensi/validasi' ? 'bg-gray-300 font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'} rounded-t-lg py-2 px-4 text-sm font-medium text-center`}>Validasi</Link>
                        </li>
                        <li className="mr-2">
                            <Link to="/presensi/rekapbulanan" state={{ collaps: 'kuliah', activ: '/presensi' }} className={`inline-block ${location.pathname == '/presensi/rekapbulanan' || location.state.select == 'perbulan' ? 'bg-gray-300 font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'} rounded-t-lg py-2 px-4 text-sm font-medium text-center`}>Rekap Perbulan</Link>
                        </li>
                        <li className="mr-2">
                            <Link to="/presensi/rekappersemester" state={{ collaps: 'kuliah', activ: '/presensi' }} className={`inline-block ${location.pathname == '/presensi/rekappersemester' || location.state.select == 'persemester' ? 'bg-gray-300 font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-600 hover:bg-gray-100'} rounded-t-lg py-2 px-4 text-sm font-medium text-center`}>Rekap Persemester</Link>
                        </li>
                    </ul>
                </div>

                {/* </div>
                </div > */}

            </section >
            <section className='mt-5'>
                <div className='px-2'>
                    {children}
                </div>
            </section>
        </div >
    )
}

export default MenuPresensi