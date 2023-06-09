import React, { useState, useEffect } from 'react'
import { FaTimes, FaSave } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"

const FormAddRuang = () => {
    const [Kelas, setKelas] = useState([])
    const [namaRuang, setNamaRuang] = useState("")
    const [identitas, setIdentitas] = useState("")
    const [jenjangnya, setJenjangnya] = useState("")
    const [fakultasnya, setFakultasnya] = useState("")
    const [prodinya, setProdinya] = useState("")
    const [kelasnya, setKelasnya] = useState("")
    const [kelase, setKelase] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getKelas()
    }, [])

    useEffect(() => {
        getKelasById()
    }, [kelasnya])

    const getKelas = async () => {
        const response = await axios.get(`v1/kelas/all`)
        setKelas(response.data.data)
    }

    const getKelasById = async () => {
        if (kelasnya != 0) {
            const response = await axios.get(`v1/kelas/getById/${kelasnya}`)
            setKelase(response.data.data.code_kelas)
            setJenjangnya(response.data.data.code_jenjang_pendidikan)
            setFakultasnya(response.data.data.code_fakultas)
            setProdinya(response.data.data.code_prodi)
        }
    }

    const simpanDataRuang = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/ruang/create', {
                nama_ruang: namaRuang,
                identy_ruang: identitas,
                code_jenjang_pendidikan: jenjangnya,
                code_fakultas: fakultasnya,
                code_prodi: prodinya,
                code_kelas: kelase
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate("/ruang")
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
                    navigate('/ruang')
                });
            }
        })
    }

    return (
        <div className="mt-2 container">
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Tambah Ruang</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <form onSubmit={simpanDataRuang}>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Nama Ruang</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={namaRuang}
                                        onChange={(e) => setNamaRuang(e.target.value)}
                                        placeholder="Nama Ruang"
                                        className="input input-sm input-bordered w-full"
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Identitas Ruang</span>
                                    </label>
                                    <input type="text" value={identitas} onChange={(e) => setIdentitas(e.target.value)} placeholder="Identitas Ruang" className="input input-sm input-bordered w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Kelas</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={kelasnya} onChange={(e) => setKelasnya(e.target.value)}>
                                        <option value="">Kelas</option>
                                        {Kelas.map((item) => (
                                            <option key={item.id_kelas} value={item.id_kelas}>{item.nama_kelas}</option>
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

export default FormAddRuang