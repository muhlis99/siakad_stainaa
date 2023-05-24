import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import stainaa from "../../assets/img/stainaa.png"
import ReactToPrint from "react-to-print"

const PrintDosen = () => {
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
    let componentRef = useRef(null)
    const { idDsn } = useParams()

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

    return (
        <div className="container mt-3 font-sans">
            <ReactToPrint
                trigger={() => {
                    return <button className='btn'>print</button>
                }}

                content={() => componentRef}
            />
            <section ref={el => (componentRef = el)}>
                <div className="card">
                    <div className="card-body p-4">
                        <div className="flex gap-3 w-full ">
                            <div className="avatar mt-1 rounded-full h-12 ">
                                <div className="w-16 h-16 rounded-full">
                                    <img src={stainaa} />
                                </div>
                            </div>
                            <div>
                                <p className='text-xs font-bold'>YAYASAN NURUL ABROR AL-ROBBANIYIN</p>
                                <p className='text-xs font-bold'>SEKOLAH TINGGI AGAMA ISLAM NURUL ABROR AL-ROBBANIYIN</p>
                                <p className='text-xs font-bold uppercase'>alasbuluh wongsorejo banyuwangi</p>
                                <p className='text-xs font-bold '>FORMULIR DOSEN</p>
                            </div>
                        </div>
                        <hr className='w-full' />
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PrintDosen