import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaCheck, FaSearch, FaTrash, FaTimes } from 'react-icons/fa'
import { MdDoNotDisturb } from 'react-icons/md'
import Swal from 'sweetalert2'
import Loading from '../Loading'

const ListKrs = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Program, setProgram] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Krs, setKrs] = useState([])
    const [view, setView] = useState([])
    const [total, setTotal] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [pesan, setPesan] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        getTahunAjaran()
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getKrsAll()
    }, [kodeTahun, kodeProdi, kodeSemester, kodeFakultas, kodeJenjang])

    const getJenjangPendidikan = async () => {
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

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getSemester = async () => {
        if (kodeTahun != 0) {
            const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
            setSemester(response.data.data)
        }
    }

    const getKrsAll = async () => {
        try {
            if (kodeTahun != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeFakultas != 0 & kodeJenjang != 0) {
                const response = await axios.get(`v1/krs/all?tahunAjaran=${kodeTahun}&semester=${kodeSemester}&prodi=${kodeProdi}&fakultas=${kodeFakultas}&jenjangPendik=${kodeJenjang}`)
                setKrs(response.data.data)
                setPesan("")
            }
        } catch (error) {
            setPesan("Data Kosong")
        }
    }

    const getViewKrs = async (a, b, c, d, e) => {
        const response = await axios.get(`v1/krs/viewAll/${a}/${b}/${c}/${d}/${e}`)
        console.log(response.data.data.rows);
        setView(response.data.data.rows)
        setTotal(response.data.data.count)
        document.getElementById('my-modal').checked = true
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
    }

    const paketkan = async (a, b, c, d, e) => {
        try {
            setLoading(true)
            await axios.post(
                `v1/krs/create/${a}/${b}/${c}/${d}/${e}`
            ).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getKrsAll()
                })
            })
        } catch (error) {
            setLoading(false)
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const batalkanPaket = (a, b, c, d, e) => {
        try {
            Swal.fire({
                title: "Batalkan paket ini?",
                text: "Apa anda yakin?, anda tidak dapat mengembalikan ini",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, batalkan!',
                cancelButtonText: 'Keluar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(
                        `v1/krs/delete/${a}/${b}/${c}/${d}/${e}`
                    ).then(function (response) {
                        setLoading(false)
                        Swal.fire({
                            title: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getKrsAll()
                        })
                    })
                }
            })
        } catch (error) {

        }
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl rounded-none scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100">
                    <button className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                    <div className="py-4">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-2 py-3" align='center'>#</th>
                                        <th scope="col" className="px-2 py-3" align='center'>Mata Kuliah</th>
                                        <th scope="col" className="px-2 py-3" align='center'>SKS</th>
                                        <th scope="col" className='px-2 py-3' align='center'>SKS Praktek</th>
                                        <th scope="col" className='px-2 py-3' align='center'>SKS Prak Lapangan</th>
                                        <th scope="col" className="px-2 py-3" align='center'>SKS Simulasi</th>
                                        <th scope="col" className="px-2 py-3" align='center'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {view.map((item, index) => (
                                        <tr key={item.id_sebaran} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-2 py-2 font-medium whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className='px-2 py-2'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                            <td className='px-2 py-2' align='center'>{item.mataKuliahs[0].sks}</td>
                                            <td className='px-2 py-2' align='center'>{item.mataKuliahs[0].sks_praktek}</td>
                                            <td className='px-2 py-2' align='center'>{item.mataKuliahs[0].sks_prak_lapangan}</td>
                                            <td className='px-2 py-2' align='center'>{item.mataKuliahs[0].sks_simulasi}</td>
                                            <td className='px-2 py-2' align='center'>{item.status_makul == 'paket' ? <span className='badge badge-sm badge-default'>Paket</span> : <span className='badge badge-sm badge-jingga opacity-80'>Non Paket</span>}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className='text-gray-700'>
                                    <tr>
                                        <th scope="col" className="px-2 py-3" colSpan='6'>Total Mata Kuliah</th>
                                        <th scope="col" className="px-2 py-3" align='center'>{total}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Kartu Rencana Studi</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid lg:grid-cols-5 gap-2">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text font-semibold">Jenjang Pendidikan</span>
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
                                    <span className="text-base label-text font-semibold">Fakultas</span>
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
                                    <span className="text-base label-text font-semibold">Prodi</span>
                                </label>
                                <select className="select select-sm select-bordered w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                    <option value="">Prodi</option>
                                    {Program.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text font-semibold">Tahun Ajaran</span>
                                </label>
                                <select className='select select-bordered select-sm w-full ' value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text font-semibold">Semester</span>
                                </label>
                                <select className='select select-bordered select-sm w-full' value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                    <option value="">Semester</option>
                                    {Semester.map((item) => (
                                        <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                            <thead className='text-gray-700 bg-[#F2F2F2]'>
                                <tr>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Semester</th>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Tahun Ajaran</th>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Mata Kuliah</th>
                                    <th scope="col" className="px-2 py-2 border" colSpan="2">Jumlah Mahasiswa</th>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Keterangan</th>
                                    <th scope="col" className="px-2 py-2 border" rowSpan="2">Aksi</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-2 py-2 border">Valid</th>
                                    <th scope="col" className="px-2 py-2 border">Paket</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Krs.length == 0 ?
                                    <tr className='bg-white border-b text-gray-500 border-x'>
                                        <td className='px-6 py-2 font-semibold' align='center' colSpan='7'>Data Kartu Rencana Studi Kosong</td>
                                    </tr>
                                    :
                                    Krs.map((item, index) => (
                                        <tr key={index + 1} className='bg-white border text-gray-500' >
                                            <th scope="row" className="px-2 py-2 border font-semibold whitespace-nowrap">{item.semester}</th>
                                            <td className='px-2 py-2 font-semibold border' align='center'>{item.tahun}</td>
                                            <td className='px-2 py-2 font-semibold border' align='center'>{item.Paketmakul}</td>
                                            <td className='px-2 py-2 font-semibold border' align='center'>{item.jumlahTotalMahasiswa}</td>
                                            <td className='px-2 py-2 font-semibold border' align='center'>{item.jumlahMahasiswaPaket}</td>
                                            <td className='px-2 py-2 font-semibold border' align='center'>{item.keterangan == 'paket belum' ? <span className='badge badge-sm badge-warning opacity-80 font-semibold'>Paket Belum</span> : <span className='badge badge-sm badge-success font-semibold'>Paket Selesai</span>}</td>
                                            <td className='px-2 py-2 border' align='center'>
                                                <div>
                                                    <div className="tooltip" data-tip="Lihat MK Paket"><button className="btn btn-xs btn-circle text-white btn-info mr-1" onClick={() => getViewKrs(kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi)} title='Lihat MK Paket'><FaSearch /></button></div>
                                                    {item.keterangan == 'paket selesai' || item.jumlahTotalMahasiswa == 0 ?
                                                        <div className="tooltip" data-tip="Batalkan Paket">
                                                            <button className="btn btn-error btn-xs btn-circle text-white" onClick={() => batalkanPaket(kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi)}><FaTrash /></button>
                                                        </div>
                                                        :
                                                        <div className="tooltip" data-tip="Paketkan Mahasiswa">
                                                            <button className="btn btn-xs btn-circle text-white btn-success" onClick={() => paketkan(kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi)}><FaCheck /></button>
                                                        </div>}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div >
            </section >
        </div >
    )
}

export default ListKrs