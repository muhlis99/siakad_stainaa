import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { FaReply, FaTelegramPlane } from "react-icons/fa"
import axios from 'axios'
import Swal from "sweetalert2"

const FormUpload = () => {
    const [namanya, setNamanya] = useState("")
    const [foto, setFoto] = useState("")
    const [fotos, setFotos] = useState("")
    const [prevFoto, setPrevFoto] = useState("")
    const [kk, setKk] = useState("")
    const [kks, setKks] = useState("")
    const [prevKk, setPrevKk] = useState("")
    const [ktp, setKtp] = useState("")
    const [ktps, setKtps] = useState("")
    const [prevKtp, setPrevKtp] = useState("")
    const [ijazah, setIjazah] = useState("")
    const [ijazahs, setIjazahs] = useState("")
    const [prevIjazah, setPrevIjazah] = useState("")
    const [kip, setKip] = useState("")
    const [kips, setKips] = useState("")
    const [prevKip, setPrevKip] = useState("")
    const navigate = useNavigate()
    const { idMhs } = useParams()

    useEffect(() => {
        const getMhsById = async () => {
            try {
                const response = await axios.get(`v1/mahasiswa/getById/${idMhs}`)
                setNamanya(response.data.data.nama)
                setFotos(response.data.data.foto_diri)
                setFoto(response.data.data.foto_diri)
                setKk(response.data.data.foto_kk)
                setKks(response.data.data.foto_kk)
                setKtp(response.data.data.foto_ktp)
                setKtps(response.data.data.foto_ktp)
                setIjazah(response.data.data.foto_ijazah)
                setIjazahs(response.data.data.foto_ijazah)
                setKip(response.data.data.foto_kip)
                setKips(response.data.data.foto_kip)
            } catch (error) {

            }
        }
        getMhsById()
    }, [idMhs])

    useEffect(() => {
        fotoDiri()
        fotoKk()
        fotoKtp()
        fotoIjazah()
        fotoKip()
    }, [fotos, kks, ktps, ijazahs, kips])

    const fotoDiri = async () => {
        try {
            if (fotos != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/diri/${fotos}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevFoto(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const fotoKk = async () => {
        try {
            if (kks != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/kk/${kks}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKk(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const fotoKtp = async () => {
        try {
            if (ktps != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/ktp/${ktps}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKtp(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const fotoIjazah = async () => {
        try {
            if (ijazahs != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/ijazah/${ijazahs}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevIjazah(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const fotoKip = async () => {
        try {
            if (kips != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/kip/${kips}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKip(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const loadFoto = (e) => {
        const image = e.target.files[0]
        setFoto(image)
        setPrevFoto(URL.createObjectURL(image))
    }

    const loadKk = (e) => {
        const image = e.target.files[0]
        setKk(image)
        setPrevKk(URL.createObjectURL(image))
    }

    const loadKtp = (e) => {
        const image = e.target.files[0]
        setKtp(image)
        setPrevKtp(URL.createObjectURL(image))
    }

    const loadIjazah = (e) => {
        const image = e.target.files[0]
        setIjazah(image)
        setPrevIjazah(URL.createObjectURL(image))
    }

    const loadKip = (e) => {
        const image = e.target.files[0]
        setKip(image)
        setPrevKip(URL.createObjectURL(image))
    }

    const simpanBerkas = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("foto_diri", foto)
        formData.append("foto_kk", kk)
        formData.append("foto_ktp", ktp)
        formData.append("foto_ijazah", ijazah)
        formData.append("foto_kip", kip)
        try {
            if (foto == fotos) {
                Swal.fire({
                    title: "Foto Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (kk == kks) {
                Swal.fire({
                    title: "Scan Kartu Keluarga Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (ktp == ktps) {
                Swal.fire({
                    title: "Scan KTP Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (ijazah == ijazahs) {
                Swal.fire({
                    title: "Scan Ijazah Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (kip == kips) {
                Swal.fire({
                    title: "Scan KIP Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else {
                await axios.put(`v1/mahasiswa/createFile/${idMhs}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate("/mahasiswa")
                    });
                })
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            }
        }

    }

    return (
        <div className='container mt-2'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Upload Berkas {namanya && <span>Ananda <span className='text-red-500'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-16">
                    <div className="card-body p-4">
                        <form onSubmit={simpanBerkas}>
                            <div className='grid lg:grid-cols-5 gap-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Foto Diri Mahasiswa</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevFoto ? (
                                                <img src={prevFoto} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadFoto} className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan Kartu Keluarga</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevKk ? (
                                                <img src={prevKk} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadKk} className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan KTP</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevKtp ? (
                                                <img src={prevKtp} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadKtp} className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan Ijazah</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevIjazah ? (
                                                <img src={prevIjazah} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadIjazah} className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan KIP</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevKip ? (
                                                <img src={prevKip} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadKip} className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div className="lg:col-span-3">
                                    <hr className='my-5' />
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-2'>
                                <div>
                                    <Link to="/mahasiswa" className='btn btn-sm btn-danger'><FaReply /> <span className='ml-1'>Kembali Ke Data Mahasiswa</span></Link>
                                </div>
                                <div>
                                    <div className='float-right'>
                                        <div className='lg:pl-1'>
                                            <button className='btn btn-sm btn-blue w-full'><FaTelegramPlane /> <span className="ml-1">Upload</span></button>
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

export default FormUpload