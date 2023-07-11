import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { FaClosedCaptioning, FaCog, FaExpandArrowsAlt, FaSave, FaTimes } from 'react-icons/fa'

const MhsPersemester = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Semester, setSemester] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeSemesterOld, setKodeSemesterOld] = useState("")
    const [kodeSemesterNew, setKodeSemesterNew] = useState("")
    const [button, setButton] = useState("")
    const [smt, setSmt] = useState("")

    useEffect(() => {
        getJenjang()
        getSemester()
    }, [])

    useEffect(() => {
        getFakultasByJenjang()
    }, [kodeJenjang])

    useEffect(() => {
        getProdiByFakultas()
    }, [kodeFakultas])

    useEffect(() => {
        getMhsBySemester()
    }, [kodeFakultas, kodeJenjang, kodeProdi, kodeSemesterOld])

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

    const getSemester = async () => {
        const response = await axios.get('v1/semester/all')
        setSemester(response.data.data)
    }

    const getMhsBySemester = async () => {
        if (kodeFakultas != 0 & kodeJenjang != 0 & kodeProdi != 0 & kodeSemesterOld != 0) {
            const response = await axios.get(`v1/setMahasiswaSmt/all/${kodeSemesterOld}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
            setMahasiswa(response.data.data)
            setButton(response.data.data.length)
            setSmt(kodeSemesterOld.substring(4, 5))
        }
    }

    const modalOpen = () => {
        document.getElementById('my-modal').checked = true
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        setKodeSemesterNew("")
    }

    const simpanSetMhs = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`v1/setMahasiswaSmt/create`, {
                codeSmtOld: kodeSemesterOld,
                codeJnjPen: kodeJenjang,
                codeFks: kodeFakultas,
                codePrd: kodeProdi,
                codeSmtNew: kodeSemesterNew
            }).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getMhsBySemester()
                    modalClose()
                });
            })
        } catch (error) {
        }
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative p-0 rounded-none w-72">
                    <button className='btn btn-sm btn-square mb-2 btn-danger rounded-none float-right' onClick={modalClose}><FaTimes /></button>
                    <form onSubmit={simpanSetMhs} className='p-2'>
                        <select className="select select-sm select-bordered w-full mb-2" value={kodeSemesterNew} onChange={(e) => setKodeSemesterNew(e.target.value)}>
                            <option value="">Semester</option>
                            {Semester.map((item, index) => {
                                return item.semester - smt === 1 ? (
                                    <option key={index} value={item.code_semester}>Semester {item.semester}</option>
                                ) : (
                                    <option key={index} disabled hidden value={item.code_semester}>Semester {item.semester}</option>
                                )
                            })}

                            {/* {Semester.map((item) => (
                                
                            ))} */}
                        </select>
                        <button className='btn btn-sm btn-default w-full'><FaSave /><span className="ml-1">simpan</span></button>
                    </form>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Set Mahasiswa Persemester</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-4 gap-2">
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
                            {button > 0 ? <button className='btn btn-sm btn-default float-right' onClick={modalOpen}><FaCog /><span className="ml-1">Set Mahasiswa</span></button> : ""}
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
                                            <td className='px-6 py-2'></td>
                                            <td className='px-6 py-2'></td>
                                            <td className='px-6 py-2'></td>
                                            <td className='px-6 py-2'></td>
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