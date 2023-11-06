import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { useReactToPrint } from "react-to-print"
import kop from "../../assets/img/kop.png"

const PrintMhs = () => {
    const [nik, setNik] = useState("")
    const [nim, setNim] = useState("")
    const [namanya, setNamanya] = useState("")
    const [tmp, setTmp] = useState("")
    const [tgl, setTgl] = useState("")
    const [bln, setBln] = useState("")
    const [thn, setThn] = useState("")
    const [kk, setKk] = useState("")
    const [jenkel, setJenkel] = useState("")
    const [email, setEmail] = useState("")
    const [nohp, setNohp] = useState("")
    const [notelp, setNotelp] = useState("")
    const [nisn, setNisn] = useState("")
    const [pkps, setPkps] = useState("")
    const [nokps, setNokps] = useState("")
    const [npwp, setNpwp] = useState("")
    const [jalurp, setJalurp] = useState("")
    const [jenisp, setJenisp] = useState("")
    const [jenjangnya, setJenjangnya] = useState("")
    const [fakultasnya, setFakultasnya] = useState("")
    const [prodinya, setProdinya] = useState("")
    const [semester, setSemester] = useState("")
    const [negaranya, setNegaranya] = useState("")
    const [provinsinya, setProvinsinya] = useState("")
    const [kabupatennya, setKabupatennya] = useState("")
    const [kecamatannya, setKecamatannya] = useState("")
    const [desanya, setDesanya] = useState("")
    const [kodepos, setKodePos] = useState("")
    const [dusun, setDusun] = useState("")
    const [rt, setRt] = useState("")
    const [rw, setRw] = useState("")
    const [jalan, setJalan] = useState("")
    const [jenting, setJenting] = useState("")
    const [alat, setAlat] = useState("")
    const [nikAyah, setNikAyah] = useState("")
    const [namaAyah, setNamaAyah] = useState("")
    const [tgAyah, setTgAyah] = useState("")
    const [blAyah, setBlAyah] = useState("")
    const [thAyah, setThAyah] = useState("")
    const [pkrjnAyah, setPkrjnAyah] = useState("")
    const [pndptAyah, setPndptAyah] = useState("")
    const [pndknAyah, setPndknAyah] = useState("")
    const [nikIbu, setNikIbu] = useState("")
    const [namaIbu, setNamaIbu] = useState("")
    const [tgIbu, setTgIbu] = useState("")
    const [blIbu, setBlIbu] = useState("")
    const [thIbu, setThIbu] = useState("")
    const [pkrjnIbu, setPkrjnIbu] = useState("")
    const [pndptIbu, setPndptIbu] = useState("")
    const [pndknIbu, setPndknIbu] = useState("")
    const [nikWali, setNikWali] = useState("")
    const [namaWali, setNamaWali] = useState("")
    const [tgWali, setTgWali] = useState("")
    const [blWali, setBlWali] = useState("")
    const [thWali, setThWali] = useState("")
    const [pkrjnWali, setPkrjnWali] = useState("")
    const [pndptWali, setPndptWali] = useState("")
    const [pndknWali, setPndknWali] = useState("")
    const [jalurPendaftaran, setJalurPendaftaran] = useState("")
    const [jenisPendaftaran, setJenisPendaftaran] = useState("")
    const [jenisTinggal, setJenisTinggal] = useState("")
    const [alatTransportasi, setAlatTransportasi] = useState("")
    const [pekerjaanAyah, setPekerjaanAyah] = useState("")
    const [penghasilanAyah, setPenghasilanAyah] = useState("")
    const [pendidikanAyah, setPendidikanAyah] = useState("")
    const [pekerjaanIbu, setPekerjaanIbu] = useState("")
    const [penghasilanIbu, setPenghasilanIbu] = useState("")
    const [pendidikanIbu, setPendidikanIbu] = useState("")
    const [pekerjaanWali, setPekerjaanWali] = useState("")
    const [penghasilanWali, setPenghasilanWali] = useState("")
    const [pendidikanWali, setPendidikanWali] = useState("")
    const { idMhs } = useParams()
    const [inPrintPreview, setInPrintPreview] = useState(false)
    let componentRef = useRef(null)

    useEffect(() => {
        const getMhsById = async () => {
            try {
                const response = await axios.get(`v1/mahasiswa/getById/${idMhs}`)
                let tglLahir = response.data.data.tanggal_lahir
                const tgArray = tglLahir.split("-")
                let tglLahirWali = response.data.data.tanggal_lahir_wali
                const tglWali = tglLahirWali.split("-")
                setNamanya(response.data.data.nama)
                setNik(response.data.data.nik)
                setNim(response.data.data.nim)
                setTmp(response.data.data.tempat_lahir)
                setTgl(tgArray[2])
                setBln(tgArray[1])
                setThn(tgArray[0])
                setKk(response.data.data.no_kk)
                setJenkel(response.data.data.jenis_kelamin)
                setEmail(response.data.data.email)
                setNohp(response.data.data.no_hp)
                setNotelp(response.data.data.no_telepon)
                setNisn(response.data.data.nisn)
                setPkps(response.data.data.penerima_kps)
                setNokps(response.data.data.no_kps)
                setNpwp(response.data.data.npwp)
                setJalurp(response.data.data.jalur_pendaftaran)
                setJenisp(response.data.data.jenis_pendaftaran)
                setJenjangnya(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
                setFakultasnya(response.data.data.fakultas[0].nama_fakultas)
                setProdinya(response.data.data.prodis[0].nama_prodi)
                setSemester(response.data.data.mulai_semester)
                setNegaranya(response.data.data.negaras[0].nama_negara)
                setProvinsinya(response.data.data.provinsis[0].nama_provinsi)
                setKabupatennya(response.data.data.kabupatens[0].nama_kabupaten)
                setKecamatannya(response.data.data.kecamatans[0].nama_kecamatan)
                setDesanya(response.data.data.desas[0].nama_desa)
                setKodePos(response.data.data.kode_pos)
                setDusun(response.data.data.dusun)
                setRt(response.data.data.rt)
                setRw(response.data.data.rw)
                setJalan(response.data.data.jalan)
                setJenting(response.data.data.jenis_tinggal)
                setAlat(response.data.data.alat_transportasi)
                let tglLahirAyah = response.data.data.tanggal_lahir_ayah
                const tglAyah = tglLahirAyah.split("-")
                let tglLahirIbu = response.data.data.tanggal_lahir_ibu
                const tglIbu = tglLahirIbu.split("-")
                setNamanya(response.data.data.nama)
                setNikAyah(response.data.data.nik_ayah)
                setNamaAyah(response.data.data.nama_ayah)
                setTgAyah(tglAyah[2])
                setBlAyah(tglAyah[1])
                setThAyah(tglAyah[0])
                setPkrjnAyah(response.data.data.pekerjaan_ayah)
                setPndptAyah(response.data.data.penghasilan_ayah)
                setPndknAyah(response.data.data.pendidikan_ayah)
                setNikIbu(response.data.data.nik_ibu)
                setNamaIbu(response.data.data.nama_ibu)
                setTgIbu(tglIbu[2])
                setBlIbu(tglIbu[1])
                setThIbu(tglIbu[0])
                setPkrjnIbu(response.data.data.pekerjaan_ibu)
                setPndptIbu(response.data.data.penghasilan_ibu)
                setPndknIbu(response.data.data.pendidikan_ibu)
                setNikWali(response.data.data.nik_wali)
                setNamaWali(response.data.data.nama_wali)
                setTgWali(tglWali[2])
                setBlWali(tglWali[1])
                setThWali(tglWali[0])
                setPkrjnWali(response.data.data.pekerjaan_wali)
                setPndptWali(response.data.data.penghasilan_wali)
                setPndknWali(response.data.data.pendidikan_wali)
            } catch (error) {

            }
        }
        getMhsById()
    }, [idMhs])

    useEffect(() => {
        jalurPendaftaranByCode()
        jenisPendaftaranByCode()
        jenisTinggalByCode()
        alatTransportasiByCode()
    }, [jalurp, jenisp, jenting, alat])

    useEffect(() => {
        pekerjaanAyahByCode()
        pendidikanAyahByCode()
        penghasilanAyahByCode()
        pekerjaanIbuByCode()
        pendidikanIbuByCode()
        penghasilanIbuByCode()
        pekerjaanWaliByCode()
        pendidikanWaliByCode()
        penghasilanWaliByCode()
    }, [pkrjnAyah, pndknAyah, pndptAyah, pkrjnIbu, pndknIbu, pndptIbu, pkrjnWali, pndknWali, pndptWali])

    useEffect(() => {
        handlePrint()
    })

    const jalurPendaftaranByCode = async () => {
        if (jalurp != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/jalurPendaftaran/getByCode/${jalurp}`)
            setJalurPendaftaran(response.data.data.nama_jalur_pendaftaran)
        }
    }

    const jenisPendaftaranByCode = async () => {
        if (jenisp != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/jenisPendaftaran/getByCode/${jenisp}`)
            setJenisPendaftaran(response.data.data.nama_jenis_pendaftaran)
        }
    }

    const jenisTinggalByCode = async () => {
        if (jenting != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/jenisTinggal/getByCode/${jenting}`)
            setJenisTinggal(response.data.data.nama_jenis_tinggal)
        }
    }

    const alatTransportasiByCode = async () => {
        if (alat != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/alatTransportasi/getByCode/${alat}`)
            setAlatTransportasi(response.data.data.nama_alat_transportasi)
        }
    }

    const pekerjaanAyahByCode = async () => {
        if (pkrjnAyah != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/pekerjaan/getByCode/${pkrjnAyah}`)
            setPekerjaanAyah(response.data.data.nama_pekerjaan)
        }
    }

    const pendidikanAyahByCode = async () => {
        if (pndknAyah != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/pendidikan/getByCode/${pndknAyah}`)
            setPendidikanAyah(response.data.data.nama_pendidikan)
        }
    }

    const penghasilanAyahByCode = async () => {
        if (pndptAyah != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/penghasilan/getByCode/${pndptAyah}`)
            setPenghasilanAyah(response.data.data.nama_penghasilan)
        }
    }

    const pekerjaanIbuByCode = async () => {
        if (pkrjnIbu != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/pekerjaan/getByCode/${pkrjnIbu}`)
            setPekerjaanIbu(response.data.data.nama_pekerjaan)
        }
    }

    const pendidikanIbuByCode = async () => {
        if (pndknIbu != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/pendidikan/getByCode/${pndknIbu}`)
            setPendidikanIbu(response.data.data.nama_pendidikan)
        }
    }

    const penghasilanIbuByCode = async () => {
        if (pndptIbu != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/penghasilan/getByCode/${pndptIbu}`)
            setPenghasilanIbu(response.data.data.nama_penghasilan)
        }
    }

    const pekerjaanWaliByCode = async () => {
        if (pkrjnWali != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/pekerjaan/getByCode/${pkrjnWali}`)
            setPekerjaanWali(response.data.data.nama_pekerjaan)
        }
    }

    const pendidikanWaliByCode = async () => {
        if (pndknWali != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/pendidikan/getByCode/${pndknWali}`)
            setPendidikanWali(response.data.data.nama_pendidikan)
        }
    }

    const penghasilanWaliByCode = async () => {
        if (pndptWali != 0) {
            const response = await axios.get(`v1/equipmentDsnMhs/penghasilan/getByCode/${pndptWali}`)
            setPenghasilanWali(response.data.data.nama_penghasilan)
        }
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef,
        onAfterPrint: () => setInPrintPreview(window.close())
    })



    return (
        <div className="container mt-3 font-sans">
            <section ref={el => (componentRef = el)}>
                <div className='mb-2'>
                    <img src={kop} alt="" />
                </div>
                <hr className='border-1 mx-2 mb-2' />
                <div className='mb-1 mx-5'><h1 className='uppercase'>Identitas Diri </h1></div>
                <div className='px-5 mb-2'>
                    <div className='grid grid-cols-2 mt-2'>
                        <div className=''>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>NIm</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{nim}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>NIK</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{nik}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>NO KK</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{kk}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>NAMA</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{namanya}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>tempat lahir</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{tmp}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>tanggal lahir</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{tgl + "-" + bln + "-" + thn}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>jenis kelamin</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{jenkel == "l" ? "laki-laki" : "perempuan"}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>email</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs '>{email}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>no hp</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs '>{nohp}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>No telepon</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs '>{notelp}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>nisn</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{nisn}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className=''>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>Penerima KPS</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{pkps}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>no kps</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{nokps}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>npwp</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{npwp}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>Jalur Pendaftaran</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{jalurPendaftaran}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>jenis pendaftaran</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{jenisPendaftaran}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>jenjang pendidikan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{jenjangnya}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>fakultas</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{fakultasnya}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>prodi</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{prodinya}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <hr className='border-1 mx-2 mb-2' />
                <div className="mb-1 mx-5"><h1 className='uppercase  '>detail alamat</h1></div>
                <div className="px-5 mb-2">
                    <div className='grid grid-cols-2 mt-2'>
                        <div className=''>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>jalan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{jalan}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>Dusun</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{dusun} {"rt " + rt}/{"rw " + rw}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>kode pos</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{kodepos}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>Jenis tinggal</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{jenisTinggal}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>alat transportsi</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{alatTransportasi}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className=''>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>desa</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{desanya}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>kecamatan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{kecamatannya}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>Kabupaten</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{kabupatennya}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>provinsi</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{provinsinya}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>negara</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{negaranya}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <hr className='border-1 mx-2 mb-2' />
                <div className='mb-1 mx-5'><h1 className='uppercase  '>detail orang tua</h1></div>
                <div className="px-5 mb-2">
                    <div className='grid grid-cols-2 mt-2'>
                        <div className=''>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>nik </span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{nikAyah}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>nama Ayah</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{namaAyah}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>tanggal lahir</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{tgAyah + "-" + blAyah + "-" + thAyah}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>pekerjaan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{pekerjaanAyah}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>penghasilan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{penghasilanAyah}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>pendidikan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{pendidikanAyah}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className=''>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>nik </span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{nikIbu}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>nama Ibu</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{namaIbu}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>tanggal lahir</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{tgIbu + "-" + blIbu + "-" + thIbu}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>pekerjaan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{pekerjaanIbu}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>penghasilan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{penghasilanIbu}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>pendidikan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{pendidikanIbu}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <hr className='border-1 mx-2 mb-2' />
                <div className='mb-1 mx-5'><h1 className='uppercase  '>detail wali</h1></div>
                <div className="px-5 mb-2">
                    <div className='grid grid-cols-2 mt-2'>
                        <div className=''>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>nik </span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{nikWali}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>nama Wali</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{namaWali}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>tanggal lahir</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{tgWali + "-" + blWali + "-" + thWali}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className=''>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>pekerjaan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{pekerjaanWali}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>penghasilan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{penghasilanWali}</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className='text-xs  uppercase'>pendidikan</span></td>
                                        <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                        <td><span className='text-xs  uppercase'>{pendidikanWali}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <div className='grid lg:grid-cols-2'>
                    <div className='col-span-2'><h1 className='uppercase'>Identitas Diri </h1></div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><span className='text-xs  uppercase'>NIm</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{nim}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>NIK</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{nik}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>NO KK</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{kk}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>NAMA</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{namanya}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>tempat lahir</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{tmp}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>tanggal lahir</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{tgl + "-" + bln + "-" + thn}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>jenis kelamin</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{jenkel == "l" ? "laki-laki" : "perempuan"}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>email</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs '>{email}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>no hp</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs '>{nohp}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>No telepon</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs '>{notelp}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><span className='text-xs  uppercase'>nisn</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{nisn}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>Penerima KPS</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{pkps}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>no kps</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{nokps}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>npwp</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{npwp}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>Jalur Pendaftaran</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{jalurPendaftaran}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>jenis pendaftaran</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{jenisPendaftaran}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>jenjang pendidikan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{jenjangnya}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>fakultas</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{fakultasnya}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>prodi</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{prodinya}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div><h1 className='uppercase  '>detail alamat</h1></div>
                <div className="grid lg:grid-cols-2">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><span className='text-xs  uppercase'>jalan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{jalan}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>Dusun</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{dusun} {"rt " + rt}/{"rw " + rw}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>kode pos</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{kodepos}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>Jenis tinggal</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{jenisTinggal}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>alat transportsi</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{alatTransportasi}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><span className='text-xs  uppercase'>desa</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{desanya}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>kecamatan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{kecamatannya}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>Kabupaten</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{kabupatennya}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>provinsi</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{provinsinya}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>negara</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{negaranya}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div><h1 className='uppercase  '>detail orang tua</h1></div>
                <div className="grid lg:grid-cols-2">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><span className='text-xs  uppercase'>nik </span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{nikAyah}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>nama Ayah</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{namaAyah}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>tanggal lahir</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{tgAyah + "-" + blAyah + "-" + thAyah}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>pekerjaan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{pekerjaanAyah}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>penghasilan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{penghasilanAyah}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>pendidikan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{pendidikanAyah}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><span className='text-xs  uppercase'>nik </span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{nikIbu}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>nama Ibu</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{namaIbu}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>tanggal lahir</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{tgIbu + "-" + blIbu + "-" + thIbu}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>pekerjaan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{pekerjaanIbu}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>penghasilan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{penghasilanIbu}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>pendidikan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{pendidikanIbu}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div><h1 className='uppercase  '>detail wali</h1></div>
                <div className="grid lg:grid-cols-2">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><span className='text-xs  uppercase'>nik </span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{nikWali}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>nama Wali</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{namaWali}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>tanggal lahir</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{tgWali + "-" + blWali + "-" + thWali}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><span className='text-xs  uppercase'>pekerjaan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{pekerjaanWali}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>penghasilan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{penghasilanWali}</span></td>
                                </tr>
                                <tr>
                                    <td><span className='text-xs  uppercase'>pendidikan</span></td>
                                    <td><span className='text-xs '>&nbsp;:&nbsp;</span></td>
                                    <td><span className='text-xs  uppercase'>{pendidikanWali}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </section>
        </div>
    )
}

export default PrintMhs