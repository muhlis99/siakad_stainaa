import axios from 'axios'
import React, { useEffect, useState } from 'react'
import kop from "../../assets/images/kop.png"

const CetakPdf = () => {
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

    const [dataKHS, setDataKHS] = useState([])
    const [totalKHS, setTotalKHS] = useState([])

    useEffect(() => {
        const getDataKHS = async () => {
            try {
                // if (user && kodeTahun) {
                const response = await axios.get(`v1/khs/viewKhsMahasiswa/2324gnp/2109020002`)
                setDataKHS(response.data.data)
                setTotalKHS(response.data.nilaiAkhir)
                // }
            } catch (error) {
                setDataKHS([])
                setTotalKHS([])
            }
        }
        getDataKHS()
    }, [])

    return (
        <div>
            <div style={tableStyle.wrap}>
                <img src={kop} alt="kop" style={tableStyle.image} />
                <div style={tableStyle.title} className='text-center mt-2 mb-2'>
                    <span>Kartu Hasil Studi</span>
                </div>
                <div style={tableStyle.grid} className='mb-3'>
                    <div style={tableStyle.gridItem}>
                        <table width={250}>
                            <tr>
                                <td>NIM</td>
                                <td>&nbsp;:&nbsp;</td>
                                <td>2109020002</td>
                            </tr>
                            <tr>
                                <td>Nama</td>
                                <td>&nbsp;:&nbsp;</td>
                                <td>Anisatul Wildad</td>
                            </tr>
                            <tr>
                                <td>Fakultas</td>
                                <td>&nbsp;:&nbsp;</td>
                                <td>Agama Islam</td>
                            </tr>
                        </table>
                    </div>
                    <div style={tableStyle.gridItem}>
                        <table width={250}>
                            <tr>
                                <td>Prodi</td>
                                <td>&nbsp;:&nbsp;</td>
                                <td>Hukum Ekonomi Syariah</td>
                            </tr>
                            <tr>
                                <td>Tahun Ajaran</td>
                                <td>&nbsp;:&nbsp;</td>
                                <td>2023/2024 (Genap)</td>
                            </tr>
                            <tr>
                                <td>Semester</td>
                                <td>&nbsp;:&nbsp;</td>
                                <td>4</td>
                            </tr>
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
                                <td style={tableStyle.td2} align='center' colSpan={8}>KHS Tidak Ada</td>
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
    )
}

export default CetakPdf