import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaFileSignature } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const ListPenilaian = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Makul, setMakul] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
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
        getJenjang()
    }, [])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getMakul()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeSemester, kodeTahun])

    const getJenjang = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all')
        setJenjang(response.data.data)
    }

    const getFakultas = async () => {
        if (kodeJenjang != 0) {
            const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
            setFakultas(response.data.data)
        }
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
        if (kodeTahun != 0) {
            const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
            setSemester(response.data.data)
        }
    }

    const getMakul = async () => {
        if (kodeJenjang != 0 & kodeFakultas != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/jadwalKuliah/all/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
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
                    <div className="grid grid-cols-5 gap-2 mb-5 p-3 rounded-md">
                        <div>
                            <label>
                                <span className="">Jenjang Pendidikan</span>
                            </label>
                            <select className="select select-bordered select-sm w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                <option value="">Jenjang Pendidikan</option>
                                {Jenjang.map((item) => (
                                    <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>
                                <span className="">Fakultas</span>
                            </label>
                            <select className="select select-bordered select-sm w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                <option value="">Fakultas</option>
                                {Fakultas.map((item) => (
                                    <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>
                                <span className="">Prodi</span>
                            </label>
                            <select className="select select-bordered select-sm w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                <option value="">Prodi</option>
                                {Prodi.map((item) => (
                                    <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>
                                <span className="">Tahun Ajaran</span>
                            </label>
                            <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                <option value="">Tahun Ajaran</option>
                                {Tahun.map((item) => (
                                    <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>
                                <span className="">Semester</span>
                            </label>
                            <select className="select select-sm select-bordered w-full" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                <option value="">Semester</option>
                                {Semester.map((item) => (
                                    <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                ))}
                            </select>
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
                                                    <Link to={`/inputnilai`} state={{ jen: item.code_jenjang_pendidikan, fak: item.code_fakultas, pro: item.code_prodi, thn: item.code_tahun_ajaran, sem: item.code_semester, idn: item.id_mata_kuliah, kod: item.code_mata_kuliah }} className="btn btn-xs btn-circle btn-warning mr-1" title='Input Nilai'><FaFileSignature /></Link>
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