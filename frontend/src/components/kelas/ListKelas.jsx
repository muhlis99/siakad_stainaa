import React, { useState, useEffect } from 'react'
import { FaPlus, FaUsers, FaHotel, FaInfo, FaTimes, FaSave, FaTrash } from "react-icons/fa"
import axios from 'axios'
import Swal from 'sweetalert2'

const ListKelas = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Prodi, setProdi] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Makul, setMakul] = useState([])
    const [KodeMakul, setKodeMakul] = useState([])
    const [DataKelas, setDataKelas] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [kodesmt, setKodeSmt] = useState("")
    const [jumMhs, setJumMhs] = useState("")
    const [tambah, setTambah] = useState("")
    const [sampai, setSampai] = useState("")
    const [kapasitas, setKapasitas] = useState("")
    const [kelasnya, setKelasnya] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
        getJenjang()
        getTahunAjaran()
        getSemester()
        getKodeMakul()
    }, [])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

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
    }, [kodeFakultas, kodeJenjang, kodeProdi, kodesmt])

    useEffect(() => {
        getDataArray()
    }, [sampai])

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
        const response = await axios.get(`v1/semester/all`)
        setSemester(response.data.data)
    }

    const getMataKuliah = async () => {
        if (kodeFakultas != 0 & kodeProdi != 0 & kodeSemester != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/kelasKuliah/allMatakuliah/${kodeTahun}/${kodeSemester}/${kodeFakultas}/${kodeProdi}`)
            setDataKelas([])
            setMakul(response.data.data)
            setTitle("")
        } else {
            setTitle('Untuk melihat data kelas kuliah, silakan isi form di atas!')
            setMakul([])
        }
    }

    const getKodeMakul = () => {
        var i = Makul.map(item => ({
            kode: item.code_mata_kuliah
        }))
        setKodeMakul(i)
    }

    const getDataKelas = async () => {
        if (KodeMakul.length != 0) {
            let kelass = []
            let promises = []
            for (let i = 0; i < KodeMakul.length; i++) {
                promises.push(
                    axios.get('v1/kelasKuliah/getKelasByMakul/' + KodeMakul[i].kode).then(response => {
                        kelass.push(response.data.data)
                    })
                )
            }
            if (KodeMakul.length != 0) {
                Promise.all(promises).then(() => setDataKelas(kelass))
            }
        }
    }

    const getJumlahMhs = async () => {
        if (kodeJenjang != 0 & kodeFakultas != 0 & kodeProdi != 0 & kodesmt != 0) {
            const response = await axios.get(`v1/kelasKuliah/jumlahMhs/${kodesmt}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
            setJumMhs(response.data.data)
        } else {
            setJumMhs("")
        }
    }

    const abjad = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const abjadnya = []
    for (let i = 1; i < abjad.length; i++) {
        abjadnya.push(<option key={i} value={i}>{abjad[i]}</option>)
    }

    const getDataArray = () => {
        if (sampai != 0) {
            let kelas = []
            let prom = []
            for (let k = 1; k <= sampai; k++) {
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
        setKodeSmt("")
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
                await axios.post('v1/kelasKuliah/create', {
                    code_jenjang_pendidikan: kodeJenjang,
                    code_fakultas: kodeFakultas,
                    code_prodi: kodeProdi,
                    code_tahun_ajaran: kodeTahun,
                    code_semester: kodesmt,
                    nama_kelas: kelasnya,
                    kapasitas: kapasitas
                }).then(function (response) {
                    document.getElementById('my-modal').checked = false
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        setKodeSmt("")
                        setSampai("")
                        setJumMhs("")
                        getMataKuliah()
                    });
                })
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: "error"
                })
            }
        }
    }

    const hapusKelas = (e, f) => {
        Swal.fire({
            title: "Hapus data ini?",
            text: "Anda tidak dapat mengembalikan ini",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.put(
                        `/v1/kelasKuliah/delete/${e}/${e}`
                    ).then((response) => {
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getMataKuliah()
                        })
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className="mt-2 container">
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl rounded-md scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-gray-100">
                    <button className="btn btn-xs btn-circle btn-danger absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                    <div className="pt-4 pb-1 px-0">
                        <form onSubmit={simpanKls}>
                            <div className="grid lg:grid-cols-4 gap-1">
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
                                        <span className="text-base label-text">Jenjang Pendidikan</span>
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
                                    <select className="select select-sm select-bordered w-full" value={kodesmt} onChange={(e) => setKodeSmt(e.target.value)}>
                                        <option value="">Semester</option>
                                        {Semester.map((item) => (
                                            <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-span-2'>
                                    <div className="grid grid-cols-3 gap-1">
                                        <div>
                                            <label className="label">
                                                <span className="text-base label-text">Jumlah Mhs</span>
                                            </label>
                                            <input type="text" disabled placeholder='Jumlah Mhs' value={jumMhs} className="input input-sm input-bordered w-full" />
                                        </div>
                                        <div className='col-span-2'>
                                            <label className="label">
                                                <span className="text-base label-text">Nama Kelas</span>
                                            </label>
                                            <div className="grid grid-cols-2 gap-1">
                                                <div>
                                                    <input type="text" value="A" disabled className="input input-sm input-bordered w-full" />
                                                </div>
                                                <div>
                                                    <select className='select select-sm select-bordered w-full' value={sampai} onChange={(e) => setSampai(e.target.value)}>
                                                        <option value="">Sampai</option>
                                                        {abjadnya}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text">Kapasitas</span>
                                    </label>
                                    <input type="text" placeholder='Diisi dengan angka' className="input input-sm input-bordered w-full" value={kapasitas} onChange={(e) => setKapasitas(e.target.value)} />
                                </div>
                                <div className='col-span-4 mt-3'>
                                    <button className='btn btn-default btn-sm float-right'><FaSave /> <span className="ml-1">simpan</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Kelas Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <div className='mb-2'>
                            <div className="grid grid-cols-5 gap-2">
                                <div>
                                    <select className="select select-bordered select-sm w-full" value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                        <option value="">Jenjang Pendidikan</option>
                                        {Jenjang.map((item) => (
                                            <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select className="select select-sm select-bordered w-full" value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                        <option value="">Fakultas</option>
                                        {Fakultas.map((item) => (
                                            <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select className="select select-sm select-bordered w-full" value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
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
                        <div className='border-t-2 border-t-[#2D7F5F] grid gap-2'>
                            <div className='mt-2'><button className='btn btn-sm btn-default float-right' onClick={modalOpen}><FaPlus /><span className="ml-1">tambah</span></button></div>
                            {title && <div className="italic text-center text-sm mt-4"><span className='text-red-700'>{title}</span></div>}
                            <div className='mt-1'>
                                {Makul.map((kls, index) => (
                                    <div key={kls.id_mata_kuliah} className="collapse bg-[#2D7F5F] pb-0 rounded-lg">
                                        <input type="checkbox" checked className='p-0 min-h-0' readOnly />
                                        <div className="collapse-title p-2 min-h-0 text-white flex gap-2">
                                            <span>{kls.nama_mata_kuliah} | </span><span>SKS {kls.sks}</span>
                                        </div>
                                        <div className="collapse-content grid gap-1 px-0 py-1 bg-base-100">
                                            {DataKelas != 0 ? DataKelas[index].map((item) => (
                                                <div key={item.id_kelas} className="grid grid-cols-3 gap-2 px-4 py-2 bg-base-200">
                                                    <button className='btn btn-sm btn-ghost pointer-events-none w-14'><FaHotel /> <span className="ml-1">{item.nama_kelas}</span></button>
                                                    <button className='btn btn-sm btn-ghost pointer-events-none'><FaUsers /> <span className="ml-1">{item.kapasitas}</span></button>
                                                    <div>
                                                        <button className='btn btn-xs btn-danger btn-circle float-right' onClick={() => hapusKelas(item.code_mata_kuliah, item.nama_kelas)} title='Hapus'><FaTrash /></button>
                                                    </div>
                                                </div>
                                            )) : ""}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default ListKelas