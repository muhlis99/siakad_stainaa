import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { FaReply, FaEdit } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner"

const EditNilai = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [detailKls, setDetailKls] = useState([])
    const [inputFields, setInputFields] = useState([])
    const [jmlMhs, setJmlMhs] = useState(1)
    const [presentasi, setPresentasi] = useState("")
    const [checkedpres, setCheckedpres] = useState(false)
    const [materi, setMateri] = useState("")
    const [checkedmtr, setCheckedmtr] = useState(false)
    const [tugas, setTugas] = useState("")
    const [checkedtgs, setCheckedtgs] = useState(false)
    const [pptx, setPptx] = useState("")
    const [checkedppt, setCheckedppt] = useState(false)
    const [keaktifan, setKeaktifan] = useState("")
    const [checkedaktif, setCheckedaktif] = useState(false)
    const [uts, setUts] = useState("")
    const [checkedUts, setCheckedUts] = useState(false)
    const [uas, setUas] = useState("")
    const [checkedUas, setCheckedUas] = useState(false)
    const [absen, setAbsen] = useState("")
    const [checkedAbsen, setCheckedAbsen] = useState(false)
    const [jumlahKolom, setjumlahKolom] = useState([])
    const [nilaiAkhir, setNIlaiAkhir] = useState("")
    const [nilaiHuruf, setNilaiHuruf] = useState([])
    const [nama, setNama] = useState("")
    const [nim, setNim] = useState("")
    const [ket, setKet] = useState("")
    const [kodeNilai, setKodeNilai] = useState("")
    const [nilaiSum, setNilaiSum] = useState("")
    const [load, setLoad] = useState(false)


    const min = 0
    const max = 100

    const handleFormChange = (index, event) => {
        let data = [...inputFields]
        data[index][event.target.name] = Math.max(Number(min), Math.min(Number(max), Number(event.target.value)))
        setInputFields(data)
    }

    useEffect(() => {
        getKelasById()
        // console.log(location.state);
    }, [location])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getMahasiswa()
    }, [location])

    useEffect(() => {
        getAverage()
        getSum()
    }, [presentasi, materi, pptx, keaktifan, tugas, uts, uas, absen])

    // useEffect(() => { console.log('jum', jumlahKolom) }, [jumlahKolom])

    const addFields = () => {
        let newfield = []
        newfield.push({
            presentasi: parseInt(presentasi),
            materi: parseInt(materi),
            pptx: parseInt(pptx),
            keaktifan: parseInt(keaktifan),
            tugas: parseInt(tugas),
            uts: parseInt(uts),
            uas: parseInt(uas),
            absen: parseInt(absen)
        })
        setInputFields(newfield)
    }

    const getMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/nilaiKuliah/getById/${location.state.idNilai}/${location.state.kodeThn}`)
            setNama(response.data.data.mahasiswas[0].nama)
            setNim(response.data.data.mahasiswas[0].nim)
            setNilaiSum(response.data.data.nilai_jumlah)
            setNIlaiAkhir(response.data.data.nilai_akhir)
            // setNilaiHuruf(response.data.data.kategoriNilais[0].nilai_huruf)
            // setKet(response.data.data.kategoriNilais[0].keterangan)
            let u = []
            if (response.data.data.nilai_presentasi) {
                setCheckedpres(true)
                setPresentasi(response.data.data.nilai_presentasi)
                handleChangePres()
                u.push('A')
            }
            if (response.data.data.nilai_penguasaan_materi) {
                setCheckedmtr(true)
                setMateri(response.data.data.nilai_penguasaan_materi)
                handleChangeMateri()
                u.push('B')
            }
            if (response.data.data.nilai_slide_power_point) {
                setCheckedppt(true)
                setPptx(response.data.data.nilai_slide_power_point)
                handleChangePptx()
                u.push('C')
            }
            if (response.data.data.nilai_keaktifan) {
                setCheckedaktif(true)
                setKeaktifan(response.data.data.nilai_keaktifan)
                handleChangeAktif()
                u.push('D')
            }
            if (response.data.data.nilai_tugas) {
                setCheckedtgs(true)
                setTugas(response.data.data.nilai_tugas)
                handleChangeTgs()
                u.push('E')
            }
            if (response.data.data.nilai_uts) {
                setCheckedUts(true)
                setUts(response.data.data.nilai_uts)
                handleChangeUts()
                u.push('F')
            }
            if (response.data.data.nilai_uas) {
                setCheckedUas(true)
                setUas(response.data.data.nilai_uas)
                handleChangeUas()
                u.push('G')
            }
            if (response.data.data.nilai_hadir) {
                setCheckedAbsen(true)
                setAbsen(response.data.data.nilai_hadir)
                handleChangeAbsen()
                u.push('H')
            }

            setjumlahKolom(u);
        } catch (error) {

        }
    }

    const getKelasById = async () => {
        try {
            const response = await axios.get(`v1/kelasKuliah/getKelasById/${location.state.idKelas}`)
            setDetailKls(response.data.data)
        } catch (error) {

        }
    }

    const handleChangePres = () => {
        setCheckedpres(!checkedpres)
        document.getElementById('presentasi').disabled = true;
        if (!checkedpres) {
            setjumlahKolom([...jumlahKolom, 'A'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'A'))
        }
    }

    const handleChangeMateri = () => {
        setCheckedmtr(!checkedmtr)
        document.getElementById('materi').disabled = true;
        if (!checkedmtr) {
            setjumlahKolom([...jumlahKolom, 'B'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'B'))
        }
    }

    const handleChangePptx = () => {
        setCheckedppt(!checkedppt)
        document.getElementById('pptx').disabled = true;
        if (!checkedppt) {
            setjumlahKolom([...jumlahKolom, 'C'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'C'))
        }
    }

    const handleChangeAktif = () => {
        setCheckedaktif(!checkedaktif)
        document.getElementById('keaktifan').disabled = true;
        if (!checkedaktif) {
            setjumlahKolom([...jumlahKolom, 'D'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'D'))
        }
    }

    const handleChangeTgs = () => {
        setCheckedtgs(!checkedtgs)
        document.getElementById('tugas').disabled = true;
        if (!checkedtgs) {
            setjumlahKolom([...jumlahKolom, 'E'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'E'))
        }
    }

    const handleChangeUts = () => {
        setCheckedUts(!checkedUts)
        document.getElementById('uts').disabled = true;
        if (!checkedUts) {
            setjumlahKolom([...jumlahKolom, 'F'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'F'))
        }
    }

    const handleChangeUas = () => {
        setCheckedUas(!checkedUas)
        document.getElementById('uas').disabled = true;
        if (!checkedUas) {
            setjumlahKolom([...jumlahKolom, 'G'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'G'))
        }
    }

    const handleChangeAbsen = () => {
        setCheckedAbsen(!checkedAbsen)
        document.getElementById('absen').disabled = true;
        if (!checkedAbsen) {
            setjumlahKolom([...jumlahKolom, 'H'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'H'))
        }
    }

    const getAverage = () => {
        if (jumlahKolom.length != 0) {
            var a = parseInt(presentasi) || 0
            var b = parseInt(materi) || 0
            var c = parseInt(pptx) || 0
            var d = parseInt(keaktifan) || 0
            var e = parseInt(tugas) || 0
            var f = parseInt(absen) || 0
            var g = parseInt(uts) || 0
            var h = parseInt(uas) || 0
            var rataRata = (a + b + c + d + e + f + g + h) / jumlahKolom.length
            var n = rataRata.toFixed(2)
            setNIlaiAkhir(n)
        }
    }

    const getSum = () => {
        if (jumlahKolom.length != 0) {
            var a = parseInt(presentasi) || 0
            var b = parseInt(materi) || 0
            var c = parseInt(pptx) || 0
            var d = parseInt(keaktifan) || 0
            var e = parseInt(tugas) || 0
            var f = parseInt(absen) || 0
            var g = parseInt(uts) || 0
            var h = parseInt(uas) || 0
            var sum = (a + b + c + d + e + f + g + h)
            setNilaiSum(sum);
        }
    }

    useEffect(() => {
        cekNilai()
    }, [nilaiAkhir, location])

    const cekNilai = async () => {
        try {
            if (nilaiAkhir) {
                const response = await axios.get(`/v1/nilaiKuliah/deteksiIndexNilai/${nilaiAkhir}/${location.state.kodeThn}`)
                setNilaiHuruf(response.data.data);
            }
        } catch (error) {

        }
    }

    const simpanNilai = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            await axios.put(`v1/nilaiKuliah/update/${location.state.idNilai}`,
                {
                    id_nilai_kuliah: location.state.idNilai,
                    code_kategori_nilai: nilaiHuruf[0].code_kategori_nilai,
                    nilai_presentasi: presentasi,
                    nilai_penguasaan_materi: materi,
                    nilai_slide_power_point: pptx,
                    nilai_keaktifan: keaktifan,
                    nilai_hadir: absen,
                    nilai_tugas: tugas,
                    nilai_uts: uts,
                    nilai_uas: uas,
                    nilai_jumlah: nilaiSum,
                    nilai_akhir: nilaiAkhir
                }).then(function (response) {
                    setLoad(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate(`/detailnilai`, {
                            state:
                            {
                                idNilai: location.state.idNilai,
                                kodeMk: location.state.kodeMk,
                                idKelas: location.state.idKelas,
                                kodeKls: location.state.kodeKls,
                                kodeThn: location.state.kodeThn,
                                kodeSmt: location.state.kodeSmt,
                                kodeJen: location.state.kodeJen,
                                kodeFk: location.state.kodeFk,
                                kodeProd: location.state.kodeProd
                            }
                        })
                    });
                })
        } catch (error) {
            setLoad(false)
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    return (
        <Layout>
            <title>Penilaian</title>
            {isError ? <Navigate to="/login" />
                :
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
                                <h2 className='fs-4 font-bold'>Penilaian</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body className='py-3'>
                                            <Row className='bg-[#E9EAE1] py-3 px-3 shadow-sm rounded'>
                                                <Col lg="6" sm="12">
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Jenjang</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.jenjangPendidikans[0].nama_jenjang_pendidikan : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Fakultas</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.fakultas[0].nama_fakultas : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Prodi</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.prodis[0].nama_prodi : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Kelas</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls.nama_kelas}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="6" sm="12">
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Periode</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.tahunAjarans[0].tahun_ajaran : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Semester</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.semesters[0].semester : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Mata kuliah</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.mataKuliahs[0].nama_mata_kuliah : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Kode MK</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.mataKuliahs[0].code_mata_kuliah : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <form onSubmit={simpanNilai}>
                                        <Card className='mt-3'>
                                            <Card.Body className='p-3'>
                                                <Row>
                                                    <Col>
                                                        <div className="table-responsive">
                                                            <Table hover>
                                                                <thead>
                                                                    <tr className='border'>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }} rowSpan={2}><span className='text-[11px]'>NIM</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }} rowSpan={2}><span className='text-[11px]'>Nama</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Presentasi</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Materi</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Power Point</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Keaktifan</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Tugas</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>UTS</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>UAS</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Absen</span></th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }} rowSpan={2}><span className='text-[11px]'>Jumlah</span></th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }} rowSpan={2}><span className='text-[11px]'>Nilai</span></th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }} rowSpan={2}><span className='text-[11px]'>Grade</span></th>
                                                                        <th className='fw-bold py-1 text-center border-2' style={{ background: '#E9EAE1' }} rowSpan={2}><span className='text-[11px]'>Status</span></th>
                                                                    </tr>
                                                                    <tr className='border'>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedpres}
                                                                                    onChange={() => handleChangePres()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedmtr}
                                                                                    onChange={() => handleChangeMateri()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedppt}
                                                                                    onChange={() => handleChangePptx()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedaktif}
                                                                                    onChange={() => handleChangeAktif()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedtgs}
                                                                                    onChange={() => handleChangeTgs()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedUts}
                                                                                    onChange={() => handleChangeUts()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedUas}
                                                                                    onChange={() => handleChangeUas()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedAbsen}
                                                                                    onChange={() => handleChangeAbsen()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className='border'>
                                                                        <td className='py-2 border text-capitalize' align='center'>{nim}</td>
                                                                        <td className='py-2 border text-capitalize'>{nama}</td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <input type="number" name='presentasi' id='presentasi' value={presentasi} onChange={(e) => setPresentasi(e.target.value)} className='form-control' disabled={!checkedpres} style={{ width: '70px' }} />
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <input type="number" name='materi' id='materi' value={materi} onChange={(e) => setMateri(e.target.value)} className='form-control' disabled={!checkedmtr} style={{ width: '70px' }} />
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <input type="number" name='pptx' id='pptx' value={pptx} onChange={(e) => setPptx(e.target.value)} className='form-control' disabled={!checkedppt} style={{ width: '70px' }} />
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <input type="number" name='keaktifan' id='keaktifan' value={keaktifan} onChange={(e) => setKeaktifan(e.target.value)} className='form-control' disabled={!checkedaktif} style={{ width: '70px' }} />
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <input type="number" name='tugas' id='tugas' value={tugas} onChange={(e) => setTugas(e.target.value)} className='form-control' disabled={!checkedtgs} style={{ width: '70px' }} />
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <input type="number" name='uts' id='uts' value={uts} onChange={(e) => setUts(e.target.value)} className='form-control' disabled={!checkedUts} style={{ width: '70px' }} />
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <input type="number" name='uas' id='uas' value={uas} onChange={(e) => setUas(e.target.value)} className='form-control' disabled={!checkedUas} style={{ width: '70px' }} />
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <input type="number" name='absen' id='absen' value={absen} onChange={(e) => setAbsen(e.target.value)} className='form-control' disabled={!checkedAbsen} style={{ width: '70px' }} />
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>{nilaiSum}</td>
                                                                        <td className='py-2 border px-1 text-capitalize'>{nilaiAkhir}</td>
                                                                        <td className='py-2 border px-1 text-capitalize'>{nilaiHuruf.length != 0 ? nilaiHuruf[0].nilai_huruf : ""}</td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            {nilaiHuruf.length != 0 ?
                                                                                <>{nilaiHuruf[0].keterangan == 'LULUS' ?
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">LULUS</span>
                                                                                    :
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">TIDAK LULUS</span>
                                                                                }
                                                                                </>
                                                                                : ""}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Row>
                                                    <Col>
                                                        <Link to='/detailnilai' state={{
                                                            idNilai: location.state.idNilai,
                                                            kodeMk: location.state.kodeMk,
                                                            idKelas: location.state.idKelas,
                                                            kodeKls: location.state.kodeKls,
                                                            kodeThn: location.state.kodeThn,
                                                            kodeSmt: location.state.kodeSmt,
                                                            kodeJen: location.state.kodeJen,
                                                            kodeFk: location.state.kodeFk,
                                                            kodeProd: location.state.kodeProd
                                                        }} className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex items-center no-underline'><FaReply /> &nbsp; <span>Kembali</span></Link>
                                                        <button className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center float-right'><FaEdit /> &nbsp; <span>Edit</span></button>
                                                    </Col>
                                                </Row>
                                            </Card.Footer>
                                        </Card>
                                    </form>
                                </Col>
                            </Row>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default EditNilai