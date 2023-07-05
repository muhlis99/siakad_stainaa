import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaFileSignature } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const ListPenilaian = () => {
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Makul, setMakul] = useState([])
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")

    useEffect(() => {
        getFakultas()
        getSemester()
        getTahunAjaran()
    }, [])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getMakul()
    }, [kodeFakultas, kodeProdi, kodeSemester, kodeTahun])

    const getFakultas = async () => {
        const response = await axios.get('v1/fakultas/all')
        setFakultas(response.data.data)
    }

    const getProdi = async () => {
        if (kodeFakultas != 0) {
            const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
            setProdi(response.data.data)
        }
    }

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getSemester = async () => {
        const response = await axios.get(`v1/semester/all`)
        setSemester(response.data.data)
    }

    const getMakul = async () => {
        if (kodeFakultas != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/jadwalKuliah/all/${kodeTahun}/${kodeSemester}/${kodeFakultas}/${kodeProdi}`)
            setMakul(response.data.data)
        }
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Penilaian Mahasiswa</h1>
            </section>
            <div className="card bg-base-100 card-bordered shadow-md">
                <div className="card-body p-4">
                    <div className="grid grid-cols-2 gap-3 mb-5 bg-base-200 p-3 rounded-md">
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Fakultas</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <select className="select select-bordered select-sm w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                    <option value="">Fakultas</option>
                                    {Fakultas.map((item) => (
                                        <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Prodi</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <select className="select select-bordered select-sm w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                    <option value="">Prodi</option>
                                    {Prodi.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Tahun Ajaran</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Semester</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <select className="select select-sm select-bordered w-full" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                    <option value="">Semester</option>
                                    {Semester.map((item) => (
                                        <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Kode Mata Kuliah</th>
                                        <th scope="col" className="px-6 py-3">Mata Kuliah</th>
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className='px-6 py-3'>Prodi</th>
                                        <th scope="col" className="px-6 py-3" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Makul.map((item, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-6 py-2'>{item.code_mata_kuliah}</td>
                                            <td className='px-6 py-2'>{item.nama_mata_kuliah}</td>
                                            <td className='px-6 py-2'>{item.fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2'>{item.prodis[0].nama_prodi}</td>
                                            <td className='px-6 py-2' align='center'>
                                                <div>
                                                    <Link to={`/inputnilai/${item.code_mata_kuliah}/${item.code_tahun_ajaran}/${item.code_semester}/${item.id_mata_kuliah}`} className="btn btn-xs btn-circle text-white btn-blue mr-1" title='Input Nilai'><FaFileSignature /></Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListPenilaian