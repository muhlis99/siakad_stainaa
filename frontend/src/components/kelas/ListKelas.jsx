import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaUsers, FaHotel, FaInfo } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import { Link } from "react-router-dom"
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'

const ListKelas = () => {
    return (
        <div className="mt-2 container">
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Kelas Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <div className='mb-2'>
                            <div className="grid grid-cols-5 gap-2 overflow-hidden">
                                <div>
                                    <select className="select select-sm select-bordered w-full">
                                        <option value="">Fakultas</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="select select-sm select-bordered w-full">
                                        <option value="">Prodi</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="select select-sm select-bordered w-full">
                                        <option value="">Tahun Ajaran</option>
                                    </select>
                                </div>
                                <div>
                                    <select className="select select-sm select-bordered w-full">
                                        <option value="">Semester</option>
                                    </select>
                                </div>
                                <div>
                                    <button className='btn btn-sm btn-default float-right'><FaPlus /><span className="ml-1">tambah</span></button>
                                </div>
                            </div>
                        </div>
                        <div className='border-t-2 pointer-events-none border-t-[#2D7F5F] grid gap-2'>
                            <div className='mt-3'>
                                <div className="collapse bg-[#2D7F5F] pb-0 rounded-lg">
                                    <input type="checkbox" checked className='p-0 min-h-0' />
                                    <div className="collapse-title p-2 min-h-0 text-white flex gap-2">
                                        <span>Bahasa Indonesia | </span><span>SKS 5</span>
                                    </div>
                                    <div className="collapse-content grid gap-1 px-0 py-1 bg-base-100">
                                        <div className="grid grid-cols-3 gap-2 px-4 py-2 bg-base-200">
                                            <button className='btn btn-sm btn-ghost w-14'><FaHotel /> <span className="ml-1">A</span></button>
                                            <button className='btn btn-sm btn-ghost'><FaUsers /> <span className="ml-1">20/30</span></button>
                                            <div>
                                                <button className='btn btn-sm btn-default btn-circle float-right'><FaInfo /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListKelas