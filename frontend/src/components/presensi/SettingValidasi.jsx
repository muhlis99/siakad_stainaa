import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaCog, FaReply, FaTimes } from 'react-icons/fa'
import moment from 'moment'
import Swal from 'sweetalert2'
import { Link, useLocation } from 'react-router-dom'

const SettingValidasi = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Available, setAvailable] = useState([])
    const [NotAvailable, setNotAvailable] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [nipy, setNipy] = useState("")
    const [nama, setNama] = useState("")
    const [keterangan, setKeterangan] = useState("")
    const [kodePertemuan, setKodePertemuan] = useState("")
    const [idPresensi, setIdPresensi] = useState("")
    const [jamMasuk, setJamMasuk] = useState("")
    const [jamPulang, setJamPulang] = useState("")
    const location = useLocation()

    useEffect(() => {
        if (location.state != null) {
            setKodeTahun(location.state.kodeTahun)
            setTanggal(location.state.tgl)
        }
        console.log(location.state);
    }, [location.state])

    useEffect(() => {
        getTahunAjaran()
    }, [])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getAvailable()
        getNotAvailable()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeTahun, kodeSemester, tanggal])

    const getJenjangPendidikan = async () => {
        try {
            const response = await axios.get('v1/jenjangPendidikan/all')
            setJenjang(response.data.data)
        } catch (error) {

        }
    }

    const getFakultas = async () => {
        try {
            if (kodeJenjang != 0) {
                const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
                setFakultas(response.data.data)
            }
        } catch (error) {

        }
    }

    const getProdi = async () => {
        try {
            if (kodeFakultas != 0) {
                const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
                setProdi(response.data.data)
            }
        } catch (error) {

        }
    }

    const getTahunAjaran = async () => {
        try {
            const response = await axios.get('v1/tahunAjaran/all')
            setTahun(response.data.data)
        } catch (error) {

        }
    }

    const getSemester = async () => {
        try {
            if (kodeTahun != 0) {
                const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
                setSemester(response.data.data)
            }
        } catch (error) {
            // console.log(error.response)
        }
    }

    const getAvailable = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && kodeTahun && kodeSemester && tanggal) {
                const response = await axios.get(`v1/presensiDosen/getDosenValidasiAvailable/${tanggal}/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setAvailable(response.data.data)
            }
        } catch (error) {
            // console.log(error.response)
        }
    }

    const getNotAvailable = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && kodeTahun && kodeSemester && tanggal) {
                const response = await axios.get(`v1/presensiDosen/getDosenValidasiNoAvailable/${tanggal}/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setNotAvailable(response.data.data)
                console.log(response.data.data);
            }
        } catch (error) {

        }
    }

    const handleShow = (e, f, g, h, i, j, k) => {
        setNipy(e)
        setNama(f)
        setKodePertemuan(h)
        setIdPresensi(i)
        if (g == 'hadir' || g == 'Hadir') {
            setKeterangan('A')
        } else if (g == 'zoom' || g == 'Zoom') {
            setKeterangan('B')
        } else if (g == 'izin' || g == 'Izin') {
            setKeterangan('C')
        }
        setJamMasuk(j)
        setJamPulang(k)
        document.getElementById('my-modal').checked = true
    }

    const onValueChange = (e) => {
        setKeterangan(e.target.value)
    }

    const handleModal = (e, f, g, h, i, j, k) => {
        setNipy(e)
        setNama(f)
        setKodePertemuan(h)
        setIdPresensi(i)
        if (g == 'hadir' || g == 'Hadir') {
            setKeterangan('A')
        } else if (g == 'zoom' || g == 'Zoom') {
            setKeterangan('B')
        } else if (g == 'izin' || g == 'Izin') {
            setKeterangan('C')
        }
        setJamMasuk(j)
        setJamPulang(k)
        document.getElementById('my-validating').checked = true
    }

    const handleClose = () => {
        setNipy("")
        setKodePertemuan("")
        setNama("")
        setKeterangan("")
        setIdPresensi("")
        setJamMasuk("")
        setJamPulang("")
        document.getElementById('my-modal').checked = false
    }

    const closeModal = () => {
        setNipy("")
        setKodePertemuan("")
        setNama("")
        setKeterangan("")
        setIdPresensi("")
        setJamMasuk("")
        setJamPulang("")
        document.getElementById('my-validating').checked = false
    }

    const simpanValidasi = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/presensiDosen/validasiPresensi/${idPresensi}`, {
                codeThn: kodeTahun,
                codeSmt: kodeSemester,
                codeJnj: kodeJenjang,
                codeFks: kodeFakultas,
                codePrd: kodeProdi,
                codeJadper: kodePertemuan,
                absensi: keterangan,
                nip_ynaa: nipy,
                jam_masuk: jamMasuk,
                jam_pulang: jamPulang,
                tgl: tanggal,
            }).then(function (response) {
                handleClose()
                closeModal()
                Swal.fire({
                    title: response.data.message,
                    icon: 'success',
                }).then(() => {
                    getAvailable()
                    getNotAvailable()
                })
            })
        } catch (error) {

        }
    }

    const simpanValidating = async (e) => {
        e.preventDefault()
        if (jamMasuk == '') {
            Swal.fire({
                icon: 'error',
                title: 'Jam Masuk Kosong'
            })
        } else if (jamPulang == '') {
            Swal.fire({
                icon: 'error',
                title: 'Jam Pulang Kosong'
            })
        } else {
            try {
                await axios.put(`v1/presensiDosen/validasiPresensi/${idPresensi}`, {
                    codeThn: kodeTahun,
                    codeSmt: kodeSemester,
                    codeJnj: kodeJenjang,
                    codeFks: kodeFakultas,
                    codePrd: kodeProdi,
                    codeJadper: kodePertemuan,
                    absensi: keterangan,
                    nip_ynaa: nipy,
                    jam_masuk: jamMasuk,
                    jam_pulang: jamPulang,
                    tgl: tanggal,
                }).then(function (response) {
                    handleClose()
                    closeModal()
                    Swal.fire({
                        title: response.data.message,
                        icon: 'success',
                    }).then(() => {
                        getAvailable()
                        getNotAvailable()
                    })
                })
            } catch (error) {

            }
        }
    }

    return (
        <>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={simpanValidasi}>
                        <div className='bg-base-200 border-b-2 p-3 pb-7'>
                            <button type='button' className="btn btn-xs btn-circle btn-error float-right" onClick={handleClose}><FaTimes /></button>
                        </div>
                        <div className='p-3 border-t-2'>
                            <div className="grid gap-3">
                                <div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='py-1 px-2'>NIP</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>{nipy}</td>
                                            </tr>
                                            <tr>
                                                <td className='py-1 px-2'>Nama Dosen</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>{nama}</td>
                                            </tr>
                                            <tr>
                                                <td className='py-1 px-2'>Tanggal Pertemuan</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>{moment(tanggal).format('DD MMMM YYYY')}</td>
                                            </tr>
                                            <tr>
                                                <td className='py-1 px-2'>Jam Masuk</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>{jamMasuk != '' ? `${jamMasuk} WIB` : '-'} </td>
                                            </tr>
                                            <tr>
                                                <td className='py-1 px-2'>Jam Pulang</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>{jamPulang != '' ? `${jamPulang} WIB` : '-'}</td>
                                            </tr>
                                            <tr>
                                                <td className='py-1 px-2'>Status</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>
                                                    <div className='grid grid-cols-3'>
                                                        <div className="inline-flex items-center">
                                                            <label className="relative flex items-center pr-3 rounded-full cursor-pointer" htmlFor="hadir">
                                                                <input
                                                                    name="type"
                                                                    type="radio"
                                                                    className="radio checked:bg-blue-500"
                                                                    checked={keterangan == 'A'}
                                                                    onChange={onValueChange}
                                                                    value="A"
                                                                    id="hadir" />
                                                            </label>
                                                            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="hadir">
                                                                Hadir
                                                            </label>
                                                        </div>
                                                        <div className="inline-flex items-center">
                                                            <label className="relative flex items-center px-3 rounded-full cursor-pointer" htmlFor="zoom">
                                                                <input
                                                                    name="type"
                                                                    type="radio"
                                                                    className="radio checked:bg-[#28A745]"
                                                                    checked={keterangan == 'B'}
                                                                    onChange={onValueChange}
                                                                    value="B"
                                                                    id="zoom" />
                                                            </label>
                                                            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="zoom">
                                                                Zoom
                                                            </label>
                                                        </div>
                                                        <div className="inline-flex items-center">
                                                            <label className="relative flex items-center px-3 rounded-full cursor-pointer" htmlFor="izin">
                                                                <input
                                                                    name="type"
                                                                    type="radio"
                                                                    className="radio checked:bg-[#6C757D]"
                                                                    checked={keterangan == 'C'}
                                                                    onChange={onValueChange}
                                                                    value="C"
                                                                    id="izin" />
                                                            </label>
                                                            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="izin">
                                                                Izin
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <button type='submit' className="btn btn-sm btn-primary capitalize float-right mb-3 mt-5">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
            <input type="checkbox" id="my-validating" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={
                        keterangan == 'C' ?
                            simpanValidasi
                            :
                            simpanValidating
                    }>
                        <div className='bg-base-200 border-b-2 p-3 pb-7'>
                            <button type='button' className="btn btn-xs btn-circle btn-error float-right" onClick={closeModal}><FaTimes /></button>
                        </div>
                        <div className='p-3 border-t-2'>
                            <div className="grid gap-3">
                                <div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className='py-1 px-2'>NIP</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>{nipy}</td>
                                            </tr>
                                            <tr>
                                                <td className='py-1 px-2'>Nama Dosen</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>{nama}</td>
                                            </tr>
                                            <tr>
                                                <td className='py-1 px-2'>Tanggal Pertemuan</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>{moment(tanggal).format('DD MMMM YYYY')}</td>
                                            </tr>
                                            <tr>
                                                <td className='py-1 px-2'>Status</td>
                                                <td className='py-1 px-2'>&nbsp;:&nbsp;</td>
                                                <td className='py-1 px-2'>
                                                    <div className='grid grid-cols-3'>
                                                        <div className="inline-flex items-center">
                                                            <label className="relative flex items-center pr-3 rounded-full cursor-pointer" htmlFor="hadir">
                                                                <input
                                                                    name="type"
                                                                    type="radio"
                                                                    className="radio checked:bg-blue-500"
                                                                    checked={keterangan == 'A'}
                                                                    onChange={onValueChange}
                                                                    value="A"
                                                                    id="hadir" />
                                                            </label>
                                                            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="hadir">
                                                                Hadir
                                                            </label>
                                                        </div>
                                                        <div className="inline-flex items-center">
                                                            <label className="relative flex items-center px-3 rounded-full cursor-pointer" htmlFor="zoom">
                                                                <input
                                                                    name="type"
                                                                    type="radio"
                                                                    className="radio checked:bg-[#28A745]"
                                                                    checked={keterangan == 'B'}
                                                                    onChange={onValueChange}
                                                                    value="B"
                                                                    id="zoom" />
                                                            </label>
                                                            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="zoom">
                                                                Zoom
                                                            </label>
                                                        </div>
                                                        <div className="inline-flex items-center">
                                                            <label className="relative flex items-center px-3 rounded-full cursor-pointer" htmlFor="izin">
                                                                <input
                                                                    name="type"
                                                                    type="radio"
                                                                    className="radio checked:bg-[#6C757D]"
                                                                    checked={keterangan == 'C'}
                                                                    onChange={onValueChange}
                                                                    value="C"
                                                                    id="izin" />
                                                            </label>
                                                            <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="izin">
                                                                Izin
                                                            </label>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {keterangan == 'A' || keterangan == 'B' ?
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <label className="label">
                                                <span className="text-base label-text">Jam Masuk</span>
                                            </label>
                                            <input type="time" className="input input-sm input-bordered w-full"
                                                value={jamMasuk} onChange={(e) => setJamMasuk(e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="label">
                                                <span className="text-base label-text">Jam Pulang</span>
                                            </label>
                                            <input type="time" className="input input-sm input-bordered w-full"
                                                value={jamPulang} onChange={(e) => setJamPulang(e.target.value)} />
                                        </div>
                                    </div>
                                    :
                                    ""
                                }
                            </div>
                            <button type='submit' className="btn btn-sm btn-primary capitalize float-right mb-3 mt-5">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                <div className='card-body p-4'>
                    <div className="grid grid-cols-5 gap-2">
                        <div>
                            <select className="select select-sm select-bordered w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                <option value="">Jenjang Pendidikan</option>
                                {Jenjang.map((item) => (
                                    <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-bordered select-sm w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                <option value="">Fakultas</option>
                                {Fakultas.map((item) => (
                                    <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-bordered select-sm w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
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
                    </div>
                </div>
            </div>
            <div className='card bg-base-100 card-bordered shadow-md'>
                <div className="card-body p-4">
                    <div className='flex gap-2'>
                        {location.state.hal == 'formPresensi' ?
                            <Link
                                to='/presensi/proses'
                                state={{
                                    kodeTahun: location.state.kodeTahun,
                                    mom: location.state.mom,
                                    tgl: location.state.tgl,
                                    hal: location.state.hal
                                }}
                                className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex gap-1 items-center no-underline'><FaReply />Kembali Ke Absen</Link>
                            :
                            ""
                        }
                        <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className='input input-bordered input-sm' />
                    </div>
                    <div className="overflow-x-auto mb-2">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className='text-gray-700 bg-[#d4cece]'>
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-sm">NO</th>
                                    <th scope="col" className="px-3 py-2 text-sm">NIP Yayasan</th>
                                    <th scope="col" className="px-3 py-2 text-sm">Nama Dosen</th>
                                    <th scope="col" className='px-3 py-2 text-sm'>Jam Masuk</th>
                                    <th scope="col" className='px-3 py-2 text-sm'>Jam Pulang</th>
                                    <th scope="col" className='px-3 py-2 text-sm'>Keterangan</th>
                                    <th scope="col" className="px-3 py-2 text-sm" align='center'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Available.length == 0 && NotAvailable.length == 0 ?
                                    <tr className='bg-white border-b text-gray-500 border-x'>
                                        <td className='px-6 py-2 font-semibold' align='center' colSpan='7'>Data Presensi Kosong</td>
                                    </tr>
                                    :
                                    <>
                                        {Available.map((item, index) => (
                                            <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-3 py-2 font-semibold'>{index + 1}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.nip_ynaa}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.dosens[0].nama}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.jam_masuk == '' ? '-' : item.jam_masuk}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.jam_pulang == '' ? '-' : item.jam_pulang}</td>
                                                <td className='px-3 py-2 font-semibold'>
                                                    {item.keterangan == 'hadir' || item.keterangan == 'Hadir' ?
                                                        <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-blue-500 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                        : item.keterangan == 'zoom' || item.keterangan == 'Zoom' ?
                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#28A745] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                            :
                                                            <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#6C757D] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">{item.keterangan}</span>
                                                    }
                                                </td>
                                                <td className='px-3 py-2 font-semibold' align='center'>
                                                    {item.keterangan == 'izin' || item.keterangan == 'Izin' ?
                                                        <button onClick={() => handleModal(
                                                            item.nip_ynaa,
                                                            item.dosens[0].nama,
                                                            item.keterangan,
                                                            item.code_jadwal_pertemuan,
                                                            item.id_presensi_dosen,
                                                            item.jam_masuk,
                                                            item.jam_pulang
                                                        )} className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex gap-1 items-center no-underline'><FaCog /></button>
                                                        :
                                                        <button onClick={() => handleShow(
                                                            item.nip_ynaa,
                                                            item.dosens[0].nama,
                                                            item.keterangan,
                                                            item.code_jadwal_pertemuan,
                                                            item.id_presensi_dosen,
                                                            item.jam_masuk,
                                                            item.jam_pulang
                                                        )} className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex gap-1 items-center no-underline'><FaCog /></button>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                        {NotAvailable.map((item, index) => (
                                            <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-3 py-2 font-semibold'>{index + 1 + Available.length}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.jadwalKuliahs[0].dosen_pengajar}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.jadwalKuliahs[0].dosenPengajar[0].nama}</td>
                                                <td className='px-3 py-2 font-semibold'>-</td>
                                                <td className='px-3 py-2 font-semibold'>-</td>
                                                <td className='px-3 py-2 font-semibold'>
                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">tidak absen</span>
                                                </td>
                                                <td className='px-3 py-2 font-semibold' align='center'>
                                                    <button onClick={() => handleModal(
                                                        item.jadwalKuliahs[0].dosen_pengajar,
                                                        item.jadwalKuliahs[0].dosenPengajar[0].nama,
                                                        'tidak',
                                                        item.code_jadwal_pertemuan,
                                                        '0',
                                                        '',
                                                        ''
                                                    )} className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex gap-1 items-center no-underline'><FaCog /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SettingValidasi