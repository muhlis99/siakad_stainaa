import React, { useState, useEffect } from 'react'
import { FaEdit, FaInfo, FaPlus, FaTrash } from 'react-icons/fa'
import moment from "moment"
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const PedomanList = () => {
    const [Pedoman, setPedoman] = useState([])

    useEffect(() => {
        getPedoman()
    }, [])

    const getPedoman = async () => {
        try {
            const response = await axios.get('v1/pedoman/getAll')
            setPedoman(response.data.data)
        } catch (error) {

        }
    }

    const hapusData = (pedomanId) => {
        Swal.fire({
            title: "Hapus data ini?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(
                        `v1/pedoman/delete/${pedomanId}`
                    ).then((response) => {
                        console.log(response.data)
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getPedoman()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

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
                                    <tr className='border-x'>
                                        <th scope="col" className="px-3 py-2 text-sm">#</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Judul</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Deskripsi</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Tanggal Penerbitan</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Ditujukan</th>
                                        <th scope="col" className="px-3 py-2 text-sm text-center"><span>Aksi</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Pedoman.length == 0 ?
                                        <tr className='bg-white border-b text-gray-500 border-x'>
                                            <td className='px-3 py-2 font-semibold' colSpan={6} align='center'>Data Kosong</td>
                                        </tr>
                                        :
                                        Pedoman.map((item, index) => (
                                            <tr key={item.id_pedoman} className='bg-white border-b text-gray-500 border-x'>
                                                <th scope="row" className="px-3 py-2 font-semibold text-[12px] whitespace-nowrap">{index + 1}</th>
                                                <td className='px-3 py-2 font-semibold text-[12px]'>{item.judul_pedoman}</td>
                                                <td className='px-3 py-2 font-semibold text-[12px]'>{item.deskripsi}</td>
                                                <td className='px-3 py-2 font-semibold text-[12px]'>{moment(item.tanggal_terbit).format('DD MMMM YYYY')}</td>
                                                <td className='px-3 py-2 font-semibold text-[12px] capitalize'>{item.level}</td>
                                                <td className='px-3 py-2 font-semibold text-[12px] '>
                                                    <div className='flex gap-1 justify-center'>
                                                        <Link to='/detailpedoman' state={{ idPedoman: item.id_pedoman, collaps: 'kuliah', activ: '/pedoman' }} className="btn btn-xs btn-circle text-white btn-info"><FaInfo /></Link>
                                                        <Link to='/editpedoman' state={{ idPedoman: item.id_pedoman, collaps: 'kuliah', activ: '/pedoman' }} className="btn btn-xs btn-circle text-white btn-warning"><FaEdit /></Link>
                                                        <button onClick={() => hapusData(item.id_pedoman)} className="btn btn-xs btn-circle text-white btn-error"><FaTrash /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
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