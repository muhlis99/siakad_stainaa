import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaReply, FaSave } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'

const FormEditMataKuliah = () => {
    const [Tahun, setTahun] = useState([])
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Program, setProgram] = useState([])
    const [kodeMk, setKodeMk] = useState("")
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
                setKodeMk(response.data.data.code_mata_kuliah)
                setNamaMakul(response.data.data.nama_mata_kuliah)
                setJenisMakul(response.data.data.jenis_mata_kuliah)
                setKodeTahun(response.data.data.code_tahun_ajaran)
                setSks(response.data.data.sks)
                setSksPraktek(response.data.data.sks_praktek)
                setSksPrakLapangan(response.data.data.sks_prak_lapangan)
                setSksSimulasi(response.data.data.sks_simulasi)
                setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                setKodeFakultas(response.data.data.code_fakultas)
                setKodeProdi(response.data.data.code_prodi)
                setTglAktif(response.data.data.tanggal_aktif)
                setTglNonAktif(response.data.data.tanggal_non_aktif)
            } catch (error) {

            }
        }
        getMakulById()
    }, [idMakul])

    useEffect(() => {
        getTahunAjaran()
        getJenjang()
    }, [])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getJenjang = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all')
        setJenjang(response.data.data)
    }

    const getFakultas = async () => {
        if (kodeJenjang != 0) {
            const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
            setFakultas(response.data.data)
        }
    }

    const getProdi = async () => {
        if (kodeFakultas != 0) {
            const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
            setProgram(response.data.data)
        }
    }

    const updateMakul = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`v1/mataKuliah/update/${idMakul}`, {
                code_mata_kuliah: kodeMk,
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
                    navigate("/matakuliah", { state: { collaps: 'kuliah', activ: '/matakuliah' } })
                })
            })
        } catch (error) {
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: 'error'
                })
            }
        }
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Edit Mata Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2 rounded-md">
                    <div className="card-body p-4">
                        <form onSubmit={updateMakul}>
                            <div className="grid lg:grid-cols-2 gap-4">
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Kode Mata Kuliah</span>
                                    </label>
                                    <input type="text" placeholder="Kode Mata Kuliah" className="input input-sm input-bordered w-full" value={kodeMk} onChange={(e) => setKodeMk(e.target.value)} />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Nama Mata Kuliah</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Nama Mata Kuliah" className="input input-sm input-bordered w-full" value={namaMakul} onChange={(e) => setNamaMakul(e.target.value)} />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Jenis Mata Kuliah</span>
                                    </label>
                                    <input type="text" placeholder="Masukkan Jenis Mata Kuliah" className="input input-sm input-bordered w-full" value={jenisMakul} onChange={(e) => setJenisMakul(e.target.value)} />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">SKS</span>
                                    </label>
                                    <input type="number" placeholder="Diisi Dengan Angka" className="input input-sm input-bordered w-full" value={sks} onChange={(e) => setSks(e.target.value)} />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">SKS Praktek</span>
                                    </label>
                                    <input type="number" placeholder="Diisi Dengan Angka" className="input input-sm input-bordered w-full" value={sksPraktek} onChange={(e) => setSksPraktek(e.target.value)} />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">SKS Praktek Lapangan</span>
                                    </label>
                                    <input type="number" placeholder="Diisi Dengan Angka" className="input input-sm input-bordered flex-initial w-full" value={sksPrakLapangan} onChange={(e) => setSksPrakLapangan(e.target.value)} />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">SKS Simulasi</span>
                                    </label>
                                    <input type="number" placeholder="Diisi Dengan Angka" className="input input-sm input-bordered w-full" value={sksSimulasi} onChange={(e) => setSksSimulasi(e.target.value)} />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Tahun Ajaran</span>
                                    </label>
                                    <select className="select select-bordered select-sm w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                        <option value="">Tahun Ajaran</option>
                                        {Tahun.map((item) => (
                                            <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Jenjang Pendidikan</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                        <option value="">Jenjang Pendidikan</option>
                                        {Jenjang.map((item) => (
                                            <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Fakultas</span>
                                    </label>
                                    <select className="select select-sm select-bordered w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                        <option value="">Fakultas</option>
                                        {Fakultas.map((item) => (
                                            <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Prodi</span>
                                    </label>
                                    <select className="select select-bordered select-sm w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                        <option value="">Prodi</option>
                                        {Program.map((item) => (
                                            <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Tanggal Aktif</span>
                                    </label>
                                    <input type="date" className="input input-sm input-bordered w-full" value={tglAktif} onChange={(e) => setTglAktif(e.target.value)} />
                                </div>
                                <div className='flex gap-2'>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Tanggal Non Aktif</span>
                                    </label>
                                    <input type="date" className="input input-sm input-bordered w-full" value={tglNonAktif} onChange={(e) => setTglNonAktif(e.target.value)} />
                                </div>
                            </div>
                            <div className='mt-5 grid lg:grid-cols-2'>
                                <div className='col-span-2 mb-5'>
                                    <hr />
                                </div>
                                <div>
                                    <Link to="/matakuliah" state={{ collaps: 'kuliah', activ: '/matakuliah' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply /> <span>Kembali</span></Link>
                                </div>
                                <div>
                                    <div className='grid lg:grid-flow-col gap-1 float-right'>
                                        <div className='lg:pl-1'>
                                            <button className='btn btn-sm btn-primary w-full capitalize rounded-md'><FaSave /><span>update </span></button>
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