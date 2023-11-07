import React, { useEffect, useState, useRef } from 'react'
import Layout from '../../Layout'
import jsPDF from 'jspdf'
import { Row, Col, Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Navigate } from "react-router-dom"
import { FaPrint } from "react-icons/fa";
import axios from 'axios'
import kop from "../../../assets/images/kop.png"

const KHS = () => {
    const dispatch = useDispatch()
    const templateRef = useRef(null)
    const { isError, user } = useSelector((state) => state.auth)
    const [Tahun, setTahun] = useState([])
    const [kodeTahun, setKodeTahun] = useState("")
    const [biodata, setBiodata] = useState([])
    const [dataKHS, setDataKHS] = useState([])
    const [totalKHS, setTotalKHS] = useState([])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getAllTahun()
    }, [])

    useEffect(() => {
        const getCurrentYear = async () => {
            if (user) {
                const response = await axios.get(`v1/krs/viewKrsMahasiswaNow/${user.data.username}`)
                setKodeTahun(response.data.data[0].code_tahun_ajaran)
            }
        }
        getCurrentYear()
    }, [user])

    useEffect(() => {
        const getDataKHS = async () => {
            try {
                if (user && kodeTahun) {
                    const response = await axios.get(`v1/khs/viewKhsMahasiswa/${kodeTahun}/${user.data.username}`)
                    setBiodata(response.data.identitas)
                    setDataKHS(response.data.data)
                    setTotalKHS(response.data.nilaiAkhir)
                }
            } catch (error) {
                setDataKHS([])
                setTotalKHS([])
            }
        }
        getDataKHS()
    }, [user, kodeTahun])

    const getAllTahun = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const tableStyle = {
        image: {
            width: '597px'
        },
        wrap: {
            width: '600px',
            fontFamily: "Arial, Helvetica, sans-serif"
        },
        title: {
            fontSize: '12px',
            margin: 'auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            width: '80%',
            margin: 'auto'
        },
        gridItem: {
            fontSize: '10px',
        },
        table: {
            fontSize: '8px',
            margin: 'auto',
            width: '80%',
            border: '1px solid black',
            borderCollapse: 'collapse'
        },
        tr: {
        },
        td: {
            padding: '5px 6px',
            border: '1px solid black',
            borderCollapse: 'collapse',
            fontWeight: 'bold'
        },
        td2: {
            padding: '5px 6px',
            border: '1px solid black',
            borderCollapse: 'collapse'
        },
        tdMakul: {
            padding: '5px 6px',
            border: '1px solid black',
            borderCollapse: 'collapse',
            wordSpacing: '2px'
        }
    }

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a4',
            unit: 'pt',
        })

        doc.setFont('Inter-Regular', 'normal')
        doc.setFontSize(1);

        doc.html(templateRef.current, {
            async callback(doc) {
                await doc.save('Document')
            }
        })
    }

    return (
        <Layout>
            {isError ? <Navigate to="/login" /> : <div className="content-wrapper">
                <div className="page-header">
                    <h3 className="page-title">Kartu Hasil Studi</h3>
                </div>
                <Row>
                    <Col>
                        <Card className='shadow mb-4'>
                            <Card.Body className='justify'>
                                <Row className='mb-5 py-3 ps-3 shadow-sm rounded-end' style={{ background: '#E9EAE1', borderLeft: 'solid #5E7C60 2px' }}>
                                    <Col lg="6" sm="12">
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>nim</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.nim}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>nama</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.mahasiswa}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>Fakultas</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.fakultas}</Card.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg="6" sm="12">
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>Prodi</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.prodi}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>Periode</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.tahunAjaran}</Card.Text>
                                            </Col>
                                        </Row>
                                        <Row className='mb-2'>
                                            <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                <Card.Text className='fw-bold text-uppercase'>Semester</Card.Text>
                                            </Col>
                                            <Col className='p-0' lg="1" md="1" sm="1" xs="1">
                                                <Card.Text className='fw-bold text-uppercase'>:</Card.Text>
                                            </Col>
                                            <Col className='p-0'>
                                                <Card.Text className='fw-bold text-uppercase'>{biodata.semester}</Card.Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='mb-2'>
                                    <Col lg="6" className='p-0'>
                                        <Row>
                                            <div className="col-auto">
                                                <label htmlFor="tahun" className="col-form-label">Periode</label>
                                            </div>
                                            <div className="col-auto p-0">
                                                <select className="form-select form-select-sm mt-2" id='tahun' value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                                    <option value="">Tahun</option>
                                                    {Tahun.map((item) => (
                                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col">
                                                <button className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center mt-2' onClick={handleGeneratePdf}><FaPrint /> &nbsp; <span>Cetak KHS</span></button>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='p-0'>
                                        <div className="table-responsive shadow-sm">
                                            <Table hover>
                                                <thead>
                                                    <tr>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }} rowSpan={2}>#</th>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }} rowSpan={2}>Kode MK</th>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }} rowSpan={2}>Mata Kuliah</th>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }}>Bobot MK</th>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }} colSpan={3}>Nilai</th>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }} rowSpan={2}>SKS*Indeks</th>
                                                    </tr>
                                                    <tr>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }}>(SKS)</th>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }}>Angka</th>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }}>Huruf</th>
                                                        <th className='fw-bold py-2 border text-center' style={{ background: '#D5D6C6' }}>Indeks</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataKHS.length != 0 && totalKHS.length != 0 ? dataKHS.map((item, index) => (
                                                        <tr key={item.id_nilai_kuliah} className='border'>
                                                            <th scope='row' className='py-2 text-center'>{index + 1}</th>
                                                            <td className='py-2 border' align='center'>{item.code_mata_kuliah}</td>
                                                            <td className='py-2 border'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                                            <td className='py-2 border' align='center'>{item.mataKuliahs[0].sks}</td>
                                                            <td className='py-2 border' align='center'>{item.nilai_akhir}</td>
                                                            <td className='py-2 border' align='center'>{item.kategoriNilais[0].nilai_huruf}</td>
                                                            <td className='py-2 border' align='center'>{item.kategoriNilais[0].interfal_skor}</td>
                                                            <td className='py-2 border' align='center'>{item.sksIndexs}</td>
                                                        </tr>
                                                    )) :
                                                        <tr className='border'>
                                                            <td className='py-2 border' align='center' colSpan={8}>KHS Tidak Ada</td>
                                                        </tr>
                                                    }
                                                    {dataKHS.length != 0 && totalKHS.length != 0 ?
                                                        <tr className='border'>
                                                            <td className='py-2 border' align='center' colSpan="3"><strong>Jumlah SKS</strong></td>
                                                            <td className='py-2 border' align='center'>{totalKHS.jumlahSks}</td>
                                                            <td className='py-2 border' align='center' colSpan="3"></td>
                                                            <td className='py-2 border' align='center'>{totalKHS.jumlahSksIndex}</td>
                                                        </tr>
                                                        : ""}
                                                    {dataKHS.length != 0 && totalKHS.length != 0 ? <tr className='border'>
                                                        <td className='py-2 border' align='center' colSpan="7"><strong>IPS (Index Prestasi Semester)</strong></td>
                                                        <td className='py-2 border' align='center'>{totalKHS.IPS}</td>
                                                    </tr> : ""}

                                                </tbody>
                                            </Table>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-none'>
                            <div ref={templateRef}>
                                <div style={tableStyle.wrap}>
                                    <img src={kop} alt="kop" style={tableStyle.image} />
                                    <div style={tableStyle.title} className='text-center mt-2 mb-2'>
                                        <span>Kartu Hasil Studi</span>
                                    </div>
                                    <div style={tableStyle.grid} className='mb-3'>
                                        <div style={tableStyle.gridItem}>
                                            <table width={250}>
                                                <tbody>
                                                    <tr>
                                                        <td>NIM</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>{biodata.nim}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nama</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>{biodata.mahasiswa}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Fakultas</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>{biodata.fakultas}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={tableStyle.gridItem}>
                                            <table width={250}>
                                                <tbody>
                                                    <tr>
                                                        <td>Prodi</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>{biodata.prodi}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tahun Ajaran</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>{biodata.tahunAjaran}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Semester</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>{biodata.semester}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <table style={tableStyle.table}>
                                        <thead>
                                            <tr style={tableStyle.tr}>
                                                <td style={tableStyle.td} rowSpan={2} align='center'>No</td>
                                                <td style={tableStyle.td} rowSpan={2} align='center'>Kode MK</td>
                                                <td style={tableStyle.td} rowSpan={2} align='center'>Mata Kuliah</td>
                                                <td style={tableStyle.td}>Bobot MK</td>
                                                <td style={tableStyle.td} colSpan={3} align='center'>Nilai</td>
                                                <td style={tableStyle.td} rowSpan={2} align='center'>SKS * Indeks</td>
                                            </tr>
                                            <tr style={tableStyle.tr}>
                                                <td style={tableStyle.td} align='center'>SKS</td>
                                                <td style={tableStyle.td} align='center'>Angka</td>
                                                <td style={tableStyle.td} align='center'>Huruf</td>
                                                <td style={tableStyle.td} align='center'>Indeks</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataKHS.length != 0 && totalKHS.length != 0 ? dataKHS.map((item, index) => (
                                                <tr key={item.id_nilai_kuliah}>
                                                    <td style={tableStyle.td2} align='center'>{index + 1}</td>
                                                    <td style={tableStyle.td2} align='center'>{item.code_mata_kuliah}</td>
                                                    <td style={tableStyle.tdMakul} align='left'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                                    <td style={tableStyle.td2} align='center'>{item.mataKuliahs[0].sks}</td>
                                                    <td style={tableStyle.td2} align='center'>{item.nilai_akhir}</td>
                                                    <td style={tableStyle.td2} align='center'>{item.kategoriNilais[0].nilai_huruf}</td>
                                                    <td style={tableStyle.td2} align='center'>{item.kategoriNilais[0].interfal_skor}</td>
                                                    <td style={tableStyle.td2} align='center'>{item.sksIndexs}</td>
                                                </tr>
                                            )) :
                                                <tr>
                                                    <td style={tableStyle.td2} align='center' colSpan={8}>KHS anda belum siap</td>
                                                </tr>
                                            }
                                            {dataKHS.length != 0 && totalKHS.length != 0 ?
                                                <tr>
                                                    <td style={tableStyle.td2} align='center' colSpan="3"><strong>Jumlah SKS</strong></td>
                                                    <td style={tableStyle.td2} align='center'>{totalKHS.jumlahSks}</td>
                                                    <td style={tableStyle.td2} align='center' colSpan="3"></td>
                                                    <td style={tableStyle.td2} align='center'>{totalKHS.jumlahSksIndex}</td>
                                                </tr>
                                                : ""}
                                            {dataKHS.length != 0 && totalKHS.length != 0 ? <tr>
                                                <td style={tableStyle.td2} align='center' colSpan="7"><strong>IPS (Indeks Prestasi Semester)</strong></td>
                                                <td style={tableStyle.td2} align='center'>{totalKHS.IPS}</td>
                                            </tr> : ""}
                                        </tbody>
                                    </table>
                                    <div style={tableStyle.grid} className='mt-4'>
                                        <div style={tableStyle.gridItem}>
                                            <table width={100}>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={3}><strong>Keterangan</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>A</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>Lulus</td>
                                                    </tr>
                                                    <tr>
                                                        <td>A-</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>Lulus</td>
                                                    </tr>
                                                    <tr>
                                                        <td>B+</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>Lulus</td>
                                                    </tr>
                                                    <tr>
                                                        <td>B</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>Lulus</td>
                                                    </tr>
                                                    <tr>
                                                        <td>B-</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>Lulus</td>
                                                    </tr>
                                                    <tr>
                                                        <td>C+</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>Lulus</td>
                                                    </tr>
                                                    <tr>
                                                        <td>C</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>Lulus</td>
                                                    </tr>
                                                    <tr>
                                                        <td>D</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>Tidak Lulus</td>
                                                    </tr>
                                                    <tr>
                                                        <td>E</td>
                                                        <td>&nbsp;:&nbsp;</td>
                                                        <td>Tidak Lulus</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={tableStyle.gridItem} className='ps-5'>
                                            <div className='mb-5 ms-5'>
                                                <a>Ketua,</a>
                                            </div>
                                            <div className='ms-5'>
                                                <a><strong>K. Indi Aunullah, SS. S. Fil</strong></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>}
        </Layout>
    )
}

export default KHS