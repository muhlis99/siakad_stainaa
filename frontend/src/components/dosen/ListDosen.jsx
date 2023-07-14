import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaTrash, FaInfo, FaEdit, FaImages, FaPrint, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import { Link, Navigate } from "react-router-dom"
import ReactPaginate from "react-paginate"
import axios from 'axios'
import Swal from "sweetalert2"

const ListDosen = () => {
    const [Dosen, setDosen] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [idDsn, setIdDsn] = useState("")
    const [stat, setStat] = useState("")

    useEffect(() => {
        getDosen()
    }, [page, keyword])

    const getDosen = async () => {
        const response = await axios.get(`v1/dosen/all?page=${page}&search=${keyword}`)
        setDosen(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    const tambahDosen = async () => {
        const response = await axios.post('v1/dosen/createFirts')
        setIdDsn(response.data.data)
        setStat("add")
    }

    const pageCount = Math.ceil(rows / perPage)

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

    const nonaktifkan = (dsnId) => {
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
                    axios.put(
                        `v1/dosen/nonAktif/${dsnId}`
                    ).then((response) => {
                        console.log(response.data)
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getDosen()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            {idDsn && <Navigate to={`form1/${stat}/${idDsn}`} />}
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Dosen</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-success btn-xs" onClick={tambahDosen}><FaPlus /> tambah data</button>
                            </div>
                            <div>
                                <form onSubmit={cariData} className='mb-1'>
                                    <div className="form-control">
                                        <div className="input-group justify-end">
                                            <input
                                                type="text"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                className="input input-xs input-bordered input-success"
                                                placeholder='Cari'
                                            />
                                            <button type='submit' className="btn btn-xs btn-square btn-success">
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
                                                    <Link to={`/dosen/detail/${dsn.id_dosen}`} className="btn btn-xs btn-circle text-white btn-info" title='Detail'><FaInfo /></Link>
                                                    <Link to={`/dosen/form1/edit/${dsn.id_dosen}`} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></Link>
                                                    <Link to={`/dosen/upload1/${dsn.id_dosen}`} className="btn btn-xs btn-circle text-white btn-primary" title='Upload Berkas'><FaImages /></Link>
                                                    <Link to={`/dosen/print/${dsn.id_dosen}`} target='_blank' className="btn btn-xs btn-circle text-white btn-secondary" title='Print Berkas'><FaPrint /></Link>
                                                    <button onClick={() => nonaktifkan(dsn.id_dosen)} className="btn btn-xs btn-circle text-white btn-error" title='Hapus'><FaTrash /></button>
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
                                previousLinkClassName={"btn btn-xs btn-success-outline btn-circle btn-outline"}
                                nextLinkClassName={"btn btn-xs btn-success-outline btn-circle btn-outline ml-1"}
                                breakLinkClassName={"btn btn-xs btn-success-outline btn-circle btn-outline ml-1"}
                                activeLinkClassName={"btn btn-xs btn-success  btn-circle  "}
                                pageLinkClassName={"btn btn-xs btn-success-outline btn-outline btn-circle ml-1"}
                                disabledLinkClassName={"btn btn-xs btn-circle btn-outline btn-disabled"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListDosen