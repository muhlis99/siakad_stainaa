import React, { useState, useEffect } from 'react'
import { FaAngleDown, FaEdit, FaSave } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'

const DetailJadwal = () => {
    const [Ruang, setRuang] = useState([])
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
    const [tglMulai, setTglMulai] = useState("")
    const [tglSelesai, setTglSelesai] = useState("")
    const [jumPertemuan, setJumPertemuan] = useState("")
    const [hari, setHari] = useState("")
    const [jamMulai, setJamMulai] = useState("")
    const [jamSelesai, setJamSelesai] = useState("")
    const [metode, setMetode] = useState("")
    const [kodeRuang, setKodeRuang] = useState("")
    const [idJadwal, setIdJadwal] = useState("")
    const { idKls } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        getJadwalByKelas()
    }, [location.state])

    const day = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"]
    const hr = []
    for (let i = 1; i < day.length; i++) {
        hr.push(<option key={i} value={day[i]}>{day[i]}</option>)
    }

    const getJadwalByKelas = async () => {
        if (location.state.length != 0) {
            const response = await axios.get(`v1/jadwalKuliah/getByKelas/${location.state.thn}/${location.state.sem}/${location.state.jen}/${location.state.fak}/${location.state.pro}/${location.state.mak}/${location.state.kls}`)
            setTahun(response.data.data.tahunAjarans[0].tahun_ajaran)
            setSemester(response.data.data.semesters[0].semester)
            setFakultas(response.data.data.fakultas[0].nama_fakultas)
            setProdi()
            setTglMulai(response.data.data)
            setTglSelesai(response.data.data.tanggal_selesai)
            setJumPertemuan(response.data.data.jumlah_pertemuan)
            setHari(response.data.data.hari)
            setJamMulai(response.data.data.jam_mulai)
            setJamSelesai(response.data.data.jam_selesai)
            setKodeRuang(response.data.data.code_ruang)
            console.log(response.data.data.id_jadwal_kuliah)
        }
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Detail Jadwal Kuliah</h1>
            </section>
            <section>
                <div className="col-span-4 card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="col-span-2 mb-3 border-b-2 pb-3 border-b-[#2D7F5F]">
                                <div className="float-right flex gap-1">
                                    <Link to={`/aturjadwal/${idKls}`} className='btn btn-sm btn-default'><FaEdit /><span className='ml-1'>Edit</span></Link>
                                    <div>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-sm btn-blue"><span className='mr-1'>Navigasi</span><FaAngleDown /></label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><Link>Detail Jadwal Kuliah</Link></li>
                                                <li><Link to={`/setDsn/${idKls}`}>Dosen Pengajar</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Tahun Ajaran</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{tahun}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Semester</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{semester}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Fakultas</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{fakultas}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Program Studi</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{prodi}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Mata Kuliah</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{makul}</a>
                                    </div>
                                </div>
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Kelas</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{kelas}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Kapasitas</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{kapasitas}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Tanggal Mulai</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{tglMulai}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Tanggal Selesai</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{tglSelesai}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Jumlah Pertemuan</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{jumPertemuan}</a>
                                    </div>
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
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Hari</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>
                                            {hari}
                                        </a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Jam Mulai</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{jamMulai}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Jam Selesai</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{jamSelesai}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Metode Pembelajaran</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{metode}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Ruang</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{kodeRuang}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailJadwal