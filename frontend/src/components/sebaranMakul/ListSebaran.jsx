import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTimes, FaSave } from 'react-icons/fa'
import { Link } from 'react-router-dom'
// import { AutoComplete } from "primereact/autocomplete"
import axios from 'axios'
import Swal from 'sweetalert2'

const ListSebaran = () => {
    const [Program, setProgram] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [ListNilai, setListNilai] = useState([])
    const [Makul, setMakul] = useState([])
    const [smt, setSmt] = useState([])
    const [Sebaran, SetSebaran] = useState([])
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeMakul, setKodeMakul] = useState("")
    const [kodeSmt, setKodeSmt] = useState("")
    const [kodeNilai, setKodeNilai] = useState("")
    const [statusBobot, setStatusBobot] = useState("")
    const [status, setStatus] = useState("")
    const [statusMk, setStatusMk] = useState(true)
    const [paket, setPaket] = useState(false)
    const [id, setId] = useState("")
    const [jenis, setJenis] = useState("")
    const [nama, setNama] = useState("")
    const [sks, setSks] = useState("")


    useEffect(() => {
        getProdiAll()
        getDataSemester()
        getKategoriNilai()
        getMakulAll()
        getTahunAjaran()

        if (statusMk === true) {
            setStatusBobot("wajib")
        } else {
            setStatusBobot("tidak_wajib")
        }

        if (paket === false) {
            setStatus("pilih_sendiri")
        } else {
            setStatus("paket")
        }
    }, [statusMk, paket])

    useEffect(() => {
        getCodeSemester()
    }, [Semester])

    useEffect(() => {
        sebaranMakul()
    }, [kodeProdi, kodeTahun])

    const getProdiAll = async () => {
        const response = await axios.get('v1/prodi/all')
        setProgram(response.data.data)
    }

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getDataSemester = async () => {
        const response = await axios.get(`v1/semester/all`)
        setSemester(response.data.data)
    }

    const getCodeSemester = () => {
        setSmt(
            Semester.map(item => (
                item.code_semester
            ))
        )
    }

    const getKategoriNilai = async () => {
        const response = await axios.get(`v1/kategoriNilai/all`)
        setListNilai(response.data.data)
    }

    const getMakulAll = async () => {
        const response = await axios.get(`v1/mataKuliah/all`)
        setMakul(response.data.data)
    }

    const simpanSebaran = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/sebaranMataKuliah/create', {
                id_mata_kuliah: kodeMakul,
                code_semester: kodeSmt,
                code_kategori_nilai: kodeNilai,
                status_bobot_makul: statusBobot,
                status_makul: status,
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    setKodeMakul("")
                    setKodeSmt("")
                    setKodeNilai("")
                    setStatus(false)
                    sebaranMakul()
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

    const sebaranMakul = async () => {
        const response = await axios.get(`v1/sebaranMataKuliah/all?sebaranProdi=${kodeProdi}&sebaranTahunAjaran=${kodeTahun}`)
        SetSebaran(response.data.data)
    }

    useEffect(() => {
        getMakulById()
    }, [])

    const getMakulById = async (e) => {
        try {
            const response = await axios.get(`v1/sebaranMataKuliah/getById/1`)
            setId(response.data.data.id_mata_kuliah)
            setNama(response.data.data.nama_mata_kuliah)
            setJenis(response.data.data.jenis_mata_kuliah)
            setKodeProdi(response.data.data.prodis[0].nama_prodi)
            setKodeSmt(response.data.data.semesters[0].semesters)
            setSks(response.data.data.sks)
        } catch (error) {

        }
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" checked id="my-modal-add" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <button className="btn btn-xs btn-circle btn-danger absolute right-2 top-2"><FaTimes /></button>
                    <h3 className="font-bold text-xl">Detail</h3>
                    <hr className='my-3' />
                    <div className='grid grid-cols-2 mb-4'>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Mata Kuliah</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{nama}</td>
                                    </tr>
                                    <tr>
                                        <td>Jenis Mata Kuliah</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{jenis}</td>
                                    </tr>
                                    <tr>
                                        <td>Prodi</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{kodeProdi}</td>
                                    </tr>
                                    <tr>
                                        <td>Semester</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>Semester {kodeSmt}</td>
                                    </tr>
                                    <tr>
                                        <td>SKS</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{sks}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>SKS Praktek</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>SKS Prak Lapangan</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>SKS Simulasi</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Metode Pembelajaran</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Status Bobot</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>M h</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200 mt-1">
                        <input type="checkbox" className='p-2 min-h-0' />
                        <div className="collapse-title p-2 min-h-0">
                            <Link className='text-sm'><span>Edit</span></Link>
                        </div>
                        <div className="collapse-content grid gap-1">
                            <form >
                                <div className="py-4">

                                </div>
                                <div className="modal-action">
                                    <button type='submit' className="btn btn-sm btn-default"><FaSave /><span className='ml-1'>simpan</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Sebaran Mata Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid lg:grid-cols-2 gap-2">
                            <div className='flex gap-2'>
                                <label className="label">
                                    <span className="text-base label-text">Program Studi</span>
                                </label>
                                <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                    <option value="">Program Studi</option>
                                    {Program.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-2'>
                                <label className="label">
                                    <span className="text-base label-text">Tahun Ajaran</span>
                                </label>
                                <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <form onSubmit={simpanSebaran}>
                            <div className='flex gap-2'>
                                <div className='basis-1/4'>
                                    <label className="label">
                                        <span className="text-base label-text">Mata Kuliah</span>
                                    </label>
                                    <select className='mt-1 select select-sm select-bordered w-full max-w-[260px]' value={kodeMakul} onChange={(e) => setKodeMakul(e.target.value)}>
                                        <option value="">Mata Kuliah</option>
                                        {Makul.map((item) => (
                                            <option key={item.id_mata_kuliah} value={item.id_mata_kuliah}>{item.nama_mata_kuliah}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='basis-1/6'>
                                    <label className="label">
                                        <span className="text-base label-text">Semester</span>
                                    </label>
                                    <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeSmt} onChange={(e) => setKodeSmt(e.target.value)}>
                                        <option value="">Semester</option>
                                        {Semester.map((item) => (
                                            <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='basis-24'>
                                    <label className="label">
                                        <span className="text-base label-text">Nilai Min</span>
                                    </label>
                                    <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeNilai} onChange={(e) => setKodeNilai(e.target.value)}>
                                        <option value="">Nilai</option>
                                        {ListNilai.map((item) => (
                                            <option key={item.id_kategori_nilai} value={item.code_kategori_nilai}>{item.nilai_huruf} ({item.nilai_angka})</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="basis-2/5">
                                    <label className="label">
                                        <span className="text-base label-text">Opsi Tambahan</span>
                                    </label>
                                    <div className='flex gap-3'>
                                        <div className="form-control">
                                            <label className="cursor-pointer label">
                                                <input type="checkbox" checked={statusMk} onChange={(e) => setStatusMk(e.target.checked)} className="checkbox checkbox-sm checkbox-success mr-1" />
                                                <span className="label-text">MK Wajib</span>
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="cursor-pointer label">
                                                <input type="checkbox" checked={paket} onChange={(e) => setPaket(e.target.checked)} className="checkbox checkbox-sm checkbox-success mr-1" />
                                                <span className="label-text">Paket MK</span>
                                            </label>
                                        </div>
                                        <div>
                                            <button className='btn btn-sm btn-default'><FaPlus /><span className='ml-1'>Tambah</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-2 gap-4">
                            {Sebaran.map((item, index) => (
                                <div key={index + 1}>
                                    <div className="overflow-x-auto rounded-md">
                                        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                                            <thead className='text-gray-700 bg-[#F2F2F2]'>
                                                <tr>
                                                    <th scope="col" className="px-2 py-2 border" colSpan="6">semester {item.semesters[0].semester}</th>
                                                </tr>
                                                <tr>
                                                    <th scope="col" className="px-2 py-2 border">#</th>
                                                    <th scope="col" className="px-2 py-2 border">Kode</th>
                                                    <th scope="col" className="px-2 py-2 border">Mata Kuliah</th>
                                                    <th scope="col" className="px-2 py-2 border">SKS</th>
                                                    <th scope="col" className="px-2 py-2 border">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='bg-white border text-gray-500' >
                                                    <th scope="row" className="px-2 py-2 border font-medium whitespace-nowrap">{index + 1}</th>
                                                    <td className='px-2 py-2 border' align='center'>{item.code_mata_kuliah}</td>
                                                    <td className='px-2 py-2 border'>{item.nama_mata_kuliah}</td>
                                                    <td className='px-2 py-2 border' align='center'>{item.sks}</td>
                                                    <td className='px-2 py-2 border' align='center'>
                                                        <div>
                                                            <button onClick={() => getMakulById(item.id_mata_kuliah)} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="3" className='px-2 py-2 border'>Total SKS</td>
                                                    <td colSpan="2" className='px-2 py-2 border' align='center'></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default ListSebaran