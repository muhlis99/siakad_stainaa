import React, { useState, useEffect } from 'react'
import { FaAngleDown, FaEdit, FaReply, FaSave } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Link, useParams, useNavigate } from "react-router-dom"
import axios from 'axios'

const FormAturJadwal = () => {
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
    const [pesan, setPesan] = useState("")
    const [idJadwal, setIdJadwal] = useState("")
    const navigate = useNavigate()
    const { idKls } = useParams()


    useEffect(() => {
        getDataRuang()
    }, [])

    useEffect(() => {
        const getDataKelasById = async () => {
            try {
                const response = await axios.get(`v1/kelasKuliah/getKelasById/${idKls}`)
                setFakultas(response.data.data.fakultas[0].nama_fakultas)
                setKodeFakultas(response.data.data.code_fakultas)
                setKelas(response.data.data.nama_kelas)
                setKodeKelas(response.data.data.code_kelas)
                setMakul(response.data.data.mataKuliahs[0].nama_mata_kuliah)
                setKodeMakul(response.data.data.code_mata_kuliah)
                setProdi(response.data.data.prodis[0].nama_prodi)
                setKodeProdi(response.data.data.code_prodi)
                setSemester(response.data.data.semesters[0].semester)
                setKodeSemester(response.data.data.code_semester)
                setTahun(response.data.data.code_tahun_ajaran)
                setKodeTahun(response.data.data.code_tahun_ajaran)
                setKapasitas(response.data.data.kapasitas)
            } catch (error) {

            }
        }
        getDataKelasById()
    }, [idKls])

    useEffect(() => {
        getJadwalByKelas()
    }, [kodeTahun, kodeSemester, kodeFakultas, kodeProdi, kodeMakul, kodeKelas])

    const getJadwalByKelas = async () => {
        if (kodeTahun != 0 & kodeSemester != 0 & kodeFakultas != 0 & kodeProdi != 0 & kodeMakul != 0 & kodeKelas != 0) {
            const response = await axios.get(`v1/jadwalKuliah/getByKelas/${kodeTahun}/${kodeSemester}/${kodeFakultas}/${kodeProdi}/${kodeMakul}/${kodeKelas}`)
            setTglMulai(response.data.data.tanggal_mulai)
            setTglSelesai(response.data.data.tanggal_selesai)
            setJumPertemuan(response.data.data.jumlah_pertemuan)
            setHari(response.data.data.hari)
            setJamMulai(response.data.data.jam_mulai)
            setJamSelesai(response.data.data.jam_selesai)
            setKodeRuang(response.data.data.code_ruang)
            setPesan(response.data.message)
            setIdJadwal(response.data.data.id_jadwal_kuliah)
            console.log(response);
        }

    }

    const getDataRuang = async () => {
        const response = await axios.get('v1/ruang/all')
        setRuang(response.data.data)
    }

    const day = ["", "minggu", "sennin", "selasa", "rabu", "jum'at", "sabtu", "minggu"]
    const hr = []
    for (let i = 1; i < day.length; i++) {
        hr.push(<option key={i} value={day[i]}>{day[i]}</option>)
    }

    const simpanJadwal = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/jadwalKuliah/create', {
                code_mata_kuliah: kodeMakul,
                code_fakultas: kodeFakultas,
                code_prodi: kodeProdi,
                code_semester: kodeSemester,
                code_tahun_ajaran: kodeTahun,
                code_kelas: kodeKelas,
                code_ruang: kodeRuang,
                tanggal_mulai: tglMulai,
                tanggal_selesai: tglSelesai,
                jumlah_pertemuan: jumPertemuan,
                hari: hari,
                jam_mulai: jamMulai,
                jam_selesai: jamSelesai,
                metode_pembelajaran: metode
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate(`/detailjadwal/${idKls}`)
                })
            })
        } catch (error) {
            if (error.response) {
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
            await axios.put(`v1/jadwalKuliah/update/${idJadwal}`, {
                code_mata_kuliah: kodeMakul,
                code_fakultas: kodeFakultas,
                code_prodi: kodeProdi,
                code_semester: kodeSemester,
                code_tahun_ajaran: kodeTahun,
                code_kelas: kodeKelas,
                code_ruang: kodeRuang,
                tanggal_mulai: tglMulai,
                tanggal_selesai: tglSelesai,
                jumlah_pertemuan: jumPertemuan,
                hari: hari,
                jam_mulai: jamMulai,
                jam_selesai: jamSelesai,
                metode_pembelajaran: metode
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate(`/detailjadwal/${idKls}`)
                })
            })
        } catch (error) {
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
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Jadwal Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <form onSubmit={pesan == 'Data jadwal Kuliah Ditemukan' ? updateJadwal : simpanJadwal}>
                            <div className="grid grid-cols-2 gap-x-4">
                                <div className="col-span-2 mb-3 border-b-2 pb-3 border-b-[#2D7F5F]">
                                    <div className="float-right flex gap-1">
                                        {pesan == 'Data jadwal Kuliah Ditemukan' ?
                                            <div>
                                                <div className="dropdown dropdown-end">
                                                    <label tabIndex={0} className="btn btn-sm btn-default"><span className='mr-1'>Aksi</span><FaAngleDown /></label>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li><Link to={'/jadwalkuliah'}>Kembali</Link></li>
                                                        <li><Link to={`/detailjadwal/${idKls}`}>Detail Jadwal Kuliah</Link></li>
                                                    </ul>
                                                </div>
                                            </div> :
                                            <Link to={'/jadwalkuliah'} className='btn btn-sm btn-danger'><FaReply /><span className='ml-1'>Kembali</span></Link>
                                        }

                                        {pesan == 'Data jadwal Kuliah Ditemukan' ? <button className='btn btn-sm btn-blue'><FaEdit /><span className='ml-1'>Update</span></button> : <button className='btn btn-sm btn-default'><FaSave /><span className='ml-1'>Simpan</span></button>}
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
                                    <div>
                                        <label>
                                            <span className="">Semester</span>
                                        </label>
                                        <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={semester} />
                                    </div>
                                </div>
                                <div className='grid gap-2'>
                                    <div>
                                        <label>
                                            <span className="">Kelas</span>
                                        </label>
                                        <input type="text" disabled className="input input-bordered input-sm w-full max-w-xs float-right" value={kodeKelas} />
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
                                        <input type="date" className="input input-bordered input-sm w-full max-w-xs float-right" value={tglMulai} onChange={(e) => setTglMulai(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="">Tanggal Selesai</span>
                                        </label>
                                        <input type="date" className="input input-bordered input-sm w-full max-w-xs float-right" value={tglSelesai} onChange={(e) => setTglSelesai(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="">Jumlah Pertemuan</span>
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
                                            <span className="">Hari</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full max-w-xs float-right" value={hari} onChange={(e) => setHari(e.target.value)}>
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
                                        <input type="time" className="input input-bordered input-sm w-full max-w-xs float-right" value={jamSelesai} onChange={(e) => setJamSelesai(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>
                                            <span className="">Metode Pembelajaran</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full max-w-xs float-right" value={metode} onChange={(e) => setMetode(e.target.value)}>
                                            <option value="">Metode Pembelajaran</option>
                                            <option value="offline">Offline</option>
                                            <option value="online">Online</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>
                                            <span className="">Ruang</span>
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