import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaArrowLeft, FaArrowRight, FaSave } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import axios from 'axios'
import Swal from "sweetalert2"
import ReactPaginate from "react-paginate"
import Loading from '../Loading'

const ListTahunAjaran = () => {
    const [TahunAjaran, setTahunAjaran] = useState([])
    const [pertama, setPertama] = useState("")
    const [kedua, setKedua] = useState("")
    const [periode, setPeriode] = useState("")
    const [keterangan, setKeterangan] = useState("")
    const [modal, setModal] = useState("")
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [id, setId] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])


    useEffect(() => {
        getTahunAjaran()
    }, [page, keyword])

    const getTahunAjaran = async () => {
        const response = await axios.get(`v1/tahunAjaran/all?page=${page}&search=${keyword}`)
        setTahunAjaran(response.data.data)
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
        e.preventDefault()
        setKeyword(e ? e.target.value : "")
        setPage(0)
    }

    const modalOpen = async (e, f) => {
        try {
            if (e === 'Edit') {
                const response = await axios.get(`v1/tahunAjaran/getById/${f}`)
                let thnAjar = response.data.data.tahun_ajaran
                const tgArray = thnAjar.split(" ")
                setPertama(tgArray[0])
                setKedua(tgArray[2])
                setPeriode(tgArray[4])
                setKeterangan(response.data.data.keterangan)
                setId(response.data.data.id_tahun_ajaran)
            }
            setModal(e)
            document.getElementById('my-modal').checked = true
        } catch (error) {

        }
    }

    const modalClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal').checked = false
        setPertama("")
        setKedua("")
        setPeriode("")
        setKeterangan("")
        setId("")
    }

    const d = new Date()
    let years = d.getFullYear()
    const th1 = []
    const th2 = []
    for (let tahun1 = 2021; tahun1 <= years + 1; tahun1++) {
        th1.push(<option key={tahun1} value={tahun1}>{tahun1}</option>)
    }
    for (let tahun2 = 2021 + 1; tahun2 <= years + 2; tahun2++) {
        th2.push(<option key={tahun2} value={tahun2}>{tahun2}</option>)
    }

    const simpanTahun = async (e) => {
        e.preventDefault()
        try {
            document.getElementById('my-modal').checked = false
            setLoading(true)
            await axios.post('v1/tahunAjaran/create', {
                dari_tahun: pertama,
                sampai_tahun: kedua,
                keterangan: keterangan,
                periode: periode
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getTahunAjaran()
                    setPertama("")
                    setKedua("")
                    setPeriode("")
                    setKeterangan("")
                })
            })
        } catch (error) {
            setLoading(false)
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const updateTahun = async (e) => {
        e.preventDefault()
        try {
            document.getElementById('my-modal').checked = false
            setLoading(true)
            await axios.put(`v1/tahunAjaran/update/${id}`, {
                dari_tahun: pertama,
                sampai_tahun: kedua,
                keterangan: keterangan,
                periode: periode
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    getTahunAjaran()
                    setPertama("")
                    setKedua("")
                    setKeterangan("")
                    setId("")
                })
            })
        } catch (error) {
            setLoading(false)
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const nonaktifkan = (thnId) => {
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
                        `v1/tahunAjaran/delete/${thnId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getTahunAjaran()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={modal == 'Tambah' ? simpanTahun : updateTahun}>
                        <div className='bg-base-200 border-b-2 p-3'>
                            <h3 className="font-bold text-xl mb-1">{modal}</h3>
                            <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                        </div>
                        <div className='mb-2'>
                            <div className="py-4 px-4">
                                <div className="grid gap-3">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Dari Tahun</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={pertama} onChange={(e) => setPertama(e.target.value)}>
                                            <option value="">-Dari Tahun-</option>
                                            {th1}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Sampai Tahun</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={kedua} onChange={(e) => setKedua(e.target.value)}>
                                            <option value="">-Sampai Tahun-</option>
                                            {th2}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Periode</span>
                                        </label>
                                        {modal == 'Tambah' ? <select className="select select-sm select-bordered w-full" value={periode} onChange={(e) => setPeriode(e.target.value)}>
                                            <option value="">Periode</option>
                                            <option value="Ganjil">Ganjil</option>
                                            <option value="Genap">Genap</option>
                                        </select> : <input type='text' disabled className='input input-sm input-bordered w-full' value={periode} />}
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Keterangan</span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            placeholder="Masukkan Keterangan"
                                            value={keterangan}
                                            onChange={(e) => setKeterangan(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-3 border-t-2 text-center'>
                            <button type='submit' className="btn btn-sm btn-primary capitalize">{modal == 'Tambah' ? <FaSave /> : <FaEdit />}{modal == 'Tambah' ? 'Simpan' : 'Edit'}</button>
                        </div>
                    </form>
                </div>
                {/* <div className="modal-box relative">
                    <form onSubmit={modal == 'Tambah' ? simpanTahun : updateTahun}>
                        <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                        <h3 className="font-bold text-xl">{modal}</h3>
                        <div className="grid">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Dari Tahun</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={pertama} onChange={(e) => setPertama(e.target.value)}>
                                    <option value="">-Dari Tahun-</option>
                                    {th1}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Sampai Tahun</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kedua} onChange={(e) => setKedua(e.target.value)}>
                                    <option value="">-Sampai Tahun-</option>
                                    {th2}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Periode</span>
                                </label>
                                {modal == 'Tambah' ? <select className="select select-sm select-bordered w-full" value={periode} onChange={(e) => setPeriode(e.target.value)}>
                                    <option value="">Periode</option>
                                    <option value="Ganjil">Ganjil</option>
                                    <option value="Genap">Genap</option>
                                </select> : <input type='text' disabled className='input input-sm input-bordered w-full' value={periode} />}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Keterangan</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Masukkan Keterangan"
                                    value={keterangan}
                                    onChange={(e) => setKeterangan(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-sm btn-primary">simpan</button>
                        </div>
                    </form>
                </div> */}
            </div>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Tahun Ajaran</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-success btn-sm rounded-md capitalize" onClick={() => modalOpen('Tambah', '')}><FaPlus /> tambah data</button>
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
                                        <th scope="col" className="px-6 py-2 text-sm">Kode Tahun</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Tahun Ajaran</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Keterangan</th>
                                        <th scope="col" className='px-6 py-2 text-sm'>Status</th>
                                        <th scope="col" className="px-6 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TahunAjaran.length == 0 ?
                                        <tr className='bg-white border-b border-x text-gray-500'>
                                            <td className='px-6 py-2 font-semibold' align='center' colSpan='6'>Data Tahun Ajaran Kosong</td>
                                        </tr>
                                        :
                                        TahunAjaran.map((thn, index) => (
                                            <tr key={thn.id_tahun_ajaran} className='bg-white border-b text-gray-500 border-x'>
                                                <th scope="row" className="px-6 py-2 font-semibold whitespace-nowrap">{index + 1}</th>
                                                <td className='px-6 py-2 font-semibold'>{thn.code_tahun_ajaran}</td>
                                                <td className='px-6 py-2 font-semibold'>{thn.tahun_ajaran}</td>
                                                <td className='px-6 py-2 font-semibold'>{thn.keterangan}</td>
                                                <td className='px-6 py-2 font-semibold'><span className="badge badge-success badge-sm font-semibold capitalize">{thn.status}</span></td>
                                                <td className='px-6 py-2' align='center'>
                                                    <div>
                                                        <button className="btn btn-xs btn-circle text-white btn-warning mr-1" onClick={() => modalOpen('Edit', thn.id_tahun_ajaran)} title='Edit'><FaEdit /></button>
                                                        <button className="btn btn-xs btn-circle text-white btn-error" onClick={() => nonaktifkan(thn.id_tahun_ajaran)} title='Hapus'><FaTrash /></button>
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

export default ListTahunAjaran