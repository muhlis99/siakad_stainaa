import React, { useState, useEffect } from 'react'
import { FaReply, FaSave } from "react-icons/fa"
import { useNavigate, useParams, Link } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"

const FormEditRuang = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Kelas, setKelas] = useState([])
    const [namaRuang, setNamaRuang] = useState("")
    const [identitas, setIdentitas] = useState("")
    const [jenjangnya, setJenjangnya] = useState("")
    const [fakultasnya, setFakultasnya] = useState("")
    const [prodinya, setProdinya] = useState("")
    const [kelasnya, setKelasnya] = useState("")
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
                setKelasnya(response.data.data.code_kelas)
            } catch (error) {

            }
        }
        getRuangById()
    }, [idRng])

    useEffect(() => {
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getFakultasByJenjang()
    }, [jenjangnya])

    useEffect(() => {
        getProdiByFakultas()
    }, [fakultasnya])

    useEffect(() => {
        getKelas()
    }, [])

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

    const getKelas = async () => {
        const response = await axios.get(`v1/kelas/all`)
        setKelas(response.data.data)
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
                code_kelas: kelasnya
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
                                        <span className="text-base label-text">Jenjang Pendidikan</span>
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
                                        <span className="text-base label-text">Fakultas</span>
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
                                        <span className="text-base label-text">Prodi</span>
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
                                        <span className="text-base label-text">Kelas</span>
                                    </label>
                                    <select className='select select-bordered select-sm w-full' value={kelasnya} onChange={(e) => setKelasnya(e.target.value)}>
                                        <option value="">Kelas</option>
                                        {Kelas.map((item) => (
                                            <option key={item.id_kelas} value={item.code_kelas}>{item.nama_kelas}</option>
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