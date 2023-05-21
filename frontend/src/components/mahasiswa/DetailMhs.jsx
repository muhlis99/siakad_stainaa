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
        fotoKk()
        fotoKtp()
        fotoIjazah()
        fotoKip()
    }, [fotos, kks, ktps, ijazahs, kips])

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

    function randomNumberInRange(length) {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        let counter = 0
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
            counter += 1
        }
        return result
    }

    const openImage = (img) => {
        document.getElementById('my-modal').checked = true
        setModal(img)
        setNameFile(randomNumberInRange(15))
    }

    return (
        <div className="container mt-3">
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <div className='w-full'>
                        <a className='btn btn-sm btn-blue w-full mb-2' download={nameFile} href={`data:image/png;base64,${modal}`}>download</a>
                    </div>
                    <div className='avatar'>
                        <div className="w-full  rounded ring ring-[#2D7F5F]">
                            <img src={`data:;base64,${modal}`} alt="" />
                        </div>
                    </div>
                </label>
            </label>

            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <Link to="/mahasiswa" className='btn btn-sm btn-danger w-32 mb-2'><FaReply /><span className='ml-1'>Kembali</span></Link>
                        <div className='grid lg:grid-cols-2'>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>NIm</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{nim}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>NIK</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{nik}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>NO KK</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{kk}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>NAMA</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{namanya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>tempat lahir</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{tmp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>tanggal lahir</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{tgl + "-" + bln + "-" + thn}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>jenis kelamin</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{jenkel == "l" ? "laki-laki" : "perempuan"}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>email</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>{email}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>no hp</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>{nohp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>No telepon</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>{notelp}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>nisn</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{nisn}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>Penerima KPS</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{pkps}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>no kps</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{nokps}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>npwp</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{npwp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>Jalur Pendaftaran</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{jalurp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>jenis pendaftaran</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{jenisp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>jenjang pendidikan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{jenjangnya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>fakultas</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{fakultasnya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>prodi</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{prodinya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>mulai semester</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{semester}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mt-2'><h1 className='uppercase font-bold text-3xl '>detail alamat</h1></div>
                        <hr className='w-full' />
                        <div className="grid lg:grid-cols-2">
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>jalan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{jalan}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>Dusun</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{dusun} {"rt " + rt}/{"rw " + rw}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>kode pos</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{kodepos}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>Jenis tinggal</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{jenting}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>alat transportasi</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{alat}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>desa</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{desanya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>kecamatan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{kecamatannya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>Kabupaten</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{kabupatennya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>provinsi</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{provinsinya}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>negara</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{negaranya}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mt-2'><h1 className='uppercase font-bold text-3xl '>detail orang tua</h1></div>
                        <hr className='w-full' />
                        <div className="grid lg:grid-cols-2">
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colSpan={3} className='text-center'><span className='text-md font-bold uppercase'>data ayah</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>nik </span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{nikAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>nama </span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{namaAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>tanggal lahir</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{tgAyah + "-" + blAyah + "-" + thAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>pekerjaan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{pkrjnAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>penghasilan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{pndptAyah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>pendidikan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{pndknAyah}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td colSpan={3} className='text-center'><span className='text-md font-bold uppercase'>data ibu</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>nik </span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{nikIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>nama </span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{namaIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>tanggal lahir</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{tgIbu + "-" + blIbu + "-" + thIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>pekerjaan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{pkrjnIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>penghasilan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{pndptIbu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>pendidikan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{pndknIbu}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mt-2'><h1 className='uppercase font-bold text-3xl '>detail wali</h1></div>
                        <hr className='w-full' />
                        <div className="grid lg:grid-cols-2">
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>nik </span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{nikWali}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>nama </span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{namaWali}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>tanggal lahir</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>{tgWali + "-" + blWali + "-" + thWali}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>pekerjaan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{pkrjnWali}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>penghasilan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{pndptWali}</span></td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'><span className='text-md font-bold uppercase'>pendidikan</span></td>
                                            <td className='py-1'><span className='text-md font-bold'>&nbsp;:&nbsp;</span></td>
                                            <td className='py-1'><span className='text-md font-bold uppercase text-red-500'>{pndknWali}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='mt-2'><h1 className='uppercase font-bold text-3xl '>detail berkas</h1></div>
                        <hr className='w-full' />
                        <div className="grid lg:grid-cols-3 gap-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">foto mahasiswa</span>
                                </label>
                                <button className='btn btn-sm w-full btn-blue cursor-pointer mb-2' onClick={() => openImage(prevFoto)}>Detail</button>
                                <div className="avatar">
                                    <div className="w-full  rounded ring ring-[#2D7F5F]">
                                        {prevFoto ? (
                                            <img src={`data:;base64,${prevFoto}`} />
                                        ) : ("")}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">scan kartu keluarga</span>
                                </label>
                                <button className='btn btn-sm w-full btn-blue cursor-pointer mb-2' onClick={() => openImage(prevKk)}>Detail</button>
                                <div className="avatar">
                                    <div className="w-full rounded ring ring-[#2D7F5F]">
                                        {prevKk ? (
                                            <img src={`data:;base64,${prevKk}`} />
                                        ) : ("")}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">scan ktp</span>
                                </label>
                                <button className='btn btn-sm w-full btn-blue cursor-pointer mb-2' onClick={() => openImage(prevKtp)}>Detail</button>
                                <div className="avatar">
                                    <div className="w-full rounded ring ring-[#2D7F5F]">
                                        {prevKtp ? (
                                            <img src={`data:;base64,${prevKtp}`} />
                                        ) : ("")}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">scan ijazah</span>
                                </label>
                                <button className='btn btn-sm w-full btn-blue cursor-pointer mb-2' onClick={() => openImage(prevIjazah)}>Detail</button>
                                <div className="avatar">
                                    <div className="w-full rounded ring ring-[#2D7F5F]">
                                        {prevIjazah ? (
                                            <img src={`data:;base64,${prevIjazah}`} />
                                        ) : ("")}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text uppercase font-bold">scan kip</span>
                                </label>
                                <button className='btn btn-sm w-full btn-blue cursor-pointer mb-2' onClick={() => openImage(prevKip)}>Detail</button>
                                <div className="avatar">
                                    <div className="w-full rounded ring ring-[#2D7F5F]">
                                        {prevKip ? (
                                            <img src={`data:;base64,${prevKip}`} />
                                        ) : ("")}
                                    </div>
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