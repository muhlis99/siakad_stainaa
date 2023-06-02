import React from 'react'
import { FaPlus, FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"

const ListKelas = () => {
    return (
        <div className="mt-2 container">
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Kelas</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <Link to='/kelas/add' className="btn btn-default btn-xs"><FaPlus /> <span className='ml-1'>tambah data</span></Link>
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
                                        <th scope="col" className="px-6 py-3">NIM</th>
                                        <th scope="col" className="px-6 py-3">Nama</th>
                                        <th scope="col" className="px-6 py-3">Jenjang</th>
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className='px-6 py-3'>Prodi</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-white border-b text-gray-500'>
                                        <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">

                                        </th>
                                        <td className='px-6 py-2'></td>
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

export default ListKelas