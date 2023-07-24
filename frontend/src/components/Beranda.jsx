import React from 'react'
import { FaBookmark, FaChalkboardTeacher, FaUniversity, FaUserGraduate } from 'react-icons/fa'

const Beranda = () => {
    return (
        <div className="container mt-2">
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
            </section>
            <section>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <div className='w-full h-36 bg-[#60B033] hover:bg-[#4c8a28] hover:shadow-lg rounded-md px-3 py-3 grid grid-cols-2'>
                            <div>
                                <h1 className='text-md text-white'>Mahasiswa Putera</h1>
                                <h1 className='text-3xl text-white font-bold mt-2'>1</h1>
                            </div>
                            <div>
                                <h1 className='text-white text-4xl float-right'><FaUserGraduate /></h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-full h-36 bg-[#725648] rounded-md px-3 py-3 grid grid-cols-2'>
                            <div>
                                <h1 className='text-md text-white'>Mahasiswa Puteri</h1>
                                <h1 className='text-3xl text-white font-bold mt-2'>1</h1>
                            </div>
                            <div>
                                <h1 className='text-white text-4xl float-right'><FaUserGraduate /></h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-full h-36 bg-[#D4C403] rounded-md px-3 py-3 grid grid-cols-2'>
                            <div>
                                <h1 className='text-md text-white'>Dosen</h1>
                                <h1 className='text-3xl text-white font-bold mt-2'>1</h1>
                            </div>
                            <div>
                                <h1 className='text-white text-4xl float-right'><FaChalkboardTeacher /></h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-full h-36 bg-[#2D677F] rounded-md px-3 py-3 grid grid-cols-2'>
                            <div>
                                <h1 className='text-md text-white'>Total Prodi</h1>
                                <h1 className='text-3xl text-white font-bold mt-2'>1</h1>
                            </div>
                            <div>
                                <h1 className='text-white text-4xl float-right'><FaBookmark /></h1>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Beranda