import React, { useState, useEffect } from 'react'
import { FaReply, FaTelegramPlane } from "react-icons/fa"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"
import Loading from '../Loading'

const FormUpload1 = () => {
    const [namanya, setNamanya] = useState("")
    const [foto, setFoto] = useState("")
    const [fotos, setFotos] = useState("")
    const [prevFoto, setPrevFoto] = useState("")
    const [ktp, setKtp] = useState("")
    const [ktps, setKtps] = useState("")
    const [prevKtp, setPrevKtp] = useState("")
    const [sehatRohani, setSehatRohani] = useState("")
    const [sehatRohanis, setSehatRohanis] = useState("")
    const [prevSehatRohani, setPrevSehatRohani] = useState("")
    const [sehatJasmani, setSehatJasmani] = useState("")
    const [sehatJasmanis, setSehatJasmanis] = useState("")
    const [prevSehatJasmani, setPrevSehatJasmani] = useState("")
    const [janjiKerja, setJanjiKerja] = useState("")
    const [janjiKerjas, setJanjiKerjas] = useState("")
    const [prevJanjiKerja, setPrevJanjiKerja] = useState("")
    const navigate = useNavigate()
    const { idDsn } = useParams()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getDsnById = async () => {
            try {
                const response = await axios.get(`v1/dosen/getById/${idDsn}`)
                setNamanya(response.data.data.nama)
                setFotos(response.data.data.foto_diri)
                setKtps(response.data.data.foto_ktp)
                setSehatRohanis(response.data.data.foto_sehat_rohani)
                setSehatJasmanis(response.data.data.foto_sehat_jasmani)
                setJanjiKerjas(response.data.data.foto_surat_perjanjian_kerja)
            } catch (error) {

            }
        }
        getDsnById()
    }, [idDsn])

    useEffect(() => {
        fotoDiri()
        fotoKtp()
        fotoSehatRohani()
        fotoSehatJasmani()
        fotoJanjiKerja()
    }, [fotos, ktps, sehatRohanis, sehatJasmanis, janjiKerjas])

    const fotoDiri = async () => {
        try {
            if (fotos != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/diri/${fotos}`, {
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

    const fotoKtp = async () => {
        try {
            if (ktps != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/ktp/${ktps}`, {
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

    const fotoSehatRohani = async () => {
        try {
            if (sehatRohanis != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/sehatRohani/${sehatRohanis}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSehatRohani(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const fotoSehatJasmani = async () => {
        try {
            if (sehatJasmanis != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/sehatJasmani/${sehatJasmanis}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSehatJasmani(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const fotoJanjiKerja = async () => {
        try {
            if (janjiKerjas != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/suratPerjanjianKerja/${janjiKerjas}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevJanjiKerja(`data:;base64,${base64}`)
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

    const loadKtp = (e) => {
        const image = e.target.files[0]
        setKtp(image)
        setPrevKtp(URL.createObjectURL(image))
    }

    const loadSehatRohani = (e) => {
        const image = e.target.files[0]
        setSehatRohani(image)
        setPrevSehatRohani(URL.createObjectURL(image))
    }

    const loadSehatJasmani = (e) => {
        const image = e.target.files[0]
        setSehatJasmani(image)
        setPrevSehatJasmani(URL.createObjectURL(image))
    }

    const loadJanjiKerja = (e) => {
        const image = e.target.files[0]
        setJanjiKerja(image)
        setPrevJanjiKerja(URL.createObjectURL(image))
    }

    const simpanBerkas = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (foto || ktp || sehatRohani || sehatJasmani || janjiKerja) {
            const formData = new FormData()
            formData.append("foto_diri", foto)
            formData.append("foto_ktp", ktp)
            formData.append("foto_sehat_rohani", sehatRohani)
            formData.append("foto_sehat_jasmani", sehatJasmani)
            formData.append("foto_surat_perjanjian_kerja", janjiKerja)
            try {
                // if (foto == fotos) {
                //     Swal.fire({
                //         title: "Foto Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else if (ktp == ktps) {
                //     Swal.fire({
                //         title: "Foto KTP Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else if (sehatRohani == sehatRohanis) {
                //     Swal.fire({
                //         title: "Scan Surat Sehat Rohani Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else if (sehatJasmani == sehatJasmanis) {
                //     Swal.fire({
                //         title: "Scan Surat Sehat Jasmani Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else if (janjiKerja == janjiKerjas) {
                //     Swal.fire({
                //         title: "Scan Surat Perjanjian Kerja Tidak Boleh Kosong",
                //         icon: "warning"
                //     })
                // } else {

                await axios.put(`v1/dosen/createFromUpload1/${idDsn}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate(`/dosen/upload2/${idDsn}`, { state: { collaps: 'induk', activ: '/dosen' } })
                    });
                })
                // }
            } catch (error) {
                if (error.response) {
                    setLoading(false)
                    Swal.fire({
                        title: error.response.data.message,
                        icon: "error"
                    })
                }
            }
        } else {
            setLoading(false)
            Swal.fire({
                title: "Data file dosen berhasil ditambahkan",
                icon: "success"
            }).then(() => {
                navigate(`/dosen/upload2/${idDsn}`, { state: { collaps: 'induk', activ: '/dosen' } })
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
                <h1 className='text-2xl font-bold'>Upload Berkas {namanya && <span>Dari <span className='capitalize'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-16">
                    <div className="card-body p-4">
                        <form onSubmit={simpanBerkas}>
                            <div className='grid lg:grid-cols-5 gap-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Foto Diri</span>
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
                                        <span className="text-base label-text">Scan Surat Sehat Rohani</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevSehatRohani ? (
                                                <img src={prevSehatRohani} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadSehatRohani} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan Surat Sehat Jasmani</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevSehatJasmani ? (
                                                <img src={prevSehatJasmani} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadSehatJasmani} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan Surat Perjanjian Kerja</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevJanjiKerja ? (
                                                <img src={prevJanjiKerja} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadJanjiKerja} className="file-input file-input-bordered file-input-sm file-input-success w-full" />
                                </div>
                                <div className="lg:col-span-3">
                                    <hr className='my-5' />
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-2'>
                                <div>
                                    <Link to="/dosen" state={{ collaps: 'induk', activ: '/dosen' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply /> <span className=''>Kembali Ke Data Dosen</span></Link>
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

export default FormUpload1