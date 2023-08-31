import React, { useState, useEffect } from 'react'
import { FaReply } from "react-icons/fa"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'

const DetailMhs = () => {
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
    const [fotos, setFotos] = useState("")
    const [prevFoto, setPrevFoto] = useState("")
    const [kks, setKks] = useState("")
    const [prevKk, setPrevKk] = useState("")
    const [ktps, setKtps] = useState("")
    const [prevKtp, setPrevKtp] = useState("")
    const [ijazahs, setIjazahs] = useState("")
    const [prevIjazah, setPrevIjazah] = useState("")
    const [kips, setKips] = useState("")
    const [prevKip, setPrevKip] = useState("")
    const [qrCode, setQrCode] = useState("")
    const [prevQrCode, setPrevQrCode] = useState("")
    const [ktm, setKtm] = useState("")
    const [prevKtm, setPrevKtm] = useState("")
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
    const [modal, setModal] = useState("")
    const [nameFile, setNameFile] = useState("")
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
                setFotos(response.data.data.foto_diri)
                setKks(response.data.data.foto_kk)
                setKtps(response.data.data.foto_ktp)
                setIjazahs(response.data.data.foto_ijazah)
                setKips(response.data.data.foto_kip)
                setQrCode(response.data.data.qrcode)
                setKtm(response.data.data.foto_ktm)
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
        fotoDiri()
    }, [fotos])

    useEffect(() => {
        fotoKk()
    }, [kks])

    useEffect(() => {
        fotoKtp()
    }, [ktps])

    useEffect(() => {
        fotoIjazah()
    }, [ijazahs])

    useEffect(() => {
        fotoKip()
    }, [kips])

    useEffect(() => {
        kodeQr()
    }, [qrCode])

    useEffect(() => {
        fotoKtm()
    }, [ktm])

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

    const fotoDiri = async () => {
        try {
            if (fotos != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/diri/${fotos}`, {
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

    const fotoKk = async () => {
        try {
            if (kks != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/kk/${kks}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKk(base64)
                })

            }
        } catch (error) {

        }
    }

    const fotoKtp = async () => {
        try {
            if (ktps != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/ktp/${ktps}`, {
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

    const fotoIjazah = async () => {
        try {
            if (ijazahs != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/ijazah/${ijazahs}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevIjazah(base64)
                })

            }
        } catch (error) {

        }
    }

    const fotoKip = async () => {
        try {
            if (kips != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/kip/${kips}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKip(base64)
                })

            }
        } catch (error) {

        }
    }

    const kodeQr = async () => {
        try {
            if (qrCode != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/qrcode/${qrCode}`, {
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

    const fotoKtm = async () => {
        try {
            if (ktm != 0) {
                await axios.get(`v1/mahasiswa/public/seeImage/mahasiswa/ktm/${ktm}`, {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKtm(base64)
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

    return (
        <div className="container mt-3">
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="modal cursor-pointer">
                <label className="modal-box relative p-1 rounded-sm" htmlFor="">
                    <figure><img src={`data:;base64,${modal}`} alt="" /></figure>
                    {/* <div className='w-full'>
                        <a className='btn btn-sm btn-primary w-full mb-2' download={nameFile} href={`data:image/png;base64,${modal}`}>download</a>
                    </div>
                    <div className='avatar'>
                        <div className="w-full  rounded">
                            
                        </div>
                    </div> */}
                </label>
            </label>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div>
                            <Link to="/mahasiswa" state={{ collaps: 'induk', activ: '/mahasiswa' }} className='btn btn-sm btn-error capitalize rounded-md mb-2'><FaReply /><span className='ml-1'>Kembali</span></Link>
                        </div>
                        <div className='grid lg:grid-cols-2'>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>NIm</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{nim}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>NIK</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{nik}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>NO KK</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{kk}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>NAMA</span></td>
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
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{tgl + "-" + bln + "-" + thn}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>jenis kelamin</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{jenkel == "l" ? "laki-laki" : "perempuan"}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>email</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>{email}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>no hp</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>{nohp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>No telepon</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>{notelp}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>nisn</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{nisn}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>Penerima KPS</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{pkps}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>no kps</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{nokps}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>npwp</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{npwp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>Jalur Pendaftaran</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{jalurPendaftaran}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>jenis pendaftaran</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{jenisPendaftaran}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>jenjang pendidikan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{jenjangnya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>fakultas</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{fakultasnya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>prodi</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{prodinya}</span></td>
                                        </tr>
                                        {/* <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>mulai semester</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{semester}</span></td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mt-2'><h1 className='uppercase font-bold text-xl '>detail alamat</h1></div>
                        <hr className='w-full' />
                        <div className="grid lg:grid-cols-2">
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>jalan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{jalan}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>Dusun</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{dusun} {"rt " + rt}/{"rw " + rw}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>kode pos</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{kodepos}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>Jenis tinggal</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{jenisTinggal}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>alat transportasi</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{alatTransportasi}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
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
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>Kabupaten</span></td>
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
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mt-2'><h1 className='uppercase font-bold text-xl '>detail orang tua</h1></div>
                        <hr className='w-full' />
                        <div className="grid lg:grid-cols-2">
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>nik </span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{nikAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>nama ayah</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{namaAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>tanggal lahir</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{tgAyah + "-" + blAyah + "-" + thAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>pekerjaan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{pekerjaanAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>penghasilan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{penghasilanAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>pendidikan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{pendidikanAyah}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>nik </span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{nikIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>nama Ibu</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{namaIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>tanggal lahir</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{tgIbu + "-" + blIbu + "-" + thIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>pekerjaan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{pekerjaanIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>penghasilan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{penghasilanIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>pendidikan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{pendidikanIbu}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mt-2'><h1 className='uppercase font-bold text-xl '>detail wali</h1></div>
                        <hr className='w-full' />
                        <div className="grid lg:grid-cols-2">
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>nik </span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{nikWali}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>nama </span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{namaWali}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>tanggal lahir</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{tgWali + "-" + blWali + "-" + thWali}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>pekerjaan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{pekerjaanWali}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>penghasilan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{penghasilanWali}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>pendidikan</span></td>
                                            <td className='py-1'><span className='text-sm font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-sm font-bold uppercase'>{pendidikanWali}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mt-2'><h1 className='uppercase font-bold text-xl '>detail berkas</h1></div>
                        <hr className='w-full' />
                        <div className="grid lg:grid-cols-3 gap-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">foto mahasiswa</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className={`btn btn-sm w-full btn-primary cursor-pointer mb-2 ${prevFoto ? '' : 'hidden'}`} onClick={() => openImage(prevFoto, 'FOTO_')}>Detail</button>
                                    <a className={`btn btn-sm btn-primary w-full mb-2 ${prevFoto ? '' : 'hidden'}`} download={'FOTO_' + namanya} href={`data:image/png;base64,${prevFoto}`}>download</a>
                                </div>
                                {prevFoto ? (
                                    <div className="avatar">
                                        <div className="w-full  rounded">
                                            <img src={`data:;base64,${prevFoto}`} />
                                        </div>
                                    </div>
                                ) : (<span className='ml-3'>File Tidak Ada</span>)}
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">scan kartu keluarga</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className={`btn btn-sm w-full btn-primary cursor-pointer mb-2 ${prevKk ? '' : 'hidden'}`} onClick={() => openImage(prevKk, 'SCANKK_')}>Detail</button>
                                    <a className={`btn btn-sm btn-primary w-full mb-2 ${prevKk ? '' : 'hidden'}`} download={'SCANKK_' + namanya} href={`data:image/png;base64,${prevKk}`}>download</a>
                                </div>
                                <div className="avatar">
                                    {prevKk ? (
                                        <div className="w-full rounded">
                                            <img src={`data:;base64,${prevKk}`} />
                                        </div>
                                    ) : (<span className='ml-3'>File Tidak Ada</span>)}
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">scan ktp</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className={`btn btn-sm w-full btn-primary cursor-pointer mb-2 ${prevKtp ? '' : 'hidden'}`} onClick={() => openImage(prevKtp, 'KTP_')}>Detail</button>
                                    <a className={`btn btn-sm btn-primary w-full mb-2 ${prevKtp ? '' : 'hidden'}`} download={'KTP_' + namanya} href={`data:image/png;base64,${prevKtp}`}>download</a>
                                </div>
                                <div className="avatar">
                                    {prevKtp ? (
                                        <div className="w-full rounded">
                                            <img src={`data:;base64,${prevKtp}`} />
                                        </div>
                                    ) : (<span className='ml-3'>File Tidak Ada</span>)}
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">scan ijazah</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className={`btn btn-sm w-full btn-primary cursor-pointer mb-2 ${prevIjazah ? '' : 'hidden'}`} onClick={() => openImage(prevIjazah, 'IJAZAH_')}>Detail</button>
                                    <a className={`btn btn-sm btn-primary w-full mb-2 ${prevIjazah ? '' : 'hidden'}`} download={'IJAZAH_' + namanya} href={`data:image/png;base64,${prevIjazah}`}>download</a>
                                </div>
                                <div className="avatar">
                                    {prevIjazah ? (
                                        <div className="w-full rounded">
                                            <img src={`data:;base64,${prevIjazah}`} />
                                        </div>
                                    ) : (<span className='ml-3'>File Tidak Ada</span>)}
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">scan kip</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className={`btn btn-sm w-full btn-primary cursor-pointer mb-2 ${prevKip ? '' : 'hidden'}`} onClick={() => openImage(prevKip, 'KIP_')}>Detail</button>
                                    <a className={`btn btn-sm btn-primary w-full mb-2 ${prevKip ? '' : 'hidden'}`} download={'KIP_' + namanya} href={`data:image/png;base64,${prevKip}`}>download</a>
                                </div>
                                <div className="avatar">
                                    {prevKip ? (
                                        <div className="w-full rounded">
                                            <img src={`data:;base64,${prevKip}`} />
                                        </div>
                                    ) : (<span className='ml-3'>File Tidak Ada</span>)}
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">QR Code</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className={`btn btn-sm w-full btn-primary cursor-pointer mb-2 ${prevQrCode ? '' : 'hidden'}`} onClick={() => openImage(prevQrCode, 'QR_')}>Detail</button>
                                    <a className={`btn btn-sm btn-primary w-full mb-2 ${prevQrCode ? '' : 'hidden'}`} download={'QR_' + namanya} href={`data:image/png;base64,${prevQrCode}`}>download</a>
                                </div>
                                <div className="avatar">
                                    {prevQrCode ? (
                                        <div className="w-full rounded">
                                            <img src={`data:;base64,${prevQrCode}`} />
                                        </div>
                                    ) : (<span className='ml-3'>File Tidak Ada</span>)}
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">Scan KTM</span>
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className={`btn btn-sm w-full btn-primary cursor-pointer mb-2 ${prevKtm ? '' : 'hidden'}`} onClick={() => openImage(prevKtm, 'KTM_')}>Detail</button>
                                    <a className={`btn btn-sm btn-primary w-full mb-2 ${prevKtm ? '' : 'hidden'}`} download={'KTM_' + namanya} href={`data:image/png;base64,${prevKtm}`}>download</a>
                                </div>
                                <div className="avatar drop-shadow-lg">
                                    {prevKtm ? (
                                        <div className="w-full rounded drop-shadow-lg">
                                            <img src={`data:;base64,${prevKtm}`} />
                                        </div>
                                    ) : (<span className='ml-3'>File Tidak Ada</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailMhs