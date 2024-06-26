import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaCog, FaReply, FaSave, FaTimes } from 'react-icons/fa'
import Loading from '../Loading'

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
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getMhsPerKls()
    }, [kodeKls])

    const getMhsPerKls = async () => {
        const response = await axios.get(`v1/kelasKuliah/getMhsByKelas/${kodeKls}`)
        setDetail(response.data.data)
        setKodeJenjang(response.data.data[0].kelas[0].code_jenjang_pendidikan)
        setKodeFakultas(response.data.data[0].kelas[0].code_fakultas)
        setKodeProdi(response.data.data[0].kelas[0].code_prodi)
        setKodeMakul(response.data.data[0].kelas[0].code_mata_kuliah)
        setKodeSemester(response.data.data[0].kelas[0].code_semester)
        setKodeTahun(response.data.data[0].kelas[0].code_tahun_ajaran)
    }

    const handleCheck = (e, item) => {
        if (e.target.checked) {
            setChecked([...checked, item.id_kelas_detail])
        } else {
            setChecked(checked.filter((o) => o !== item.id_kelas_detail))
        }
    }

    const getDataKelas = async (a, b, c, d, e, f) => {
        if (checked == 0) {
            Swal.fire({
                title: 'Tidak ada mahasiswa yang dipilih',
                icon: 'error'
            })
        } else {
            const response = await axios.get(`v1/kelasKuliah/getKelasByMakul/${a}/${b}/${c}/${d}/${e}/${f}`)
            setDataKelas(response.data.data)
            document.getElementById('my-modal').checked = true
        }
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        setKodeKelas("")
        setChecked("")
    }

    const pindahKelasMhs = async (e) => {
        e.preventDefault()
        try {
            if (kodeKelas == 0) {
                Swal.fire({
                    title: 'Anda belum memilih kelas',
                    icon: "error"
                })
            } else {
                document.getElementById('my-modal').checked = false
                setLoading(true)
                await axios.put('v1/kelasKuliah/pindahKelas', {
                    id: checked,
                    code_kelas: kodeKelas,
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        setChecked("")
                        getMhsPerKls()
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
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={pindahKelasMhs}>
                        <div className='bg-base-200 border-b-2 p-3'>
                            <h3 className="font-bold text-xl mb-1">Tambah</h3>
                            <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                        </div>
                        <div className='mb-2'>
                            <div className="py-4 px-4">
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Kelas</span>
                                    </label>
                                    <select className='select select-sm select-bordered w-full' value={kodeKelas} onChange={(e) => setKodeKelas(e.target.value)}>
                                        <option value="">Pilih Kelas</option>
                                        {DataKelas.map((item) => (
                                            <option key={item.code} value={item.code}>Kelas {item.nama_kelas}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='p-3 border-t-2 text-center'>
                            <button type='submit' className="btn btn-sm btn-primary capitalize"><FaSave />simpan</button>
                        </div>
                    </form>
                </div>
                {/* <div className="modal-box w-80 max-w-2xl rounded-md scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100">
                    <button className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                    <form onSubmit={pindahKelasMhs}>
                        <div className="pt-4 pb-1 px-0 grid gap-2">
                            <div>
                                <select className='select select-sm select-bordered w-full' value={kodeKelas} onChange={(e) => setKodeKelas(e.target.value)}>
                                    <option value="">Pilih Kelas</option>
                                    {DataKelas.map((item) => (
                                        <option key={item.code} value={item.code}>Kelas {item.nama_kelas}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button className='btn btn-sm btn-primary rounded-md w-full'>Pindahkan</button>
                            </div>
                        </div>
                    </form>
                </div> */}
            </div>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Detail Kelas Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div>
                            <Link to="/kelas" state={{ jen: kodeJenjang, fak: kodeFakultas, prod: kodeProdi, thn: kodeTahun, sem: kodeSemester, collaps: 'kuliah', activ: '/kelas' }} className="btn btn-error btn-sm capitalize rounded-md"><FaReply /> <span className="">kembali</span></Link>
                            <button className="btn btn-primary btn-sm float-right capitalize rounded-md" onClick={() => getDataKelas(kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi, kodeMakul)}><FaCog /> <span className="">Pindahkan</span></button>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-2 text-sm">#</th>
                                        <th scope="col" className="px-6 py-2 text-sm">NIM</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Nama</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Kelas</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Jenis Kelamin</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Jenjang Pendidikan</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Fakultas</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Prodi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Detail.map((item, index) => (
                                        <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                            <th scope="row" className="px-6 py-2 font-semibols whitespace-nowrap">
                                                <div className="form-control">
                                                    <label className="cursor-pointer label">
                                                        <input
                                                            type="checkbox"
                                                            checked={item.status == 'aktif' ? checked.includes(item.id_kelas_detail) : ""}
                                                            onChange={(e) => handleCheck(e, item)}
                                                            className="checkbox checkbox-primary checkbox-sm"
                                                        />
                                                    </label>
                                                </div>
                                            </th>
                                            <td className='px-6 py-2 font-semibold'>{item.nim}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.mahasiswas[0].nama}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.kelas[0].nama_kelas}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.mahasiswas[0].jenis_kelamin == 'l' ? 'Laki-Laki' : 'Perempuan'}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.kelas[0].jenjangPendidikans[0].nama_jenjang_pendidikan}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.kelas[0].fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.kelas[0].prodis[0].nama_prodi}</td>
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