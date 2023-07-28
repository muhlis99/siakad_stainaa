import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FaArrowLeft, FaArrowRight, FaCheck, FaPlus, FaSearch, FaTimes } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import ReactPaginate from 'react-paginate'
import { Link } from "react-router-dom"

const ListPengajuanStudi = () => {
    const [Studi, setStudi] = useState([])
    const [page, setPage] = useState(0)
    const [perPage, setperPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [rows, setrows] = useState(0)
    const [query, setQuery] = useState("")
    const [keyword, setKeyword] = useState("")
    const [msg, setMsg] = useState("")
    const [jenjang, setJenjang] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [prodi, setProdi] = useState("")
    const [tahun, setTahun] = useState("")
    const [semester, setSemester] = useState("")
    const [nim, setNim] = useState("")
    const [nama, setNama] = useState("")
    const [ajuan, setAjuan] = useState("")
    const [tgl, setTgl] = useState("")
    const [alasan, setAlasan] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        getDataStudi()
    }, [page, keyword])

    const getDataStudi = async () => {
        const response = await axios.get(`v1/pengajuanStudi/all?page=${page}&search=${keyword}`)
        setStudi(response.data.data)
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

    // const cariData = (e) => {
    //     e.preventDefault();
    //     setPage(0)
    //     setKeyword(query)
    // }

    const modalOpen = async (e) => {
        try {
            const response = await axios.get(`v1/pengajuanStudi/getById/${e}`)
            setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
            setFakultas(response.data.data.fakultas[0].nama_fakultas)
            setProdi(response.data.data.prodis[0].nama_prodi)
            setTahun(response.data.data.tahunAjarans[0].tahun_ajaran)
            setSemester(response.data.data.semesters[0].semester)
            setNim(response.data.data.nim)
            setNama(response.data.data.mahasiswas[0].nama)
            setAjuan(response.data.data.pengajuan)
            setTgl(response.data.data.tanggal_pengajuan)
            setAlasan(response.data.data.alasan)
            setStatus(response.data.data.status)
            document.getElementById('my-modal').checked = true
        } catch (error) {

        }
    }

    const modalClose = (e) => {
        e.preventDefault()
        document.getElementById('my-modal').checked = false
        setJenjang("")
        setFakultas("")
        setProdi("")
        setTahun("")
        setSemester("")
        setNim("")
        setNama("")
        setAjuan("")
        setTgl("")
        setAlasan("")
        setStatus("")
    }

    const setujui = async (e) => {
        try {
            await axios.put(
                `v1/pengajuanStudi/approveBuak/${e}`
            ).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getDataStudi()
                })
            })
        } catch (error) {
        }
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w max-w-4xl rounded-md scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100">
                    <button className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                    <div className="py-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">NIM</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: {nim}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">SEMESTER</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: SEMESTER {semester}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">NAMA</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: {nama}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">PENGAJUAN</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a className='uppercase'>: {ajuan}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">JENJANG PENDIDIKAN</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: {jenjang}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">TANGGAL PENGAJUAN</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: {tgl}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">FAKULTAS</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: {fakultas}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">ALASAN</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: {alasan}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">PROGRAM STUDI</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: {prodi}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">STATUS</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: {status == "disetujui1" ? <span>Disetujui oleh BAUAK</span> : status == "disetujui2" ? <span>Disetujui oleh Dosen Wali</span> : status == "proses" ? <span>Proses</span> : <span>Tidak Disetujui</span>}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-48'>
                                    <label>
                                        <span className="">TAHUN AJARAN</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-72'>
                                    <a>: {tahun}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Pengajuan Studi</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-flow-col">
                            <div>
                                <Link to='/setpengajuan' className="btn btn-primary btn-sm"><FaPlus /> <span className="ml-1">tambah data</span></Link>
                            </div>
                            {/* <div>
                                <form className='mb-1' onSubmit={cariData}>
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
                            </div> */}
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-2 py-3">#</th>
                                        <th scope="col" className="px-2 py-3">NIM</th>
                                        <th scope="col" className="px-2 py-3">Nama</th>
                                        <th scope="col" className="px-2 py-3">Prodi</th>
                                        <th scope="col" className="px-2 py-3">Semester</th>
                                        <th scope="col" className="px-2 py-3">Pengajuan</th>
                                        <th scope="col" className="px-2 py-3">Alasan</th>
                                        <th scope="col" className='px-2 py-3'>Status</th>
                                        <th scope="col" className="px-2 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Studi.map((item, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-2 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-2 py-2'>{item.mahasiswas[0].nim}</td>
                                            <td className='px-2 py-2'>{item.mahasiswas[0].nama}</td>
                                            <td className='px-2 py-2'>{item.prodis[0].nama_prodi}</td>
                                            <td className='px-2 py-2'>Semester {item.semesters[0].semester}</td>
                                            <td className='px-2 py-2'>{item.pengajuan}</td>
                                            <td className='px-2 py-2'>{item.alasan}</td>
                                            <td className='px-2 py-2'>{item.status == 'disetujui1' || item.status == 'disetujui2' ? <span className="badge badge-success badge-sm">Disetujui</span> : item.status == 'proses' ? <span className="badge badge-warning badge-sm">Proses</span> : <span className="badge badge-error badge-sm">Tidak disetujui</span>}</td>
                                            <td className='px-2 py-2' align='center'>
                                                <div>
                                                    <button className='btn btn-info btn-xs mr-1 text-white btn-circle' onClick={() => modalOpen(item.id_pengajuan_studi)}><FaSearch /></button>
                                                    {item.status == 'proses' ? <button className="btn btn-xs btn-circle text-white btn-primary mr-1" onClick={() => setujui(item.id_pengajuan_studi)} title='Setujui'><FaCheck /></button> : <button className="btn btn-xs btn-circle text-white btn-disabled mr-1" title='Edit'><FaCheck /></button>}
                                                    <button className="btn btn-xs btn-circle text-white btn-error" title='Hapus'
                                                    // onClick={() => nonaktifkan(smt.id_semester)}
                                                    ><FaTimes /></button>
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
                                previousLinkClassName={"btn btn-xs btn-default-outline btn-circle btn-outline"}
                                nextLinkClassName={"btn btn-xs btn-default-outline btn-circle btn-outline ml-1"}
                                breakLinkClassName={"btn btn-xs btn-default-outline btn-circle btn-outline ml-1"}
                                activeLinkClassName={"btn btn-xs btn-default-outline btn-circle btn-default-activ"}
                                pageLinkClassName={"btn btn-xs btn-default-outline btn-outline btn-circle ml-1"}
                                disabledLinkClassName={"btn btn-xs btn-circle btn-outline btn-disabled"}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListPengajuanStudi