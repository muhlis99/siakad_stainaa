import React, { useState, useEffect } from 'react'
import { FaTimes, FaSave } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"

const FormAddKelas = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Ruang, setRuang] = useState([])
    const [Dosen, setDosen] = useState([])
    const [namaKelas, setNamaKelas] = useState("")
    const [identitas, setIdentitas] = useState("")
    const [jenjangnya, setJenjangnya] = useState("")
    const [fakultasnya, setFakultasnya] = useState("")
    const [prodinya, setProdinya] = useState("")
    const [dosennya, setDosennya] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getJenjangPendidikan()
        getDataRuang()
        getDosen()
    }, [])

    useEffect(() => {
        getFakultasByJenjang()
    }, [jenjangnya])

    useEffect(() => {
        getProdiByFakultas()
    }, [fakultasnya])

    const getJenjangPendidikan = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all')
        setJenjang(response.data.data)
    }

    const getFakultasByJenjang = async () => {
        if (jenjangnya != 0) {
            const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${jenjangnya}`)
            setFakultas(response.data.data)
        }
    }

    const getProdiByFakultas = async () => {
        if (fakultasnya != 0) {
            const response = await axios.get(`v1/prodi/getProdiByFakultas/${fakultasnya}`)
            setProdi(response.data.data)
        }
    }

    const getDataRuang = async () => {
        const response = await axios.get('v1/ruang/all')
        setRuang(response.data.data)
    }

    const getDosen = async () => {
        const response = await axios.get('v1/dosen/all')
        setDosen(response.data.data)
    }

    const simpanKls = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/kelas/create', {
                nama_kelas: namaKelas,
                identy_kelas: identitas,
                code_jenjang_pendidikan: jenjangnya,
                code_fakultas: fakultasnya,
                code_prodi: prodinya,
                dosen_wali: dosennya

            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate("/kelas")
                });
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

    const batalkan = () => {
        Swal.fire({
            title: "Yakin untuk membatalkan?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, batalkan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Input Kelas dibatalkan",
                    icon: "success"
                }).then(() => {
                    navigate('/kelas')
                });
            }
        })
    }

    return (
        <div className="mt-2 container">
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Tambah Kelas</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <form onSubmit={simpanKls}>
                            <div className="grid lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Nama Kelas</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Nama Kelas" className="input input-sm input-bordered w-full" value={namaKelas} onChange={(e) => setNamaKelas(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Identitas Kelas</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Identitas Kelas" className="input input-sm input-bordered w-full" value={identitas} onChange={(e) => setIdentitas(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Jenjang Pendidikan </span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={jenjangnya} onChange={(e) => setJenjangnya(e.target.value)}>
                                        <option value="">Jenjang Pendidikan</option>
                                        {Jenjang.map((item) => (
                                            <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Fakultas Yang akan ditempuh</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={fakultasnya} onChange={(e) => setFakultasnya(e.target.value)}>
                                        <option value="">Fakultas</option>
                                        {Fakultas.map((item) => (
                                            <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Prodi Yang akan ditempuh</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={prodinya} onChange={(e) => setProdinya(e.target.value)}>
                                        <option value="">Prodi</option>
                                        {Prodi.map((item) => (
                                            <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Dosen Wali</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={dosennya} onChange={(e) => setDosennya(e.target.value)}>
                                        <option value="">Dosen</option>
                                        {Dosen.map((item) => (
                                            <option key={item.id_dosen} value={item.nidn}>{item.nama}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-5'>
                                    <hr />
                                </div>
                                <div>
                                    <button type='button' onClick={batalkan} className='btn btn-sm btn-danger'><FaTimes /> <span className="ml-1">Batal</span></button>
                                </div>
                                <div>
                                    <div className='grid lg:grid-flow-col gap-1 float-right'>
                                        <div className='lg:pl-1'>
                                            <button className='btn btn-sm btn-blue w-full'><FaSave /><span className="ml-1">Simpan </span></button>
                                        </div>
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

export default FormAddKelas