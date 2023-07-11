import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaReply, FaSave } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

const FormEditMataKuliah = () => {
    const [Tahun, setTahun] = useState([])
    const [Program, setProgram] = useState([])
    const [idProdi, setIdProdi] = useState("")
    const [namaMakul, setNamaMakul] = useState("")
    const [jenisMakul, setJenisMakul] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [sks, setSks] = useState("")
    const [sksPraktek, setSksPraktek] = useState("")
    const [sksPrakLapangan, setSksPrakLapangan] = useState("")
    const [sksSimulasi, setSksSimulasi] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [tglAktif, setTglAktif] = useState("")
    const [tglNonAktif, setTglNonAktif] = useState("")
    const { idMakul } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getMakulById = async () => {
            try {
                const response = await axios.get(`v1/mataKuliah/getById/${idMakul}`)
                setNamaMakul(response.data.data.nama_mata_kuliah)
                setJenisMakul(response.data.data.jenis_mata_kuliah)
                setKodeTahun(response.data.data.code_tahun_ajaran)
                setSks(response.data.data.sks)
                setSksPraktek(response.data.data.sks_praktek)
                setSksPrakLapangan(response.data.data.sks_prak_lapangan)
                setSksSimulasi(response.data.data.sks_simulasi)
                setIdProdi(response.data.data.prodis[0].id_prodi)
                setTglAktif(response.data.data.tanggal_aktif)
                setTglNonAktif(response.data.data.tanggal_non_aktif)
            } catch (error) {

            }
        }
        getMakulById()
    }, [idMakul])

    useEffect(() => {
        getTahunAjaran()
        getProdi()
    }, [])

    useEffect(() => {
        getProdiById()
    }, [idProdi])

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getProdi = async () => {
        const response = await axios.get('v1/prodi/all')
        setProgram(response.data.data)
    }

    const getProdiById = async () => {
        if (idProdi != 0) {
            const response = await axios.get(`v1/prodi/getById/${idProdi}`)
            setKodeJenjang(response.data.data.code_jenjang_pendidikan)
            setKodeFakultas(response.data.data.code_fakultas)
            setKodeProdi(response.data.data.code_prodi)
        }
    }

    const updateMakul = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/mataKuliah/update/${idMakul}`, {
                nama_mata_kuliah: namaMakul,
                jenis_mata_kuliah: jenisMakul,
                code_jenjang_pendidikan: kodeJenjang,
                code_fakultas: kodeFakultas,
                code_prodi: kodeProdi,
                code_tahun_ajaran: kodeTahun,
                sks: sks,
                sks_praktek: sksPraktek,
                sks_prak_lapangan: sksPrakLapangan,
                sks_simulasi: sksSimulasi,
                tanggal_aktif: tglAktif,
                tanggal_non_aktif: tglNonAktif
            }).then(function (response) {
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate("/matakuliah")
                })
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

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Edit Mata Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={updateMakul}>
                            <div className="grid lg:grid-cols-4 gap-4">
                                <div className='lg:col-span-2'>
                                    <label className="label">
                                        <span className="text-base label-text">Nama Mata Kuliah</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Nama Mata Kuliah" className="input input-sm input-bordered w-full" value={namaMakul} onChange={(e) => setNamaMakul(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Jenis Mata Kuliah</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Jenis Mata Kuliah" className="input input-sm input-bordered w-full" value={jenisMakul} onChange={(e) => setJenisMakul(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tahun Ajaran</span>
                                    </label>
                                    <select className="select select-bordered select-sm w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                        <option value="">Tahun Ajaran</option>
                                        {Tahun.map((item) => (
                                            <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='lg:col-span-4 grid lg:grid-cols-4 gap-4'>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">SKS</span>
                                        </label>
                                        <input type="number" placeholder="Diisi Dengan Angka" className="input input-sm input-bordered w-full" value={sks} onChange={(e) => setSks(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">SKS Praktek</span>
                                        </label>
                                        <input type="number" placeholder="Diisi Dengan Angka" className="input input-sm input-bordered w-full" value={sksPraktek} onChange={(e) => setSksPraktek(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">SKS Praktek Lapangan</span>
                                        </label>
                                        <input type="number" placeholder="Diisi Dengan Angka" className="input input-sm input-bordered w-full" value={sksPrakLapangan} onChange={(e) => setSksPrakLapangan(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text">SKS Simulasi</span>
                                        </label>
                                        <input type="number" placeholder="Diisi Dengan Angka" className="input input-sm input-bordered w-full" value={sksSimulasi} onChange={(e) => setSksSimulasi(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Prodi</span>
                                    </label>
                                    <select className="select select-bordered select-sm w-full" value={idProdi} onChange={(e) => setIdProdi(e.target.value)}>
                                        <option value="">Prodi</option>
                                        {Program.map((item) => (
                                            <option key={item.id_prodi} value={item.id_prodi}>{item.nama_prodi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tanggal Aktif</span>
                                    </label>
                                    <input type="date" className="input input-sm input-bordered w-full" value={tglAktif} onChange={(e) => setTglAktif(e.target.value)} />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Tanggal Non Aktif</span>
                                    </label>
                                    <input type="date" className="input input-sm input-bordered w-full" value={tglNonAktif} onChange={(e) => setTglNonAktif(e.target.value)} />
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-5'>
                                    <hr />
                                </div>
                                <div>
                                    <Link to='/matakuliah' className='btn btn-sm btn-danger'><FaReply /> <span className="ml-1">Kembali</span></Link>
                                </div>
                                <div>
                                    <div className='grid lg:grid-flow-col gap-1 float-right'>
                                        <div className='lg:pl-1'>
                                            <button className='btn btn-sm btn-blue w-full'><FaSave /><span className="ml-1">Simpan </span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormEditMataKuliah