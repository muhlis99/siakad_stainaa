import React, { useState, useEffect } from 'react'
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa"
import { Link } from "react-router-dom"

const ListMataKuliah = () => {
    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Mata Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Link to="/matakuliah/add" className="btn btn-default btn-xs"><FaPlus /> <span className='ml-1'>tambah data</span></Link>
                            </div>
                            <div>
                                <select className="select select-bordered select-xs max-w-xs">
                                    <option value="">Tahun Ajaran</option>
                                </select>
                            </div>
                            <div>
                                <form className='mb-1'>
                                    <div className="form-control">
                                        <div className="input-group justify-end">
                                            <input
                                                type="text"
                                                // value={query}
                                                // onChange={(e) => setQuery(e.target.value)}
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
                                        <th scope="col" className="px-6 py-3">Tahun Ajaran</th>
                                        <th scope="col" className="px-6 py-3">Kode</th>
                                        <th scope="col" className="px-6 py-3">Nama</th>
                                        <th scope="col" className="px-6 py-3">SKS</th>
                                        <th scope="col" className='px-6 py-3'>Prodi</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-white border-b text-gray-500'>
                                        <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                            1
                                        </th>
                                        <td className='px-6 py-2'>2022/2023</td>
                                        <td className='px-6 py-2'>123456</td>
                                        <td className='px-6 py-2'>Studi Al-Qur'an</td>
                                        <td className='px-6 py-2'>3</td>
                                        <td className='px-6 py-2'>Pendidikan Agama Islam</td>
                                        <td className='px-6 py-2' align='center'>
                                            <div>
                                                <Link to={"/matakuliah/edit/1"} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></Link>
                                                <button className="btn btn-xs btn-circle text-white btn-danger ml-1" title='Hapus'><FaTrash /></button>
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

export default ListMataKuliah