import React, { useState, useEffect } from 'react'
import { FaCog, FaCouch, FaHotel, FaInfo, FaUsers } from 'react-icons/fa'
import { Link, useLocation } from "react-router-dom"
import axios from 'axios'

const ListJadwal = () => {
    const [Makul, setMakul] = useState([])
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [KodeMakul, setKodeMakul] = useState([])
    const [DataKelas, setDataKelas] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const location = useLocation()

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
        getMataKuliah()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeSemester, kodeTahun])

    useEffect(() => {
        getKodeMakul()
    }, [Makul])

    useEffect(() => {
        getDataKelas()
    }, [KodeMakul])

    const getJenjangPendidikan = async () => {
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

    const getMataKuliah = async () => {
        if (kodeJenjang != 0 & kodeFakultas != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/jadwalKuliah/all/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
            setDataKelas([])
            setMakul(response.data.data)
        }
    }

    const getKodeMakul = () => {
        var i = Makul.map(item => (
            item.code_mata_kuliah
        ))
        setKodeMakul(i)
    }

    const getDataKelas = async () => {
        if (KodeMakul.length != 0) {
            let kelass = []
            let promises = []
            for (let i = 0; i < KodeMakul.length; i++) {
                const t = await axios.get('v1/kelasKuliah/getKelasByMakul/' + kodeTahun + '/' + kodeSemester + '/' + kodeJenjang + '/' + kodeFakultas + '/' + kodeProdi + '/' + KodeMakul[i]).then(response => {
                    kelass.push(response.data.data)
                })
                promises.push(t)
            }
            Promise.all(promises).then(() => setDataKelas(kelass))
        }
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Jadwal Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md rounded-md">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-5 gap-2">
                            <div>
                                <select className="select select-sm select-bordered w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                    <option value="">Jenjang Pendidikan</option>
                                    {Jenjang.map((item) => (
                                        <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="select select-bordered select-sm w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                    <option value="">Fakultas</option>
                                    {Fakultas.map((item) => (
                                        <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="select select-bordered select-sm w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                    <option value="">Prodi</option>
                                    {Prodi.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className="select select-sm select-bordered w-full" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                    <option value="">Semester</option>
                                    {Semester.map((item) => (
                                        <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div className='mt-4'>
                                {Makul.map((mk, index) => (
                                    <div key={mk.id_mata_kuliah} className="collapse bg-[#2D7F5F] pb-0 rounded-lg mb-2">
                                        <input type="checkbox" checked className='p-0 min-h-0' readOnly />
                                        <div className="collapse-title p-2 min-h-0 text-white flex gap-2">
                                            <span>[{mk.code_mata_kuliah}] | {mk.nama_mata_kuliah} | SKS {mk.sks}</span>
                                        </div>
                                        {DataKelas != 0 ? DataKelas[index].map((item, o) => (
                                            <div key={o} className="grid grid-cols-4 gap-2 px-4 py-2 bg-base-200">
                                                <div className='flex gap-2' title={`Kelas ${item.nama_kelas}`}>
                                                    <span className='my-auto text-md'><FaHotel /></span><span className='my-auto'>{item.nama_kelas}</span>
                                                </div>
                                                <div className='flex gap-2 justify-center' title={`Kapasitas ${item.kapasitas}`}>
                                                    <span className='my-auto text-md'><FaCouch /></span><span className='my-auto'>{item.kapasitas}</span>
                                                </div>
                                                <div className='flex gap-2 justify-center' title={`Jumlah MHS ${item.jumlahMhs}`}>
                                                    <span className='my-auto text-md'><FaUsers /></span><span className='my-auto'>{item.jumlahMhs}</span>
                                                </div>
                                                <div>
                                                    <Link to={`/detailjadwal`} state={{ thn: kodeTahun, sem: kodeSemester, jen: kodeJenjang, fak: kodeFakultas, pro: kodeProdi, mak: item.code_mata_kuliah, kls: item.code, idn: item.id_kelas, collaps: 'kuliah', activ: '/jadwalkuliah' }} className='btn btn-xs btn-info btn-circle float-right' title='Detail'><FaInfo /></Link>
                                                </div>
                                            </div>
                                        )) : ""}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default ListJadwal