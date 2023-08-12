import React, { useState, useEffect } from 'react'
import { Link, Navigate } from "react-router-dom"
import { FaPlus, FaSearch, FaTrash, FaInfo, FaEdit, FaImages, FaPrint, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import axios from 'axios'
import ReactPaginate from "react-paginate"
import Swal from "sweetalert2"
import Loading from '../Loading'

const ListMahasiswa = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [namaQr, setNamaQr] = useState([])
    const [prevQr, setPrevQr] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [idMhs, setIdMhs] = useState("")
    const [stat, setStat] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])

    useEffect(() => {
        getMahasiwa()
    }, [page, keyword])


    // useEffect(() => {
    //     getQrMahasiswa()
    // }, [Mahasiswa])

    // useEffect(() => {
    //     getQrMhs()
    // }, [namaQr])

    const getMahasiwa = async () => {
        const response = await axios.get(`v1/mahasiswa/all?page=${page}&search=${keyword}`)
        setMahasiswa(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    // const getQrMahasiswa = () => {
    //     var i = Mahasiswa.map(item => (
    //         item.qrcode
    //     ))
    //     setNamaQr(i)
    // }

    // const getQrMhs = async () => {
    //     if (namaQr != 0) {
    //         let qrCode = []
    //         let promises = []
    //         for (let i = 0; i < namaQr.length; i++) {
    //             const t = await axios.get('v1/mahasiswa/public/seeImage/mahasiswa/qrcode/' + namaQr[i], {
    //                 responseType: "arraybuffer"
    //             }).then((response) => {
    //                 const base64 = btoa(
    //                     new Uint8Array(response.data).reduce(
    //                         (data, byte) => data + String.fromCharCode(byte),
    //                         ''
    //                     )
    //                 )
    //                 qrCode.push(base64)
    //             })
    //             promises.push(t)
    //         }
    //         Promise.all(promises).then(() => setPrevQr(qrCode))
    //     }
    // }

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

    const tbMhs = async () => {
        setLoading(true)
        const response = await axios.post('v1/mahasiswa/createFirst')
        setIdMhs(response.data.data)
        setStat("add")
    }

    // const nonaktifkan = (mhsId) => {
    //     Swal.fire({
    //         title: "Hapus data ini?",
    //         text: "Anda tidak dapat mengembalikan ini",
    //         icon: "question",
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Ya, hapus!',
    //         cancelButtonText: 'Batal'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             try {
    //                 axios.put(
    //                     `v1/mahasiswa/nonAktif/${mhsId}`
    //                 ).then((response) => {
    //                     Swal.fire({
    //                         title: "Terhapus",
    //                         text: response.data.message,
    //                         icon: "success"
    //                     }).then(() => {
    //                         getMahasiwa()
    //                     });
    //                 })

    //             } catch (error) {

    //             }
    //         }
    //     })
    // }

    return (
        <div className='mt-2 container'>
            {idMhs && <Navigate to={`form1/${stat}/${idMhs}`} state={{ collaps: 'induk', activ: '/mahasiswa' }} />}
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-success btn-sm rounded-md capitalize" onClick={tbMhs}><FaPlus /> tambah data</button>
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
                                        {/* <th scope="col" className="px-6 py-2 text-sm">NIM</th> */}
                                        <th scope="col" className="px-6 py-2 text-sm">Nama</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Jenjang</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Fakultas</th>
                                        <th scope="col" className='px-6 py-2 text-sm'>Prodi</th>
                                        <th scope="col" className="px-6 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Mahasiswa.map((mhs, index) => (
                                        <tr key={mhs.id_mahasiswa} className='bg-white border-b text-gray-500 border-x'>
                                            <th scope="row" className="px-6 py-2 font-semibold whitespace-nowrap">
                                                {(page - 1) * 10 + index + 1}
                                            </th>
                                            <td className='px-6 py-2 font-semibold'>
                                                <div className='flex gap-3'>
                                                    <div className="avatar">
                                                        {/* <div className="w-16 rounded">
                                                            {prevQr[index] ? <img src={`data:;base64,${prevQr[index]}`} alt='QR Code' /> : ""}
                                                        </div> */}
                                                    </div>
                                                    <div>
                                                        <h6 className='font-semibold'>{mhs.nama}</h6>
                                                        <h6 className='font-semibold'>{mhs.nim}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td className='px-6 py-2 font-semibold'>{mhs.nim}{mhs.nama}</td> */}
                                            <td className='px-6 py-2 font-semibold'>{mhs.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2 font-semibold'>{mhs.fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2 font-semibold'>{mhs.prodis[0].nama_prodi}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div className='flex gap-1'>
                                                    <Link to={`/mahasiswa/detail/${mhs.id_mahasiswa}`} state={{ collaps: 'induk', activ: '/mahasiswa' }} className="btn btn-xs btn-circle text-white btn-info" title='Detail'><FaInfo /></Link>
                                                    <Link to={`/mahasiswa/form1/edit/${mhs.id_mahasiswa}`} state={{ collaps: 'induk', activ: '/mahasiswa' }} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></Link>
                                                    <Link to={`/mahasiswa/upload/berkas/${mhs.id_mahasiswa}`} state={{ collaps: 'induk', activ: '/mahasiswa' }} className="btn btn-xs btn-circle text-white btn-primary" title='Upload Berkas'><FaImages /></Link>
                                                    <Link to={`/mahasiswa/print/${mhs.id_mahasiswa}`} target='_blank' className="btn btn-xs btn-circle text-white btn-secondary" title='Print Berkas'><FaPrint /></Link>
                                                    {/* <button onClick={() => nonaktifkan(mhs.id_mahasiswa)} className="btn btn-xs btn-circle text-white btn-error" title='Hapus'><FaTrash /></button> */}
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

export default ListMahasiswa