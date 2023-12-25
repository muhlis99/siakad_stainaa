import React, { useState, useEffect } from 'react'
import { FaEdit, FaInfo, FaPlus, FaTrash } from 'react-icons/fa'
import moment from "moment"
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const PedomanList = () => {
    const [Pedoman, setPedoman] = useState([])

    // useEffect(() => {
    //     const getPedoman = async () => {
    //         try {
    //             const response = await axios.get()
    //             setPedoman(response.data.data)
    //         } catch (error) {

    //         }
    //     }
    //     getPedoman()
    // }, [])

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pedoman</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <Link to="/addpedoman" state={{ collaps: 'kuliah', activ: '/pedoman' }} className="btn btn-success btn-sm rounded-md capitalize" ><FaPlus /> tambah data</Link>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-2 text-sm">#</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Judul</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Deskripsi</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Tanggal Penerbitan</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Ditujukan</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row" className="px-3 py-2 font-semibold text-[12px] whitespace-nowrap">1</th>
                                        <td className='px-3 py-2 font-semibold text-[12px]'>Pedoman Pembuatan Karya Tulis</td>
                                        <td className='px-3 py-2 font-semibold text-[12px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni est similique aspernatur quaerat numquam dolore ducimus unde eos, natus ut placeat laborum ipsum quasi excepturi nam voluptate cum earum delectus?</td>
                                        <td className='px-3 py-2 font-semibold text-[12px]'>{moment('2023-12-20').format('DD MMMM YYYY')}</td>
                                        <td className='px-3 py-2 font-semibold text-[12px]'>Dosen</td>
                                        <td className='px-3 py-2 font-semibold text-[12px]'>
                                            <div className='flex gap-1'>
                                                <Link className="btn btn-xs btn-circle text-white btn-info"><FaInfo /></Link>
                                                <Link className="btn btn-xs btn-circle text-white btn-warning"><FaEdit /></Link>
                                                <Link className="btn btn-xs btn-circle text-white btn-error"><FaTrash /></Link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PedomanList