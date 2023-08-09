import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaArrowLeft, FaArrowRight, FaCheck, FaCog, FaEdit, FaPlus, FaSearch, FaTimes, FaTrash } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import ReactPaginate from 'react-paginate'
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import Loading from '../Loading'

const ListPembimbing = () => {
    const [Pembimbing, setPembimbing] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [query, setQuery] = useState("")
    const [keyword, setKeyword] = useState("")
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

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

    const nonaktifkan = (DsnId) => {
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
                        `v1/pembimbingAkademik/delete/${DsnId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getPembimbing()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pembimbing Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <Link to="/addpembimbing" state={{ collaps: 'kuliah', activ: '/pembimbingakademik' }} className="btn btn-success btn-sm capitalize rounded-md"><FaPlus /> <span className="ml-1">tambah data</span></Link>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" className="px-2 py-2 text-sm">#</th>
                                        <th scope="col" className="px-2 py-2 text-sm">NIPY</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Nama Dosen</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Fakultas</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Prodi</th>
                                        <th scope="col" className="px-2 py-2 text-sm">Kuota Bimbingan</th>
                                        <th scope="col" className="px-2 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Pembimbing.map((item, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                            <th scope="row" className="px-2 py-2 font-semibold whitespace-nowrap">{index + 1}</th>
                                            <td className='px-2 py-2 font-semibold'>{item.dosens[0].nip_ynaa}</td>
                                            <td className='px-2 py-2 font-semibold'>{item.dosens[0].nama}</td>
                                            <td className='px-2 py-2 font-semibold'>{item.fakultas[0].nama_fakultas}</td>
                                            <td className='px-2 py-2 font-semibold'>{item.prodis[0].nama_prodi}</td>
                                            <td className='px-2 py-2 font-semibold'>{item.kouta_bimbingan} Mahasiswa</td>
                                            <td className='px-2 py-2 font-semibold' align='center'>
                                                <div>
                                                    <Link to="/detailpembimbingakademik" state={{ idDsn: item.id_pembimbing_akademik, jen: item.code_jenjang_pendidikan, fak: item.code_fakultas, pro: item.code_prodi, collaps: 'kuliah', activ: '/pembimbingakademik' }} className='btn btn-info btn-xs mr-1 text-white btn-circle' ><FaSearch /></Link>
                                                    <Link to='/editpembimbingakademik' state={{ idDsn: item.id_pembimbing_akademik, jen: item.code_jenjang_pendidikan, fak: item.code_fakultas, pro: item.code_prodi, collaps: 'kuliah', activ: '/pembimbingakademik' }} className='btn btn-xs btn-circle btn-warning mr-1'><FaEdit /></Link>
                                                    <button onClick={() => nonaktifkan(item.id_pembimbing_akademik)} className="btn btn-xs btn-error btn-circle"><FaTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <span className='text-sm font-semibold'>Total Data : {rows} page: {page} of {pages}</span>
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
                                activeLinkClassName={"btn btn-xs btn-success btn-circle"}
                                pageLinkClassName={"btn btn-xs btn-success btn-circle ml-1"}
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