import React, { useState, useEffect } from 'react'
import { Link, Navigate } from "react-router-dom"
import { FaPlus, FaSearch, FaTrash, FaInfo, FaEdit } from "react-icons/fa"
import axios from 'axios'
import ReactPaginate from "react-paginate"
import Swal from "sweetalert2"

const ListMahasiswa = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [idMhs, setIdMhs] = useState("")
    const [stat, setStat] = useState("")

    useEffect(() => {
        getMahasiwa()
    }, [])

    const getMahasiwa = async () => {
        const response = await axios.get('v1/mahasiswa/all')
        setMahasiswa(response.data.data)
    }

    const tbMhs = async () => {
        const response = await axios.post('v1/mahasiswa/createFirst')
        setIdMhs(response.data.data)
        setStat("add")
    }


    return (
        <div className='mt-2 container'>
            {idMhs && <Navigate to={`form1/${stat}/${idMhs}`} />}
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-default btn-xs" onClick={tbMhs}><FaPlus /> tambah data</button>
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
                                        <th scope="col" className="px-6 py-3">NIM</th>
                                        <th scope="col" className="px-6 py-3">Nama</th>
                                        <th scope="col" className="px-6 py-3">Jenjang</th>
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className='px-6 py-3'>Prodi</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Mahasiswa.map((mhs, index) => (
                                        <tr key={mhs.id_mahasiswa} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className='px-6 py-2'>{mhs.nim}</td>
                                            <td className='px-6 py-2'>{mhs.nama}</td>
                                            <td className='px-6 py-2'>{mhs.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2'>{mhs.fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2'>{mhs.prodis[0].nama_prodi}</td>
                                            <td className='px-6 py-2'>
                                                <div className="btn-group">
                                                    <button className="btn btn-xs text-white btn-info" title='Edit'><FaInfo /></button>
                                                    <Link to={`/mahasiswa/form1/edit/${mhs.id_mahasiswa}`} className="btn btn-xs text-white btn-warning" title='Edit'><FaEdit /></Link>
                                                    <button className="btn btn-xs text-white btn-danger" title='Hapus'><FaTrash /></button>
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

export default ListMahasiswa