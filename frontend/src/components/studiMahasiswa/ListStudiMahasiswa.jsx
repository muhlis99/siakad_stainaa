import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ListStudiMahasiswa = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Studi, setStudi] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")

    useEffect(() => {
        getJenjang()
        getTahun()
        getStudiMhs()
    }, [])

    useEffect(() => {
        getFakultasByJenjang()
    }, [kodeJenjang])

    useEffect(() => {
        getProdiByFakultas()
    }, [kodeFakultas])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

    const getJenjang = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all')
        setJenjang(response.data.data)
    }

    const getFakultasByJenjang = async () => {
        if (kodeJenjang != 0) {
            const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
            setFakultas(response.data.data)
        }
    }

    const getProdiByFakultas = async () => {
        if (kodeFakultas != 0) {
            const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
            setProdi(response.data.data)
        }
    }

    const getTahun = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getSemester = async () => {
        if (kodeTahun != 0) {
            const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
            setSemester(response.data.data)
        }
    }

    const getStudiMhs = async () => {
        const response = await axios.get('v1/pengajuanStudi/allAdmin')
        setStudi(response.data.data)
    }

    return (
        <div className='container mt-2'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Studi Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        {/* <div className="grid grid-cols-5 gap-2">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Jenjang Pendidikan</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                    <option value="">Jenjang Pendidikan</option>
                                    {Jenjang.map((item) => (
                                        <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Fakultas</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                    <option value="">Fakultas</option>
                                    {Fakultas.map((item) => (
                                        <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Prodi</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                    <option value="">Prodi</option>
                                    {Prodi.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Tahun Ajaran</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item, index) => (
                                        <option key={index} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Semester</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                    <option value="">Semester</option>
                                    {Semester.map((item) => (
                                        <option key={item.code_semester} value={item.code_semester}>Semester {item.semester}</option>
                                    ))}
                                </select>
                            </div>
                        </div> */}
                        <div>
                            <Link to="/studimhs/add" state={{ collaps: 'kuliah', activ: '/studimhs' }} className="btn btn-sm btn-success"><FaPlus /> tambah data</Link>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" align='center' className="px-2 py-3 w-5">#</th>
                                        <th scope="col" align='center' className="px-2 py-3 w-5">NIM</th>
                                        <th scope="col" align='center' className="px-2 py-3">Nama</th>
                                        <th scope="col" align='center' className="px-2 py-3">Jenjang Pendidikan</th>
                                        <th scope="col" align='center' className="px-2 py-3">Fakultas</th>
                                        <th scope="col" align='center' className="px-2 py-3">Prodi</th>
                                        <th scope="col" align='center' className="px-2 py-3">Tahun Ajaran</th>
                                        <th scope="col" align='center' className="px-2 py-3">Semester</th>
                                        <th scope="col" align='center' className="px-2 py-3 w-5">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Studi.map((item, index) => (
                                        <tr className='bg-white border-b text-gray-500'>
                                            <th scope="row" align='center' className="px-2 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-2 py-2' align='center'>{item.nim}</td>
                                            <td className='px-2 py-2' align='center'>{item.mahasiswas[0].nama}</td>
                                            <td className='px-2 py-2' align='center'>{item.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-2 py-2' align='center'>{item.fakultas[0].nama_fakultas}</td>
                                            <td className='px-2 py-2' align='center'>{item.prodis[0].nama_prodi}</td>
                                            <td className='px-2 py-2' align='center'>{item.tahunAjarans[0].tahun_ajaran}</td>
                                            <td className='px-2 py-2' align='center'>Semester {item.semesters[0].semester}</td>
                                            <td className="px-2 py-2" align='center'><span className='capitalize'>{item.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListStudiMahasiswa