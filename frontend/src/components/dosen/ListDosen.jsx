import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaTrash, FaInfo, FaEdit, FaImages, FaPrint, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import { Link, Navigate } from "react-router-dom"
import ReactPaginate from "react-paginate"
import axios from 'axios'
import Swal from "sweetalert2"
import SyncLoader from "react-spinners/SyncLoader"

const ListDosen = () => {
    const [Dosen, setDosen] = useState([])
    const [namaQr, setNamaQr] = useState([])
    const [prevQr, setPrevQr] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [idDsn, setIdDsn] = useState("")
    const [stat, setStat] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, [])

    useEffect(() => {
        getDosen()
    }, [page, keyword])

    useEffect(() => {
        getQrDsn()
    }, [Dosen])

    useEffect(() => {
        getQrDosen()
    }, [namaQr])

    const getDosen = async () => {
        const response = await axios.get(`v1/dosen/all?page=${page}&search=${keyword}`)
        setDosen(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    const getQrDsn = () => {
        var i = Dosen.map(item => (
            item.qrcode
        ))
        setNamaQr(i)
    }

    const getQrDosen = async () => {
        if (namaQr != 0) {
            let qrCode = []
            let promises = []
            for (let i = 0; i < namaQr.length; i++) {
                const t = await axios.get('v1/dosen/public/seeImage/dosen/qrCode/' + namaQr[i], {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    qrCode.push(base64)
                })
                promises.push(t)
            }
            Promise.all(promises).then(() => setPrevQr(qrCode))
        }
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
        e.preventDefault()
        setKeyword(e ? e.target.value : "")
        setPage(0)
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
            {idDsn && <Navigate to={`form1/${stat}/${idDsn}`} state={{ collaps: 'induk', activ: '/dosen' }} />}
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <SyncLoader className='' size={20} />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Dosen</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-success btn-sm rounded-md capitalize" onClick={tambahDosen}><FaPlus /> tambah data</button>
                            </div>
                            <div>
                                <div className="form-control">
                                    <div className="input-group justify-end">
                                        <input
                                            type="text"
                                            onChange={cariData}
                                            className="input input-sm input-bordered input-success"
                                            placeholder='Cari'
                                        />
                                        <button type='submit' className="btn btn-sm btn-square btn-success">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-2 text-sm">#</th>
                                        {/* <th scope="col" className="px-6 py-2 text-sm">NIDN</th> */}
                                        <th scope="col" className="px-6 py-2 text-sm">Nama</th>
                                        {/* <th scope="col" className="px-6 py-2 text-sm">QR Code</th> */}
                                        <th scope="col" className="px-6 py-2 text-sm">Jenis Kelamin</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Pendidikan</th>
                                        <th scope="col" className='px-6 py-2 text-sm'>Alat Tranportasi</th>
                                        <th scope="col" className="px-6 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Dosen.map((dsn, index) => (
                                        <tr key={dsn.id_dosen} className='bg-white border-b text-gray-500 border-x'>
                                            <th scope="row" className="px-6 py-2 font-semibold whitespace-nowrap">{index + 1}</th>
                                            {/* <td className='px-6 py-2 font-semibold'>{dsn.nidn}</td> */}
                                            <td className='px-6 py-2 font-semibold'>
                                                <div className='flex gap-3'>
                                                    <div className="avatar">
                                                        <div className="w-16 rounded">
                                                            {prevQr[index] ? <img src={`data:;base64,${prevQr[index]}`} alt='QR Code' /> : ""}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h6 className='font-semibold'>{dsn.nama}</h6>
                                                        <h6 className='font-semibold'>{dsn.nidn}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td className='px-6 py-2 font-semibold'>{dsn.nama}</td> */}
                                            <td className='px-6 py-2 font-semibold'>{dsn.jenis_kelamin == "l" ? "Laki-Laki" : "Perempuan"}</td>
                                            <td className='px-6 py-2 font-semibold'>{dsn.pendidikans[0].nama_pendidikan}</td>
                                            <td className='px-6 py-2 font-semibold'>{dsn.alat_transportasis[0].nama_alat_transportasi}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div className='flex gap-1 justify-center'>
                                                    <Link to={`/dosen/detail/${dsn.id_dosen}`} state={{ collaps: 'induk', activ: '/dosen' }} className="btn btn-xs btn-circle text-white btn-info" title='Detail'><FaInfo /></Link>
                                                    <Link to={`/dosen/form1/edit/${dsn.id_dosen}`} state={{ collaps: 'induk', activ: '/dosen' }} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></Link>
                                                    <Link to={`/dosen/upload1/${dsn.id_dosen}`} state={{ collaps: 'induk', activ: '/dosen' }} className="btn btn-xs btn-circle text-white btn-primary" title='Upload Berkas'><FaImages /></Link>
                                                    <Link to={`/dosen/print/${dsn.id_dosen}`} state={{ collaps: 'induk', activ: '/dosen' }} target='_blank' className="btn btn-xs btn-circle text-white btn-secondary" title='Print Berkas'><FaPrint /></Link>
                                                    <button onClick={() => nonaktifkan(dsn.id_dosen)} className="btn btn-xs btn-circle text-white btn-error" title='Hapus'><FaTrash /></button>
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

export default ListDosen