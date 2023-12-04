import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import Select from 'react-select'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaEdit, FaReply, FaSave } from 'react-icons/fa'
import Loading from '../Loading'

const FormEditPembimbing = () => {
    const [Dosen, setDosen] = useState([])
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Program, setProgram] = useState([])
    const [select2, setSelect2] = useState("")
    const [isClearable, setIsClearable] = useState(true)
    const [nipy, setNipy] = useState("")
    const [nama, setNama] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kuota, setKuota] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getDataDsn = async () => {
            try {
                const response = await axios.get(`v1/pembimbingAkademik/getById/${location.state.idDsn}`)
                setNipy(response.data.data.dosens[0].nip_ynaa)
                setNama(response.data.data.dosens[0].nama)
                setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                setKodeFakultas(response.data.data.code_fakultas)
                setKodeProdi(response.data.data.code_prodi)
                setKuota(response.data.data.kouta_bimbingan)
                console.log(response.data.data);
            } catch (error) {

            }
        }
        getDataDsn()
    }, [location.state])

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
            if (kodeJenjang == 0) {
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
                setLoading(true)
                await axios.put(`v1/pembimbingAkademik/update/${location.state.idDsn}`, {
                    code_jenjang_pendidikan: kodeJenjang,
                    code_fakultas: kodeFakultas,
                    code_prodi: kodeProdi,
                    dosen: nipy,
                    kouta_bimbingan: kuota
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate('/pembimbingakademik', { state: { collaps: 'kuliah', activ: '/pembimbingakademik' } })
                    });
                })
            }
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
                <h1 className='text-2xl font-bold'>Pembimbing Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={simpanPembimbing}>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Dosen</span>
                                    </label>
                                    <Select
                                        className="basic-single w-full rounded-md"
                                        classNamePrefix="select"
                                        options={select2}
                                        onChange={onchange}
                                        isClearable={isClearable}
                                        placeholder={nipy + ' | ' + nama}
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Jenjang Pendidikan</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                        <option value="">Jenjang Pendidikan</option>
                                        {Jenjang.map((item) => (
                                            <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Fakultas</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                        <option value="">Fakultas</option>
                                        {Fakultas.map((item) => (
                                            <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Prodi</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                        <option value="">Prodi</option>
                                        {Program.map((item) => (
                                            <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Kuota Mahasiswa</span>
                                    </label>
                                    <input type='number' placeholder='Diisi dengan angka' className="input input-sm input-bordered w-full" value={kuota} onChange={(e) => setKuota(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div className="grid grid-cols-2 mt-2">
                                <div>
                                    <Link to="/pembimbingakademik" state={{ collaps: 'kuliah', activ: '/pembimbingakademik' }} className='btn btn-sm rounded-md capitalize  btn-error'><FaReply />Kembali</Link>
                                </div>
                                <div>
                                    <button className='btn btn-sm btn-primary float-right capitalize rounded-md'><FaEdit />Edit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormEditPembimbing