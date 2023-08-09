import React, { useState, useEffect } from 'react'
import { FaAngleDown, FaEdit, FaReply, FaSave } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link, useParams, useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import Loading from '../Loading'

const FormAturJadwal = () => {
    const [Ruang, setRuang] = useState([])
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
    const [kodeRuang, setKodeRuang] = useState("")
    const [idJadwal, setIdJadwal] = useState("")
    const [pesan, setPesan] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDataRuang()
    }, [])

    useEffect(() => {
        const getDataKelasById = async () => {
            try {
                const response = await axios.get(`v1/kelasKuliah/getKelasById/${location.state.idn}`)
                setFakultas(response.data.data.fakultas[0].nama_fakultas)
                setKelas(response.data.data.nama_kelas)
                setMakul(response.data.data.mataKuliahs[0].nama_mata_kuliah)
                setProdi(response.data.data.prodis[0].nama_prodi)
                setSemester(response.data.data.semesters[0].semester)
                setTahun(response.data.data.tahunAjarans[0].tahun_ajaran)
                setKapasitas(response.data.data.kapasitas)
            } catch (error) {

            }
        }
        getDataKelasById()
    }, [location.state])

    useEffect(() => {
        const getJadwalByKelas = async () => {
            try {
                const response = await axios.get(`v1/jadwalKuliah/getByKelas/${location.state.thn}/${location.state.sem}/${location.state.jen}/${location.state.fak}/${location.state.pro}/${location.state.mak}/${location.state.kls}`)
                setPesan(response.data.message)
                setTglMulai(response.data.data.tanggal_mulai)
                setTglSelesai(response.data.data.tanggal_selesai)
                setJumPertemuan(response.data.data.jumlah_pertemuan)
                setHari(response.data.data.hari)
                setJamMulai(response.data.data.jam_mulai)
                setJamSelesai(response.data.data.jam_selesai)
                setKodeRuang(response.data.data.code_ruang)
                setIdJadwal(response.data.data.id_jadwal_kuliah)
            } catch (error) {

            }
        }
        getJadwalByKelas()
    }, [location.state])


    const getDataRuang = async () => {
        const response = await axios.get('v1/ruang/all')
        setRuang(response.data.data)
    }

    const day = ["", "minggu", "sennin", "selasa", "rabu", "kamis", "jum'at", "sabtu"]
    const hr = []
    for (let i = 1; i < day.length; i++) {
        hr.push(<option key={i} value={day[i]}>{day[i]}</option>)
    }

    const simpanJadwal = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.post('v1/jadwalKuliah/create', {
                code_mata_kuliah: location.state.mak,
                code_jenjang_pendidikan: location.state.jen,
                code_fakultas: location.state.fak,
                code_prodi: location.state.pro,
                code_semester: location.state.sem,
                code_tahun_ajaran: location.state.thn,
                code_kelas: location.state.kls,
                code_ruang: kodeRuang,
                tanggal_mulai: tglMulai,
                tanggal_selesai: tglSelesai,
                jumlah_pertemuan: jumPertemuan,
                hari: hari,
                jam_mulai: jamMulai,
                jam_selesai: jamSelesai
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate('/detailjadwal', { state: { thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, mak: location.state.mak, kls: location.state.kls, idn: location.state.idn, collaps: 'kuliah', activ: '/jadwalkuliah' } })
                })
            })
        } catch (error) {
            setLoading(false)
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const updateJadwal = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.put(`v1/jadwalKuliah/update/${idJadwal}`, {
                code_mata_kuliah: location.state.mak,
                code_jenjang_pendidikan: location.state.jen,
                code_fakultas: location.state.fak,
                code_prodi: location.state.pro,
                code_semester: location.state.sem,
                code_tahun_ajaran: location.state.thn,
                code_kelas: location.state.kls,
                code_ruang: kodeRuang,
                tanggal_mulai: tglMulai,
                tanggal_selesai: tglSelesai,
                jumlah_pertemuan: jumPertemuan,
                hari: hari,
                jam_mulai: jamMulai,
                jam_selesai: jamSelesai
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate(`/detailjadwal`, { state: { thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, mak: location.state.mak, kls: location.state.kls, idn: location.state.idn, stat: 'edit', collaps: 'kuliah', activ: '/jadwalkuliah' } })
                })
            })
        } catch (error) {
            setLoading(false)
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
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
                <h1 className='text-2xl font-bold'>Jadwal Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <form onSubmit={pesan == 'Data jadwal Kuliah Ditemukan' ? updateJadwal : simpanJadwal}>
                            <div className="grid grid-cols-2 gap-x-4">
                                <div className="col-span-2 mb-3 border-b-2 pb-3 border-b-[#2D7F5F]">
                                    <div className="float-right flex gap-1">
                                        <Link to='/detailjadwal' state={{ thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, mak: location.state.mak, kls: location.state.kls, idn: location.state.idn, collaps: 'kuliah', activ: '/jadwalkuliah' }} className='btn btn-sm btn-error rounded-md capitalize'><FaReply />Kembali</Link>
                                        {pesan == 'Data jadwal Kuliah Ditemukan' ? <button className='btn btn-sm btn-primary capitalize rounded-md'><FaEdit /><span>Update</span></button> : <button className='btn btn-sm btn-primary rounded-md capitalize'><FaSave /><span>Simpan</span></button>}
                                    </div>
                                </div>
                                <div className='grid gap-2'>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Tahun Ajaran</span>
                                        </label>
                                        <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={tahun} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Fakultas</span>
                                        </label>
                                        <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={fakultas} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Program Studi</span>
                                        </label>
                                        <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={prodi} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Mata Kuliah</span>
                                        </label>
                                        <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={makul} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Semester</span>
                                        </label>
                                        <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={semester} />
                                    </div>
                                </div>
                                <div className='grid gap-2'>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Kelas</span>
                                        </label>
                                        <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={kelas} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Kapasitas</span>
                                        </label>
                                        <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={kapasitas} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Tanggal Mulai</span>
                                        </label>
                                        <input type="date" className="input input-bordered input-sm w-full max-w-xs float-right" value={tglMulai} onChange={(e) => setTglMulai(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Tanggal Selesai</span>
                                        </label>
                                        <input type="date" className="input input-bordered input-sm w-full max-w-xs float-right" value={tglSelesai} onChange={(e) => setTglSelesai(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Jumlah Pertemuan</span>
                                        </label>
                                        <input type="number" className="input input-bordered input-sm w-full max-w-xs float-right" value={jumPertemuan} onChange={(e) => setJumPertemuan(e.target.value)} />
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
                                            <span className="font-semibold">Hari</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full max-w-xs float-right" value={hari} onChange={(e) => setHari(e.target.value)}>
                                            <option value="">Hari</option>
                                            {hr}
                                        </select>
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Jam Mulai</span>
                                        </label>
                                        <input type="time" className="input input-bordered input-sm w-full max-w-xs float-right" value={jamMulai} onChange={(e) => setJamMulai(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Jam Selesai</span>
                                        </label>
                                        <input type="time" className="input input-bordered input-sm w-full max-w-xs float-right" value={jamSelesai} onChange={(e) => setJamSelesai(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="font-semibold">Ruang</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full max-w-xs float-right" value={kodeRuang} onChange={(e) => setKodeRuang(e.target.value)}>
                                            <option value="">Ruang</option>
                                            {Ruang.map((item) => (
                                                <option key={item.id_ruang} value={item.code_ruang}>{item.nama_ruang}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormAturJadwal