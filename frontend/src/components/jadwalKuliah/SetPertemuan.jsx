import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { FaAngleDown, FaEdit, FaInfo, FaTimes, FaTrash } from 'react-icons/fa'
import { Link, useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const SetPertemuan = () => {
    const [Pertemuan, setPertemuan] = useState([])
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
    const [statusPerencanaan, setStatusPerencanaan] = useState("")
    const [idJadwal, setIdJadwal] = useState("")
    const [kodeJdl, setKodeJdl] = useState("")
    const [statusModal, setStatusModal] = useState("")
    const [jenisPertemuan, setJenisPertemuan] = useState("")
    const [metode, setMetode] = useState("")
    const [url, setUrl] = useState("")
    const [rencanaMateri, setRencanaMateri] = useState("")
    const [lampiranMateri, setLampiranMateri] = useState("")
    const [statusPertemuan, setStatusPertemuan] = useState("")
    const [tatapMuka, setTatapMuka] = useState("")
    const [hari, setHari] = useState("")
    const [tglPertemuan, setTglPertemuan] = useState("")
    const [waktu, setWaktu] = useState("")
    const [idPertermuan, setIdPertemuan] = useState("")
    const [statusForm, setStatusForm] = useState("")
    const [checked, setChecked] = useState([])
    const location = useLocation()

    useEffect(() => {
        getDataKelasById()
    }, [location.state])

    useEffect(() => {
        getJadwalByKelas()
    }, [location.state])

    useEffect(() => {
        getJadwalPertemuan()
    }, [location.state])

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
            setKodeJdl(response.data.data.code_jadwal_kuliah)
        } catch (error) {

        }
    }

    const getJadwalPertemuan = async () => {
        const response = await axios.get(`v1/jadwalPertemuan/all/${location.state.jad}`)
        setPertemuan(response.data.data)
        if (response.data.data == 0) {
            setStatusPerencanaan("tambah")
        } else {
            setStatusPerencanaan("")
        }
    }

    const simpanPerencanaan = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`v1/jadwalPertemuan/create/${location.state.jad}`).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getJadwalPertemuan()
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

    const editPertemuan = async (e, f) => {
        const response = await axios.get(`v1/jadwalPertemuan/getById/${e}`)
        setIdPertemuan(response.data.data.id_jadwal_pertemuan)
        setJenisPertemuan(response.data.data.jenis_pertemuan)
        setMetode(response.data.data.metode_pembelajaran)
        setUrl(response.data.data.url_online)
        setRencanaMateri(response.data.data.rencana_materi)
        setLampiranMateri(response.data.data.lampiran_materi)
        setStatusPertemuan(response.data.data.status_pertemuan)
        setTatapMuka(response.data.data.pertemuan)
        setHari(response.data.data.jadwalKuliahs[0].hari)
        setTglPertemuan(response.data.data.tanggal_pertemuan)
        setWaktu(response.data.data.jadwalKuliahs[0].jam_mulai + '-' + response.data.data.jadwalKuliahs[0].jam_selesai)
        setStatusModal(f)
        document.getElementById('my-modal').checked = true
    }

    const loadLampiran = (e) => {
        const image = e.target.files[0]
        setLampiranMateri(image)
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        setIdPertemuan("")
        setJenisPertemuan("")
        setMetode("")
        setUrl("")
        setRencanaMateri("")
        setLampiranMateri("")
        setStatusPertemuan("")
        setTatapMuka("")
        setHari("")
        setTglPertemuan("")
        setWaktu("")
        setLampiranMateri("")
        if (statusModal == 'edit') {
            document.getElementById('input-file').value = null
        }
    }

    const updatePertemuan = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("jenis_pertemuan", jenisPertemuan)
        formData.append("metode_pembelajaran", metode)
        formData.append("url_online", url)
        formData.append("rencana_materi", rencanaMateri)
        formData.append("lampiran_materi", lampiranMateri)
        formData.append("status_pertemuan", statusPertemuan)
        try {
            await axios.put(`v1/jadwalPertemuan/update/${idPertermuan}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(function (response) {
                document.getElementById('my-modal').checked = false
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    if (statusModal == 'edit') {
                        document.getElementById('input-file').value = null
                    }
                    setIdPertemuan("")
                    setJenisPertemuan("")
                    setMetode("")
                    setUrl("")
                    setRencanaMateri("")
                    setLampiranMateri("")
                    setStatusPertemuan("")
                    setTatapMuka("")
                    setHari("")
                    setTglPertemuan("")
                    setWaktu("")
                    getJadwalPertemuan()
                });
            })
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            }
        }
    }

    const handleCheck = (e, item) => {
        if (e.target.checked) {
            setChecked([...checked, item.id_jadwal_pertemuan])
        } else {
            setChecked(checked.filter((o) => o !== item.id_jadwal_pertemuan))
        }
    }

    const modalOpen = (e) => {
        if (checked == 0) {
            Swal.fire({
                title: 'Tidak ada data yang dipilih',
                icon: 'error'
            })
        } else {
            document.getElementById('my-modal-2').checked = true
            setStatusForm(e)
        }
    }

    const modalClose2 = (e) => {
        document.getElementById('my-modal-2').checked = false
        setJenisPertemuan("")
        setChecked("")
        setMetode("")
        setStatusForm("")
    }

    const updateJenis = async (e) => {
        e.preventDefault()
        try {
            await axios.put('v1/jadwalPertemuan/setJenisPertemuan', {
                id: checked,
                jenis_pertemuan: jenisPertemuan,
            }).then(function (response) {
                document.getElementById('my-modal-2').checked = false
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    setJenisPertemuan("")
                    setChecked("")
                    getJadwalPertemuan()
                });
            })
        } catch (error) {

        }
    }

    const updateMetode = async (e) => {
        e.preventDefault()
        try {
            await axios.put('v1/jadwalPertemuan/setMetodePembelajaran', {
                id: checked,
                metode_pembelajaran: metode,
            }).then(function (response) {
                document.getElementById('my-modal-2').checked = false
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    setMetode("")
                    setChecked("")
                    getJadwalPertemuan()
                });
            })
        } catch (error) {

        }
    }

    const nonaktifkan = (pertId) => {
        Swal.fire({
            title: "Hapus data ini?",
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
                    axios.put(
                        `v1/jadwalPertemuan/deleteStatus/${pertId}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getJadwalPertemuan()
                        });
                    })
                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl rounded-none scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100">
                    <button className="btn btn-xs btn-circle btn-danger absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                    <div className="py-4">
                        {statusModal == 'edit' ? <form onSubmit={updatePertemuan}>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Pertemuan</span>
                                    </label>
                                    <input type="number" disabled className='input input-sm input-bordered w-full' value={tatapMuka} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Hari</span>
                                    </label>
                                    <input type="text" disabled className='input input-sm input-bordered w-full' value={hari} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tanggal Pertemuan</span>
                                    </label>
                                    <input type="date" disabled className='input input-sm input-bordered w-full' value={tglPertemuan} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Waktu</span>
                                    </label>
                                    <input type="text" disabled className='input input-sm input-bordered w-full' value={waktu} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Jenis Pertemuan</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={jenisPertemuan} onChange={(e) => setJenisPertemuan(e.target.value)}>
                                        <option value="">Jenis Pertemuan</option>
                                        <option value="kuliah">Kuliah</option>
                                        <option value="uts">Ujian Tengah Semester</option>
                                        <option value="uas">Ujian Akhir Semester</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Metode Pembelajaran</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={metode} onChange={(e) => setMetode(e.target.value)}>
                                        <option value="">Metode Pembelajaran</option>
                                        <option value="offline">Offline</option>
                                        <option value="online">Online</option>
                                        <option value="campur">Campur</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Link Online</span>
                                    </label>
                                    <input type="text" className='input input-sm input-bordered w-full' value={url} onChange={(e) => setUrl(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Rencana Materi</span>
                                    </label>
                                    <input type="text" className='input input-sm input-bordered w-full' value={rencanaMateri} onChange={(e) => setRencanaMateri(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Lampiran Materi</span>
                                    </label>
                                    <input type="file" onChange={loadLampiran} id="input-file" className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Status Pertemuan</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={statusPertemuan} onChange={(e) => setStatusPertemuan(e.target.value)}>
                                        <option value="">Status Pertemuan</option>
                                        <option value="terjadwal">Terjadwal</option>
                                        <option value="selesai">Selesai</option>
                                        <option value="diganti">Diganti</option>
                                    </select>
                                </div>
                                <div className='col-span-2'>
                                    <hr className='mt-2' />
                                    <button className="btn btn-sm btn-default float-right mt-3"><FaEdit /><span className="ml-1">Edit</span></button>
                                </div>
                            </div>
                        </form> :
                            <div className="grid gap-1 p-3 rounded-md mb-3">
                                <div className='grid gap-2'>
                                    <div className='flex gap-2'>
                                        <div className='flex-initial w-40'>
                                            <label>
                                                <span className="">Pertemuan</span>
                                            </label>
                                        </div>
                                        <div className='flex-initial w-80'>
                                            <a>{tatapMuka}</a>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='flex-initial w-40'>
                                            <label>
                                                <span className="">Hari</span>
                                            </label>
                                        </div>
                                        <div className='flex-initial w-80'>
                                            <a>{hari}, {tglPertemuan}</a>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='flex-initial w-40'>
                                            <label>
                                                <span className="">Jenis Pertemuan</span>
                                            </label>
                                        </div>
                                        <div className='flex-initial w-80'>
                                            <a>{jenisPertemuan}</a>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='flex-initial w-40'>
                                            <label>
                                                <span className="">Waktu</span>
                                            </label>
                                        </div>
                                        <div className='flex-initial w-80'>
                                            <a>{waktu}</a>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='flex-initial w-40'>
                                            <label>
                                                <span className="">Metode Pembelajaran</span>
                                            </label>
                                        </div>
                                        <div className='flex-initial w-80'>
                                            <a>{metode}</a>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='flex-initial w-40'>
                                            <label>
                                                <span className="">Link Online</span>
                                            </label>
                                        </div>
                                        <div className='flex-initial w-80'>
                                            <a className="link">{url}</a>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='flex-initial w-40'>
                                            <label>
                                                <span className="">Rencana Materi</span>
                                            </label>
                                        </div>
                                        <div className='flex-initial w-80'>
                                            <a>{rencanaMateri}</a>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='flex-initial w-40'>
                                            <label>
                                                <span className="">Status Pertemuan</span>
                                            </label>
                                        </div>
                                        <div className='flex-initial w-80'>
                                            <a>{statusPertemuan}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>

            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <button className="btn btn-xs btn-circle btn-danger absolute right-2 top-2" onClick={modalClose2}><FaTimes /></button>
                    {statusForm == 'jenis' ?
                        <form onSubmit={updateJenis}>
                            <div className="py-4">
                                <div className="grid">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Jenis Pertemuan</span>
                                        </label>
                                        <select className="select select-bordered select-sm w-full" value={jenisPertemuan} onChange={(e) => setJenisPertemuan(e.target.value)}>
                                            <option disabled value={""}>Jenis Pertemuan</option>
                                            <option value="kuliah">Kuliah</option>
                                            <option value="uts">Ujian Tengah Semester</option>
                                            <option value="uas">Ujian Akhir Semester</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button type='submit' className="btn btn-xs btn-primary">update</button>
                            </div>
                        </form>
                        :
                        <form onSubmit={updateMetode}>
                            <div className="py-4">
                                <div className="grid">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Metode Pembelajaran</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={metode} onChange={(e) => setMetode(e.target.value)}>
                                            <option value="">Metode Pembelajaran</option>
                                            <option value="offline">Offline</option>
                                            <option value="online">Online</option>
                                            <option value="campur">Campur</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-action">
                                <button type='submit' className="btn btn-xs btn-primary">update</button>
                            </div>
                        </form>}
                </div>
            </div>

            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Set Pertemuan</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid">
                            <div className='mb-2'>
                                <div className='float-right'>
                                    <div className="dropdown mr-1">
                                        <label tabIndex={0} className="btn btn-sm btn-blue"><span className='mr-1'>Navigasi</span><FaAngleDown /></label>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><Link to={`/detailjadwal`} state={{ thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, mak: location.state.mak, kls: location.state.kls, idn: location.state.idn }}>Detail Jadwal</Link></li>
                                            <li><Link to={`/setDsn`} state={{ thn: location.state.thn, sem: location.state.sem, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, mak: location.state.mak, kls: location.state.kls, idn: location.state.idn }}>Dosen Pengajar</Link></li>
                                        </ul>
                                    </div>
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-sm btn-default"><span className='mr-1'>Aksi</span><FaAngleDown /></label>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li>{statusPerencanaan == 'tambah' ? <a onClick={simpanPerencanaan}>Buat Perencanaan</a> : <a>Buat Perencanaan</a>}</li>
                                            <li><a onClick={() => modalOpen('jenis')}>Set Jenis Pertemuan</a></li>
                                            <li><a onClick={() => modalOpen('metode')}>Set Metode</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 bg-base-100 gap-1 p-3 rounded-md mb-3">
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
                            <div className="overflow-x-auto rounded-md">
                                <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                                    <thead className='text-gray-700 bg-[#F2F2F2]'>
                                        <tr>
                                            <th scope="col" className="py-1 border">#</th>
                                            <th scope="col" className="py-1 border">Pert</th>
                                            <th scope="col" className="py-1 border">Hari</th>
                                            <th scope="col" className="py-1 border">Waktu</th>
                                            <th scope="col" className="py-1 border">Jenis</th>
                                            <th scope="col" className="py-1 border">Metode</th>
                                            <th scope="col" className="py-1 border">Pengajar</th>
                                            <th scope="col" className="py-1 border">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Pertemuan.map((item, index) => (
                                            <tr key={index} className='bg-white border text-gray-700' >
                                                <th scope="row" className="py-1 border">
                                                    <div className="form-control">
                                                        <label className="cursor-pointer label justify-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={item.status == 'aktif' ? checked.includes(item.id_jadwal_pertemuan) : ""}
                                                                onChange={(e) => handleCheck(e, item)}
                                                                className="checkbox checkbox-success checkbox-sm"
                                                            />
                                                        </label>
                                                    </div>
                                                </th>
                                                <td className='py-1 border' align='center'>{item.pertemuan}</td>
                                                <td className='py-1 border' align='center'>{item.jadwalKuliahs[0].hari + ", " + item.tanggal_pertemuan}</td>
                                                <td className='py-1 border' align='center'>{item.jadwalKuliahs[0].jam_mulai + " s/d " + item.jadwalKuliahs[0].jam_selesai}</td>
                                                <td className='py-1 border' align='center'>{item.jenis_pertemuan}</td>
                                                <td className='py-1 border' align='center'>{item.metode_pembelajaran}</td>
                                                <td className='py-1 border' align='center'>{item.jadwalKuliahs[0].dosen_pengajar}</td>
                                                <td className='py-1 border' align='center'>
                                                    <div>
                                                        <button className="btn btn-xs btn-circle text-white btn-info mr-1" title='Detail' onClick={() => editPertemuan(item.id_jadwal_pertemuan, 'detail')}><FaInfo /></button>
                                                        <button className="btn btn-xs btn-circle text-white btn-warning" title='Edit' onClick={() => editPertemuan(item.id_jadwal_pertemuan, 'edit')}><FaEdit /></button>
                                                        <button className='btn btn-xs btn-circle btn-error ml-1' title='Hapus' onClick={() => nonaktifkan(item.id_jadwal_pertemuan)}><FaTrash /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default SetPertemuan