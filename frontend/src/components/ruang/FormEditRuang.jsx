import React, { useState, useEffect } from 'react'
import { FaReply, FaSave } from "react-icons/fa"
import { useNavigate, useParams, Link } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"

const FormEditRuang = () => {
    const [Kelas, setKelas] = useState([])
    const [namaRuang, setNamaRuang] = useState("")
    const [identitas, setIdentitas] = useState("")
    const [jenjangnya, setJenjangnya] = useState("")
    const [fakultasnya, setFakultasnya] = useState("")
    const [prodinya, setProdinya] = useState("")
    const [kelasnya, setKelasnya] = useState("")
    const [kelase, setKelase] = useState("")
    const navigate = useNavigate()
    const { idRng } = useParams()

    useEffect(() => {
        const getRuangById = async () => {
            try {
                const response = await axios.get(`v1/ruang/getById/${idRng}`)
                setNamaRuang(response.data.data.nama_ruang)
                setJenjangnya(response.data.data.code_jenjang_pendidikan)
                setFakultasnya(response.data.data.code_fakultas)
                setProdinya(response.data.data.code_prodi)
                setKelase(response.data.data.code_kelas)
                setKelasnya(response.data.data.kelas[0].id_kelas)
            } catch (error) {

            }
        }
        getRuangById()
    }, [idRng])

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

    const updateDataRuang = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/ruang/update/${idRng}`, {
                nama_ruang: namaRuang,
                identy_ruang: identitas,
                code_jenjang_pendidikan: jenjangnya,
                code_fakultas: fakultasnya,
                code_prodi: prodinya,
                code_kelas: kelase
            }).then(function (response) {
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
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

    return (
        <div className="mt-2 container">
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Edit Ruang</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <form onSubmit={updateDataRuang}>
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
                                    <Link to="/ruang" className='btn btn-sm btn-danger'><FaReply /> <span className="ml-1">Kembali</span></Link>
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

export default FormEditRuang