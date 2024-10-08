import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"
import { FaReply, FaTelegramPlane } from "react-icons/fa"
import axios from 'axios'
import Swal from "sweetalert2"
import Loading from '../Loading'

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
    const [ktm, setKtm] = useState("")
    const [ktms, setKtms] = useState("")
    const [prevktm, setPrevKtm] = useState("")
    const navigate = useNavigate()
    const { idMhs } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getMhsById = async () => {
            try {
                const response = await axios.get(`v1/mahasiswa/getById/${idMhs}`)
                setNamanya(response.data.data.nama)
                // setFoto(response.data.data.foto_diri)
                setFotos(response.data.data.foto_diri)
                setKks(response.data.data.foto_kk)
                // setKk(response.data.data.foto_kk)
                // setKtp(response.data.data.foto_ktp)
                setKtps(response.data.data.foto_ktp)
                // setIjazah(response.data.data.foto_ijazah)
                setIjazahs(response.data.data.foto_ijazah)
                // setKip(response.data.data.foto_kip)
                setKips(response.data.data.foto_kip)
                // setKtm(response.data.data.foto_ktm)
                setKtms(response.data.data.foto_ktm)
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
        fotoKtm()
    }, [fotos, kks, ktps, ijazahs, kips, ktms])

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

    const fotoKtm = async () => {
        try {
            if (ktms != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/ktm/${ktms}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKtm(`data:;base64,${base64}`)
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

    const loadKtm = (e) => {
        const image = e.target.files[0]
        setKtm(image)
        setPrevKtm(URL.createObjectURL(image))
    }

    const simpanBerkas = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (foto || kk || ktp || ijazah || kip || ktm) {
            const formData = new FormData()
            formData.append("foto_diri", foto)
            formData.append("foto_kk", kk)
            formData.append("foto_ktp", ktp)
            formData.append("foto_ijazah", ijazah)
            formData.append("foto_kip", kip)
            formData.append("foto_ktm", ktm)
            try {
                // if (foto == fotos) {
                //     Swal.fire({
                //         title: "Foto Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else if (kk == kks) {
                //     Swal.fire({
                //         title: "Scan Kartu Keluarga Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else if (ktp == ktps) {
                //     Swal.fire({
                //         title: "Scan KTP Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else if (ijazah == ijazahs) {
                //     Swal.fire({
                //         title: "Scan Ijazah Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else if (ktm == ktms) {
                //     Swal.fire({
                //         title: "Scan KTM Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else {
                // setLoading(true)
                await axios.put(`v1/mahasiswa/createFile/${idMhs}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate("/mahasiswa", { state: { collaps: 'induk', activ: '/mahasiswa' } })
                    });
                })
                // }
            } catch (error) {
                setLoading(false)
                if (error.response) {
                    Swal.fire({
                        title: error.response.data.message,
                        icon: "error"
                    })
                }
            }
        } else {
            setLoading(false)
            Swal.fire({
                title: "Data file mahasiswa berhasil ditambahkan",
                icon: "success"
            }).then(() => {
                navigate("/mahasiswa", { state: { collaps: 'induk', activ: '/mahasiswa' } })
            });
        }

    }

    return (
        <div className='container mt-2'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Upload Berkas {namanya && <span>Ananda <span className='capitalize'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-16">
                    <div className="card-body p-4">
                        <form onSubmit={simpanBerkas}>
                            <div className='grid lg:grid-cols-3 gap-4'>
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
                                    <input type="file" onChange={loadFoto} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
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
                                    <input type="file" onChange={loadKk} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
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
                                    <input type="file" onChange={loadKtp} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
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
                                    <input type="file" onChange={loadIjazah} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
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
                                    <input type="file" onChange={loadKip} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan KTM</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevktm ? (
                                                <img src={prevktm} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadKtm} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
                                </div>
                                <div className="lg:col-span-3">
                                    <hr className='my-5' />
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-2'>
                                <div>
                                    <Link to="/mahasiswa" state={{ collaps: 'induk', activ: '/mahasiswa' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply /> <span className='ml-1'>Kembali Ke Data Mahasiswa</span></Link>
                                </div>
                                <div>
                                    <div className='float-right'>
                                        <div className='lg:pl-1'>
                                            <button className='btn btn-sm btn-primary w-full capitalize rounded-md'><FaTelegramPlane /> <span>Upload</span></button>
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