import React, { useState, useEffect } from 'react'
import { FaPlus, FaUsers, FaHotel, FaInfo } from "react-icons/fa"
import { Link } from "react-router-dom"
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Swal from 'sweetalert2'

const ListKelas = () => {
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Makul, setMakul] = useState([])
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [KodeMakul, setKodeMakul] = useState([])
    const [DataKelas, setDataKelas] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        getFakultas()
        getTahunAjaran()
        getSemester()
        getKodeMakul()
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
            const response = await axios.get(`v1/kelasKuliah/allMatakuliah/${kodeTahun}/${kodeSemester}/${kodeFakultas}/${kodeProdi}`)
            setMakul(response.data.data)
            setTitle("")
        } else {
            setTitle('Untuk melihat data kelas kuliah, silakan isi form di atas!')
        }
    }

    const getKodeMakul = () => {
        var i = Makul.map(item => ({
            kode: item.code_mata_kuliah
        }))
        setKodeMakul(i)
        console.log(i)
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
                // Promise.all(promises).then(() => console.log('data:', kelass))
            }
        }
    }

    return (
        <div className="mt-2 container">
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Kelas Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <div className='mb-2'>
                            <div className="grid grid-cols-5 gap-2">
                                <div>
                                    <select className="select select-sm select-bordered w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                        <option value="">Fakultas</option>
                                        {Fakultas.map((item) => (
                                            <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select className="select select-sm select-bordered w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
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
                                <div>
                                    <button className='btn btn-sm btn-default float-right'><FaPlus /><span className="ml-1">tambah</span></button>
                                </div>
                            </div>
                        </div>
                        <div className='border-t-2 pointer-events-none border-t-[#2D7F5F] grid gap-2'>
                            <div className="italic text-center text-sm mt-4">
                                {title && <span className='text-red-700'>{title}</span>}
                            </div>
                            <div className='mt-3'>
                                {Makul.map((kls, index) => (
                                    <div key={kls.id_mata_kuliah} className="collapse bg-[#2D7F5F] pb-0 rounded-lg">
                                        <input type="checkbox" checked className='p-0 min-h-0' readOnly />
                                        <div className="collapse-title p-2 min-h-0 text-white flex gap-2">
                                            <span>{kls.nama_mata_kuliah} | </span><span>SKS {kls.sks}</span>
                                        </div>
                                        <div className="collapse-content grid gap-1 px-0 py-1 bg-base-100">
                                            {DataKelas != 0 ? DataKelas[index].map((item) => (
                                                <div key={item.id_kelas} className="grid grid-cols-3 gap-2 px-4 py-2 bg-base-200">
                                                    <button className='btn btn-sm btn-ghost w-14'><FaHotel /> <span className="ml-1">{item.nama_kelas}</span></button>
                                                    <button className='btn btn-sm btn-ghost'><FaUsers /> <span className="ml-1">{item.kapasitas}</span></button>
                                                    <div>
                                                        <button className='btn btn-xs btn-default btn-circle float-right'><FaInfo /></button>
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

export default ListKelas