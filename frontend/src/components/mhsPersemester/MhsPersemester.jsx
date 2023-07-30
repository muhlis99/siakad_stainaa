import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FaClosedCaptioning, FaCog, FaExpandArrowsAlt, FaSave, FaTimes } from 'react-icons/fa'

const MhsPersemester = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [TahunNew, setTahunNew] = useState([])
    const [Semester, setSemester] = useState([])
    const [SemesterNew, setSemesterNew] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeTahunNew, setKodeTahunNew] = useState("")
    const [kodeSemesterOld, setKodeSemesterOld] = useState("")
    const [kodeSemesterNew, setKodeSemesterNew] = useState("")
    const [button, setButton] = useState("")
    const [smt, setSmt] = useState("")

    useEffect(() => {
        getJenjang()
        getTahunAjaran()
    }, [])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getSemesterNew()
    }, [kodeTahunNew])

    useEffect(() => {
        getFakultasByJenjang()
    }, [kodeJenjang])

    useEffect(() => {
        getProdiByFakultas()
    }, [kodeFakultas])

    useEffect(() => {
        getMhsBySemester()
    }, [kodeFakultas, kodeJenjang, kodeProdi, kodeSemesterOld, kodeTahun])

    const getJenjang = async () => {
        const response = await axios.get('v1/jenjangPendidikan/all')
        setJenjang(response.data.data)
    }

    const getFakultasByJenjang = async () => {
        if (kodeJenjang != 0) {
            const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
            setFakultas(response.data.data)
        }
    }

    const getProdiByFakultas = async () => {
        if (kodeFakultas != 0) {
            const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
            setProdi(response.data.data)
        }
    }

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
        setTahunNew(response.data.data)
    }

    const getSemester = async () => {
        if (kodeTahun != 0) {
            const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
            setSemester(response.data.data)
        }
    }

    const getSemesterNew = async () => {
        if (kodeTahunNew != 0) {
            const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahunNew}`)
            setSemesterNew(response.data.data)
        }
    }

    const getMhsBySemester = async () => {
        if (kodeFakultas != 0 & kodeJenjang != 0 & kodeProdi != 0 & kodeSemesterOld != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/setMahasiswaSmt/all/${kodeTahun}/${kodeSemesterOld}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
            setMahasiswa(response.data.data)
            setButton(response.data.data.length)
            setSmt(kodeSemesterOld.substring(7, 8))
        }
    }

    const modalOpen = () => {
        document.getElementById('my-modal').checked = true
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        setKodeSemesterNew("")
        setKodeTahunNew("")
    }

    const simpanSetMhs = async (e) => {
        e.preventDefault()
        try {
            if (kodeTahunNew == 0) {
                Swal.fire({
                    title: 'Tahun Ajaran Tidak Boleh Kosong',
                    icon: "error"
                })
            } else if (kodeSemesterNew == 0) {
                Swal.fire({
                    title: 'Semester Tidak Boleh Kosong',
                    icon: "error"
                })
            } else {
                await axios.post(`v1/setMahasiswaSmt/create`, {
                    codeSmtOld: kodeSemesterOld,
                    codeJnjPen: kodeJenjang,
                    codeFks: kodeFakultas,
                    codePrd: kodeProdi,
                    codeSmtNew: kodeSemesterNew,
                    codeThnAjrOld: kodeTahun,
                    codeThnAjrNew: kodeTahunNew
                }).then(function (response) {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getMhsBySemester()
                        modalClose()
                    });
                })
            }
        } catch (error) {
        }
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative p-0 rounded-none w-72">
                    <button className='btn btn-sm btn-square mb-2 btn-error rounded-none float-right' onClick={modalClose}><FaTimes /></button>
                    <form onSubmit={simpanSetMhs} className='p-2 mt-8'>
                        <select className="select select-sm select-bordered w-full mb-2" value={kodeTahunNew} onChange={(e) => setKodeTahunNew(e.target.value)}>
                            <option value="">Tahun Ajaran</option>
                            {Tahun.map((item) => (
                                <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                            ))}
                        </select>
                        <select className="select select-sm select-bordered w-full mb-2" value={kodeSemesterNew} onChange={(e) => setKodeSemesterNew(e.target.value)}>
                            <option value="">Semester</option>
                            {SemesterNew.map((item, index) => {
                                return item.semester - smt === 1 ? (
                                    <option key={index} value={item.code_semester}>Semester {item.semester}</option>
                                ) : (
                                    <option key={index} disabled hidden value={item.code_semester}>Semester {item.semester}</option>
                                )
                            })}
                        </select>
                        <button className='btn btn-sm btn-primary w-full'><FaSave /><span className="ml-1">simpan</span></button>
                    </form>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Set Mahasiswa Persemester</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-5 gap-1">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Jenjang Pendidikan</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                    <option value="">Jenjang Pendidikan</option>
                                    {Jenjang.map((item) => (
                                        <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Fakultas</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                    <option value="">Fakultas</option>
                                    {Fakultas.map((item) => (
                                        <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Prodi</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                    <option value="">Prodi</option>
                                    {Prodi.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Tahun Ajaran</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Semester</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeSemesterOld} onChange={(e) => setKodeSemesterOld(e.target.value)}>
                                    <option value="">Semester</option>
                                    {Semester.map((item) => (
                                        <option key={item.code_semester} value={item.code_semester}>Semester {item.semester}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 card-bordered shadow-md mt-2">
                    <div className="card-body p-4">
                        <div className='mb-2'>
                            {button > 0 ? <button className='btn btn-sm btn-primary float-right' onClick={modalOpen}><FaCog /><span className="ml-1">Set Mahasiswa</span></button> : ""}
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">NIM</th>
                                        <th scope="col" className="px-6 py-3">Nama</th>
                                        <th scope="col" className="px-6 py-3">Jenjang Pendidikan</th>
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className="px-6 py-3">Prodi</th>
                                        <th scope="col" className="px-6 py-3">Semester</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Mahasiswa.map((mhs, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">{index + 1}</th>
                                            <td className='px-6 py-2'>{mhs.mahasiswas[0].nim}</td>
                                            <td className='px-6 py-2'>{mhs.mahasiswas[0].nama}</td>
                                            <td className='px-6 py-2'>{mhs.jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2'>{mhs.fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2'>{mhs.prodis[0].nama_prodi}</td>
                                            <td className='px-6 py-2'>Semester {mhs.semesters[0].semester}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default MhsPersemester