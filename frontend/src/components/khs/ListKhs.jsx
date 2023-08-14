import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation } from "react-router-dom"
import { FaSearch } from 'react-icons/fa'
import Loading from '../Loading'

const ListKhs = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        if (location.state != null) {
            setKodeJenjang(location.state.jen)
            setKodeFakultas(location.state.fak)
            setKodeProdi(location.state.pro)
            setKodeTahun(location.state.thn)
            setKodeSemester(location.state.sem)
        }
    }, [location])

    useEffect(() => {
        getJenjang()
        getTahun()
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

    useEffect(() => {
        getMhsBySemester()
    }, [kodeFakultas, kodeJenjang, kodeProdi, kodeSemester, kodeTahun])

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

    const getMhsBySemester = async () => {
        if (kodeFakultas != 0 & kodeJenjang != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/khs/all/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
            setMahasiswa(response.data.data)
        }
    }

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Kartu Hasil Studi</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-5 gap-2">
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
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 card-bordered shadow-md mt-2">
                    <div className="card-body p-4">
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" align='center' className="px-2 py-2 text-sm w-5">#</th>
                                        <th scope="col" align='center' className="px-2 py-2 text-sm w-5">NIM</th>
                                        <th scope="col" align='center' className="px-2 py-2 text-sm">Nama</th>
                                        <th scope="col" align='center' className="px-2 py-2 text-sm">Jenjang Pendidikan</th>
                                        <th scope="col" align='center' className="px-2 py-2 text-sm">Fakultas</th>
                                        <th scope="col" align='center' className="px-2 py-2 text-sm">Prodi</th>
                                        <th scope="col" align='center' className="px-2 py-2 text-sm">Tahun Ajaran</th>
                                        <th scope="col" align='center' className="px-2 py-2 text-sm">Semester</th>
                                        <th scope="col" align='center' className="px-2 py-2 text-sm w-5">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Mahasiswa.length == 0 ?
                                        <tr className='bg-white border-b border-x text-gray-500'>
                                            <td className='px-6 py-2 font-semibold' align='center' colSpan='9'>Data Mahasiswa Kosong</td>
                                        </tr>
                                        :
                                        Mahasiswa.map((mhs, index) => (
                                            <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                                <th scope="row" align='center' className="px-2 py-2 font-semibold whitespace-nowrap">{index + 1}</th>
                                                <td className='px-2 py-2 font-semibold' align='center'>{mhs.mahasiswas[0].nim}</td>
                                                <td className='px-2 py-2 font-semibold' align='center'>{mhs.mahasiswas[0].nama}</td>
                                                <td className='px-2 py-2 font-semibold' align='center'>{mhs.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                                <td className='px-2 py-2 font-semibold' align='center'>{mhs.fakultas[0].nama_fakultas}</td>
                                                <td className='px-2 py-2 font-semibold' align='center'>{mhs.prodis[0].nama_prodi}</td>
                                                <td className='px-2 py-2 font-semibold' align='center'>{mhs.tahunAjarans[0].tahun_ajaran}</td>
                                                <td className='px-2 py-2 font-semibold' align='center'>{mhs.semesters[0].semester}</td>
                                                <td className="px-2 py-2">
                                                    <Link to={`/view/${mhs.nim}/${kodeFakultas}/${kodeJenjang}/${kodeProdi}/${kodeSemester}/${kodeTahun}`} state={{ collaps: 'kuliah', activ: '/khs' }} className="btn btn-xs btn-info btn-circle" title='Detail'><FaSearch /></Link>
                                                </td>
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

export default ListKhs