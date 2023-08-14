import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaCouch, FaFileSignature, FaHotel, FaInfo, FaUsers } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../Loading'


const ListPenilaian = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Makul, setMakul] = useState([])
    const [KodeMakul, setKodeMakul] = useState([])
    const [DataKelas, setDataKelas] = useState([])
    const [Jumlah, setJumlah] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        if (location.state != null) {
            setKodeJenjang(location.state.jen)
            setKodeFakultas(location.state.fak)
            setKodeProdi(location.state.pro)
            setKodeTahun(location.state.thn)
            setKodeSemester(location.state.smt)
        }
    }, [location.state])

    useEffect(() => {
        getTahunAjaran()
    }, [])

    useEffect(() => {
        getJenjang()
    }, [])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        getSemester()
    }, [kodeTahun])

    useEffect(() => {
        getMakul()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeSemester, kodeTahun])

    useEffect(() => {
        getKodeMakul()
    }, [Makul])

    useEffect(() => {
        getKodeMakul()
    }, [Makul])

    useEffect(() => {
        getDataKelas()
    }, [KodeMakul])

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
            setProdi(response.data.data)
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

    const getMakul = async () => {
        if (kodeJenjang != 0 & kodeFakultas != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/jadwalKuliah/all/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
            setMakul(response.data.data)
        }
    }

    const getKodeMakul = () => {
        var i = Makul.map(item => (
            item.code_mata_kuliah
        ))
        setKodeMakul(i)
    }

    const getDataKelas = async () => {
        if (KodeMakul.length > 0) {
            let kelass = []
            let juml = []
            let promises = []
            for (let i = 0; i < KodeMakul.length; i++) {
                const t = await axios.get('v1/kelasKuliah/getKelasByMakul/' + kodeTahun + '/' + kodeSemester + '/' + kodeJenjang + '/' + kodeFakultas + '/' + kodeProdi + '/' + KodeMakul[i]).then(response => {
                    kelass.push(response.data.data)
                    juml.push(response.data.data.length)
                })
                promises.push(t)

            }
            if (KodeMakul.length != 0) {
                Promise.all(promises).then(() => setDataKelas(kelass))
                Promise.all(promises).then(() => setJumlah(juml))
            }
        }
    }

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Penilaian Mahasiswa</h1>
            </section>
            <div className="card bg-base-100 card-bordered shadow-md mb-2">
                <div className="card-body p-4">
                    <div className="grid grid-cols-5 gap-2 mb-5 p-3 rounded-md">
                        <div>
                            <label>
                                <span className="">Jenjang Pendidikan</span>
                            </label>
                            <select className="select select-bordered select-sm w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                <option value="">Jenjang Pendidikan</option>
                                {Jenjang.map((item) => (
                                    <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>
                                <span className="">Fakultas</span>
                            </label>
                            <select className="select select-bordered select-sm w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                <option value="">Fakultas</option>
                                {Fakultas.map((item) => (
                                    <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>
                                <span className="">Prodi</span>
                            </label>
                            <select className="select select-bordered select-sm w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                <option value="">Prodi</option>
                                {Prodi.map((item) => (
                                    <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>
                                <span className="">Tahun Ajaran</span>
                            </label>
                            <select className="select select-sm select-bordered w-full" value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                <option value="">Tahun Ajaran</option>
                                {Tahun.map((item) => (
                                    <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>
                                <span className="">Semester</span>
                            </label>
                            <select className="select select-sm select-bordered w-full" value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                <option value="">Semester</option>
                                {Semester.map((item) => (
                                    <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* <div>
                        <div className='mt-2'>
                            {Makul.map((kls, index) => (
                                <div key={kls.id_mata_kuliah} className="collapse bg-[#2D7F5F] pb-0 rounded-lg">
                                    <input type="checkbox" checked className='p-0 min-h-0' readOnly />
                                    <div className="collapse-title p-2 min-h-0 text-white flex gap-2">
                                        <span>{kls.code_mata_kuliah} | {kls.nama_mata_kuliah} | SKS {kls.sks}</span>
                                    </div>
                                    <div className="collapse-content grid gap-1 px-0 py-1 bg-base-100">
                                        {DataKelas != 0 ? DataKelas[index].map((item, o) => (
                                            <div key={o} className="grid grid-cols-4 gap-2 px-4 py-2 bg-base-200">
                                                <div className='flex gap-2' title={`Kelas ${item.nama_kelas}`}>
                                                    <span className='my-auto text-md'><FaHotel /></span><span className='my-auto'>{item.nama_kelas}</span>
                                                </div>
                                                <div className='flex gap-2 justify-center' title={`Kapasitas ${item.kapasitas}`}>
                                                    <span className='my-auto text-md'><FaCouch /></span><span className='my-auto'>{item.kapasitas}</span>
                                                </div>
                                                <div className='flex gap-2 justify-center' title={`Jumlah MHS ${item.jumlahMhs}`}>
                                                    <span className='my-auto text-md'><FaUsers /></span><span className='my-auto'>{item.jumlahMhs}</span>
                                                </div>
                                                <div>
                                                    <Link to={`/detailnilai`} state={{ mk: item.code_mata_kuliah, idn: item.id_kelas, kod: item.code, collaps: 'kuliah', activ: '/penilaian' }} className='btn btn-xs btn-info btn-circle float-right' title='Detail'><FaInfo /></Link>
                                                </div>
                                            </div>
                                        )) : ""}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="card bg-base-100 card-bordered shadow-md mb-2">
                <div className="card-body p-4">
                    <div className="overflow-x-auto mb-2">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className='text-gray-700 bg-[#d4cece]'>
                                <tr>
                                    <th scope="col" className="px-6 py-2 text-sm">#</th>
                                    <th scope="col" className="px-6 py-2 text-sm">Kode Mata Kuliah</th>
                                    <th scope="col" className="px-6 py-2 text-sm">Mata Kuliah</th>
                                    <th scope="col" className="px-6 py-2 text-sm">Nama Kelas</th>
                                    <th scope="col" className="px-6 py-2 text-sm">Jumlah Mahasiswa</th>
                                    <th scope="col" className='px-6 py-2 text-sm'>Kapasitas</th>
                                    <th scope="col" className="px-6 py-2 text-sm" align='center'>Aksi</th>
                                </tr>
                            </thead>
                            {Makul.length == 0 ?
                                <tr className='bg-white border-b border-x text-gray-500'>
                                    <td className='px-6 py-2 font-semibold' align='center' colSpan='7'>Data Kelas Kosong</td>
                                </tr>
                                :
                                Makul.map((kls, index) => (
                                    <tbody key={index}>
                                        {DataKelas != 0 ?
                                            DataKelas[index].map((item, o) => (
                                                <tr key={o} className='bg-white border-b text-gray-500 border-x'>
                                                    <th scope="row" className="px-6 py-2 font-semibold whitespace-nowrap">{o + 1}</th>
                                                    <td className='px-6 py-2 font-semibold'>{item.mataKuliahs[0].code_mata_kuliah}</td>
                                                    <td className='px-6 py-2 font-semibold'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                                    <td className='px-6 py-2 font-semibold'>Kelas {item.nama_kelas}</td>
                                                    <td className='px-6 py-2 font-semibold'>{item.jumlahMhs} Mahasiswa</td>
                                                    <td className='px-6 py-2 font-semibold'>{item.kapasitas} Peserta</td>
                                                    <td className='px-6 py-2 font-semibold' align='center'><Link to={`/detailnilai`} state={{ mk: item.code_mata_kuliah, idn: item.id_kelas, kod: item.code, collaps: 'kuliah', activ: '/penilaian' }} className='btn btn-xs btn-info btn-circle' title='Detail'><FaInfo /></Link></td>
                                                </tr>
                                            ))
                                            :
                                            <tr className='bg-white border-b text-gray-500 border-x'>
                                                <td colSpan='7' align='center' className='px-auto py-2 font-semibold'>Data Kelas Kosong</td>
                                            </tr>
                                        }
                                    </tbody>
                                ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListPenilaian