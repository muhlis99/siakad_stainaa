import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'

const ListRekapPerbulan = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [bulan, setBulan] = useState("")
    const [RekapPerbulan, setRekapPerbulan] = useState([])
    const [idJenjangPendidikan, setIdJenjangPendidikan] = useState("")
    const [jenjangPendidikan, setJenjangPendidikan] = useState("")
    const [idFakultas, setIdFakultas] = useState("")
    const [namaFakultas, setNamaFakultas] = useState("")
    const [idProdi, setIdProdi] = useState("")
    const [namaProdi, setNamaProdi] = useState("")
    const [idTahun, setIdTahun] = useState("")
    const [namaTahun, setNamaTahun] = useState("")
    const [idSemester, setIdSemester] = useState("")
    const [namaSemester, setNamaSemester] = useState("")
    const location = useLocation()

    useEffect(() => {
        if (location.state != null) {
            setIdJenjangPendidikan(location.state.idJenjangPendidikan)
            setIdFakultas(location.state.idFakultas)
            setIdProdi(location.state.idProdi)
            setIdTahun(location.state.idTahun)
            setIdSemester(location.state.idSemester)
        }
    }, [location])

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
        getBulan()
    }, [kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi])

    useEffect(() => {
        getRekapPerbulan()
    }, [kodeTahun, kodeSemester, kodeJenjang, kodeFakultas, kodeProdi, bulan])

    useEffect(() => {
        getJenjangById()
    }, [idJenjangPendidikan])

    useEffect(() => {
        getFakultasById()
    }, [idFakultas])

    useEffect(() => {
        getProdiById()
    }, [idProdi])

    useEffect(() => {
        getTahunAjaranById()
    }, [idTahun])

    useEffect(() => {
        getSemesterById()
    }, [idSemester])

    const getJenjangPendidikan = async () => {
        try {
            const response = await axios.get('v1/jenjangPendidikan/all')
            setJenjang(response.data.data)
        } catch (error) {

        }
    }

    const getJenjangById = async () => {
        try {
            if (idJenjangPendidikan) {
                const response = await axios.get(`v1/jenjangPendidikan/getById/${idJenjangPendidikan}`)
                setKodeJenjang(response.data.data.code_jenjang_pendidikan)
                setJenjangPendidikan(response.data.data.nama_jenjang_pendidikan)
            }
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

    const getFakultasById = async () => {
        try {
            if (idFakultas) {
                const response = await axios.get(`v1/fakultas/getById/${idFakultas}`)
                setKodeFakultas(response.data.data.code_fakultas)
                setNamaFakultas(response.data.data.nama_fakultas)
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

    const getProdiById = async () => {
        try {
            if (idProdi) {
                const response = await axios.get(`v1/prodi/getById/${idProdi}`)
                setKodeProdi(response.data.data.code_prodi)
                setNamaProdi(response.data.data.nama_prodi)
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

    const getTahunAjaranById = async () => {
        try {
            if (idTahun) {
                const response = await axios.get(`v1/tahunAjaran/getById/${idTahun}`)
                setKodeTahun(response.data.data.code_tahun_ajaran)
                setNamaTahun(response.data.data.tahun_ajaran)
            }
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

    const getSemesterById = async () => {
        try {
            if (idSemester) {
                const response = await axios.get(`v1/semester/getById/${idSemester}`)
                setKodeSemester(response.data.data.code_semester)
                setNamaSemester(response.data.data.semester)
            }
        } catch (error) {

        }
    }

    const getBulan = async () => {
        try {
            if (kodeTahun && kodeSemester && kodeJenjang && kodeFakultas && kodeProdi) {
                const response = await axios.get(`v1/presensiDosen/getBulan/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setBulan(response.data.data[0].bulan)
            }
        } catch (error) {

        }
    }

    const getRekapPerbulan = async () => {
        try {
            if (kodeTahun && kodeSemester && kodeJenjang && kodeFakultas && kodeProdi && bulan) {
                const response = await axios.get(`v1/presensiDosen/rekapPresensiPerbln/${bulan}/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setRekapPerbulan(response.data.data)
                // setRekapPerbulan()
            }
        } catch (error) {

        }
    }

    return (
        <>
            <div className='card bg-base-100 card-bordered shadow-md'>
                <div className='card-body p-4'>
                    <div className="grid grid-cols-5 gap-2">
                        <div>
                            <select className="select select-sm select-bordered w-full" value={idJenjangPendidikan} onChange={(e) => setIdJenjangPendidikan(e.target.value)}>
                                <option value="">Jenjang Pendidikan</option>
                                {Jenjang.map((item) => (
                                    <option key={item.id_jenjang_pendidikan} value={item.id_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-bordered select-sm w-full" value={idFakultas} onChange={(e) => setIdFakultas(e.target.value)}>
                                <option value="">Fakultas</option>
                                {Fakultas.map((item) => (
                                    <option key={item.id_fakultas} value={item.id_fakultas}>{item.nama_fakultas}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-bordered select-sm w-full" value={idProdi} onChange={(e) => setIdProdi(e.target.value)}>
                                <option value="">Prodi</option>
                                {Prodi.map((item) => (
                                    <option key={item.id_prodi} value={item.id_prodi}>{item.nama_prodi}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-sm select-bordered w-full" value={idTahun} onChange={(e) => setIdTahun(e.target.value)}>
                                <option value="">Tahun Ajaran</option>
                                {Tahun.map((item) => (
                                    <option key={item.id_tahun_ajaran} value={item.id_tahun_ajaran}>{item.tahun_ajaran}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select className="select select-sm select-bordered w-full" value={idSemester} onChange={(e) => setIdSemester(e.target.value)}>
                                <option value="">Semester</option>
                                {Semester.map((item) => (
                                    <option key={item.id_semester} value={item.id_semester}>Semester {item.semester}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card bg-base-100 card-bordered shadow-md mt-3'>
                <div className='card-body p-4'>
                    <div className="overflow-x-auto mb-2">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className='text-gray-700 bg-[#d4cece]'>
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center' rowSpan={2}>NO</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center' rowSpan={2}>NIP Yayasan</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center' rowSpan={2}>Nama Dosen</th>
                                    <th scope="col" className='px-3 py-2 text-sm border' align='center' colSpan={3}>Rekapitulasi Kehadiran</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" rowSpan={2} align='center'>Aksi</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center'>Total Hadir</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center'>Total Zoom</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center'>Total Izin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {RekapPerbulan.map((item, index) => (
                                    <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                        <td className='px-3 py-2 font-semibold border'>{index + 1}</td>
                                        <td className='px-3 py-2 font-semibold border'>{item.nip_ynaa}</td>
                                        <td className='px-3 py-2 font-semibold border'>{item.dosens[0].nama}</td>
                                        <td className='px-3 py-2 font-semibold border' align='center'>{item.total_masuk_luring}</td>
                                        <td className='px-3 py-2 font-semibold border' align='center'>{item.total_masuk_daring}</td>
                                        <td className='px-3 py-2 font-semibold border' align='center'>{item.total_izin}</td>
                                        <td className='px-3 py-2 font-semibold border' align='center'>
                                            <Link
                                                to={`/presensi/detailrekapperbulan/${item.nip_ynaa}/${bulan}/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`}
                                                state={{
                                                    collaps: 'kuliah',
                                                    activ: '/presensi',
                                                    select: 'perbulan',
                                                    jenjang: jenjangPendidikan,
                                                    fakultas: namaFakultas,
                                                    prodi: namaProdi,
                                                    tahun: namaTahun,
                                                    semester: namaSemester,
                                                    idJenjangPendidikan: idJenjangPendidikan,
                                                    idFakultas: idFakultas,
                                                    idProdi: idProdi,
                                                    idTahun: idTahun,
                                                    idSemester: idSemester
                                                }}
                                                className='bg-[#17A2B8] py-1 px-2 rounded-md text-white inline-flex gap-1 items-center no-underline'
                                            >
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListRekapPerbulan