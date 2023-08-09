import React, { useState, useEffect } from 'react'
import { FaPlus, FaUsers, FaHotel, FaInfo, FaTimes, FaSave, FaCouch } from "react-icons/fa"
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useLocation } from 'react-router-dom'
import Loading from '../Loading'

const ListKelas = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Makul, setMakul] = useState([])
    const [KodeMakul, setKodeMakul] = useState([])
    const [DataKelas, setDataKelas] = useState([])
    const [jumlahMhsKls, setJumlahMhsKls] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [jumMhs, setJumMhs] = useState("")
    const [dari, setDari] = useState("1")
    const [sampai, setSampai] = useState("")
    const [sampe, setSampe] = useState("")
    const [kapasitas, setKapasitas] = useState("")
    const [kelasnya, setKelasnya] = useState([])
    const [jenisKelamin, setJenisKelamin] = useState("")
    const [title, setTitle] = useState("")
    const [statusKell, setStatusKell] = useState("")
    const [statusKelp, setStatusKelp] = useState("")
    const [klsSelanjutnya, setKlsSelanjutnya] = useState("")
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])

    useEffect(() => {
        getJenjang()
        getTahunAjaran()
        getKodeMakul()
    }, [])

    useEffect(() => {
        try {
            const getkode = () => {
                if (location.state != null) {
                    setKodeFakultas(location.state.fak)
                    setKodeJenjang(location.state.jen)
                    setKodeProdi(location.state.prod)
                    setKodeTahun(location.state.thn)
                    setKodeSemester(location.state.sem)
                }
            }
            getkode()
        } catch (error) {

        }
    }, [location])

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
        getMataKuliah()
    }, [kodeFakultas, kodeProdi, kodeSemester, kodeTahun])

    useEffect(() => {
        getKodeMakul()
    }, [Makul])

    useEffect(() => {
        getDataKelas()
    }, [KodeMakul])

    useEffect(() => {
        getJumlahMhs()
    }, [kodeFakultas, kodeJenjang, kodeProdi, kodeSemester, kodeTahun, jenisKelamin, statusKell, statusKelp])


    useEffect(() => {
        if (sampai == '1') {
            setSampe('2')
        } else {
            setSampe(sampai)
        }
    }, [sampai])

    useEffect(() => {
        getDataArray()
    }, [dari, sampai, sampe])

    useEffect(() => {
        getNamaKlsSelanjutnya()
    }, [kodeFakultas, kodeJenjang, kodeProdi, kodeSemester, kodeTahun])

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

    const getMataKuliah = async () => {
        if (kodeJenjang != 0 & kodeFakultas != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/kelasKuliah/allMatakuliah/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
            setDataKelas([])
            setMakul(response.data.data)
            setTitle("")
        } else {
            setMakul([])
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
            let promises = []
            for (let i = 0; i < KodeMakul.length; i++) {
                const t = await axios.get('v1/kelasKuliah/getKelasByMakul/' + kodeTahun + '/' + kodeSemester + '/' + kodeJenjang + '/' + kodeFakultas + '/' + kodeProdi + '/' + KodeMakul[i]).then(response => {
                    kelass.push(response.data.data)
                })
                promises.push(t)

            }
            if (KodeMakul.length != 0) {
                Promise.all(promises).then(() => setDataKelas(kelass))
            }
        }
    }

    const getJumlahMhs = async () => {
        // if (statusKell == jenisKelamin || statusKelp == jenisKelamin) {
        //     setJumMhs("0")
        // } else {
        if (kodeJenjang != 0 & kodeFakultas != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0 & jenisKelamin != 0) {
            const response = await axios.get(`v1/kelasKuliah/jumlahMhs/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}/${jenisKelamin}`)
            setJumMhs(response.data.data)
        } else {
            setJumMhs("")
        }
        // }
    }

    const abjad = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const abjadnya = []
    for (let i = 1; i < abjad.length; i++) {
        abjadnya.push(<option key={i} value={i}>{abjad[i]}</option>)
    }

    const getNamaKlsSelanjutnya = async () => {
        if (kodeJenjang != 0 & kodeFakultas != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/kelasKuliah/getNamaKelasSelanjutnya/${kodeTahun}/${kodeSemester}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
            setKlsSelanjutnya(response.data.data)
        }
    }

    const getDataArray = () => {
        if (sampai != 0) {
            let kelas = []
            let prom = []
            for (let k = dari; k <= sampe; k++) {
                prom.push(
                    kelas.push(k)
                )
            }
            Promise.all(prom).then(() =>
                setKelasnya(kelas)
            )
        }
    }

    const modalClose = () => {
        document.getElementById('my-modal').checked = false
        setSampai("")
        setJumMhs("")
    }

    const modalOpen = () => {
        document.getElementById('my-modal').checked = true
    }

    const simpanKls = async (e) => {
        e.preventDefault()
        try {
            if (jumMhs == 0) {
                Swal.fire({
                    title: 'Jumlah Mahasiswa kosong',
                    icon: "error"
                })
            } else {
                document.getElementById('my-modal').checked = false
                setLoading(true)
                await axios.post('v1/kelasKuliah/create', {
                    code_jenjang_pendidikan: kodeJenjang,
                    code_fakultas: kodeFakultas,
                    code_prodi: kodeProdi,
                    code_tahun_ajaran: kodeTahun,
                    code_semester: kodeSemester,
                    nama_kelas: kelasnya,
                    hurufKelas: klsSelanjutnya,
                    kapasitas: kapasitas,
                    jumlahPeserta: jumMhs,
                    jenkel: jenisKelamin
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        setSampai("")
                        setStatusKell(jenisKelamin == 'l' ? jenisKelamin : '')
                        setStatusKelp(jenisKelamin == 'p' ? jenisKelamin : '')
                        getMataKuliah()
                        getDataKelas()
                        getNamaKlsSelanjutnya()
                    });
                })
            }
        } catch (error) {
            setLoading(false)
            if (error.response) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            }
        }
    }

    return (
        <div className="mt-2 container">
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md w-1/2">
                    <form onSubmit={simpanKls}>
                        <div className='bg-base-200 border-b-2 p-3'>
                            <h3 className="font-bold text-xl mb-1">Tambah</h3>
                            <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                        </div>
                        <div className='mb-2'>
                            <div className="py-4 px-4">
                                <div className="grid lg:grid-cols-2 gap-1">
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Tahun Ajaran</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" disabled value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                            <option value="">Tahun Ajaran</option>
                                            {Tahun.map((item) => (
                                                <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Jenjang Pendidikan</span>
                                        </label>
                                        <select className="select select-bordered select-sm w-full" disabled value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
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
                                        <select className="select select-sm select-bordered w-full" disabled value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
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
                                        <select className="select select-sm select-bordered w-full" disabled value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                            <option value="">Prodi</option>
                                            {Prodi.map((item) => (
                                                <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Semester</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" disabled value={kodeSemester} onChange={(e) => setKodeSemester(e.target.value)}>
                                            <option value="">Semester</option>
                                            {Semester.map((item) => (
                                                <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Jenis Kelamin</span>
                                        </label>
                                        <select className="select select-sm select-bordered w-full" value={jenisKelamin} onChange={(e) => setJenisKelamin(e.target.value)}>
                                            <option value="">Jenis Kelamin</option>
                                            <option value="l">Laki-Laki</option>
                                            <option value="p">Perempuan</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Jumlah Mahasiswa</span>
                                        </label>
                                        <input type="text" disabled placeholder='Jumlah Mhs' value={jumMhs} className="input input-sm input-bordered w-full" />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Dari Kelas</span>
                                        </label>
                                        <input type="text" disabled className='input input-sm input-bordered w-full' value={klsSelanjutnya} />
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Sampai Kelas</span>
                                        </label>
                                        <select className='select select-sm select-bordered w-full' value={sampai} onChange={(e) => setSampai(e.target.value)}>
                                            <option value="">Sampai</option>
                                            {abjadnya}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="label">
                                            <span className="text-base label-text font-semibold">Kapasitas Kelas</span>
                                        </label>
                                        <input type="text" placeholder='Diisi dengan angka' className="input input-sm input-bordered w-full" value={kapasitas} onChange={(e) => setKapasitas(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-3 border-t-2 text-center'>
                            <button type='submit' className="btn btn-sm btn-primary capitalize"><FaSave />simpan</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                <div className='w-[74px] mx-auto mt-72'>
                    <Loading />
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Kelas Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className='mb-2'>
                            <div className="grid grid-cols-5 gap-2">
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Jenjang Pendidikan</span>
                                    </label>
                                    <select className="select select-bordered select-sm w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
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
                                        {Prodi.map((item) => (
                                            <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Tahun Ajaran</span>
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
                </div>
                <div className='card bg-base-100 card-bordered shadow-md mb-2'>
                    <div className="card-body p-4">
                        <div>
                            <button className='btn btn-sm btn-success capitalize rounded-md' onClick={modalOpen}><FaPlus /><span>tambah Data</span></button>
                        </div>
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
                                {Makul.map((kls, index) => (
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
                                                    <td className='px-6 py-2 font-semibold' align='center'><Link to={`/kelas/detail/${item.code}`} state={{ collaps: 'kuliah', activ: '/kelas' }} className='btn btn-xs btn-info btn-circle text-white' title='Detail'><FaInfo /></Link></td>
                                                </tr>
                                            ))
                                            :
                                            <tr className='bg-white border-b text-gray-500 border-x'>
                                                <td colSpan='6' align='center' className='px-auto py-2 font-semibold'>Data Kelas Kosong</td>
                                            </tr>
                                        }
                                    </tbody>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default ListKelas