import React, { useState, useEffect } from 'react'
import { FaCog, FaHotel, FaInfo, FaUsers } from 'react-icons/fa'
import { Link } from "react-router-dom"
import axios from 'axios'

const ListJadwal = () => {
    const [Makul, setMakul] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [KodeMakul, setKodeMakul] = useState([])
    const [DataKelas, setDataKelas] = useState([])
    const [KodeKelas, setKodeKelas] = useState([])
    const [DataJadwal, setDataJadwal] = useState([])
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
        getMataKuliah()
    }, [kodeFakultas, kodeProdi, kodeSemester, kodeTahun])

    useEffect(() => {
        getKodeMakul()
    }, [Makul])

    useEffect(() => {
        getDataKelas()
    }, [KodeMakul])

    useEffect(() => {
        getKodeKelas()
    }, [Makul, DataKelas])

    useEffect(() => {
        getDataJadwal()
    }, [kodeFakultas, kodeProdi, kodeSemester, kodeTahun, KodeKelas, KodeMakul])

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

    const getMataKuliah = async () => {
        if (kodeFakultas != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/jadwalKuliah/all/${kodeTahun}/${kodeSemester}/${kodeFakultas}/${kodeProdi}`)
            setDataKelas([])
            setMakul(response.data.data)
        }
    }

    const getKodeMakul = () => {
        var i = Makul.map(item => ({
            kode: item.code_mata_kuliah
        }))
        setKodeMakul(i)
        console.log(i);
    }

    const getDataKelas = async () => {
        if (KodeMakul.length != 0) {
            let kelass = []
            let promises = []
            for (let i = 0; i < KodeMakul.length; i++) {
                promises.push(
                    axios.get('v1/kelasKuliah/getKelasByMakul/' + KodeMakul[i].kode).then(response => {
                        kelass.push(response.data.data)
                    })
                )
            }
            if (KodeMakul.length != 0) {
                Promise.all(promises).then(() => setDataKelas(kelass))
                Promise.all(promises).then(() => console.log(kelass))
            }
        }
    }

    const getKodeKelas = () => {
        if (DataKelas != 0) {
            var u = Makul.map((items, index) => (
                DataKelas[index].map(item => ({
                    kodeKls: item.code_kelas
                }))
            ))
            setKodeKelas(u)
            // console.log(u.kodeKls)
        }
    }

    const getDataJadwal = async () => {
        // let jadwal = []
        // let promises = []
        // for (let i = 0; i < KodeKelas.length; i++) {
        //     KodeKelas[i].map((item, index) => (
        //         promises.push(
        //             jadwal.push(KodeKelas[i].KodeKls[index])
        //         )
        //     ))

        // }
        // if (KodeKelas.length != 0) {
        //     Promise.all(promises).then(() => console.log(jadwal))
        // }
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Jadwal Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-4 gap-2">
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
                                    <div key={mk.id_mata_kuliah} className="collapse bg-[#2D7F5F] pb-0 rounded-lg">
                                        <input type="checkbox" checked className='p-0 min-h-0' readOnly />
                                        <div className="collapse-title p-2 min-h-0 text-white flex gap-2">
                                            <span>{mk.nama_mata_kuliah} | </span><span>SKS {mk.sks}</span>
                                        </div>
                                        <div className="collapse-content grid gap-1 px-0 py-1 bg-base-100">
                                            {DataKelas != 0 ? DataKelas[index].map((item) => (
                                                <div key={item.id_kelas} className="grid grid-cols-3 gap-2 px-4 py-2 bg-base-200">
                                                    <button className='btn btn-sm btn-ghost w-14 pointer-events-none'><FaHotel /> <span className="ml-1">{item.nama_kelas}</span></button>
                                                    <button className='btn btn-sm btn-ghost  pointer-events-none'><FaUsers /> <span className="ml-1">{item.kapasitas}</span></button>
                                                    <div>
                                                        <div className="float-right">
                                                            <button className='btn btn-xs btn-blue btn-circle mr-1' title='Detail Jadwal'><FaInfo /></button>
                                                            <Link to={`/aturjadwal/${item.code_mata_kuliah}`} className='btn btn-xs btn-default btn-circle' title='Atur Jadwal'><FaCog /></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )) : ""}
                                        </div>
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