import React, { useState, useEffect } from "react"
import axios from "axios"
import ReactPaginate from "react-paginate"
import { FaArrowLeft, FaArrowRight, FaInfo, FaSearch, FaTimes } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import Swal from "sweetalert2"
import Loading from "../Loading"

const DataMhsAll = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [msg, setMsg] = useState("")
    const [keyword, setKeyword] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [selectedDetail, setSelectedDetail] = useState([])
    const [detail, setDetail] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    const getAllMahasiswa = async () => {
        const response = await axios.get(`v1/pembayaranMhs/allMahasiswa?page=${page}&search=${keyword}`)
        const list = response.data.data
        setMahasiswa(list)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    useEffect(() => {
        getAllMahasiswa()
    }, [page, keyword])

    const pageCount = Math.ceil(rows / perPage)

    const changePage = (event) => {
        const newOffset = (event.selected + 1)
        setPage(newOffset)
        if (event.selected === 19) {
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

    const detailMahasiswa = async (nim) => {
        try {
            const response = await axios.get(`/v1/pembayaranMhs/detailMhs/${nim}`)
            setDetail(response.data.data[0])
            setSelectedDetail(response.data.data)
        } catch (err) {
            alert("Gagal mengambil detail mahasiswa")
        }
    }

    const openDetailModal = async (nim) => {
        try {
            detailMahasiswa(nim)
            setShowModal(true)
        } catch (err) {
            alert("Gagal mengambil detail mahasiswa")
        }
    }

    const tandaiLunas = async (id, nim) => {
        setLoading(true)
        try {
            const res = await axios.put(
                `/v1/pembayaranMhs/updatePembayaran/${id}`
            ).then(function (res) {
                setLoading(false)
                Swal.fire({
                    title: 'Sukses',
                    text: 'Pembayaran ditandai lunas',
                    icon: "success"
                }).then(() => {
                    detailMahasiswa(nim)
                });
            })
        } catch (err) {
            Swal.fire('Gagal update pembayaran')
        }
    }

    const sudahLunas = () => {
        Swal.fire({
            title: 'Gagal',
            text: 'Sudah Melakukan Pembayaran',
            icon: "error"
        })
    }


    return (
        <div className='mt-2 container'>
            {showModal && (
                <div className="modal modal-open z-30">
                    <div className="modal-box grid p-0 rounded-md max-w-3xl">
                        <div className='bg-base-200 border-b-2 p-3 relative'>
                            <h3 className="font-bold text-xl mb-1">Detail Data Pembayaran</h3>
                            <button
                                type="button"
                                className="btn btn-xs btn-circle btn-error absolute right-2 top-2"
                                onClick={() => setShowModal(false)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className='mb-2'>
                            <div className="pt-4 px-4">
                                <p className='text-sm font-semibold'>NIM : {detail?.nim}</p>
                                <p className='text-sm font-semibold'>Nama : {detail?.mahasiswas[0].nama}</p>
                                <p className='text-sm font-semibold'>Jenjang : {detail?.jenjangPendidikans[0].nama_jenjang_pendidikan}</p>
                                <p className='text-sm font-semibold'>Fakultas : {detail?.fakultas[0].nama_fakultas}</p>
                                <p className='text-sm font-semibold'>Prodi : {detail?.prodis[0].nama_prodi}</p>
                            </div>
                            <div className="py-4 px-4">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className='text-gray-700 bg-[#d4cece]'>
                                        <tr>
                                            <th scope="col" className="px-6 py-2 text-sm">No</th>
                                            <th scope="col" className="px-6 py-2 text-sm">Tahun Ajaran</th>
                                            <th scope="col" className="px-6 py-2 text-sm">Semester</th>
                                            <th scope="col" className="px-6 py-2 text-sm">Status</th>
                                            <th scope="col" className="px-6 py-2 text-sm">Keterangan</th>
                                            <th scope="col" className="px-6 py-2 text-sm">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedDetail.map((select, index) => (
                                            <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-6 py-2 font-semibold'>{(page - 1) * 10 + index + 1}</td>
                                                <td className='px-6 py-2 font-semibold'>{select.tahunAjarans[0].tahun_ajaran}</td>
                                                <td className='px-6 py-2 font-semibold'>Semester {select.semesters[0].semester}</td>
                                                <td className='px-6 py-2 font-semibold'>{select.pembayaran == 'lunas' ? <span className="badge badge-success">Lunas</span> : <span className="badge badge-error">Belum</span>}</td>
                                                <td className='px-6 py-2 font-semibold'>{select.semesters[0].keterangan}</td>
                                                <td className='px-6 py-2 font-semibold'>
                                                    {select.pembayaran == 'lunas' ? <button onClick={() => sudahLunas()} className="btn btn-sm capitalize">Tandai</button> : <button onClick={() => tandaiLunas(select.id_history, select.nim)} className="btn btn-sm btn-primary capitalize">Tandai</button>}

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-40 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pembayaran Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2 mt-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
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
                                        <th scope="col" className="px-6 py-2 text-sm">No</th>
                                        <th scope="col" className="px-6 py-2 text-sm">NIM</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Nama</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Jenjang</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Fakultas</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Prodi</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Mahasiswa.map((mhs, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                            <td className='px-6 py-2 font-semibold'>{(page - 1) * 10 + index + 1}</td>
                                            <td className='px-6 py-2 font-semibold'>{mhs.nim}</td>
                                            <td className='px-6 py-2 font-semibold'>{mhs.nama}</td>
                                            <td className='px-6 py-2 font-semibold'>{mhs.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2 font-semibold'>{mhs.fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2 font-semibold'>{mhs.prodis[0].nama_prodi}</td>
                                            <td className='px-6 py-2 font-semibold'>
                                                <button className="ml-1 btn btn-xs btn-circle text-white btn-info"
                                                    onClick={() => openDetailModal(mhs.nim)}
                                                    title='Detail'><FaInfo /></button>
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
                                pageCount={Math.min(20, pageCount)}
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

export default DataMhsAll