import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import axios from 'axios';
import ReactPaginate from "react-paginate";

const ProdiList = () => {
    const [Prodi, setProdi] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setperPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [rows, setrows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getProdi()
    }, [page, keyword])

    const getProdi = async () => {
        const response = await axios.get(
            `v1/prodi/all?page=${page}&search=${keyword}`
        );
        setProdi(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    const pageCount = Math.ceil(rows / perPage);

    const changePage = (event) => {
        const newOffset = (event.selected + 1);
        setPage(newOffset);
        if (event.selected === 9) {
            setMsg("Jika tidak menemukan data yang dicari, maka lakukan pencarian data secara spesifik!")
        } else {
            setMsg("")
        }
    }

    const cariData = (e) => {
        e.preventDefault();
        setPage(0)
        setKeyword(query)
    }

    return (
        <div className='container mt-2'>

            <section className='mb-7'>
                <h1 className='text-2xl font-bold'>Program Studi</h1>
            </section>
            <section>
                <div className="card card-bordered bg-base-100 shadow-md mb-36">
                    <div className="card-body">
                        <div className="flex">
                            <div className="flex-1">
                                <label htmlFor="my-modal-add" className="btn btn-default btn-sm"><FaPlus /> tambah data</label>
                            </div>
                        </div>
                        <form onSubmit={cariData} className='mb-1'>
                            <div className="form-control">
                                <div className="input-group justify-end">
                                    <input
                                        type="text"
                                        className="input input-sm input-bordered input-success"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder='Cari'
                                    />
                                    <button type='submit' className="btn btn-sm btn-square btn-default">
                                        <FaSearch />
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Jenjang</th>
                                        <th scope="col" className="px-6 py-3">Kode Fakultas</th>
                                        <th scope="col" className="px-6 py-3">Kode Prodi</th>
                                        <th scope="col" className="px-6 py-3">Nama Prodi</th>
                                        <th scope="col" className='px-6 py-3'>Status</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Prodi.map((prod, index) => (
                                        <tr key={prod.id_prodi} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className='px-6 py-4'>{prod.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-4'>{prod.code_fakultas}</td>
                                            <td className='px-6 py-4'>{prod.code_prodi}</td>
                                            <td className='px-6 py-4'>{prod.nama_prodi}</td>
                                            <td className='px-6 py-4'>{prod.status == "aktif" ? <span className="badge btn-default badge-md">Aktif</span> : <span className="badge badge-error badge-md">Tidak Aktif</span>}</td>
                                            <td className='px-6 py-4' align='center'>
                                                <div className="btn-group">
                                                    <button className="btn btn-sm text-white btn-warning" title='Edit'><BiEdit /></button>
                                                    <button className="btn btn-sm text-white btn-danger" title='Hapus'><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <span>Total Data : {rows} page: {rows ? page : 0} of {pages}</span>
                            <p className='text-sm text-red-700'>{msg}</p>
                        </div>
                        <div className="mt-3 justify-center btn-group" key={rows} aria-label='pagination'>
                            <ReactPaginate
                                className='justify-center btn-group'
                                breakLabel={<SlOptions />}
                                previousLabel={<FaArrowLeft />}
                                pageCount={Math.min(10, pageCount)}
                                onPageChange={changePage}
                                nextLabel={<FaArrowRight />}
                                previousLinkClassName={"btn btn-sm btn-primary btn-circle btn-outline"}
                                nextLinkClassName={"btn btn-sm btn-primary btn-circle btn-outline ml-1"}
                                breakLinkClassName={"btn btn-sm btn-primary btn-circle btn-outline ml-1"}
                                activeLinkClassName={"btn btn-sm btn-primary btn-circle btn-active"}
                                pageLinkClassName={"btn btn-sm btn-primary btn-outline btn-circle ml-1"}
                                disabledLinkClassName={"btn btn-sm btn-circle btn-outline btn-disabled"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProdiList