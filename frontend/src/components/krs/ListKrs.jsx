import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaCheck, FaSearch, FaTimes, } from 'react-icons/fa'
import { MdDoNotDisturb } from 'react-icons/md'
import Swal from 'sweetalert2'

const ListKrs = () => {
    const [Program, setProgram] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Krs, setKrs] = useState([])
    const [view, setView] = useState([])
    const [total, setTotal] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")

    useEffect(() => {
        getProdiAll()
        getTahunAjaran()
    }, [])

    useEffect(() => {
        getKrsAll()
    }, [kodeTahun, kodeProdi])

    const getProdiAll = async () => {
        const response = await axios.get('v1/prodi/all')
        setProgram(response.data.data)
    }

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getKrsAll = async () => {
        if (kodeProdi != 0 && kodeTahun != 0) {
            const response = await axios.get(`v1/krs/all?tahunAjaran=${kodeTahun}&prodi=${kodeProdi}`)
            setKrs(response.data.data)
        }
    }

    const getViewKrs = async (e, f, g) => {
        const response = await axios.get(`v1/krs/viewAll/${e}/${f}/${g}`)
        setView(response.data.data.rows)
        setTotal(response.data.data.count)
        document.getElementById('my-modal').checked = true
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
    }

    const paketkan = async (e, f, g) => {
        try {
            await axios.post(
                `v1/krs/create/${e}/${f}/${g}`
            ).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getKrsAll()
                })
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

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal absolute">
                <div className="modal-box w-11/12 max-w-2xl rounded-none scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100">
                    <button className="btn btn-xs btn-circle btn-danger absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                    <div className="py-4">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-2 py-3" align='center'>#</th>
                                        <th scope="col" className="px-2 py-3" align='center'>Mata Kuliah</th>
                                        <th scope="col" className="px-2 py-3" align='center'>SKS</th>
                                        <th scope="col" className='px-2 py-3' align='center'>SKS Praktek</th>
                                        <th scope="col" className='px-2 py-3' align='center'>SKS Prak Lapangan</th>
                                        <th scope="col" className="px-2 py-3" align='center'>SKS Simulasi</th>
                                        <th scope="col" className="px-2 py-3" align='center'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {view.map((item, index) => (
                                        <tr key={item.id_mata_kuliah} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-2 py-2 font-medium whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className='px-2 py-2'>{item.nama_mata_kuliah}</td>
                                            <td className='px-2 py-2' align='center'>{item.sks}</td>
                                            <td className='px-2 py-2' align='center'>{item.sks_praktek}</td>
                                            <td className='px-2 py-2' align='center'>{item.sks_prak_lapangan}</td>
                                            <td className='px-2 py-2' align='center'>{item.sks_simulasi}</td>
                                            <td className='px-2 py-2' align='center'>{item.status_makul == 'paket' ? <span className='badge badge-sm badge-default'>Paket</span> : <span className='badge badge-sm badge-jingga opacity-80'>Non Paket</span>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className='text-gray-700'>
                                    <tr>
                                        <th scope="col" className="px-2 py-3" colSpan='6'>Total Mata Kuliah</th>
                                        <th scope="col" className="px-2 py-3" align='center'>{total}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Kartu Rencana Studi</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid lg:grid-cols-2 gap-2">
                            <div className='flex gap-2'>
                                <label className="label">
                                    <span className="text-base label-text">Program Studi</span>
                                </label>
                                <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                    <option value="">Program Studi</option>
                                    {Program.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-2'>
                                <label className="label">
                                    <span className="text-base label-text">Tahun Ajaran</span>
                                </label>
                                <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                            <thead className='text-gray-700 bg-[#F2F2F2]'>
                                <tr>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Smt</th>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Tahun Ajaran</th>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Mata Kuliah</th>
                                    <th scope="col" className="px-2 py-2 border" colSpan="2">Jumlah Mahasiswa</th>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Keterangan</th>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Aksi</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-2 py-2 border">Valid</th>
                                    <th scope="col" className="px-2 py-2 border">Paket</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Krs.map((item, index) => (
                                    <tr key={index + 1} className='bg-white border text-gray-500' >
                                        <th scope="row" className="px-2 py-2 border font-medium whitespace-nowrap">{item.semester[0].semesters[0].semester}</th>
                                        <td className='px-2 py-2 border' align='center'>{item.tahun}</td>
                                        <td className='px-2 py-2 border' align='center'>{item.Paketmakul[0].count}</td>
                                        <td className='px-2 py-2 border' align='center'>{item.jumlahTotalMahasiswa}</td>
                                        <td className='px-2 py-2 border' align='center'>{item.jumlahMahasiswaPaket[0] ? item.jumlahMahasiswaPaket[0].count : item.jumlahMahasiswaPaket}</td>
                                        <td className='px-2 py-2 border' align='center'>{item.keterangan == 'paket belum' ? <span className='badge badge-sm badge-jingga opacity-80'>Paket Belum</span> : <span className='badge badge-sm badge-default'>Paket Selesai</span>}</td>
                                        <td className='px-2 py-2 border' align='center'>
                                            <div>
                                                <div className="tooltip" data-tip="Lihat MK Paket"><button className="btn btn-xs btn-circle text-white btn-blue mr-1" onClick={() => getViewKrs(item.Paketmakul[0].code_semester.substr(0, 4), kodeProdi, item.Paketmakul[0].code_semester)} title='Lihat MK Paket'><FaSearch /></button></div>
                                                {item.keterangan == 'paket belum' ? <div className="tooltip" data-tip="Paketkan Mahasiswa"><button className="btn btn-xs btn-circle text-white btn-default" onClick={() => paketkan(item.Paketmakul[0].code_semester.substr(0, 4), kodeProdi, item.Paketmakul[0].code_semester)} title='Paketkan Mahasiswa'><FaCheck /></button></div> : <div className="tooltip" data-tip="Paket Selesai"><button className="btn btn-disabled btn-orange btn-xs btn-circle text-white" tabIndex="-1" role="button" aria-disabled="true"><FaTimes /></button></div>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default ListKrs