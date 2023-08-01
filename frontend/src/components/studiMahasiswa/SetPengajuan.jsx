import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { FaReply, FaSave } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

const SetPengajuan = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Program, setProgram] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [select2, setSelect2] = useState("")
    const [isClearable, setIsClearable] = useState(true)
    const [nim, setNim] = useState("")
    const [ajuan, SetAjuan] = useState("")
    const [tgl, setTgl] = useState("")
    const [alasan, setAlasan] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getTahunAjaran()
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getMhsBySemester()
    }, [kodeFakultas, kodeJenjang, kodeProdi, kodeSemester, kodeTahun])

    useEffect(() => {
        options()
    }, [Mahasiswa])

    const getJenjangPendidikan = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all')
        setJenjang(response.data.data)
    }

    const getFakultas = async () => {
        if (kodeJenjang) {
            const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
            setFakultas(response.data.data)
        }
    }

    const getProdi = async () => {
        if (kodeFakultas) {
            const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
            setProgram(response.data.data)
        }
    }

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getSemester = async () => {
        if (kodeTahun) {
            const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
            setSemester(response.data.data)
        }
    }

    const getMhsBySemester = async () => {
        if (kodeFakultas != 0 & kodeJenjang != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/khs/all/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
            setMahasiswa(response.data.data)
        }
    }

    const options = () => {
        var i = Mahasiswa.map(item => ({
            value: item.nim,
            label: item.nim + " | " + item.mahasiswas[0].nama,
        }))
        setSelect2(i)
    }

    const onchange = (e) => {
        setNim(e ? e.value : "")
        console.log(e ? e.value : "")
    }

    const simpanPengajuan = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`v1/pengajuanStudi/createMahasiswa`, {
                code_tahun_ajaran: kodeTahun,
                code_semester: kodeSemester,
                code_jenjang_pendidikan: kodeJenjang,
                code_fakultas: kodeFakultas,
                code_prodi: kodeProdi,
                nim: nim,
                tanggal_pengajuan: tgl,
                pengajuan: ajuan,
                alasan: alasan
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate('/pengajuanstudi')
                });
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
        <div className='mt-5 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Studi Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <form onSubmit={simpanPengajuan}>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Jenjang Pendidikan</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                        <option value="">Jenjang Pendidikan</option>
                                        {Jenjang.map((item) => (
                                            <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Fakultas</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                        <option value="">Fakultas</option>
                                        {Fakultas.map((item) => (
                                            <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Prodi</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                        <option value="">Prodi</option>
                                        {Program.map((item) => (
                                            <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Tahun AJaran</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                        <option value="">Tahun Ajaran</option>
                                        {Tahun.map((item) => (
                                            <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Semester</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                        <option value="">Semester</option>
                                        {Semester.map((item) => (
                                            <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Nama Mahasiswa</span>
                                    </label>
                                    <Select
                                        className="basic-single w-full rounded-md"
                                        classNamePrefix="select"
                                        options={select2}
                                        onChange={onchange}
                                        isClearable={isClearable}
                                    />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Pengajuan</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={ajuan} onChange={(e) => SetAjuan(e.target.value)}>
                                        <option value="">Pengajuan</option>
                                        <option value="cuti">Cuti</option>
                                        <option value="berhenti">Berhenti</option>
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Tanggal Pengajuan</span>
                                    </label>
                                    <input type='date' className="input input-sm input-bordered w-full" value={tgl} onChange={(e) => setTgl(e.target.value)} />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Alasan</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Masukkan Alasan"
                                        value={alasan}
                                        onChange={(e) => setAlasan(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                            <hr />
                            <div className="grid grid-cols-2 mt-2">
                                <div>
                                    <Link to="/pengajuanstudi" className='btn btn-sm btn-error'><FaReply />Kembali</Link>
                                </div>
                                <div>
                                    <button className='btn btn-sm btn-primary float-right'><FaSave />Simpan</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SetPengajuan