import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../Loading'

const ListNilaiMhs = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Sebaran, setSebaran] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [kodeMakul, setKodeMakul] = useState("")
    const [aktif, setAktif] = useState("")
    const [loading, setLoading] = useState(false)

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
        getMataKuliahBySebaran()
    }, [kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi])

    useEffect(() => {
        getMahasiwa()
    }, [kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi, kodeMakul])

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

    const getMataKuliahBySebaran = async () => {
        try {
            if (kodeTahun && kodeSemester && kodeJenjang && kodeFakultas && kodeProdi) {
                const response = await axios.get(`v1/nilai/sebaranMakulToNilai/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setSebaran(response.data.data)
            }
        } catch (error) {

        }
    }

    const getMahasiwa = async () => {
        try {
            if (kodeTahun && kodeSemester && kodeJenjang && kodeFakultas && kodeProdi && kodeMakul) {
                const response = await axios.get(`v1/nilai/nilaiAllMhsPermakul/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${kodeMakul}`)
                setMahasiswa(response.data.data)
            }
        } catch (error) {

        }
    }

    const pilihMakul = (e, f) => {
        setKodeMakul(e)
        setAktif(f)
    }

    return (
        <div className='mt-2 container'>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Nilai Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-5 gap-2">
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
                                <select className="select select-bordered select-sm w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
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
                                <select className="select select-bordered select-sm w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                    <option value="">Prodi</option>
                                    {Prodi.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text font-semibold">Tahun</span>
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
                                    <span className="text-base label-text font-semibold">Semester</span>
                                </label>
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
                <div className='grid grid-cols-10 gap-2'>
                    {Sebaran.map((item, index) => (
                        <div key={index} onClick={() => pilihMakul(item.code_mata_kuliah, item.mataKuliahs[0].nama_mata_kuliah)} className={`card bg-base-100 card-bordered shadow-md mb-2 cursor-pointer ${aktif == item.mataKuliahs[0].nama_mata_kuliah ? 'bg-blue-400' : ''}`}>
                            <div className="card-body p-4">
                                <h4 className='text-[12px]'>{item.mataKuliahs[0].nama_mata_kuliah}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section >
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-2 text-sm">No</th>
                                        <th scope="col" className="px-6 py-2 text-sm">NIM</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Nama</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Tempat Lahir</th>
                                        <th scope="col" className="px-6 py-2 text-sm">Nilai Akhir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Mahasiswa.map((item, index) => (
                                        <tr key={item.id_nilai_kuliah} className='bg-white border-b text-gray-500 border-x'>
                                            <td className='px-6 py-2 font-semibold'>{index + 1}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.mahasiswas[0].nim}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.mahasiswas[0].nama}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.mahasiswas[0].tempat_lahir}</td>
                                            <td className='px-6 py-2 font-semibold'>{item.nilai_akhir}</td>
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

export default ListNilaiMhs