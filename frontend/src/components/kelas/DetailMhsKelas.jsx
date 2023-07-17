import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaCog, FaTimes } from 'react-icons/fa'

const DetailMhsKelas = () => {
    const [Detail, setDetail] = useState([])
    const [DataKelas, setDataKelas] = useState([])
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeMakul, setKodeMakul] = useState("")
    const [kodeKelas, setKodeKelas] = useState("")
    const { kodeKls } = useParams()
    const [checked, setChecked] = useState([])

    useEffect(() => {
        const getMhsPerKls = async () => {
            try {
                const response = await axios.get(`v1/kelasKuliah/getMhsByKelas/${kodeKls}`)
                setDetail(response.data.data)
                setKodeJenjang(response.data.data[0].kelas[0].code_jenjang_pendidikan)
                setKodeFakultas(response.data.data[0].kelas[0].code_fakultas)
                setKodeProdi(response.data.data[0].kelas[0].code_prodi)
                setKodeMakul(response.data.data[0].kelas[0].code_mata_kuliah)
                setKodeSemester(response.data.data[0].kelas[0].code_semester)
                setKodeTahun(response.data.data[0].kelas[0].code_tahun_ajaran)
            } catch (error) {

            }
        }
        getMhsPerKls()
    }, [kodeKls])

    const handleCheck = (e, item) => {
        if (e.target.checked) {
            setChecked([...checked, item.id_kelas_detail])
        } else {
            setChecked(checked.filter((o) => o !== item.id_kelas_detail))
        }
    }

    const getDataKelas = async (a, b, c, d, e, f) => {
        const response = await axios.get(`v1/kelasKuliah/getKelasByMakul/${a}/${b}/${c}/${d}/${e}/${f}`)
        setDataKelas(response.data.data)
        document.getElementById('my-modal').checked = true
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        setKodeKelas("")
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-80 max-w-2xl rounded-md scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100">
                    <button className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                    <div className="pt-4 pb-1 px-0 grid gap-2">
                        <div>
                            <select className='select select-sm select-bordered w-full' value={kodeKelas} onChange={(e) => setKodeKelas(e.target.value)}>
                                <option value="">Pilih Kelas</option>
                                {DataKelas.map((item) => (
                                    <option key={item.id_kelas} value={item.code_kelas}>Kelas {item.nama_kelas}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button className='btn btn-sm btn-primary rounded-md w-full'>Pindahkan</button>
                        </div>
                    </div>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Detail Kelas Kuliah</h1>
                {checked}
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2 rounded-md">
                    <div className="card-body p-4">
                        <div>
                            <button className="btn btn-primary btn-sm float-right rounded-md" onClick={() => getDataKelas(kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi, kodeMakul)}><FaCog /> <span className="">Pindahkan</span></button>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">NIM</th>
                                        <th scope="col" className="px-6 py-3">Nama</th>
                                        <th scope="col" className="px-6 py-3">Jenjang</th>
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className='px-6 py-3'>Prodi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Detail.map((item, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                                <div className="form-control">
                                                    <label className="cursor-pointer label">
                                                        <input
                                                            type="checkbox"
                                                            checked={item.status == 'aktif' ? checked.includes(item.id_kelas_detail) : ""}
                                                            onChange={(e) => handleCheck(e, item)}
                                                            className="checkbox checkbox-success checkbox-xs"
                                                        />
                                                    </label>
                                                </div>
                                            </th>
                                            <td className='px-6 py-2'>{item.nim}</td>
                                            <td className='px-6 py-2'>{item.nim}</td>
                                            <td className='px-6 py-2'>{item.kelas[0].code_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2'>{item.kelas[0].code_fakultas}</td>
                                            <td className='px-6 py-2'>{item.kelas[0].code_prodi}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailMhsKelas