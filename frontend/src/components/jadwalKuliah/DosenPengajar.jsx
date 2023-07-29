import React, { useState, useEffect } from 'react'
import { FaEdit, FaSearch, FaPeopleArrows, FaSave, FaTrash, FaTimes } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const DosenPengajar = () => {
    const [Dosen, setDosen] = useState([])
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
    const [kodeDsnPengajar, setKodeDsnPengajar] = useState("")
    const [kodeDsnPengganti, setKodeDsnPengganti] = useState("")
    const [kodeJadwal, setKodeJadwal] = useState("")
    const [statusForm, setStatusForm] = useState("")
    const [idJadwal, setIdJadwal] = useState("")
    const [select2, setSelect2] = useState("")
    const [isClearable, setIsClearable] = useState(true)
    const location = useLocation()

    useEffect(() => {
        getDataKelasById()
    }, [location.state])

    useEffect(() => {
        getJadwalByKelas()
    }, [location.state])

    useEffect(() => {
        getDosenAll()
    }, [])

    useEffect(() => {
        options()
    }, [Dosen])

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

    const getJadwalByKelas = async () => {
        try {
            const response = await axios.get(`v1/jadwalKuliah/getByKelas/${location.state.thn}/${location.state.sem}/${location.state.jen}/${location.state.fak}/${location.state.pro}/${location.state.mak}/${location.state.kls}`)
            setTglMulai(response.data.data.tanggal_mulai)
            setTglSelesai(response.data.data.tanggal_selesai)
            setJumPertemuan(response.data.data.jumlah_pertemuan)
            setIdJadwal(response.data.data.id_jadwal_kuliah)
            setKodeDsnPengajar(response.data.data.dosen_pengajar)
            setKodeDsnPengganti(response.data.data.dosen_pengganti)
            setKodeJadwal(response.data.data.code_jadwal_kuliah)
            if (response.data.data.dosen_pengajar == '' & response.data.data.dosen_pengganti == '') {
                setStatusForm('tambah')
            }
        } catch (error) {

        }
    }

    const getDosenAll = async () => {
        const response = await axios.get('v1/dosenPengajar/autocompleteDosenPengajar')
        setDosen(response.data.data)
    }

    const options = () => {
        var i = Dosen.map(item => ({
            value: item.nip_ynaa,
            label: item.nip_ynaa + " | " + item.nama,
        }))
        setSelect2(i)
    }

    // const dsnPengajar = (e) => {
    //     setNipy(e ? e.value : "")
    // }

    const editDsn = (e) => {
        setStatusForm(e)
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
                        setStatusForm('')
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

    // const tambahDsnPengajar = async (e) => {
    //     e.preventDefault()
    //     try {
    //         if (kodeDsnPengajar == 0) {
    //             Swal.fire({
    //                 title: 'Dosen Pengajar kosong',
    //                 icon: "error"
    //             })
    //         } else {
    //             await axios.put('v1/dosenPengajar/create', {
    //                 dosen_pengajar: kodeDsnPengajar,
    //                 dosen_pengganti: kodeDsnPengganti,
    //                 id: idJadwal
    //             }).then(function (response) {
    //                 Swal.fire({
    //                     title: response.data.message,
    //                     icon: "success"
    //                 }).then(() => {
    //                     getJadwalByKelas()
    //                 })
    //             })
    //         }
    //     } catch (error) {
    //         if (error.response.data.message) {
    //             Swal.fire({
    //                 title: error.response.data.message,
    //                 icon: "error"
    //             })
    //         } else {
    //             Swal.fire({
    //                 title: error.response.data.errors[0].msg,
    //                 icon: "error"
    //             })
    //         }
    //     }
    // }

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
                        <form onSubmit={tambahDsnPengajar}>
                            <div className="grid">
                                <div className='mb-2'>
                                    <div className='float-right flex gap-2'>
                                        <Link to={`/detailjadwal`} state={{ thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, mak: location.state.mak, kls: location.state.kls, idn: location.state.idn }} className='btn btn-sm btn-secondary'><FaSearch /> Detail Jadwal</Link>
                                        <Link to={`/setpertemuan`} state={{ thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, mak: location.state.mak, kls: location.state.kls, idn: location.state.idn, jad: kodeJadwal }} className='btn btn-sm btn-info'><FaPeopleArrows /> Set Pertemuan</Link>
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
                            <div className='grid grid-cols-2 gap-4 mt-2 border-t-2 border-t-[#2D7F5F] pt-2'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Dosen Pengajar</span>
                                    </label>
                                    <input type="number" placeholder="Masukkan NIK" className="input input-sm input-bordered w-full max-w-xs" />
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