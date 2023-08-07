import React, { useState, useEffect } from 'react'
import { FaCog, FaReply, FaUserEdit } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'

const DetailJadwal = () => {
    const [jenjang, setJenjang] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [kelas, setKelas] = useState("")
    const [makul, setMakul] = useState("")
    const [prodi, setProdi] = useState("")
    const [semester, setSemester] = useState("")
    const [tahun, setTahun] = useState("")
    const [kapasitas, setKapasitas] = useState("")
    const [tglMulai, setTglMulai] = useState("")
    const [tglSelesai, setTglSelesai] = useState("")
    const [jumPertemuan, setJumPertemuan] = useState("")
    const [hari, setHari] = useState("")
    const [jamMulai, setJamMulai] = useState("")
    const [jamSelesai, setJamSelesai] = useState("")
    const [ruang, setRuang] = useState("")
    const [status, setStatus] = useState("")
    const [kodeJadwal, setKodeJadwal] = useState("")
    const [pertemuan, setPertemuan] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    console.log(location.state);

    useEffect(() => {
        const getJadwalByKelas = async () => {
            try {
                const response = await axios.get(`v1/jadwalKuliah/getByKelas/${location.state.thn}/${location.state.sem}/${location.state.jen}/${location.state.fak}/${location.state.pro}/${location.state.mak}/${location.state.kls}`)
                setTahun(response.data.data.tahunAjarans[0].tahun_ajaran)
                setSemester(response.data.data.semesters[0].semester)
                setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
                setFakultas(response.data.data.fakultas[0].nama_fakultas)
                setProdi(response.data.data.prodis[0].nama_prodi)
                setKelas(response.data.data.kelas[0].nama_kelas)
                setMakul(response.data.data.mataKuliahs[0].nama_mata_kuliah)
                setTglMulai(response.data.data.tanggal_mulai)
                setTglSelesai(response.data.data.tanggal_selesai)
                setJumPertemuan(response.data.data.jumlah_pertemuan)
                setKapasitas(response.data.data.kelas[0].kapasitas)
                setHari(response.data.data.hari)
                setJamMulai(response.data.data.jam_mulai)
                setJamSelesai(response.data.data.jam_selesai)
                setRuang(response.data.data.ruangs[0].nama_ruang)
                setKodeJadwal(response.data.data.code_jadwal_kuliah)
            } catch (error) {
                setStatus(error.response.data.message)
            }
        }
        getJadwalByKelas()
    }, [location.state])

    useEffect(() => {
        getJadwalPertemuan()
    }, [kodeJadwal])

    const getJadwalPertemuan = async () => {
        try {
            const response = await axios.get(`v1/jadwalPertemuan/all/${kodeJadwal}`)
            if (response.data.data.length == 0) {
                setPertemuan('')
            } else {
                setPertemuan('1')
            }
        } catch (error) {

        }
    }

    const day = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"]
    const hr = []
    for (let i = 1; i < day.length; i++) {
        hr.push(<option key={i} value={day[i]}>{day[i]}</option>)
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Jadwal Kuliah</h1>
            </section>
            <section>
                <div className="col-span-4 card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid gap-x-4">
                            <div className="grid">
                                <div className='mb-2'>
                                    <div className="float-right flex gap-1">
                                        <Link to={`/jadwalkuliah`} state={{ thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, collaps: 'kuliah', activ: '/jadwalkuliah' }} className='btn btn-sm btn-error rounded-md capitalize'><FaReply />Kembali</Link>
                                        {pertemuan == '1' ? "" : <Link to={`/aturjadwal`} state={{ thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, mak: location.state.mak, kls: location.state.kls, idn: location.state.idn, collaps: 'kuliah', activ: '/jadwalkuliah' }} className='btn btn-sm btn-primary capitalize rounded-md'><FaCog /><span>Atur Jadwal</span></Link>}
                                        {status == '' ? <Link to={`/setDsn`} state={{ thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, mak: location.state.mak, kls: location.state.kls, idn: location.state.idn, collaps: 'kuliah', activ: '/jadwalkuliah' }} className='btn btn-secondary btn-sm capitalize rounded-md '><FaUserEdit />Dosen Pengajar</Link> : ''}
                                    </div>
                                </div>
                            </div>
                            {status == "" ?
                                <div>
                                    <div className="grid grid-cols-2 mb-3 border-t-2 pt-3 border-t-[#2D7F5F]">
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
                                                        <span className="">Jenjang Pendidikan</span>
                                                    </label>
                                                </div>
                                                <div className='flex-initial w-80'>
                                                    <a>{jenjang}</a>
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
                                                        <span className="">Ruang</span>
                                                    </label>
                                                </div>
                                                <div className='flex-initial w-80'>
                                                    <a>{ruang}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='text-center'>
                                    <p className='text-red-700 italic'>Jadwal belum diatur pada kelas yang anda pilih</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailJadwal