import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom"
import { FaTimes, FaReply, FaArrowRight, FaArrowLeft, FaMale, FaFemale } from "react-icons/fa"
import axios from 'axios'
import Swal from "sweetalert2"

const FormMhs4 = () => {
    const [Pekerjaan, setPekerjaan] = useState([])
    const [Penghasilan, setPenghasilan] = useState([])
    const [Pendidikan, setPendidikan] = useState([])
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [namanya, setNamanya] = useState("")
    const [nikWali, setNikWali] = useState("")
    const [namaWali, setNamaWali] = useState("")
    const [tgWali, setTgWali] = useState("")
    const [blWali, setBlWali] = useState("")
    const [thWali, setThWali] = useState("")
    const [pkrjnWali, setPkrjnWali] = useState("")
    const [pndptWali, setPndptWali] = useState("")
    const [pndknWali, setPndknWali] = useState("")
    const [jenjangnya, setJenjangnya] = useState("")
    const [fakultasnya, setFakultasnya] = useState("")
    const [prodinya, setProdinya] = useState("")
    const [semester, setSemester] = useState("")
    const navigate = useNavigate()
    const { idMhs } = useParams()
    const { stat } = useParams()

    useEffect(() => {
        const getMhsById = async () => {
            try {
                if (stat === "edit") {
                    const response = await axios.get(`v1/mahasiswa/getById/${idMhs}`)
                    let tglLahirWali = response.data.data.tanggal_lahir_wali
                    const tglWali = tglLahirWali.split("-")
                    setNamanya(response.data.data.nama)
                    setNikWali(response.data.data.nik_wali)
                    setNamaWali(response.data.data.nama_wali)
                    setTgWali(tglWali[2])
                    setBlWali(tglWali[1])
                    setThWali(tglWali[0])
                    setPkrjnWali(response.data.data.pekerjaan_wali)
                    setPndptWali(response.data.data.penghasilan_wali)
                    setPndknWali(response.data.data.pendidikan_wali)
                    setJenjangnya(response.data.data.code_jenjang_pendidikan)
                    setFakultasnya(response.data.data.code_fakultas)
                    setProdinya(response.data.data.code_prodi)
                    setSemester(response.data.data.mulai_semester)
                } else {
                    const response = await axios.get(`v1/mahasiswa/getByCreateFirst/${idMhs}`)
                    let tglLahirWali = response.data.data.tanggal_lahir_wali
                    const tglWali = tglLahirWali.split("-")
                    setNamanya(response.data.data.nama)
                    setNikWali(response.data.data.nik_wali)
                    setNamaWali(response.data.data.nama_wali)
                    setTgWali(tglWali[2])
                    setBlWali(tglWali[1])
                    setThWali(tglWali[0])
                    setPkrjnWali(response.data.data.pekerjaan_wali)
                    setPndptWali(response.data.data.penghasilan_wali)
                    setPndknWali(response.data.data.pendidikan_wali)
                    setJenjangnya(response.data.data.code_jenjang_pendidikan)
                    setFakultasnya(response.data.data.code_fakultas)
                    setProdinya(response.data.data.code_prodi)
                    setSemester(response.data.data.mulai_semester)
                }
            } catch (error) {

            }
        }
        getMhsById()
    }, [idMhs])

    useEffect(() => {
        getPekerjaan()
        getPenghasilan()
        getPendidikan()
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getFakultasByJenjang()
    }, [jenjangnya])

    useEffect(() => {
        getProdiByFakultas()
    }, [fakultasnya])

    const tg = []
    for (let tanggal = 1; tanggal < 32; tanggal++) {
        if (tanggal < 10) {
            tg.push(<option key={tanggal} value={"0" + tanggal}>{"0" + tanggal}</option>)
        } else {
            tg.push(<option key={tanggal} value={tanggal}>{tanggal}</option>)
        }
    }

    const namaBulan = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    const bl = []
    for (let bulan = 1; bulan < 13; bulan++) {
        if (bulan < 10) {
            bl.push(<option key={bulan} value={"0" + bulan}>{namaBulan[bulan]}</option>)
        } else {
            bl.push(<option key={bulan} value={bulan}>{namaBulan[bulan]}</option>)
        }
    }

    const d = new Date()
    let year = d.getFullYear()
    const th = []
    for (let tahun = 1900; tahun <= year; tahun++) {
        th.push(<option key={tahun} value={tahun}>{tahun}</option>)
    }

    const getPekerjaan = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/pekerjaan/all')
        setPekerjaan(response.data.data)
    }

    const getPenghasilan = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/penghasilan/all')
        setPenghasilan(response.data.data)
    }

    const getPendidikan = async () => {
        const response = await axios.get('v1/equipmentDsnMhs/pendidikan/all')
        setPendidikan(response.data.data)
    }

    const getJenjangPendidikan = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all')
        setJenjang(response.data.data)
    }

    const getFakultasByJenjang = async () => {
        if (jenjangnya != 0) {
            const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${jenjangnya}`)
            setFakultas(response.data.data)
        }
    }

    const sm = []
    for (let smester = 1; smester < 9; smester++) {
        sm.push(<option key={smester} value={"semester " + smester}>{"Semester " + smester}</option>)
    }

    const getProdiByFakultas = async () => {
        if (fakultasnya != 0) {
            const response = await axios.get(`v1/prodi/getProdiByFakultas/${fakultasnya}`)
            setProdi(response.data.data)
        }
    }

    const simpanMhs = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/mahasiswa/createForm4/${idMhs}`, {
                nik_wali: nikWali,
                nama_wali: namaWali,
                tahun_w: thWali,
                bulan_w: blWali,
                tanggal_w: tgWali,
                pekerjaan_wali: pkrjnWali,
                penghasilan_wali: pndptWali,
                pendidikan_wali: pndknWali,
                code_jenjang_pendidikan: jenjangnya,
                code_fakultas: fakultasnya,
                code_prodi: prodinya,
                mulai_semester: semester
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate("/mahasiswa")
                });
            })
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const batal = (mhsId) => {
        Swal.fire({
            title: "Batalkan ini?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, batalkan!',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(
                        `v1/mahasiswa/delete/${mhsId}`
                    ).then((response) => {
                        console.log(response.data)
                        Swal.fire({
                            title: "Dibatalkan",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            navigate("/mahasiswa")
                        });
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div>
            <div className='container mt-2'>
                <section className='mb-5'>
                    <h1 className='text-xl font-bold'>Detail Wali {namanya && <span>Ananda <span className='text-red-500'>{namanya}</span></span>}</h1>
                </section>
                <section>
                    <div className="card bg-base-100 card-bordered shadow-md mb-36">
                        <div className="card-body p-4">
                            <form onSubmit={simpanMhs}>
                                <div className='grid lg:grid-cols-3 gap-4'>
                                    <div className='lg:col-span-3'>
                                        <button type='button' className='btn btn-default btn-sm mr-1'><FaMale /><span> salin data ayah</span></button>
                                        <button type='button' className='btn btn-default btn-sm'><FaFemale /><span> salin data ibu</span></button>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">NIK Wali</span>
                                        </label>
                                        <input type="number" value={nikWali} onChange={(e) => setNikWali(e.target.value)} placeholder="Masukkan NIK Wali" className="input input-sm input-bordered w-full" />
                                    </div>
                                    <div className='lg:col-span-2'>
                                        <label className="label">
                                            <span className="text-base label-text">Nama Wali</span>
                                        </label>
                                        <input type="text" value={namaWali} onChange={(e) => setNamaWali(e.target.value)} placeholder="Masukkan Nama Wali" className="input input-sm input-bordered w-full" />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Tanggal Lahir Wali</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={tgWali} onChange={(e) => setTgWali(e.target.value)}>
                                            <option value="">Tanggal Lahir Wali</option>
                                            {tg}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Bulan Lahir Wali</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={blWali} onChange={(e) => setBlWali(e.target.value)}>
                                            <option value="">Bulan Lahir Wali</option>
                                            {bl}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Tahun Lahir Wali</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={thWali} onChange={(e) => setThWali(e.target.value)}>
                                            <option value="">Tahun Lahir Wali</option>
                                            {th}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Pekerjaan Wali</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={pkrjnWali} onChange={(e) => setPkrjnWali(e.target.value)}>
                                            <option value="">Pekerjaan Wali</option>
                                            {Pekerjaan.map((item) => (
                                                <option key={item.id_pekerjaan} value={item.code_pekerjaan}>{item.nama_pekerjaan}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Penghasilan Wali</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={pndptWali} onChange={(e) => setPndptWali(e.target.value)}>
                                            <option value="">Penghasilan Wali</option>
                                            {Penghasilan.map((item) => (
                                                <option key={item.id_penghasilan} value={item.code_penghasilan}>{item.nama_penghasilan}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Pendidikan Wali</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={pndknWali} onChange={(e) => setPndknWali(e.target.value)}>
                                            <option value="">Pendidikan Wali</option>
                                            {Pendidikan.map((item) => (
                                                <option key={item.id_pendidikan} value={item.code_pendidikan}>{item.nama_pendidikan}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='lg:col-span-3'>
                                        <hr />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Jenjang Pendidikan Yang akan ditempuh</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={jenjangnya} onChange={(e) => setJenjangnya(e.target.value)}>
                                            <option value="">Jenjang Pendidikan</option>
                                            {Jenjang.map((item) => (
                                                <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Fakultas Yang akan ditempuh</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={fakultasnya} onChange={(e) => setFakultasnya(e.target.value)}>
                                            <option value="">Fakultas</option>
                                            {Fakultas.map((item) => (
                                                <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">Prodi Yang akan ditempuh</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={prodinya} onChange={(e) => setProdinya(e.target.value)}>
                                            <option value="">Prodi</option>
                                            {Prodi.map((item) => (
                                                <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='lg:col-span-2'>
                                        <label className="label">
                                            <span className="text-base label-text">Masuk Mulai Semester</span>
                                        </label>
                                        <select className='select select-bordered select-sm w-full' value={semester} onChange={(e) => setSemester(e.target.value)}>
                                            <option value="">Mulai Semester</option>
                                            {sm}
                                        </select>
                                    </div>
                                </div>
                                <div className='mt-5 grid lg:grid-cols-2'>
                                    <div className='col-span-2 mb-5'>
                                        <hr />
                                    </div>
                                    <div>
                                        {stat == "add" ? <button type='button' className='btn btn-sm btn-danger' onClick={() => batal(idMhs)}><FaTimes /> <span className="ml-1">Batal</span></button> : <Link to="/mahasiswa" className='btn btn-sm btn-danger'><FaReply /> <span className='ml-1'>Kembali Ke Data Mahasiswa</span></Link>}
                                    </div>
                                    <div>
                                        <div className='grid lg:grid-flow-col gap-1 float-right'>
                                            <div>
                                                <Link to={`/mahasiswa/form3/${stat}/${idMhs}`} className='btn btn-sm btn-blue w-full'><FaArrowLeft /><span className="ml-1">Kembali</span></Link>
                                            </div>
                                            <div className='lg:pl-1'>
                                                <button className='btn btn-sm btn-blue w-full'><span className="mr-1">Simpan dan lanjut</span><FaArrowRight /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FormMhs4