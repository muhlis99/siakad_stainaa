import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaInfo, FaEdit, FaImages, FaPrint, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"
import axios from 'axios'

const ListDosen = () => {
    const [Dosen, setDosen] = useState([])

    useEffect(() => {
        getDosen()
    }, [])

    const getDosen = async () => {
        const response = await axios.get(`v1/dosen/all`)
        setDosen(response.data.data)
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Dosen</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-default btn-xs"><FaPlus /> tambah data</button>
                            </div>
                            <div>
                                <form className='mb-1'>
                                    <div className="form-control">
                                        <div className="input-group justify-end">
                                            <input
                                                type="text"
                                                className="input input-xs input-bordered input-success"
                                                placeholder='Cari'
                                            />
                                            <button type='submit' className="btn btn-xs btn-square btn-default">
                                                <FaSearch />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">NIDN</th>
                                        <th scope="col" className="px-6 py-3">Nama</th>
                                        <th scope="col" className="px-6 py-3">Jenis Kelamin</th>
                                        <th scope="col" className="px-6 py-3">Pendidikan</th>
                                        <th scope="col" className='px-6 py-3'>Alat Tranportasi</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Dosen.map((dsn, index) => (
                                        <tr key={dsn.id_dosen} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-6 py-2'>{dsn.nidn}</td>
                                            <td className='px-6 py-2'>{dsn.nama}</td>
                                            <td className='px-6 py-2'>{dsn.jenis_kelamin == "l" ? "Laki-Laki" : "Perempuan"}</td>
                                            <td className='px-6 py-2'>{dsn.pendidikans[0].nama_pendidikan}</td>
                                            <td className='px-6 py-2'>{dsn.alat_transportasis[0].nama_alat_transportasi}</td>
                                            <td className='px-6 py-2'>
                                                <div className='grid grid-flow-col'>
                                                    <Link className="btn btn-xs btn-circle text-white btn-info" title='Detail'><FaInfo /></Link>
                                                    <Link to={`/dosen/form1/edit/${dsn.id_dosen}`} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></Link>
                                                    <Link to={`/dosen/upload1/${dsn.id_dosen}`} className="btn btn-xs btn-circle text-white btn-blue" title='Upload Berkas'><FaImages /></Link>
                                                    <Link className="btn btn-xs btn-circle text-white btn-info" title='Print Berkas'><FaPrint /></Link>
                                                    <button className="btn btn-xs btn-circle text-white btn-danger" title='Hapus'><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListDosen