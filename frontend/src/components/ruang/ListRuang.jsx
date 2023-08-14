import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaArrowLeft, FaArrowRight, FaSave } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import axios from 'axios'
import Swal from "sweetalert2"
import ReactPaginate from "react-paginate"
import Loading from '../Loading'

const ListRuang = () => {
    const [RuangList, setListRuang] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [id, setId] = useState("")
    const [judul, setJudul] = useState("")
    const [identitas, setIdentitas] = useState("")
    const [lokasi, setLokasi] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])

    useEffect(() => {
        getDataRuang()
    }, [page, keyword])


    const getDataRuang = async () => {
        const response = await axios.get(`v1/ruang/all?page=${page}&search=${keyword}`)
        setListRuang(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    const pageCount = Math.ceil(rows / perPage)

    const changePage = (event) => {
        const newOffset = (event.selected + 1)
        setPage(newOffset)
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

    const simpanDataRuang = async (e) => {
        e.preventDefault()
        try {
            document.getElementById('my-modal-add').checked = false
            setLoading(true)
            await axios.post('v1/ruang/create', {
                nama_ruang: 'Ruang ',
                identy_ruang: identitas,
                lokasi: lokasi
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getDataRuang()
                    setIdentitas("")
                    setLokasi("")
                })
            })
        } catch (error) {
            setLoading(false)
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const updateDataRuang = async (e) => {
        e.preventDefault()
        try {
            document.getElementById('my-modal-add').checked = false
            setLoading(true)
            await axios.put(`v1/ruang/update/${id}`, {
                nama_ruang: 'Ruang ',
                identy_ruang: identitas,
                lokasi: lokasi
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    getDataRuang()
                    setIdentitas("")
                    setLokasi("")
                })
            })
        } catch (error) {
            setLoading(false)
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const modalAddOpen = async (e, f) => {
        try {
            setJudul(e)
            setId(f)
            if (e == 'Edit') {
                const response = await axios.get(`v1/ruang/getById/${f}`)
                let nama = response.data.data.nama_ruang
                const namaRuang = nama.substr(6)
                setIdentitas(namaRuang)
                setLokasi(response.data.data.lokasi)
            }
            document.getElementById('my-modal-add').checked = true
        } catch (error) {
        }
    }

    const modalAddClose = () => {
        document.getElementById('my-modal-add').checked = false
        setIdentitas("")
        setLokasi("")
    }

    const nonaktifkan = (ruangId) => {
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
                        `v1/ruang/delete/${ruangId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getDataRuang()
                        })
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal-add" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={judul == "Tambah" ? simpanDataRuang : updateDataRuang}>
                        <div className='bg-base-200 border-b-2 p-3'>
                            <h3 className="font-bold text-xl mb-1">{judul}</h3>
                            <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalAddClose}><FaTimes /></button>
                        </div>
                        <div className='mb-2'>
                            <div className="py-4 px-4">
                                <div className="grid gap-3">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Nama Ruang</span>
                                        </label>
                                        <div className="form-control">
                                            <label className="input-group input-group-sm">
                                                <span>Ruang</span>
                                                <input type="text" value={identitas} onChange={(e) => setIdentitas(e.target.value)} className="input input-sm input-bordered w-full" />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Lokasi</span>
                                        </label>
                                        <input type="text" value={lokasi} onChange={(e) => setLokasi(e.target.value)} placeholder="Lokasi Ruang" className="input input-sm input-bordered w-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-3 border-t-2 text-center'>
                            <button type='submit' className="btn btn-sm btn-primary capitalize">{judul == 'Tambah' ? <FaSave /> : <FaEdit />}{judul == 'Tambah' ? 'Simpan' : 'Edit'}</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Ruang</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button onClick={() => modalAddOpen('Tambah', '')} className="btn btn-success btn-sm rounded-md capitalize"><FaPlus /> <span className=''>tambah data</span></button>
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
                                        <th scope="col" className="px-6 py-2 text-sm">Kode Ruang</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Nama Ruang</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Lokasi</th>
                                        <th scope="col" className='px-6 py-2 text-sm'>Status</th>
                                        <th scope="col" className="px-6 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {RuangList.length == 0 ?
                                        <tr className='bg-white border-b border-x text-gray-500'>
                                            <td className='px-6 py-2 font-semibold' align='center' colSpan='6'>Data Ruang Kosong</td>
                                        </tr>
                                        :
                                        RuangList.map((rng, index) => (
                                            <tr key={rng.id_ruang} className='bg-white border-b text-gray-500 border-x'>
                                                <th scope="row" className="px-6 py-2 font-semibold whitespace-nowrap">{(page - 1) * 10 + index + 1}</th>
                                                <td className='px-6 py-2 font-semibold'>{rng.code_ruang}</td>
                                                <td className='px-6 py-2 font-semibold'>{rng.nama_ruang}</td>
                                                <td className='px-6 py-2 font-semibold'>{rng.lokasi}</td>
                                                <td className='px-6 py-2 font-semibold'><span className="badge badge-success badge-sm font-semibold capitalize">{rng.status}</span></td>
                                                <td className='px-6 py-2' align='center'>
                                                    <div>
                                                        <button className="btn btn-xs btn-circle text-white btn-warning mr-1" onClick={() => modalAddOpen('Edit', rng.id_ruang)} title='Edit'><FaEdit /></button>
                                                        <button className="btn btn-xs btn-circle text-white btn-error" onClick={() => nonaktifkan(rng.id_ruang)} title='Hapus'><FaTrash /></button>
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

export default ListRuang