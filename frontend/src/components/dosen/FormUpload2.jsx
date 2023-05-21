import React, { useState, useEffect } from 'react'
import { FaReply, FaArrowLeft, FaTelegramPlane } from "react-icons/fa"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from "sweetalert2"

const FormUpload2 = () => {
    const [namanya, setNamanya] = useState("")
    const [skDosen, setSkDosen] = useState("")
    const [skDosens, setSkDosens] = useState("")
    const [prevSkDosen, setPrevSkDosen] = useState("")
    const [bebasNarkotika, setBebasNarkotika] = useState("")
    const [bebasNarkotikas, setBebasNarkotikas] = useState("")
    const [prevBebasNarkotika, setPrevBebasNarkotika] = useState("")
    const [skPt, setSkPt] = useState("")
    const [skPts, setSkPts] = useState("")
    const [prevSkPt, setPrevSkPt] = useState("")
    const [tridma, setTridma] = useState("")
    const [tridmas, setTridmas] = useState("")
    const [prevTridma, setPrevTridma] = useState("")
    const navigate = useNavigate()
    const { idDsn } = useParams()

    useEffect(() => {
        const getDsnById = async () => {
            try {
                const response = await axios.get(`v1/dosen/getById/${idDsn}`)
                setNamanya(response.data.data.nama)
                setSkDosen(response.data.data.foto_sk_dosen)
                setSkDosens(response.data.data.foto_sk_dosen)
                setBebasNarkotika(response.data.data.foto_sk_bebas_narkotika)
                setBebasNarkotikas(response.data.data.foto_sk_bebas_narkotika)
                setSkPt(response.data.data.foto_sk_dari_pimpinan_pt)
                setSkPts(response.data.data.foto_sk_dari_pimpinan_pt)
                setTridma(response.data.data.foto_sk_aktif_melaksanakan_tridma_pt)
                setTridmas(response.data.data.foto_sk_aktif_melaksanakan_tridma_pt)
            } catch (error) {

            }
        }
        getDsnById()
    }, [idDsn])

    useEffect(() => {
        skDsn()
        bebasNarkoba()
        skPimpinanPt()
        aktifTridmaPt()
    }, [skDosens, bebasNarkotikas, skPts, tridmas])

    const skDsn = async () => {
        try {
            if (skDosens != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/skDosen/${skDosens}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSkDosen(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const bebasNarkoba = async () => {
        try {
            if (bebasNarkotikas != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/skBebasNarkotika/${bebasNarkotikas}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevBebasNarkotika(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const skPimpinanPt = async () => {
        try {
            if (skPts != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/skDariPimpinanPt/${skPts}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevSkPt(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const aktifTridmaPt = async () => {
        try {
            if (tridmas != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/skAktifMelaksanakanTridmaPt/${tridmas}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevTridma(`data:;base64,${base64}`)
                })

            }
        } catch (error) {

        }
    }

    const loadSk = (e) => {
        const image = e.target.files[0]
        setSkDosen(image)
        setPrevSkDosen(URL.createObjectURL(image))
    }

    const loadBebasNarkotika = (e) => {
        const image = e.target.files[0]
        setBebasNarkotika(image)
        setPrevBebasNarkotika(URL.createObjectURL(image))
    }

    const loadSkPt = (e) => {
        const image = e.target.files[0]
        setSkPt(image)
        setPrevSkPt(URL.createObjectURL(image))
    }

    const loadTridma = (e) => {
        const image = e.target.files[0]
        setTridma(image)
        setPrevTridma(URL.createObjectURL(image))
    }

    const simpanBerkas = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("foto_sk_dosen", skDosen)
        formData.append("foto_sk_bebas_narkotika", bebasNarkotika)
        formData.append("foto_sk_dari_pimpinan_pt", skPt)
        formData.append("foto_sk_aktif_melaksanakan_tridma_pt", tridma)
        try {
            if (skDosen == skDosens) {
                Swal.fire({
                    title: "Scan SK Dosen Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (bebasNarkotika == bebasNarkotikas) {
                Swal.fire({
                    title: "Scan SK Bebas Narkotika Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (skPt == skPts) {
                Swal.fire({
                    title: "Scan SK Dari Pimpinan PT  Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else if (tridma == tridmas) {
                Swal.fire({
                    title: "Scan SK Aktif Melaksanakan Tridma PT Tidak Boleh Kosong",
                    icon: "warning"
                })
            } else {
                await axios.put(`v1/dosen/createFromUpload2/${idDsn}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate("/dosen")
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
                <h1 className='text-xl font-bold'>Upload Berkas {namanya && <span>Dari <span className='text-red-500'>{namanya}</span></span>}</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-16">
                    <div className="card-body p-4">
                        <form onSubmit={simpanBerkas}>
                            <div className='grid lg:grid-cols-2 gap-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan SK Dosen</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevSkDosen ? (
                                                <img src={prevSkDosen} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadSk} className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan SK Bebas Narkotika</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevBebasNarkotika ? (
                                                <img src={prevBebasNarkotika} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadBebasNarkotika} className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan SK Dari Pimpinan PT</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevSkPt ? (
                                                <img src={prevSkPt} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadSkPt} className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Scan SK Aktif Melaksanakan Tridma PT</span>
                                    </label>
                                    <div className="avatar">
                                        <div className="w-20 rounded ring ring-[#2D7F5F]">
                                            {prevTridma ? (
                                                <img src={prevTridma} className='border-black' />
                                            ) : ("")}
                                        </div>
                                    </div>
                                    <input type="file" onChange={loadTridma} className="file-input file-input-bordered file-input-sm file-input-default w-full" />
                                </div>
                                <div className="lg:col-span-2">
                                    <hr className='my-5' />
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-2'>
                                <div>
                                    <Link to="/dosen" className='btn btn-sm btn-danger'><FaReply /> <span className='ml-1'>Kembali Ke Data Dosen</span></Link>
                                </div>
                                <div>
                                    <div className='grid lg:grid-flow-col gap-1 float-right'>
                                        <div>
                                            <Link to={`/dosen/upload1/${idDsn}`} className='btn btn-sm btn-blue w-full'><FaArrowLeft /><span className="ml-1">Kembali</span></Link>
                                        </div>
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

export default FormUpload2