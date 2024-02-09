import React, { useState, useEffect } from 'react'
import { FaSearch, FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { SlOptions } from 'react-icons/sl'
import { Link, useLocation } from "react-router-dom"
import axios from 'axios'
// import ReactPaginate from "react-paginate"
import Swal from "sweetalert2"
import Loading from '../Loading'

const ListMakulJurnal = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [idJenjangPendidikan, setIdJenjangPendidikan] = useState("")
    const [jenjangPendidikan, setJenjangPendidikan] = useState("")
    const [idFakultas, setIdFakultas] = useState("")
    const [namaFakultas, setNamaFakultas] = useState("")
    const [idProdi, setIdProdi] = useState("")
    const [namaProdi, setNamaProdi] = useState("")
    const [idTahun, setIdTahun] = useState("")
    const [namaTahun, setNamaTahun] = useState("")
    const [idSemester, setIdSemester] = useState("")
    const [namaSemester, setNamaSemester] = useState("")
    const [mataKuliah, setMataKuliah] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        if (location.state != null) {
            setIdJenjangPendidikan(location.state.idJenjangPendidikan)
            setIdFakultas(location.state.idFakultas)
            setIdProdi(location.state.idProdi)
            setIdTahun(location.state.idTahun)
            setIdSemester(location.state.idSemester)
        }
    }, [location])

    useEffect(() => {
        getTahunAjaran()
    }, [])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getJenjangById()
    }, [idJenjangPendidikan])

    useEffect(() => {
        getFakultasById()
    }, [idFakultas])

    useEffect(() => {
        getProdiById()
    }, [idProdi])

    useEffect(() => {
        getTahunAjaranById()
    }, [idTahun])

    useEffect(() => {
        getSemesterById()
    }, [idSemester])

    useEffect(() => {
        getMakul()
    }, [kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi])

    const getJenjangPendidikan = async () => {
        try {
            const response = await axios.get('v1/jenjangPendidikan/all')
            setJenjang(response.data.data)
        } catch (error) {

        }
    }

    const getJenjangById = async () => {
        try {
            if (idJenjangPendidikan) {
                const response = await axios.get(`v1/jenjangPendidikan/getById/${idJenjangPendidikan}`)
                setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                setJenjangPendidikan(response.data.data.nama_jenjang_pendidikan)
            }
        } catch (error) {

        }
    }

    const getFakultas = async () => {
        try {
            if (kodeJenjang != 0) {
                const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
                setFakultas(response.data.data)
            }
        } catch (error) {

        }
    }

    const getFakultasById = async () => {
        try {
            if (idFakultas) {
                const response = await axios.get(`v1/fakultas/getById/${idFakultas}`)
                setKodeFakultas(response.data.data.code_fakultas)
                setNamaFakultas(response.data.data.nama_fakultas)
            }
        } catch (error) {

        }
    }

    const getProdi = async () => {
        try {
            if (kodeFakultas != 0) {
                const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
                setProdi(response.data.data)
            }
        } catch (error) {

        }
    }

    const getProdiById = async () => {
        try {
            if (idProdi) {
                const response = await axios.get(`v1/prodi/getById/${idProdi}`)
                setKodeProdi(response.data.data.code_prodi)
                setNamaProdi(response.data.data.nama_prodi)
            }
        } catch (error) {

        }
    }

    const getTahunAjaran = async () => {
        try {
            const response = await axios.get('v1/tahunAjaran/all')
            setTahun(response.data.data)
        } catch (error) {

        }
    }

    const getTahunAjaranById = async () => {
        try {
            if (idTahun) {
                const response = await axios.get(`v1/tahunAjaran/getById/${idTahun}`)
                setKodeTahun(response.data.data.code_tahun_ajaran)
                setNamaTahun(response.data.data.tahun_ajaran)
            }
        } catch (error) {

        }
    }

    const getSemester = async () => {
        try {
            if (kodeTahun != 0) {
                const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
                setSemester(response.data.data)
            }
        } catch (error) {
            // console.log(error.response)
        }
    }

    const getSemesterById = async () => {
        try {
            if (idSemester) {
                const response = await axios.get(`v1/semester/getById/${idSemester}`)
                setKodeSemester(response.data.data.code_semester)
                setNamaSemester(response.data.data.semester)
            }
        } catch (error) {

        }
    }

    const getMakul = async () => {
        try {
            if (kodeTahun && kodeSemester && kodeJenjang && kodeFakultas && kodeProdi) {
                const response = await axios.get(`v1/jurnalDosen/getMakul/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setMataKuliah(response.data.data)
            }
        } catch (error) {

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
                <h1 className='text-2xl font-bold'>Jurnal Kehadiran</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-5 gap-2">
                            <div>
                                <select className="select select-sm select-bordered w-full" value={idJenjangPendidikan} onChange={(e) => setIdJenjangPendidikan(e.target.value)}>
                                    <option value="">Jenjang Pendidikan</option>
                                    {Jenjang.map((item) => (
                                        <option key={item.id_jenjang_pendidikan} value={item.id_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="select select-bordered select-sm w-full" value={idFakultas} onChange={(e) => setIdFakultas(e.target.value)}>
                                    <option value="">Fakultas</option>
                                    {Fakultas.map((item) => (
                                        <option key={item.id_fakultas} value={item.id_fakultas}>{item.nama_fakultas}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="select select-bordered select-sm w-full" value={idProdi} onChange={(e) => setIdProdi(e.target.value)}>
                                    <option value="">Prodi</option>
                                    {Prodi.map((item) => (
                                        <option key={item.id_prodi} value={item.id_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="select select-sm select-bordered w-full" value={idTahun} onChange={(e) => setIdTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.id_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="select select-sm select-bordered w-full" value={idSemester} onChange={(e) => setIdSemester(e.target.value)}>
                                    <option value="">Semester</option>
                                    {Semester.map((item) => (
                                        <option key={item.id_semester} value={item.id_semester}>Semester {item.semester}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card bg-base-100 card-bordered shadow-md mt-3'>
                    <div className='card-body p-4'>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" className="px-3 py-2 text-sm">NO</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Kode Matakuliah</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Matakuliah</th>
                                        <th scope="col" className="px-3 py-2 text-sm" align='center'>SKS</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Dosen Pengajar</th>
                                        <th scope="col" className="px-3 py-2 text-sm" align='center'>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mataKuliah.length == 0 ?
                                        <tr className='bg-white border-b text-gray-500 border-x'>
                                            <td className='px-3 py-2 font-semibold' colSpan={6} align='center'>Data matakuliah kosong</td>
                                        </tr>
                                        :
                                        mataKuliah.map((item, index) => (
                                            <tr key={item.id_jadwal_kuliah} className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-3 py-2 font-semibold'>{index + 1}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.code_mata_kuliah}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah}</td>
                                                <td className='px-3 py-2 font-semibold' align='center'>{item.sebaranMataKuliahs[0].mataKuliahs[0].sks}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.dosenPengajar.length == 0 ? <span className='text-red-600'>TIDAK ADA DOSEN</span> : item.dosenPengajar[0].nama}</td>
                                                <td className='px-3 py-2 font-semibold' align='center'>
                                                    <Link to={`/detailjurnal`}
                                                        state={{
                                                            collaps: 'kuliah',
                                                            activ: '/jurnal',
                                                            kodeJdl: item.code_jadwal_kuliah,
                                                            jenjang: jenjangPendidikan,
                                                            fakultas: namaFakultas,
                                                            prodi: namaProdi,
                                                            tahun: namaTahun,
                                                            semester: namaSemester,
                                                            idJenjangPendidikan: idJenjangPendidikan,
                                                            idFakultas: idFakultas,
                                                            idProdi: idProdi,
                                                            idTahun: idTahun,
                                                            idSemester: idSemester,
                                                            kodeMk: item.code_mata_kuliah,
                                                            jenis: item.sebaranMataKuliahs[0].mataKuliahs[0].jenis_mata_kuliah,
                                                            makul: item.sebaranMataKuliahs[0].mataKuliahs[0].nama_mata_kuliah,
                                                            sks: item.sebaranMataKuliahs[0].mataKuliahs[0].sks,
                                                            dosen: item.dosenPengajar.length == 0 ? "" : item.dosenPengajar[0].nama
                                                        }}
                                                        className="btn btn-xs btn-circle text-white btn-info" title='Detail'><FaSearch /></Link>
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

export default ListMakulJurnal