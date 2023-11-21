import React, { useEffect, useState } from 'react'
import { FaEdit, FaPlus, FaSave, FaArrowRight, FaArrowLeft, FaSearch, FaTimes, FaInfo, FaCalendar, FaUser } from 'react-icons/fa'
import { SlOptions } from "react-icons/sl"
import axios from 'axios'
import moment from 'moment'
import ReactPaginate from "react-paginate"
import Swal from 'sweetalert2'

const ListPengumuman = () => {
    const [Pengumuman, setPengumuman] = useState([])
    const [dataId, setDataId] = useState("")
    const [judul, setJudul] = useState("")
    const [isi, setIsi] = useState("")
    const [tujuan, setTujuan] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [modal, setModal] = useState("")
    const [rows, setrows] = useState(0)
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [keyword, setKeyword] = useState("")
    const [query, setQuery] = useState("")
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])

    useEffect(() => {
        const d = new Date()
        setTanggal(moment(d).format('YYYY-MM-DD'))
    }, [])

    useEffect(() => {
        getPengumumanAll()
    }, [page, keyword])

    const getPengumumanAll = async () => {
        try {
            const response = await axios.get(`v1/pengumuman/all?page=${page}&search=${keyword}`)
            setPengumuman(response.data.data)
            setrows(response.data.total_data)
            setPage(response.data.current_page)
            setPages(response.data.totalPage)
            setperPage(response.data.per_page)
        } catch (error) {

        }
    }

    const pageCount = Math.ceil(rows / perPage);

    const changePage = (event) => {
        const newOffset = (event.selected + 1);
        console.log(event.selected, newOffset)
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

    const myModalAdd = (e) => {
        setModal(e)
        document.getElementById('my-modal').checked = true;
    }

    const myModalEdit = async (e, f) => {
        try {
            const response = await axios.get(`v1/pengumuman/getById/${f}`)
            setDataId(response.data.data.id_pengumuman)
            setTanggal(response.data.data.tanggal_pengumuman)
            setJudul(response.data.data.judul_pengumuman)
            setIsi(response.data.data.pengumuman)
            setTujuan(response.data.data.level)
        } catch (error) {

        }
        setModal(e)
        document.getElementById('my-modal').checked = true;
    }

    const simpanPengumuman = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`v1/pengumuman/create`, {
                tanggal_pengumuman: tanggal,
                judul_pengumuman: judul,
                pengumuman: isi,
                level: tujuan
            }).then(function (response) {
                document.getElementById('my-modal').checked = false;
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    getPengumumanAll()
                    setJudul("")
                    setIsi("")
                    setTujuan("")
                });
            })
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const updatePengumuman = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/pengumuman/update/${dataId}`, {
                tanggal_pengumuman: tanggal,
                judul_pengumuman: judul,
                pengumuman: isi,
                level: tujuan
            }).then(function (response) {
                document.getElementById('my-modal').checked = false;
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    getPengumumanAll()
                    setDataId("")
                    setJudul("")
                    setIsi("")
                    setTujuan("")
                });
            })
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const myModalClose = () => {
        setJudul("")
        setIsi("")
        setTujuan("")
        document.getElementById('my-modal').checked = false;
    }



    return (
        <div className="container mt-2">
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    {modal == 'Tambah' || modal == 'Edit' ?
                        <form onSubmit={modal == 'Tambah' ? simpanPengumuman : updatePengumuman}>
                            <div className='bg-base-200 border-b-2 p-3'>
                                <h3 className="font-bold text-xl mb-1">{modal}</h3>
                                <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={myModalClose}><FaTimes /></button>
                            </div>
                            <div className='mb-2'>
                                <div className="py-4 px-4">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Judul Pengumuman</span>
                                        </label>
                                        <div className="form-control w-full ">
                                            <input type="text" placeholder="Judul Pengumuman" value={judul} onChange={(e) => setJudul(e.target.value)} className="input input-sm input-bordered w-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Isi Pengumuman</span>
                                        </label>
                                        <div className="form-control w-full ">
                                            <textarea
                                                className="textarea textarea-bordered w-full"
                                                placeholder="Isi Pengumuman"
                                                value={isi}
                                                onChange={(e) => setIsi(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Ditujukan Kepada</span>
                                        </label>
                                        <div className="form-control w-full ">
                                            <select className='select select-bordered select-sm w-full' value={tujuan} onChange={(e) => setTujuan(e.target.value)}>
                                                <option value="">Ditujukan Kepada</option>
                                                <option value="dosen">Dosen</option>
                                                <option value="mahasiswa">Mahasiswa</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-3 border-t-2 text-center'>
                                {modal == 'Tambah' ?
                                    <button type='submit' className="btn btn-sm btn-primary capitalize"><FaSave />simpan</button>
                                    : <button type='submit' className="btn btn-sm btn-primary capitalize"><FaEdit />Edit</button>
                                }
                            </div>
                        </form> : <>
                            <div className='bg-base-200 border-b-2 p-3'>
                                <h3 className="font-bold text-xl mb-1">{judul}</h3>
                                <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={myModalClose}><FaTimes /></button>
                            </div>
                            <div className='mb-2'>
                                <div className="py-2 px-4">
                                    <div className="grid grid-cols-2">
                                        <div className='py-1 px-2 text-gray-600 inline-flex items-center mt-2'><FaCalendar /> &nbsp; <span>{tanggal}</span></div>
                                        <div className='py-1 px-2 text-gray-600 inline-flex items-center mt-2'><FaUser /> &nbsp; <span className='capitalize'>{tujuan}</span></div>
                                    </div>
                                    <hr />
                                    <div className='mt-3'>
                                        <p className='text-gray-600'>
                                            {isi}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>

            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pengumuman</h1>
            </section>
            <section>
                <div className="card card-bordered bg-base-100 shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <button onClick={() => myModalAdd('Tambah')} className="btn btn-success btn-sm capitalize rounded-md"><FaPlus /> tambah data</button>
                            </div>
                            <div>
                                <div className="form-control">
                                    <div className="input-group justify-end">
                                        <input
                                            type="text"
                                            onChange={cariData}
                                            className="input input-sm input-success rounded-md"
                                            placeholder='Cari'
                                        />
                                        <button className="btn btn-sm btn-square btn-success">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece] drop-shadow-sm'>
                                    <tr className='border-x'>
                                        <th scope="col" className="px-3 py-2 text-sm">#</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Judul</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Tanggal</th>
                                        <th scope="col" className='px-3 py-2 text-sm'>Isi Pengumuman</th>
                                        <th scope="col" className='px-3 py-2 text-sm'>Ditujukan</th>
                                        <th scope="col" className="px-3 py-2" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Pengumuman.map((item, index) => (
                                        <tr key={item.id_pengumuman} className='bg-white border-b border-x text-gray-500'>
                                            <th scope='row' className="px-3 py-2 whitespace-nowrap font-semibold border-l">{index + 1}</th>
                                            <td className='px-3 py-2 font-semibold'>{item.judul_pengumuman}</td>
                                            <td className='px-3 py-2 font-semibold'>{item.tanggal_pengumuman}</td>
                                            <td className='px-3 py-2 font-semibold'>{item.pengumuman.substr(0, 90)}...</td>
                                            <td className='px-3 py-2 font-semibold capitalize'>{item.level}</td>
                                            <td className='px-3 py-2 font-semibold'>
                                                <button className="btn btn-xs btn-circle text-white btn-info" onClick={() => myModalEdit('Detail', item.id_pengumuman)} title='Lihat'><FaInfo /></button>
                                                <button className="btn btn-xs btn-circle text-white btn-warning ml-1" onClick={() => myModalEdit('Edit', item.id_pengumuman)} title='Edit'><FaEdit /></button>
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
        </div >
    )
}

export default ListPengumuman