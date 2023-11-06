import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import kop from "../../assets/img/kop.png"
import male from "../../assets/img/male.png"
import female from "../../assets/img/female.png"
import { useReactToPrint } from "react-to-print"

const PrintDosen = () => {
    const [nidn, setNidn] = useState("")
    const [nipy, setNipy] = useState("")
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
    const [inPrintPreview, setInPrintPreview] = useState(false)
    const [fotos, setFotos] = useState("")
    const [prevFoto, setPrevFoto] = useState("")
    let componentRef = useRef(null)
    const { idDsn } = useParams()

    useEffect(() => {
        const getDsnById = async () => {
            try {
                const response = await axios.get(`v1/dosen/getById/${idDsn}`)
                setNidn(response.data.data.nidn)
                setNipy(response.data.data.nip_ynaa)
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
            } catch (error) {

            }
        }
        getDsnById()
    }, [idDsn])

    useEffect(() => {
        fotoDiri()
    }, [fotos])

    useEffect(() => {
        alatTransportasiByCode()
    }, [alat])

    useEffect(() => {
        pendidikanByCode()
    }, [pndkn])

    useEffect(() => {
        handlePrint()
    })

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

    const handlePrint = useReactToPrint({
        content: () => componentRef,
        onAfterPrint: () => setInPrintPreview(window.close())
    })

    return (
        <div className="container mt-3">
            <section
                ref={el => (componentRef = el)}
            >

                <div className='mb-5'>
                    <img src={kop} alt="" />
                </div>
                {/* <div className='text-center mb-3'>
                    <h2 className='text-3xl font-bold'>Formulir Dosen</h2>
                </div>
                <hr className='border-1 mx-2' /> */}
                <div className='px-10 mt-3 mb-2'>
                    <div className='mb-2'>
                        <h2 className='text-3xl font-bold'>Identitas Diri</h2>
                    </div>
                    <div className='w-full flex'>
                        <div className='p-3'>
                            <div className="avatar">
                                <div className="w-52 rounded-full">
                                    {prevFoto ? (
                                        <img src={`data:;base64,${prevFoto}`} alt="Foto Dosen" />
                                    ) : (

                                        <img src={jenkel == "l" ? male : female} width={200} alt="Foto Dosen" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='p-3'>
                            <table className='my-4'>
                                <tbody>
                                    <tr>
                                        <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>nipy</span></td>
                                        <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                        <td className='py-1 px-2'><span className='text-sm uppercase'>{nipy}</span></td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>nidn</span></td>
                                        <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                        <td className='py-1 px-2'><span className='text-sm uppercase'>{nidn}</span></td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>nama</span></td>
                                        <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                        <td className='py-1 px-2'><span className='text-sm uppercase'>{namanya}</span></td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>tempat, tanggal lahir</span></td>
                                        <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                        <td className='py-1 px-2'><span className='text-sm uppercase'>{tmp}, {tgl}</span></td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>jenis kelamin</span></td>
                                        <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                        <td className='py-1 px-2'><span className='text-sm uppercase'>{jenkel == "l" ? "laki-laki" : "perempuan"}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <hr className='border-1 mx-2' />
                <div className='px-10 mt-3 mb-2'>
                    <div className='mb-2'>
                        <h2 className='text-3xl font-bold'>Informasi Alamat</h2>
                    </div>
                    <div className='w-full flex gap-4'>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>alamat lengkap</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{alamat}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>desa</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{desanya}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>kecamatan</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{kecamatannya}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>kabupaten</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{kabupatennya}</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>provinsi</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{provinsinya}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>negara</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{negaranya}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>kode pos</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{kodepos}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>alat transportasi</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{alatTransportasi}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className='border-1 mx-2' />
                <div className='px-10 mt-3 mb-2'>
                    <div className='mb-2'>
                        <h2 className='text-3xl font-bold'>Informasi Lainnya</h2>
                    </div>
                    <div className='w-full'>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>email</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-lg '>{email}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>NO handphone</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm '>{nohp}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>no telepon</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm '>{notelp}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>pendidikan</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{pendidikan}</span></td>
                                </tr>
                                <tr>
                                    <td className='py-1 px-2'><span className='text-sm uppercase font-bold'>status kepegawaian</span></td>
                                    <td className='py-1 px-2'><span className='text-sm'>&nbsp;:&nbsp;</span></td>
                                    <td className='py-1 px-2'><span className='text-sm uppercase'>{statusPg}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr className='border-1 mx-2 mb-16' />
                <div className='text-center'>
                    <p>FORMULIR DOSEN</p>
                    <p>STAI NURUL ABROR AL-ROBBANIYIN</p>
                    <p>Copyright © STAINAA 2023 All right reserved</p>
                </div>
            </section>
        </div>
    )
}

export default PrintDosen