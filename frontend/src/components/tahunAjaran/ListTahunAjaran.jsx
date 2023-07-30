import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { SlOptions } from "react-icons/sl"
import axios from 'axios'
import Swal from "sweetalert2"
import ReactPaginate from "react-paginate"

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
    for (let tahun1 = years; tahun1 <= years + 1; tahun1++) {
        th1.push(<option key={tahun1} value={tahun1}>{tahun1}</option>)
    }
    for (let tahun2 = years + 1; tahun2 <= years + 2; tahun2++) {
        th2.push(<option key={tahun2} value={tahun2}>{tahun2}</option>)
    }

    const simpanTahun = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/tahunAjaran/create', {
                dari_tahun: pertama,
                sampai_tahun: kedua,
                keterangan: keterangan,
                periode: periode
            }).then(function (response) {
                document.getElementById('my-modal').checked = false
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
            await axios.put(`v1/tahunAjaran/update/${id}`, {
                dari_tahun: pertama,
                sampai_tahun: kedua,
                keterangan: keterangan,
                periode: periode
            }).then(function (response) {
                document.getElementById('my-modal').checked = false
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
                        console.log(response.data)
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
                <div className="modal-box relative">
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
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Tahun Ajaran</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36 rounded-md">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button className="btn btn-success btn-xs" onClick={() => modalOpen('Tambah', '')}><FaPlus /> tambah data</button>
                            </div>
                            <div>
                                <div className="form-control">
                                    <div className="input-group justify-end">
                                        <input
                                            type="text"
                                            onChange={cariData}
                                            className="input input-xs input-bordered input-success"
                                            placeholder='Cari'
                                        />
                                        <button type='submit' className="btn btn-xs btn-square btn-success">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Kode Tahun</th>
                                        <th scope="col" className="px-6 py-3">Tahun Ajaran</th>
                                        <th scope="col" className="px-6 py-3">Keterangan</th>
                                        <th scope="col" className='px-6 py-3'>Status</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TahunAjaran.map((thn, index) => (
                                        <tr key={thn.id_tahun_ajaran} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-6 py-2'>{thn.code_tahun_ajaran}</td>
                                            <td className='px-6 py-2'>{thn.tahun_ajaran}</td>
                                            <td className='px-6 py-2'>{thn.keterangan}</td>
                                            <td className='px-6 py-2'>{thn.status == "aktif" ? <span className="badge btn-success badge-sm">Aktif</span> : <span className="badge badge-error badge-sm">Tidak Aktif</span>}</td>
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
                                activeLinkClassName={"btn btn-xs btn-success btn-circle btn-primary-activ"}
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

export default ListTahunAjaran