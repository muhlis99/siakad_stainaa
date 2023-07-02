import React, { useState, useEffect } from 'react'
import { FaAngleDown, FaEdit, FaSave, FaTrash } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const DosenPengajar = () => {
    const [Dosen, setDosen] = useState([])
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
    const [kodeDsnPengajar, setKodeDsnPengajar] = useState("")
    const [kodeDsnPengganti, setKodeDsnPengganti] = useState("")
    const [kodeJadwal, setKodeJadwal] = useState("")
    const [statusForm, setStatusForm] = useState("")
    const [idJadwal, setIdJadwal] = useState("")
    const { idKls } = useParams()

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
                setKodeTahun(response.data.data.code_tahun_ajaran)
                setKapasitas(response.data.data.kapasitas)
                console.log(response.data.data.kapasitas)
            } catch (error) {

            }
        }
        getDataKelasById()
    }, [idKls])

    useEffect(() => {
        getJadwalByKelas()
    }, [kodeTahun, kodeSemester, kodeFakultas, kodeProdi, kodeMakul, kodeKelas])

    useEffect(() => {
        getDosenAll()
    }, [])

    const getJadwalByKelas = async () => {
        if (kodeTahun != 0 & kodeSemester != 0 & kodeFakultas != 0 & kodeProdi != 0 & kodeMakul != 0 & kodeKelas != 0) {
            const response = await axios.get(`v1/jadwalKuliah/getByKelas/${kodeTahun}/${kodeSemester}/${kodeFakultas}/${kodeProdi}/${kodeMakul}/${kodeKelas}`)
            setTahun(response.data.data.tahunAjarans[0].tahun_ajaran)
            setTglMulai(response.data.data.tanggal_mulai)
            setTglSelesai(response.data.data.tanggal_selesai)
            setJumPertemuan(response.data.data.jumlah_pertemuan)
            setKodeDsnPengajar(response.data.data.dosen_pengajar)
            setKodeDsnPengganti(response.data.data.dosen_pengganti)
            setIdJadwal(response.data.data.id_jadwal_kuliah)
            setKodeJadwal(response.data.data.code_jadwal_kuliah)
            if (response.data.data.dosen_pengajar == 0) {
                setStatusForm("tambah")
            } else {
                setStatusForm("edit")
            }
        }
    }

    const getDosenAll = async () => {
        const response = await axios.get('v1/dosenPengajar/getAllDosen')
        setDosen(response.data.data)
    }

    const tambahDsnPengajar = async (e) => {
        e.preventDefault()
        try {
            if (kodeDsnPengajar == 0) {
                Swal.fire({
                    title: 'Dosen Pengajar kosong',
                    icon: "error"
                })
            } else {
                await axios.put('v1/dosenPengajar/create', {
                    dosen_pengajar: kodeDsnPengajar,
                    dosen_pengganti: kodeDsnPengganti,
                    id: idJadwal
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getJadwalByKelas()
                    })
                })
            }
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

    const updateDsnPengajar = async (e) => {
        e.preventDefault()
        try {
            if (kodeDsnPengajar == 0) {
                Swal.fire({
                    title: 'Dosen Pengajar kosong',
                    icon: "error"
                })
            } else {
                await axios.put(`v1/dosenPengajar/update/${idJadwal}`, {
                    dosen_pengajar: kodeDsnPengajar,
                    dosen_pengganti: kodeDsnPengganti
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getJadwalByKelas()
                    })
                })
            }
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

    const deleteDosen = (e, f) => {
        Swal.fire({
            title: "Hapus data Dosen Pengajar?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(`v1/dosenPengajar/deleteStatus/${idJadwal}`, {
                        dosen_pengajar: e,
                        dosen_pengganti: f
                    }).then(function (response) {
                        Swal.fire({
                            title: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getJadwalByKelas()
                        })
                    })
                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Dosen Pengajar</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <form onSubmit={statusForm == "tambah" ? tambahDsnPengajar : updateDsnPengajar}>
                            <div className="grid">
                                <div className='mb-2'>
                                    <div className='float-right'>
                                        <div className="dropdown mr-1">
                                            <label tabIndex={0} className="btn btn-sm btn-blue"><span className='mr-1'>Navigasi</span><FaAngleDown /></label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><Link to={`/detailjadwal/${idKls}`}>Detail Jadwal Kuliah</Link></li>
                                                <li><Link to={`/setDsn/${idKls}`} >Dosen Pengajar</Link></li>
                                                <li><Link to={`/setpertemuan/${idKls}/${kodeJadwal}`}>Set Pertemuan</Link></li>
                                            </ul>
                                        </div>
                                        {statusForm == "tambah" ? <button className='btn btn-sm btn-default'><FaSave /><span className="ml-1">simpan</span></button> : <button className='btn btn-sm btn-blue'><FaEdit /><span className="ml-1">Edit</span></button>}
                                        {statusForm == "edit" ? <button type='button' className='btn btn-sm btn-danger ml-1' onClick={() => deleteDosen(kodeDsnPengajar, kodeDsnPengganti)}><FaTrash /><span className="ml-1">Hapus</span></button> : ""}
                                    </div>
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
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
                            <div className='grid grid-cols-3 gap-2 mt-8 border-t-2 border-t-[#2D7F5F] pt-5'>
                                <div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Dosen Pengajar</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={kodeDsnPengajar} onChange={(e) => setKodeDsnPengajar(e.target.value)}>
                                            <option value="">Pilih Dosen Pengajar</option>
                                            {Dosen.map((item) => (
                                                <option key={item.id_dosen} value={item.nip_ynaa}>{item.nama}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Dosen Pengganti</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={kodeDsnPengganti} onChange={(e) => setKodeDsnPengganti(e.target.value)}>
                                            <option value="">Pilih Dosen Pengganti</option>
                                            {Dosen.map((item) => (
                                                <option key={item.id_dosen} value={item.nip_ynaa}>{item.nama}</option>
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

export default DosenPengajar