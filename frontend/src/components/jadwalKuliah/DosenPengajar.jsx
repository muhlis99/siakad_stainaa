import React, { useState, useEffect } from 'react'
import { FaEdit, FaSearch, FaPeopleArrows, FaSave, FaTrash, FaTimes, FaPlus } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import Select from "react-select"

const DosenPengajar = () => {
    const [Dosen, setDosen] = useState([])
    const [Dsn, setDsn] = useState([])
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
    const [pengajar, setPengajar] = useState("")
    const [pengganti, setPengganti] = useState("")
    const [kodeJadwal, setKodeJadwal] = useState("")
    const [statusForm, setStatusForm] = useState("")
    const [idJadwal, setIdJadwal] = useState("")
    const [select2, setSelect2] = useState("")
    const [isClearable, setIsClearable] = useState(true)
    const [nipy, setNipy] = useState("")
    const [nipyp, setNipyp] = useState("")
    const location = useLocation()

    console.log(location.state);

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
            setPengganti(response.data.data.dosens[0].nama)
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

    const dsnPengajar = (e) => {
        setNipy(e ? e.value : "")
    }

    const dsnPengganti = (e) => {
        setNipyp(e ? e.value : "")
    }

    const modalDsnPengajar = (e) => {
        setStatusForm(e)
        document.getElementById('dsn-pengajar').checked = true
    }

    const closeDsnPengajar = () => {
        setStatusForm("")
        document.getElementById('dsn-pengajar').checked = false
    }

    const tambahDsnPengajar = async (e) => {
        e.preventDefault()
        try {
            if (nipy == 0) {
                Swal.fire({
                    title: 'Dosen Pengajar kosong',
                    icon: "error"
                })
            } else {
                await axios.put('v1/dosenPengajar/create', {
                    dosen_pengajar: nipy,
                    id: idJadwal
                }).then(function (response) {
                    document.getElementById('dsn-pengajar').checked = false
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getJadwalByKelas()
                        getDosenAll()
                        setStatusForm("")
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

    const editDsnPengajar = async (e) => {
        e.preventDefault()
        try {
            if (nipy == 0) {
                Swal.fire({
                    title: 'Dosen Pengajar tidak diedit',
                    icon: "error"
                })
            } else {
                await axios.put(`v1/dosenPengajar/update/${idJadwal}`, {
                    dosen_pengajar: nipy
                }).then(function (response) {
                    document.getElementById('dsn-pengajar').checked = false
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getJadwalByKelas()
                        getDosenAll()
                        setStatusForm("")
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

    const deleteDosenPengajar = (e, f) => {
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
                    axios.put(`v1/dosenPengajar/delete/${idJadwal}`, {
                        dosen_pengajar: e
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

    const modalDsnPengganti = (e) => {
        setStatusForm(e)
        document.getElementById('dsn-pengganti').checked = true
    }

    const closeDsnPengganti = () => {
        setStatusForm("")
        document.getElementById('dsn-pengganti').checked = false
    }

    const tambahDsnPengganti = async (e) => {
        e.preventDefault()
        try {
            if (nipyp == 0) {
                Swal.fire({
                    title: 'Dosen Pengganti kosong',
                    icon: "error"
                })
            } else {
                await axios.put('v1/dosenPengajar/createPengganti', {
                    dosen_pengganti: nipyp,
                    id: idJadwal
                }).then(function (response) {
                    document.getElementById('dsn-pengganti').checked = false
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getJadwalByKelas()
                        getDosenAll()
                        setStatusForm("")
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

    const editDsnPengganti = async (e) => {
        e.preventDefault()
        try {
            if (nipy == 0) {
                Swal.fire({
                    title: 'Dosen Pengganti tidak diedit',
                    icon: "error"
                })
            } else {
                await axios.put(`v1/dosenPengajar/updatePengganti/${idJadwal}`, {
                    dosen_pengganti: nipyp
                }).then(function (response) {
                    document.getElementById('dsn-pengganti').checked = false
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getJadwalByKelas()
                        getDosenAll()
                        setStatusForm("")
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

    const deleteDosenPengganti = (e, f) => {
        Swal.fire({
            title: "Hapus data Dosen Pengganti?",
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
                    axios.put(`v1/dosenPengajar/deletePengganti/${idJadwal}`, {
                        dosen_pengganti: e
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
            <input type="checkbox" id="dsn-pengajar" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2" onClick={closeDsnPengajar}><FaTimes /></button>
                    <form onSubmit={statusForm == 'Tambah' ? tambahDsnPengajar : editDsnPengajar}>
                        <h3 className="font-bold text-xl">{statusForm} Dosen Pengajar</h3>
                        <div className="py-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Dosen Pengajar</span>
                                </label>
                                <Select
                                    className="basic-single w-full"
                                    classNamePrefix="select"
                                    options={select2}
                                    onChange={dsnPengajar}
                                    isClearable={isClearable}
                                    id='input-select'
                                    placeholder={statusForm == 'Edit' ? kodeDsnPengajar + ' | ' + kodeDsnPengajar : ''}
                                />
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-sm btn-primary"><FaSave />simpan</button>
                        </div>
                    </form>
                </div>
            </div>

            <input type="checkbox" id="dsn-pengganti" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2" onClick={closeDsnPengganti}><FaTimes /></button>
                    <form onSubmit={statusForm == 'Tambah' ? tambahDsnPengganti : editDsnPengganti}>
                        <h3 className="font-bold text-xl">{statusForm} Dosen Pengganti</h3>
                        <div className="py-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Dosen Pengganti</span>
                                </label>
                                <Select
                                    className="basic-single w-full"
                                    classNamePrefix="select"
                                    options={select2}
                                    onChange={dsnPengganti}
                                    isClearable={isClearable}
                                    id='input-select'
                                    placeholder={statusForm == 'Edit' ? kodeDsnPengajar + ' | ' + kodeDsnPengajar : ''}
                                />
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type='submit' className="btn btn-sm btn-primary"><FaSave />simpan</button>
                        </div>
                    </form>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Dosen Pengajar</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
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
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Dosen Pengajar</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{kodeDsnPengajar}</a>
                                    </div>
                                </div>
                                <div className='mt-2 flex gap-1'>
                                    {kodeDsnPengajar ? "" :
                                        <button className='btn btn-xs btn-primary btn-circle' onClick={() => modalDsnPengajar('Tambah')} title='Tambah Dosen Pengajar'><FaPlus /></button>
                                    }
                                    {kodeDsnPengajar ? <button className='btn btn-xs btn-warning btn-circle' onClick={() => modalDsnPengajar('Edit')} title='Edit Dosen Pengajar'><FaEdit /></button> : ""}
                                    {kodeDsnPengajar ? <button className='btn btn-xs btn-error btn-circle' onClick={() => deleteDosenPengajar(kodeDsnPengajar)} title='Hapus Dosen Pengajar'><FaTrash /></button> : ""}
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-48'>
                                        <label>
                                            <span className="">Dosen Pengganti</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{pengganti}</a>
                                    </div>
                                </div>
                                <div className='mt-2 flex gap-1'>
                                    {kodeDsnPengganti ? "" :
                                        <button className='btn btn-xs btn-primary btn-circle' onClick={() => modalDsnPengganti('Tambah')} title='Tambah Dosen Pengajar'><FaPlus /></button>
                                    }
                                    {kodeDsnPengganti ? <button className='btn btn-xs btn-warning btn-circle' onClick={() => modalDsnPengganti('Edit')} title='Edit Dosen Pengajar'><FaEdit /></button> : ""}
                                    {kodeDsnPengganti ? <button className='btn btn-xs btn-error btn-circle' onClick={() => deleteDosenPengganti(kodeDsnPengganti)} title='Hapus Dosen Pengajar'><FaTrash /></button> : ""}
                                </div>
                            </div>
                            {/* <form onSubmit={tambahDsnPengajar}>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Dosen Pengajar</span>
                                    </label>
                                    
                                    <button className='btn btn-sm btn-primary mt-2'><FaSave /> Simpan</button>
                                </div>
                            </form> */}
                            {/* <form action="">
                                <div>

                                    <Select
                                        className="basic-single w-full max-w-xs"
                                        classNamePrefix="select"
                                        options={select2}
                                        onChange={dsnPengganti}
                                        isClearable={isClearable}
                                        id='input-select'
                                    />
                                    <button className='btn btn-sm btn-primary mt-2'><FaSave /> Simpan</button>
                                </div>
                            </form> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DosenPengajar