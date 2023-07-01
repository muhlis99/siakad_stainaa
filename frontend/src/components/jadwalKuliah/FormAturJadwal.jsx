import React, { useState, useEffect } from 'react'
import { FaAngleDown, FaSave } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link, useParams } from "react-router-dom"
import axios from 'axios'

const FormAturJadwal = () => {
    const [Ruang, setRuang] = useState([])
    const [jamMulai, setJamMulai] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kelas, setKelas] = useState("")
    const [kodeKelas, setKodeKelas] = useState("")
    const [makul, setMakul] = useState("")
    const [kodeMakul, setKodeMakul] = useState("")
    const [prodi, setProdi] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [semester, setSemester] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [tahun, setTahun] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kapasitas, setKapasitas] = useState("")
    const { idMk } = useParams()


    useEffect(() => {
        getDataRuang()
    }, [])

    useEffect(() => {
        const getDataKelasByMakul = async () => {
            try {
                const response = await axios.get(`v1/kelasKuliah/getKelasByMakul/${idMk}`)
                setKodeFakultas(response.data.data.code_fakultas)
                setKodeFakultas(response.data.data.code_fakultas)
                setKelas(response.data.data.nama_kelas)
                setKodeKelas(response.data.data.code_kelas)
                setMakul(response.data.data.code_mata_kuliah)
                setKodeMakul(response.data.data.code_mata_kuliah)
                setProdi(response.data.data.code_prodi)
                setKodeProdi(response.data.data.code_prodi)
                setSemester(response.data.data.code_semester)
                setKodeSemester(response.data.data.code_semester)
                setTahun(response.data.data.code_tahun_ajaran)
                setKodeTahun(response.data.data.code_tahun_ajaran)
                setKapasitas(response.data.data.kapasitas)
            } catch (error) {

            }
        }
        getDataKelasByMakul()
    }, [idMk])

    const getDataRuang = async () => {
        const response = await axios.get('v1/ruang/all')
        setRuang(response.data.data)
    }

    const day = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"]
    const hr = []
    for (let i = 1; i < day.length; i++) {
        hr.push(<option key={i} value={day[i]}>{day[i]}</option>)
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Jadwal Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="col-span-2 mb-3 border-b-2 pb-3 border-b-[#2D7F5F]">
                                <div className="float-right flex gap-1">
                                    <Link to="/detailjadwal" className='btn btn-sm btn-blue'><FaSave /><span className='ml-1'>simpan</span></Link>
                                    {/* <div>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-sm btn-default"><span className='mr-1'>Opsi</span><FaAngleDown /></label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><a>Item 1</a></li>
                                                <li><a>Item 2</a></li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <div>
                                    <label>
                                        <span className="">Tahun Ajaran</span>
                                    </label>
                                    <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={tahun} />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Semester</span>
                                    </label>
                                    <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={semester} />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Fakultas</span>
                                    </label>
                                    <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={fakultas} />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Program Studi</span>
                                    </label>
                                    <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={prodi} />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Mata Kuliah</span>
                                    </label>
                                    <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={makul} />
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <div>
                                    <label>
                                        <span className="">Kelas</span>
                                    </label>
                                    <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={kelas} />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Kapasitas</span>
                                    </label>
                                    <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={kapasitas} />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Tanggal Mulai</span>
                                    </label>
                                    <input type="date" className="input input-bordered input-sm w-full max-w-xs float-right" />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Tanggal Selesai</span>
                                    </label>
                                    <input type="date" className="input input-bordered input-sm w-full max-w-xs float-right" />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Jumlah Pertemuan</span>
                                    </label>
                                    <input type="number" className="input input-bordered input-sm w-full max-w-xs float-right" />
                                </div>
                            </div>
                        </div>
                        <div className='mt-3 border-t-2 border-t-[#2D7F5F] grid grid-cols-2'>
                            <div className="col-span-2 my-2">
                                <div className="tabs">
                                    <a className="tab tab-lifted tab-active">Jadwal Mingguan</a>
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <div>
                                    <label>
                                        <span className="">Hari</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full max-w-xs float-right">
                                        <option value="">Hari</option>
                                        {hr}
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        <span className="">Jam Mulai</span>
                                    </label>
                                    <input type="time" className="input input-bordered input-sm w-full max-w-xs float-right" value={jamMulai} onChange={(e) => setJamMulai(e.target.value)} />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Jam Selesai</span>
                                    </label>
                                    <input type="time" className="input input-bordered input-sm w-full max-w-xs float-right" />
                                </div>
                                <div>
                                    <label>
                                        <span className="">Metode Pembelajaran</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full max-w-xs float-right">
                                        <option value="">Metode Pembelajaran</option>
                                        <option value="">Offline</option>
                                        <option value="">Online</option>
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        <span className="">Ruang</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full max-w-xs float-right">
                                        <option value="">Ruang</option>
                                        {Ruang.map((item) => (
                                            <option key={item.id_ruang} value={item.code_ruang}>{item.nama_ruang}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormAturJadwal