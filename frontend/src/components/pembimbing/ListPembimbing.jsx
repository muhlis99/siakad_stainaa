import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaArrowLeft, FaArrowRight, FaCheck, FaCog, FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import ReactPaginate from 'react-paginate'
import { Link } from "react-router-dom"

const ListPembimbing = () => {
    const [Pembimbing, setPembimbing] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [query, setQuery] = useState("")
    const [keyword, setKeyword] = useState("")
    const [msg, setMsg] = useState("")

    useEffect(() => {
        getPembimbing()
    }, [page, keyword])

    const getPembimbing = async () => {
        const response = await axios.get(`v1/pembimbingAkademik/all?page=${page}&search=${keyword}`)
        setPembimbing(response.data.data)
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

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Pembimbing Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <Link to="/addpembimbing" className="btn btn-primary btn-sm"><FaPlus /> <span className="ml-1">tambah data</span></Link>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-2 py-3">#</th>
                                        <th scope="col" className="px-2 py-3">NIPY</th>
                                        <th scope="col" className="px-2 py-3">Nama Dosen</th>
                                        <th scope="col" className="px-2 py-3">Fakultas</th>
                                        <th scope="col" className="px-2 py-3">Prodi</th>
                                        <th scope="col" className="px-2 py-3">Kuota Bimbingan</th>
                                        <th scope="col" className="px-2 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Pembimbing.map((item, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-2 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-2 py-2'>{item.dosens[0].nip_ynaa}</td>
                                            <td className='px-2 py-2'>{item.dosens[0].nama}</td>
                                            <td className='px-2 py-2'>{item.fakultas[0].nama_fakultas}</td>
                                            <td className='px-2 py-2'>{item.prodis[0].nama_prodi}</td>
                                            <td className='px-2 py-2'>{item.kouta_bimbingan} Mahasiswa</td>
                                            <td className='px-2 py-2' align='center'>
                                                <div>
                                                    <button className='btn btn-info btn-xs mr-1 text-white btn-circle' ><FaSearch /></button>
                                                    <Link to="/setpembimbingakademik" state={{ idDsn: item.id_pembimbing_akademik }} className='btn btn-primary btn-xs mr-1 text-white btn-circle' title='Set Mahasiswa'><FaCog /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <span className='text-sm'>Total Data : {rows} page: {rows ? page : 0} of {pages}</span>
                            <p className='text-sm text-red-700'>{msg}</p>
                        </div>
                        <div className="mt-2 justify-center btn-group" key={rows} aria-label='pagination'>
                            <ReactPaginate
                                className='justify-center btn-group'
                                breakLabel={<SlOptions />}
                                previousLabel={<FaArrowLeft />}
                                pageCount={Math.min(10, pageCount)}
                                onPageChange={changePage}
                                nextLabel={<FaArrowRight />}
                                previousLinkClassName={"btn btn-xs btn-success btn-circle btn-outline"}
                                nextLinkClassName={"btn btn-xs btn-success btn-circle btn-outline ml-1"}
                                breakLinkClassName={"btn btn-xs btn-success btn-circle btn-outline ml-1"}
                                activeLinkClassName={"btn btn-xs btn-success btn-circle btn-default-activ"}
                                pageLinkClassName={"btn btn-xs btn-success btn-outline btn-circle ml-1"}
                                disabledLinkClassName={"btn btn-xs btn-circle btn-outline btn-disabled"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListPembimbing