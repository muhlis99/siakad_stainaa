import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaCheck, FaSearch, FaTrash } from 'react-icons/fa'

const ListKrs = () => {
    const [Program, setProgram] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Krs, setKrs] = useState([])
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

    return (
        <div className='mt-2 container'>
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
                                        <td className='px-2 py-2 border' align='center'>{item.jmlValidasiMahasiswa}</td>
                                        <td className='px-2 py-2 border' align='center'>{item.jmlPaketMahasiswa}</td>
                                        <td className='px-2 py-2 border' align='center'>{item.keterangan}</td>
                                        <td className='px-2 py-2 border' align='center'>
                                            <div>
                                                <div className="tooltip" data-tip="Paketkan Mahasiswa"><button className="btn btn-xs btn-circle text-white btn-default" title='Paketkan Mahasiswa'><FaCheck /></button></div>
                                                <div className="tooltip" data-tip="Lihat MK Paket"><button className="btn btn-xs btn-circle text-white btn-blue ml-1" title='Lihat MK Paket'><FaSearch /></button></div>
                                                <div className="tooltip" data-tip="Batal"><button className="btn btn-xs btn-circle text-white btn-danger ml-1" title='Batal'><FaTrash /></button></div>
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