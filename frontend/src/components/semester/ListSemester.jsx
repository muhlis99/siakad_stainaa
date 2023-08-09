import React, { useState, useEffect } from 'react'
import { FaPlus, FaSearch, FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaTimes, FaSave } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import Moment from 'react-moment'
import Loading from '../Loading'

const ListSemester = () => {
    const [Semester, setSemester] = useState([])
    const [Tahun, setTahun] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [kodeThn, setKodeThn] = useState("")
    const [semster, setSemster] = useState("")
    const [thnAjar, setThnAjar] = useState("")
    const [tglAktif, setTglAktif] = useState("")
    const [keterangan, setKeterangan] = useState("")
    const [id, setId] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }, [])


    useEffect(() => {
        getDataSemester()
    }, [page, keyword])

    useEffect(() => {
        getTahunAjaran()
    }, [])

    const getDataSemester = async () => {
        const response = await axios.get(`v1/semester/all?page=${page}&search=${keyword}`)
        setSemester(response.data.data)
        setPage(response.data.current_page)
        setrows(response.data.total_data)
        setPages(response.data.total_page)
        setperPage(response.data.per_page)
    }

    const getTahunAjaran = async () => {
        const response = await axios.get(`v1/tahunAjaran/all`)
        setTahun(response.data.data)
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

    const modalAddOpen = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-add').checked = true
    }

    const modalAddClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-add').checked = false
        setThnAjar("")
        setSemster("")
        setTglAktif("")
        setKeterangan("")
    }

    const modalEditOpen = async (e) => {
        try {
            const response = await axios.get(`v1/semester/getById/${e}`)
            setId(e)
            setThnAjar(response.data.data.code_tahun_ajaran)
            setSemster(response.data.data.semester)
            setTglAktif(response.data.data.tanggal_aktif)
            setKeterangan(response.data.data.keterangan)
            document.getElementById('my-modal-edit').checked = true
        } catch (error) {

        }
    }

    const modalEditClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal-edit').checked = false
        setThnAjar("")
        setSemster("")
        setTglAktif("")
        setKeterangan("")
    }

    const simpanSmt = async (e) => {
        e.preventDefault()
        try {
            document.getElementById('my-modal-add').checked = false
            setLoading(true)
            await axios.post('v1/semester/create', {
                code_tahun_ajaran: thnAjar,
                semester: semster,
                tanggal_aktif: tglAktif,
                keterangan: keterangan
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getDataSemester()
                    setThnAjar("")
                    setSemster("")
                    setTglAktif("")
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

    const updateSmt = async (e) => {
        e.preventDefault()
        try {
            document.getElementById('my-modal-edit').checked = false
            setLoading(true)
            await axios.put(`v1/semester/update/${id}`, {
                code_tahun_ajaran: thnAjar,
                semester: semster,
                tanggal_aktif: tglAktif,
                keterangan: keterangan
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getDataSemester()
                    setId("")
                    setThnAjar("")
                    setSemster("")
                    setTglAktif("")
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

    const nonaktifkan = (smtId) => {
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
                        `v1/semester/delete/${smtId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getDataSemester()
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            {/* Modal untuk tambah data */}
            <input type="checkbox" id="my-modal-add" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={simpanSmt}>
                        <div className='bg-base-200 border-b-2 p-3'>
                            <h3 className="font-bold text-xl mb-1">Tambah</h3>
                            <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalAddClose}><FaTimes /></button>
                        </div>
                        <div className='mb-2'>
                            <div className="py-4 px-4">
                                <div className="grid gap-3">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Tahun Ajaran</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={thnAjar} onChange={(e) => setThnAjar(e.target.value)}>
                                            <option value="">-Tahun Ajaran-</option>
                                            {Tahun.map((thn) => (
                                                <option key={thn.id_tahun_ajaran} value={thn.code_tahun_ajaran}>{thn.tahun_ajaran}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Semester</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={semster} onChange={(e) => setSemster(e.target.value)}>
                                            <option value="">-Semester-</option>
                                            <option value="1">Semester 1</option>
                                            <option value="2">Semester 2</option>
                                            <option value="3">Semester 3</option>
                                            <option value="4">Semester 4</option>
                                            <option value="5">Semester 5</option>
                                            <option value="6">Semester 6</option>
                                            <option value="7">Semester 7</option>
                                            <option value="8">Semester 8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Tanggal Aktif</span>
                                        </label>
                                        <input type="date" className="input input-sm input-bordered w-full" value={tglAktif} onChange={(e) => setTglAktif(e.target.value)} />
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
                            <button type='submit' className="btn btn-sm btn-primary capitalize"><FaSave />Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
            <input type="checkbox" id="my-modal-edit" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={updateSmt}>
                        <div className='bg-base-200 border-b-2 p-3'>
                            <h3 className="font-bold text-xl mb-1">Edit</h3>
                            <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalEditClose}><FaTimes /></button>
                        </div>
                        <div className='mb-2'>
                            <div className="py-4 px-4">
                                <div className="grid gap-3">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Tahun Ajaran</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={thnAjar} onChange={(e) => setThnAjar(e.target.value)}>
                                            <option value="">-Tahun Ajaran-</option>
                                            {Tahun.map((thn) => (
                                                <option key={thn.id_tahun_ajaran} value={thn.code_tahun_ajaran}>{thn.tahun_ajaran}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Semester</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={semster} onChange={(e) => setSemster(e.target.value)}>
                                            <option value="">-Semester-</option>
                                            <option value="1">Semester 1</option>
                                            <option value="2">Semester 2</option>
                                            <option value="3">Semester 3</option>
                                            <option value="4">Semester 4</option>
                                            <option value="5">Semester 5</option>
                                            <option value="6">Semester 6</option>
                                            <option value="7">Semester 7</option>
                                            <option value="8">Semester 8</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Tanggal Aktif</span>
                                        </label>
                                        <input type="date" className="input input-sm input-bordered w-full" value={tglAktif} onChange={(e) => setTglAktif(e.target.value)} />
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
                            <button type='submit' className="btn btn-sm btn-primary capitalize"><FaEdit />Edit</button>
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
                <h1 className='text-2xl font-bold'>Semester</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div className='flex gap-2'>
                                <button className="btn btn-success btn-sm capitalize rounded-md" onClick={modalAddOpen}><FaPlus /> <span className="ml-1">tambah data</span></button>
                                <select className='select select-sm select-bordered max-w-xs' value={kodeThn} onChange={(e) => setKodeThn(e.target.value)}>
                                    <option value="">Semua</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
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
                                        <th scope="col" className="px-6 py-2 text-sm">Semester</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Tahun Ajaran</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Tanggal Aktif</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Keterangan</th>
                                        <th scope="col" className='px-6 py-2 text-sm'>Status</th>
                                        <th scope="col" className="px-6 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Semester.map((smt, index) => {
                                        return kodeThn == 0 ? (
                                            <tr key={smt.id_semester} className='bg-white border-b text-gray-500 border-x'>
                                                <th scope="row" className="px-6 py-2 font-semibold whitespace-nowrap">{index + 1}</th>
                                                <td className='px-6 py-2 font-semibold'>Semester {smt.semester}</td>
                                                <td className='px-6 py-2 font-semibold'>{smt.tahunAjarans[0].tahun_ajaran}</td>
                                                <td className='px-6 py-2 font-semibold'><Moment date={smt.tanggal_aktif} format="DD MMMM YYYY" /></td>
                                                <td className='px-6 py-2 font-semibold'>{smt.keterangan}</td>
                                                <td className='px-6 py-2 font-semibold'><span className="badge badge-success badge-sm font-semibold capitalize">{smt.status}</span></td>
                                                <td className='px-6 py-2' align='center'>
                                                    <div>
                                                        <button className="btn btn-xs btn-circle text-white btn-warning mr-1" title='Edit' onClick={() => modalEditOpen(smt.id_semester)}><FaEdit /></button>
                                                        <button className="btn btn-xs btn-circle text-white btn-error" title='Hapus' onClick={() => nonaktifkan(smt.id_semester)}><FaTrash /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : smt.code_tahun_ajaran == kodeThn ? (
                                            <tr key={smt.id_semester} className='bg-white border-b text-gray-500 border-x'>
                                                <th scope="row" className="px-6 py-2 font-semibold whitespace-nowrap">{index + 1}</th>
                                                <td className='px-6 py-2 font-semibold'>Semester {smt.semester}</td>
                                                <td className='px-6 py-2 font-semibold'>{smt.tahunAjarans[0].tahun_ajaran}</td>
                                                <td className='px-6 py-2 font-semibold'><Moment date={smt.tanggal_aktif} format="DD MMMM YYYY" /></td>
                                                <td className='px-6 py-2 font-semibold'>{smt.keterangan}</td>
                                                <td className='px-6 py-2 font-semibold'><span className="badge badge-success badge-sm font-semibold capitalize">{smt.status}</span></td>
                                                <td className='px-6 py-2' align='center'>
                                                    <div>
                                                        <button className="btn btn-xs btn-circle text-white btn-warning mr-1" title='Edit' onClick={() => modalEditOpen(smt.id_semester)}><FaEdit /></button>
                                                        <button className="btn btn-xs btn-circle text-white btn-error" title='Hapus' onClick={() => nonaktifkan(smt.id_semester)}><FaTrash /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            ""
                                        )
                                    })}
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

export default ListSemester