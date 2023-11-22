import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Image } from 'react-bootstrap'
import gambar from "../../../assets/images/noimage.svg"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import { Circles } from "react-loader-spinner"

const Profil = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [nim, setNim] = useState("")
    const [noKk, setNoKk] = useState("")
    const [nik, setNik] = useState("")
    const [nama, setNama] = useState("")
    const [tmpLahir, setTmpLahir] = useState("")
    const [tglLahir, setTglLahir] = useState("")
    const [jenis, setJenis] = useState("")
    const [email, setEmail] = useState("")
    const [noHp, setNoHp] = useState("")
    const [noTelp, setNoTelp] = useState("")
    const [nisn, setNisn] = useState("")
    const [penKps, setPenKps] = useState("")
    const [noKps, setNoKps] = useState("")
    const [npwp, setNpwp] = useState("")
    const [kodeJalurPen, setKodeJalurPen] = useState("")
    const [jalurPen, setJalurPen] = useState("")
    const [kodeJenisPen, setKodeJenisPen] = useState("")
    const [jenisPen, setJenisPen] = useState("")
    const [jenjang, setJenjang] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [prodi, setProdi] = useState("")
    const [jalan, setJalan] = useState("")
    const [dusun, setDusun] = useState("")
    const [rtRw, setRtRw] = useState("")
    const [kodePos, setKodePos] = useState("")
    const [kodeJenTin, setKodeJenTin] = useState("")
    const [jenTin, setJenTin] = useState("")
    const [kodeAlat, setKodeAlat] = useState("")
    const [alat, setAlat] = useState("")
    const [desa, setDesa] = useState("")
    const [kecamatan, setKecamatan] = useState("")
    const [kabupaten, setKabupaten] = useState("")
    const [provinsi, setProvinsi] = useState("")
    const [negara, setNegara] = useState("")
    const [nikA, setNikA] = useState("")
    const [nmA, setNmA] = useState("")
    const [tglLahirA, setTglLahirA] = useState("")
    const [kodeKerjaA, setKodeKerjaA] = useState("")
    const [pekerjaanA, setPekerjaanA] = useState("")
    const [kodeHasilA, setKodeHasilA] = useState("")
    const [hasilA, setHasilA] = useState("")
    const [kodeDidikA, setKodeDidikA] = useState("")
    const [didikA, setDidikA] = useState("")
    const [nikI, setNikI] = useState("")
    const [nmI, setNmI] = useState("")
    const [tglLahirI, setTglLahirI] = useState("")
    const [kodeKerjaI, setKodeKerjaI] = useState("")
    const [pekerjaanI, setPekerjaanI] = useState("")
    const [kodeHasilI, setKodeHasilI] = useState("")
    const [hasilI, setHasilI] = useState("")
    const [kodeDidikI, setKodeDidikI] = useState("")
    const [didikI, setDidikI] = useState("")
    const [nikW, setNikW] = useState("")
    const [nmW, setNmW] = useState("")
    const [tglLahirW, setTglLahirW] = useState("")
    const [kodeKerjaW, setKodeKerjaW] = useState("")
    const [pekerjaanW, setPekerjaanW] = useState("")
    const [kodeHasilW, setKodeHasilW] = useState("")
    const [hasilW, setHasilW] = useState("")
    const [kodeDidikW, setKodeDidikW] = useState("")
    const [didikW, setDidikW] = useState("")
    const [foto, setFoto] = useState("")
    const [prevFoto, setPrevFoto] = useState("")
    const [qrCode, setQrCode] = useState("")
    const [prevQrCode, setPrevQrCode] = useState("")
    const [scanKtp, setScanKtp] = useState("")
    const [prevScanKtp, setPrevScanKtp] = useState("")
    const [scanKk, setScanKk] = useState("")
    const [prevScanKk, setPrevScanKk] = useState("")
    const [scanIjazah, setScanIjazah] = useState("")
    const [prevScanIjazah, setPrevScanIjazah] = useState("")
    const [scanKtm, setScanKtm] = useState("")
    const [prevScanKtm, setPrevScanKtm] = useState("")
    const [scanKip, setScanKip] = useState("")
    const [prevScanKip, setPrevScanKip] = useState("")
    const [load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(true)
        setTimeout(() => {
            setLoad(false)
        }, 500);
    }, [])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])


    useEffect(() => {
        const getDataProfil = async () => {
            try {
                if (user) {
                    const response = await axios.get(`v1/mahasiswa/getByNim/${user.data.username}`)
                    setNim(response.data.data.nim)
                    setNoKk(response.data.data.no_kk)
                    setNik(response.data.data.nik)
                    setNama(response.data.data.nama)
                    setTmpLahir(response.data.data.tempat_lahir)
                    setTglLahir(response.data.data.tanggal_lahir)
                    setJenis(response.data.data.jenis_kelamin)
                    setEmail(response.data.data.email)
                    setNoHp(response.data.data.no_hp)
                    setNoTelp(response.data.data.no_telepon)
                    setNisn(response.data.data.nisn)
                    setPenKps(response.data.data.penerima_kps)
                    setNoKps(response.data.data.no_kps)
                    setNpwp(response.data.data.npwp)
                    setKodeJalurPen(response.data.data.jalur_pendaftaran)
                    setKodeJenisPen(response.data.data.jenis_pendaftaran)
                    setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
                    setFakultas(response.data.data.fakultas[0].nama_fakultas)
                    setProdi(response.data.data.prodis[0].nama_prodi)
                    setJalan(response.data.data.jalan)
                    setDusun(response.data.data.dusun)
                    setRtRw(response.data.data.rt + "/" + response.data.data.rw)
                    setKodePos(response.data.data.kode_pos)
                    setKodeJenTin(response.data.data.jenis_tinggal)
                    setKodeAlat(response.data.data.alat_transportasi)
                    setDesa(response.data.data.desas[0].nama_desa)
                    setKecamatan(response.data.data.kecamatans[0].nama_kecamatan)
                    setKabupaten(response.data.data.kabupatens[0].nama_kabupaten)
                    setProvinsi(response.data.data.provinsis[0].nama_provinsi)
                    setNegara(response.data.data.negaras[0].nama_negara)
                    setNikA(response.data.data.nik_ayah)
                    setNmA(response.data.data.nama_ayah)
                    setTglLahirA(response.data.data.tanggal_lahir_ayah)
                    setKodeKerjaA(response.data.data.pekerjaan_ayah)
                    setKodeHasilA(response.data.data.penghasilan_ayah)
                    setKodeDidikA(response.data.data.pendidikan_ayah)
                    setNikI(response.data.data.nik_ibu)
                    setNmI(response.data.data.nama_ibu)
                    setTglLahirI(response.data.data.tanggal_lahir_ibu)
                    setKodeKerjaI(response.data.data.pekerjaan_ibu)
                    setKodeHasilI(response.data.data.penghasilan_ibu)
                    setKodeDidikI(response.data.data.pendidikan_ibu)
                    setNikW(response.data.data.nik_wali)
                    setNmW(response.data.data.nama_wali)
                    setTglLahirW(response.data.data.tanggal_lahir_wali)
                    setKodeKerjaW(response.data.data.pekerjaan_wali)
                    setKodeHasilW(response.data.data.penghasilan_wali)
                    setKodeDidikW(response.data.data.pendidikan_wali)
                    setFoto(response.data.data.foto_diri)
                    setQrCode(response.data.data.qrcode)
                    setScanKtp(response.data.data.foto_ktp)
                    setScanKk(response.data.data.foto_kk)
                    setScanIjazah(response.data.data.foto_ijazah)
                    scanKtm(response.data.data.foto_ktm)
                    scanKip(response.data.data.foto_kip)
                }
            } catch (error) {

            }
        }

        getDataProfil()
    }, [user])

    useEffect(() => {
        getJalur()
        getJenis()
        getJenisTinggal()
        getAlatTransportasi()
        getPekerjaanAyah()
        getPenghasilanAyah()
        getPendidikanAyah()
        getPekerjaanIbu()
        getPenghasilanIbu()
        getPendidikanIbu()
        getPekerjaanWali()
        getPenghasilanWali()
        getPendidikanWali()
    }, [kodeJalurPen, kodeJenisPen, kodeJenTin, kodeAlat, kodeKerjaA, kodeHasilA, kodeDidikA, kodeKerjaI, kodeHasilI, kodeDidikI, kodeKerjaW, kodeHasilW, kodeDidikW,])

    useEffect(() => {
        prevFotoDiri()
        getQrCode()
        prevKtp()
        prevKk()
        prevIjazah()
        prevKtm()
        prevKip
    }, [foto, qrCode, scanKtp, scanKk, scanIjazah, scanKtm, scanKip])

    const getJalur = async () => {
        if (kodeJalurPen) {
            const response = await axios.get(`v1/equipmentDsnMhs/jalurPendaftaran/getByCode/${kodeJalurPen}`)
            setJalurPen(response.data.data.nama_jalur_pendaftaran)
        }
    }

    const getJenis = async () => {
        if (kodeJenisPen) {
            const response = await axios.get(`v1/equipmentDsnMhs/jenisPendaftaran/getByCode/${kodeJenisPen}`)
            setJenisPen(response.data.data.nama_jenis_pendaftaran)
        }
    }

    const getJenisTinggal = async () => {
        if (kodeJenTin) {
            const response = await axios.get(`v1/equipmentDsnMhs/jenisTinggal/getByCode/${kodeJenTin}`)
            setJenTin(response.data.data.nama_jenis_tinggal)
        }
    }

    const getAlatTransportasi = async () => {
        if (kodeAlat) {
            const response = await axios.get(`v1/equipmentDsnMhs/alatTransportasi/getByCode/${kodeAlat}`)
            setAlat(response.data.data.nama_alat_transportasi)
        }
    }

    const getPekerjaanAyah = async () => {
        if (kodeKerjaA) {
            const response = await axios.get(`v1/equipmentDsnMhs/pekerjaan/getByCode/${kodeKerjaA}`)
            setPekerjaanA(response.data.data.nama_pekerjaan)
        }
    }

    const getPenghasilanAyah = async () => {
        if (kodeHasilA) {
            const response = await axios.get(`v1/equipmentDsnMhs/penghasilan/getByCode/${kodeHasilA}`)
            setHasilA(response.data.data.nama_penghasilan)
        }
    }

    const getPendidikanAyah = async () => {
        if (kodeDidikA) {
            const response = await axios.get(`v1/equipmentDsnMhs/pendidikan/getByCode/${kodeDidikA}`)
            setDidikA(response.data.data.nama_pendidikan)
        }
    }

    const getPekerjaanIbu = async () => {
        if (kodeKerjaI) {
            const response = await axios.get(`v1/equipmentDsnMhs/pekerjaan/getByCode/${kodeKerjaI}`)
            setPekerjaanI(response.data.data.nama_pekerjaan)
        }
    }

    const getPenghasilanIbu = async () => {
        if (kodeHasilI) {
            const response = await axios.get(`v1/equipmentDsnMhs/penghasilan/getByCode/${kodeHasilI}`)
            setHasilI(response.data.data.nama_penghasilan)
        }
    }

    const getPendidikanIbu = async () => {
        if (kodeDidikI) {
            const response = await axios.get(`v1/equipmentDsnMhs/pendidikan/getByCode/${kodeDidikI}`)
            setDidikI(response.data.data.nama_pendidikan)
        }
    }

    const getPekerjaanWali = async () => {
        if (kodeKerjaW) {
            const response = await axios.get(`v1/equipmentDsnMhs/pekerjaan/getByCode/${kodeKerjaW}`)
            setPekerjaanW(response.data.data.nama_pekerjaan)
        }
    }

    const getPenghasilanWali = async () => {
        if (kodeHasilW) {
            const response = await axios.get(`v1/equipmentDsnMhs/penghasilan/getByCode/${kodeHasilW}`)
            setHasilW(response.data.data.nama_penghasilan)
        }
    }

    const getPendidikanWali = async () => {
        if (kodeDidikW) {
            const response = await axios.get(`v1/equipmentDsnMhs/pendidikan/getByCode/${kodeDidikW}`)
            setDidikW(response.data.data.nama_pendidikan)
        }
    }

    const prevFotoDiri = async () => {
        try {
            if (foto) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/diri/${foto}`, {
                    responseType: 'arraybuffer'
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

    const getQrCode = async () => {
        try {
            if (qrCode) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/qrcode/${qrCode}`, {
                    responseType: 'arraybuffer'
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

    const prevKtp = async () => {
        try {
            if (scanKtp) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/ktp/${scanKtp}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevScanKtp(base64)
                })
            }
        } catch (error) {

        }
    }

    const prevKk = async () => {
        try {
            if (scanKk) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/kk/${scanKk}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevScanKk(base64)
                })
            }
        } catch (error) {

        }
    }

    const prevIjazah = async () => {
        try {
            if (scanIjazah) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/kk/${scanIjazah}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevScanIjazah(base64)
                })
            }
        } catch (error) {

        }
    }

    const prevKtm = async () => {
        try {
            if (scanKtm) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/ktm/${scanKtm}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevScanKtm(base64)
                })
            }
        } catch (error) {

        }
    }

    const prevKip = async () => {
        try {
            if (scanKip) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/kip/${scanKip}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevScanKip(base64)
                })
            }
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>Profil Mahasiswa</title>
            {isError ? <Navigate to="/login" /> :
                <>
                    {load ?
                        <div className='h-100 absolute z-50 left-0 right-0 top-0 w-full bg-[#E9EAE1] flex justify-center items-center' style={{ height: '100%' }}>
                            <div className=''>
                                <Circles
                                    height="80"
                                    width="80"
                                    color="#000"
                                    ariaLabel="circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </div>
                        </div>
                        :
                        <div className="content-wrapper">
                            <div className="page-header">
                                <h3 className="page-title">Profil</h3>
                            </div>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col lg="2" className='hidden lg:block'>
                                            <Row className='mb-3'>
                                                <Col lg="12">
                                                    <Card className='shadow'>
                                                        <Card.Body className='p-0'>
                                                            {prevFoto ? <Image src={`data:;base64,${prevFoto}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevQrCode ? <Image src={`data:;base64,${prevQrCode}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanKtp ? <Image src={`data:;base64,${prevScanKtp}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanKk ? <Image src={`data:;base64,${prevScanKk}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanIjazah ? <Image src={`data:;base64,${prevScanIjazah}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanKtm ? <Image src={`data:;base64,${prevScanKtm}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanKip ? <Image src={`data:;base64,${prevScanKip}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col lg="10" sm="12">
                                            <Card className='shadow mb-3'>
                                                <Card.Header>
                                                    <p className='h3'>Detail Diri</p>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col lg="6">
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nim</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nim}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>no kk</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{noKk}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nik</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nik}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nama</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nama}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>tempat lahir</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{tmpLahir}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>tanggal lahir</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{tglLahir}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>jenis kelamin</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{jenis == 'l' ? 'laki-laki' : 'perempuan'}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>email</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fw-bolder'>{email}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>no hp/wa</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{noHp}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>no telepon</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{noTelp}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="6">
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nisn</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nisn}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>penerima kps</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{penKps}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>no kps</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{noKps == "" ? "-" : noKps}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>npwp</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{npwp == "" ? "-" : npwp}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>jalur pendaftaran</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{jalurPen}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>jenis pendaftaran</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{jenisPen}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>jenjang pendidikan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{jenjang}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>fakultas</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{fakultas}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>prodi</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{prodi}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                            <Card className='shadow mb-3'>
                                                <Card.Header>
                                                    <p className='h3'>Detail Alamat</p>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col lg="6">
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>jalan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{jalan}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>dusun</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{dusun}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>rt/rw</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{rtRw}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>kode pos</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{kodePos}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>jenis tinggal</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{jenTin}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>alat transportasi</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{alat}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="6">
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>desa</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{desa}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>kecamatan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{kecamatan}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>kabuapten</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{kabupaten}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>provinsi</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{provinsi}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>negara</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{negara}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                            <Card className='shadow mb-3'>
                                                <Card.Header>
                                                    <p className='h3'>Detail Orang Tua</p>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col lg="6">
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nik ayah</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nikA}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nama ayah</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nmA}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>tanggal lahir</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{tglLahirA}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>pekerjaan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{pekerjaanA}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>penghasilan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{hasilA}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>pendidikan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{didikA}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="6">
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nik ibu</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nikI}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nama ibu</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nmI}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>tanggal lahir</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{tglLahirI}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>pekerjaan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{pekerjaanI}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>penghasilan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{hasilI}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>pendidikan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{didikI}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                            <Card className='shadow'>
                                                <Card.Header>
                                                    <p className='h3'>Detail Wali</p>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Row>
                                                        <Col lg="6">
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nik wali</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nikW}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>nama wali</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{nmW}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>tanggal lahir</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{tglLahirW}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col lg="6">
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>pekerjaan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{pekerjaanW}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>penghasilan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{hasilW}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                            <Row className='mb-3'>
                                                                <Col className='p-0' lg="5" md="5" sm="5" xs="5">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>pendidikan</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>:</span></Card.Text>
                                                                </Col>
                                                                <Col className='p-0'>
                                                                    <Card.Text><span className='fs-6 fw-bolder text-uppercase'>{didikW}</span></Card.Text>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg="2" className='block lg:hidden mt-2'>
                                            <Row className='mb-3'>
                                                <Col lg="12">
                                                    <Card className='shadow'>
                                                        <Card.Body className='p-0'>
                                                            {prevFoto ? <Image src={`data:;base64,${prevFoto}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevQrCode ? <Image src={`data:;base64,${prevQrCode}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanKtp ? <Image src={`data:;base64,${prevScanKtp}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanKk ? <Image src={`data:;base64,${prevScanKk}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanIjazah ? <Image src={`data:;base64,${prevScanIjazah}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanKtm ? <Image src={`data:;base64,${prevScanKtm}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col lg="12">
                                                    <Card className='shadow mt-1'>
                                                        <Card.Body className='p-0'>
                                                            {prevScanKip ? <Image src={`data:;base64,${prevScanKip}`} thumbnail /> : <Image src={gambar} thumbnail />}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default Profil