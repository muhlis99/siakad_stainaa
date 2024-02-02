import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaCog } from 'react-icons/fa'

const SettingValidasi = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Available, setAvailable] = useState([])
    const [NotAvailable, setNotAvailable] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [tanggal, setTanggal] = useState("")

    useEffect(() => {
        getTahunAjaran()
    }, [])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getAvailable()
        getNotAvailable()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeTahun, kodeSemester, tanggal])

    const getJenjangPendidikan = async () => {
        try {
            const response = await axios.get('v1/jenjangPendidikan/all')
            setJenjang(response.data.data)
        } catch (error) {

        }
    }

    const getFakultas = async () => {
        try {
            if (kodeJenjang != 0) {
                const response = await axios.get(`v1/fakultas/getFakulatsByJenjang/${kodeJenjang}`)
                setFakultas(response.data.data)
            }
        } catch (error) {

        }
    }

    const getProdi = async () => {
        try {
            if (kodeFakultas != 0) {
                const response = await axios.get(`v1/prodi/getProdiByFakultas/${kodeFakultas}`)
                setProdi(response.data.data)
            }
        } catch (error) {

        }
    }

    const getTahunAjaran = async () => {
        try {
            const response = await axios.get('v1/tahunAjaran/all')
            setTahun(response.data.data)
        } catch (error) {

        }
    }

    const getSemester = async () => {
        try {
            if (kodeTahun != 0) {
                const response = await axios.get(`v1/setMahasiswaSmt/smtByThnAjr/${kodeTahun}`)
                setSemester(response.data.data)
            }
        } catch (error) {
            // console.log(error.response)
        }
    }

    const getAvailable = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && kodeTahun && kodeSemester && tanggal) {
                const response = await axios.get(`v1/presensiDosen/getDosenValidasiAvailable/${tanggal}/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setAvailable(response.data.data)
                console.log(response.data.data)
            }
        } catch (error) {
            // console.log(error.response)
        }
    }

    const getNotAvailable = async () => {
        try {
            if (kodeJenjang && kodeFakultas && kodeProdi && kodeTahun && kodeSemester && tanggal) {
                const response = await axios.get(`v1/presensiDosen/getDosenValidasiNoAvailable/${tanggal}/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setNotAvailable(response.data.data)
                console.log(response.data.data);
            }
        } catch (error) {

        }
    }

    return (
        <>
            <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                <div className='card-body p-4'>
                    <div className="grid grid-cols-5 gap-2">
                        <div>
                            <select className="select select-sm select-bordered w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                <option value="">Jenjang Pendidikan</option>
                                {Jenjang.map((item) => (
                                    <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-bordered select-sm w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                <option value="">Fakultas</option>
                                {Fakultas.map((item) => (
                                    <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-bordered select-sm w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                <option value="">Prodi</option>
                                {Prodi.map((item) => (
                                    <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                <option value="">Tahun Ajaran</option>
                                {Tahun.map((item) => (
                                    <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-sm select-bordered w-full" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                <option value="">Semester</option>
                                {Semester.map((item) => (
                                    <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card bg-base-100 card-bordered shadow-md'>
                <div className="card-body p-4">
                    <div>
                        <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} className='input input-bordered input-xs' />
                    </div>
                    <div className="overflow-x-auto mb-2">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className='text-gray-700 bg-[#d4cece]'>
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-sm">NO</th>
                                    <th scope="col" className="px-3 py-2 text-sm">NIP Yayasan</th>
                                    <th scope="col" className="px-3 py-2 text-sm">Nama Dosen</th>
                                    <th scope="col" className='px-3 py-2 text-sm'>Keterangan</th>
                                    <th scope="col" className="px-3 py-2 text-sm" align='center'>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Available.length == 0 && NotAvailable.length == 0 ?
                                    <tr className='bg-white border-b text-gray-500 border-x'>
                                        <td className='px-6 py-2 font-semibold' align='center' colSpan='5'>Data Presensi Kosong</td>
                                    </tr>
                                    :
                                    <>
                                        {Available.map((item, index) => (
                                            <tr className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-3 py-2 font-semibold'>{index + 1}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.nip_ynaa}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.dosens[0].nama}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.keterangan}</td>
                                                <td className='px-3 py-2 font-semibold'>
                                                    <button className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex gap-1 items-center no-underline'><FaCog /></button>
                                                </td>
                                            </tr>
                                        ))}
                                        {NotAvailable.map((item, index) => (
                                            <tr className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-3 py-2 font-semibold'>{index + 1}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.jadwalKuliahs[0].dosen_pengajar}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.jadwalKuliahs[0].dosenPengajar[0].nama}</td>
                                                <td className='px-3 py-2 font-semibold'>
                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white capitalize">tidak absen</span>
                                                </td>
                                                <td className='px-3 py-2 font-semibold'>
                                                    <button className='bg-[#17A2B8] py-2 px-2 rounded-full text-white inline-flex gap-1 items-center no-underline'><FaCog /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SettingValidasi