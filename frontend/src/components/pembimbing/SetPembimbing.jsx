import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { Link, useNavigate } from "react-router-dom"
import { FaReply, FaSave } from 'react-icons/fa'
import Swal from 'sweetalert2'

const SetPembimbing = () => {
    const [Dosen, setDosen] = useState([])
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Program, setProgram] = useState([])
    const [select2, setSelect2] = useState("")
    const [isClearable, setIsClearable] = useState(true)
    const [nipy, setNipy] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kuota, setKuota] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getAutoDosen()
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        options()
    }, [Dosen])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    const getAutoDosen = async () => {
        const response = await axios.get('v1/pembimbingAkademik/autocompleteDosen')
        setDosen(response.data.data)
    }

    const options = () => {
        var i = Dosen.map(item => ({
            value: item.nip_ynaa,
            label: item.nip_ynaa + " | " + item.nama,
        }))
        setSelect2(i)
    }

    const onchange = (e) => {
        setNipy(e ? e.value : "")
    }

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

    const simpanPembimbing = async (e) => {
        e.preventDefault()
        try {
            if (nipy == 0) {
                Swal.fire({
                    title: "Dosen Tidak Boleh Kosong",
                    icon: "error"
                })
            } else if (kodeJenjang == 0) {
                Swal.fire({
                    title: "Jenjang Pendidikan Tidak Boleh Kosong",
                    icon: "error"
                })
            } else if (kodeFakultas == 0) {
                Swal.fire({
                    title: "Fakultas Tidak Boleh Kosong",
                    icon: "error"
                })
            } else if (kodeProdi == 0) {
                Swal.fire({
                    title: "Prodi Tidak Boleh Kosong",
                    icon: "error"
                })
            } else if (kuota == 0) {
                Swal.fire({
                    title: "Kuota Tidak Boleh Kosong",
                    icon: "error"
                })
            } else {
                await axios.post(`v1/pembimbingAkademik/create`, {
                    code_jenjang_pendidikan: kodeJenjang,
                    code_fakultas: kodeFakultas,
                    code_prodi: kodeProdi,
                    dosen: nipy,
                    kouta_bimbingan: kuota
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate('/pembimbingakademik', { state: { collaps: 'kuliah', activ: '/pembimbingakademik' } })
                    });
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

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Pembimbing Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={simpanPembimbing}>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text">Dosen</span>
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
                                        <span className="text-base label-text">Kuota Mahasiswa</span>
                                    </label>
                                    <input type='number' placeholder='Diisi dengan angka' className="input input-sm input-bordered w-full" value={kuota} onChange={(e) => setKuota(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="grid grid-cols-2 mt-2">
                                <div>
                                    <Link to="/pembimbingakademik" state={{ collaps: 'kuliah', activ: '/pembimbingakademik' }} className='btn btn-sm btn-error'><FaReply />Kembali</Link>
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

export default SetPembimbing