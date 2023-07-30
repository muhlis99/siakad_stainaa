import React, { useState, useEffect } from 'react'
import { FaReply } from "react-icons/fa"
import { useParams, Link, useLocation } from "react-router-dom"
import axios from 'axios'

const DetailDosen = () => {
    const [nidn, setNidn] = useState("")
    const [namanya, setNamanya] = useState("")
    const [tmp, setTmp] = useState("")
    const [tgl, setTgl] = useState("")
    const [jenkel, setJenkel] = useState("")
    const [email, setEmail] = useState("")
    const [nohp, setNohp] = useState("")
    const [notelp, setNotelp] = useState("")
    const [negaranya, setNegaranya] = useState("")
    const [provinsinya, setProvinsinya] = useState("")
    const [kabupatennya, setKabupatennya] = useState("")
    const [kecamatannya, setKecamatannya] = useState("")
    const [desanya, setDesanya] = useState("")
    const [kodepos, setKodePos] = useState("")
    const [alamat, setAlamat] = useState("")
    const [alat, setAlat] = useState("")
    const [pndkn, setPndkn] = useState("")
    const [statusPg, setStatusPg] = useState("")
    const [alatTransportasi, setAlatTransportasi] = useState("")
    const [pendidikan, setPendidikan] = useState("")
    const [fotos, setFotos] = useState("")
    const [prevFoto, setPrevFoto] = useState("")
    const [ktps, setKtps] = useState("")
    const [prevKtp, setPrevKtp] = useState("")
    const [sehatRohanis, setSehatRohanis] = useState("")
    const [prevSehatRohani, setPrevSehatRohani] = useState("")
    const [sehatJasmanis, setSehatJasmanis] = useState("")
    const [prevSehatJasmani, setPrevSehatJasmani] = useState("")
    const [janjiKerjas, setJanjiKerjas] = useState("")
    const [prevJanjiKerja, setPrevJanjiKerja] = useState("")
    const [skDosens, setSkDosens] = useState("")
    const [prevSkDosen, setPrevSkDosen] = useState("")
    const [bebasNarkotikas, setBebasNarkotikas] = useState("")
    const [prevBebasNarkotika, setPrevBebasNarkotika] = useState("")
    const [skPts, setSkPts] = useState("")
    const [prevSkPt, setPrevSkPt] = useState("")
    const [tridmas, setTridmas] = useState("")
    const [prevTridma, setPrevTridma] = useState("")
    const [qrCode, setQrCode] = useState("")
    const [prevQrCode, setPrevQrCode] = useState("")
    const [modal, setModal] = useState("")
    const [nameFile, setNameFile] = useState("")
    const { idDsn } = useParams()
    const location = useLocation()

    useEffect(() => {
        const getDsnById = async () => {
            try {
                const response = await axios.get(`v1/dosen/getById/${idDsn}`)
                setNidn(response.data.data.nidn)
                setNamanya(response.data.data.nama)
                setTmp(response.data.data.tempat_lahir)
                setTgl(response.data.data.tanggal_lahir)
                setJenkel(response.data.data.jenis_kelamin)
                setEmail(response.data.data.email)
                setNohp(response.data.data.no_hp)
                setNotelp(response.data.data.no_telepon)
                setNegaranya(response.data.data.negaras[0].nama_negara)
                setProvinsinya(response.data.data.provinsis[0].nama_provinsi)
                setKabupatennya(response.data.data.kabupatens[0].nama_kabupaten)
                setKecamatannya(response.data.data.kecamatans[0].nama_kecamatan)
                setDesanya(response.data.data.desas[0].nama_desa)
                setKodePos(response.data.data.kode_pos)
                setAlamat(response.data.data.alamat_lengkap)
                setAlat(response.data.data.alat_transportasi)
                setPndkn(response.data.data.pendidikan_terakhir)
                setStatusPg(response.data.data.status_kepegawaian)
                setFotos(response.data.data.foto_diri)
                setKtps(response.data.data.foto_ktp)
                setSehatRohanis(response.data.data.foto_sehat_rohani)
                setSehatJasmanis(response.data.data.foto_sehat_jasmani)
                setJanjiKerjas(response.data.data.foto_surat_perjanjian_kerja)
                setSkDosens(response.data.data.foto_sk_dosen)
                setBebasNarkotikas(response.data.data.foto_sk_bebas_narkotika)
                setSkPts(response.data.data.foto_sk_dari_pimpinan_pt)
                setTridmas(response.data.data.foto_sk_aktif_melaksanakan_tridma_pt)
                setQrCode(response.data.data.qrcode)
            } catch (error) {

            }
        }
        getDsnById()
    }, [idDsn])

    useEffect(() => {
        alatTransportasiByCode()
    }, [alat])

    useEffect(() => {
        pendidikanByCode()
    }, [pndkn])

    useEffect(() => {
        fotoDiri()
    }, [fotos])

    useEffect(() => {
        aktifTridmaPt()
    }, [tridmas])

    useEffect(() => {
        skPimpinanPt()
    }, [skPts])

    useEffect(() => {
        bebasNarkoba()
    }, [bebasNarkotikas])

    useEffect(() => {
        skDsn()
    }, [skDosens])

    useEffect(() => {
        fotoJanjiKerja()
    }, [janjiKerjas])

    useEffect(() => {
        fotoSehatJasmani()
    }, [sehatJasmanis])

    useEffect(() => {
        fotoSehatRohani()
    }, [sehatRohanis])

    useEffect(() => {
        fotoKtp()
    }, [ktps])

    useEffect(() => {
        kodeQr()
    }, [qrCode])

    const alatTransportasiByCode = async () => {
        if (alat != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/alatTransportasi/getByCode/${alat}`)
            setAlatTransportasi(response.data.data.nama_alat_transportasi)
        }
    }

    const pendidikanByCode = async () => {
        if (pndkn != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/pendidikan/getByCode/${pndkn}`)
            setPendidikan(response.data.data.nama_pendidikan)
        }
    }

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
                    setPrevFoto(base64)
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
                    setPrevKtp(base64)
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
                    setPrevSehatRohani(base64)
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
                    setPrevSehatJasmani(base64)
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
                    setPrevJanjiKerja(base64)
                })

            }
        } catch (error) {

        }
    }

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
                    setPrevSkDosen(base64)
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
                    setPrevBebasNarkotika(base64)
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
                    setPrevSkPt(base64)
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
                    setPrevTridma(base64)
                })

            }
        } catch (error) {

        }
    }

    const kodeQr = async () => {
        try {
            if (qrCode != 0) {
                await axios.get(`v1/dosen/public/seeImage/dosen/qrCode/${qrCode}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevQrCode(base64)
                })

            }
        } catch (error) {

        }
    }

    const openImage = (img, nam) => {
        document.getElementById('my-modal').checked = true
        setModal(img)
        setNameFile(nam + namanya)
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <div className='w-full'>
                        <a className='btn btn-sm btn-primary w-full mb-2' download={nameFile} href={`data:image/png;base64,${modal}`}>download</a>
                    </div>
                    <div className='avatar'>
                        <div className="w-full  rounded ring ring-[#2D7F5F]">
                            <img src={`data:;base64,${modal}`} alt="" />
                        </div>
                    </div>
                </label>
            </label>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <Link to="/dosen" state={{ collaps: 'induk' }} className='btn btn-sm btn-error w-32 mb-2'><FaReply /><span className='ml-1'>Kembali</span></Link>
                        <div className='grid lg:grid-cols-2'>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>nidn</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{nidn}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>nama</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{namanya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>tempat lahir</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{tmp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>tanggal lahir</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{tgl}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>jenis kelamin</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{jenkel == "l" ? "laki-laki" : "perempuan"}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>email</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold '>{email}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>NO handphone</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold '>{nohp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>no telepon</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold '>{notelp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>pendidikan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{pendidikan}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>alamat lengkap</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{alamat}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>desa</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{desanya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>kecamatan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{kecamatannya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>kabupaten</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{kabupatennya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>provinsi</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{provinsinya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>negara</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{negaranya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>kode pos</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{kodepos}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>alat transportasi</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{alatTransportasi}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>status kepegawaian</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{statusPg}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-span-2">
                                <hr className='my-5' />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">Foto Diri</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevFoto, 'FOTO_')}>Detail</button>
                                {prevFoto ? (
                                    <div className="avatar">
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevFoto}`} />
                                        </div>
                                    </div>
                                ) : (<span>File Tidak Ada</span>)}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">QR Code</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevQrCode, 'QR_')}>Detail</button>
                                <div className="avatar">
                                    {prevQrCode ? (
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevQrCode}`} />
                                        </div>
                                    ) : (<span>File Tidak Ada</span>)}
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">Scan KTP</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevKtp, 'KTP_')}>Detail</button>
                                {prevKtp ? (
                                    <div className="avatar">
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevKtp}`} />
                                        </div>
                                    </div>
                                ) : (<span>File Tidak Ada</span>)}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">Scan Surat Sehat Rohani</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevSehatRohani, 'SEHAT_ROHANI_')}>Detail</button>
                                {prevSehatRohani ? (
                                    <div className="avatar">
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevSehatRohani}`} />
                                        </div>
                                    </div>
                                ) : (<span>File Tidak Ada</span>)}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">Scan Surat Sehat Jasmani</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevSehatJasmani, 'SEHAT_JASMANI_')}>Detail</button>
                                {prevSehatJasmani ? (
                                    <div className="avatar">
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevSehatJasmani}`} />
                                        </div>
                                    </div>
                                ) : (<span>File Tidak Ada</span>)}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">Scan Surat Perjanjian Kerja</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevJanjiKerja, 'PERJANJIAN_KERJA_')}>Detail</button>
                                {prevJanjiKerja ? (
                                    <div className="avatar">
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevJanjiKerja}`} />
                                        </div>
                                    </div>
                                ) : (<span>File Tidak Ada</span>)}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">SK Dosen</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevSkDosen, 'SK_')}>Detail</button>
                                {prevSkDosen ? (
                                    <div className="avatar">
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevSkDosen}`} />
                                        </div>
                                    </div>
                                ) : (<span>File Tidak Ada</span>)}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">SK Bebas Narkotika</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevBebasNarkotika, 'BEBAS_NARKOTIKA_')}>Detail</button>
                                {prevBebasNarkotika ? (
                                    <div className="avatar">
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevBebasNarkotika}`} />
                                        </div>
                                    </div>
                                ) : (<span>File Tidak Ada</span>)}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">SK Dari Pimpinan PT</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevSkPt, 'SK_PT_')}>Detail</button>
                                {prevSkPt ? (
                                    <div className="avatar">
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevSkPt}`} />
                                        </div>
                                    </div>
                                ) : (<span>File Tidak Ada</span>)}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">SK Aktif Melaksanakan Tridma PT</span>
                                </label>
                                <button className='btn btn-sm w-full btn-primary cursor-pointer mb-2' onClick={() => openImage(prevTridma, 'SK_TRIDMA_PT_')}>Detail</button>
                                {prevTridma ? (
                                    <div className="avatar">
                                        <div className="w-full rounded ring ring-[#2D7F5F]">
                                            <img src={`data:;base64,${prevTridma}`} />
                                        </div>
                                    </div>
                                ) : (<span>File Tidak Ada</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailDosen