import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, useLocation, Link, json } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaReply, FaSave } from 'react-icons/fa'
import Loading from '../Loading'

const InputNilaiMhs = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [jenjang, setJenjang] = useState("")
    const [nmKls, setNmKls] = useState("")
    const [nmMk, setNmMk] = useState("")
    const [sem, setSem] = useState("")
    const [jmlMhs, setJmlMhs] = useState("")
    const [nilaiAkhir, setNIlaiAkhir] = useState([])
    const [nilaiHuruf, setNilaiHuruf] = useState([])
    const [ket, setKet] = useState([])
    const [kodeNilai, setKodeNilai] = useState([])
    const [nilaiSum, setNilaiSum] = useState([])
    const [inputFields, setInputFields] = useState([])
    const [fakul, setFakul] = useState("")
    const [prodi, setProdi] = useState("")
    const [tahun, setTahun] = useState("")
    const [presentasi, setPresentasi] = useState([])
    const [checkedpres, setCheckedpres] = useState(false)
    const [materi, setMateri] = useState([])
    const [checkedmtr, setCheckedmtr] = useState(false)
    const [tugas, setTugas] = useState([])
    const [checkedtgs, setCheckedtgs] = useState(false)
    const [pptx, setPptx] = useState([])
    const [checkedppt, setCheckedppt] = useState(false)
    const [keaktifan, setKeaktifan] = useState([])
    const [checkedaktif, setCheckedaktif] = useState(false)
    const [uts, setUts] = useState([])
    const [checkedUts, setCheckedUts] = useState(false)
    const [uas, setUas] = useState([])
    const [checkedUas, setCheckedUas] = useState(false)
    const [absen, setAbsen] = useState([])
    const [checkedAbsen, setCheckedAbsen] = useState(false)
    const [jumlahKolom, setjumlahKolom] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const min = 0
    const max = 100

    const handleFormChange = (index, event) => {
        let data = [...inputFields]
        data[index][event.target.name] = Math.max(Number(min), Math.min(Number(max), Number(event.target.value)))
        setInputFields(data)
    }

    useEffect(() => {
        getKelasById()
    }, [location.state])

    useEffect(() => {
        getMahasiswa()
    }, [location.state])

    useEffect(() => {
        addFields()
    }, [jmlMhs])

    useEffect(() => {
        getPresentasi()
        getMateri()
        getPptx()
        getKeaktifan()
        getTugas()
        getUts()
        getUas()
        getAbsen()
    }, [inputFields])

    useEffect(() => {
        getAverage()
        getSum()
    }, [inputFields, jumlahKolom])

    useEffect(() => {
        cekNilai()
    }, [nilaiAkhir, location.state])

    const addFields = () => {
        let newfield = []
        for (let index = 1; index <= jmlMhs; index++) {
            newfield.push({ presentasi: '', materi: '', pptx: '', keaktifan: '', tugas: '', uts: '', uas: '', absen: '' })
        }
        setInputFields(newfield)
    }

    const handleChangePres = () => {
        setCheckedpres(!checkedpres)
        if (!checkedpres) {
            setjumlahKolom([...jumlahKolom, 'A'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'A'))
            for (var i = 0; i < document.getElementsByName('presentasi').length; i++) {
                let datas = inputFields[i]
                inputFields[i].presentasi = ""
            }
        }
        for (var i = 0; i < document.getElementsByName('presentasi').length; i++) {
            document.getElementsByName('presentasi')[i].disabled = false;
        }
    }

    const handleChangeMateri = () => {
        setCheckedmtr(!checkedmtr)
        if (!checkedmtr) {
            setjumlahKolom([...jumlahKolom, 'B'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'B'))
            for (var i = 0; i < document.getElementsByName('materi').length; i++) {
                let datas = inputFields[i]
                inputFields[i].materi = ""
            }
        }
        for (var i = 0; i < document.getElementsByName('materi').length; i++) {
            document.getElementsByName('materi')[i].disabled = false;
        }
    }

    const handleChangePptx = () => {
        setCheckedppt(!checkedppt)
        if (!checkedppt) {
            setjumlahKolom([...jumlahKolom, 'C'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'C'))
            for (var i = 0; i < document.getElementsByName('pptx').length; i++) {
                let datas = inputFields[i]
                inputFields[i].pptx = ""
            }
        }
        for (var i = 0; i < document.getElementsByName('pptx').length; i++) {
            document.getElementsByName('pptx')[i].disabled = false;
        }
    }

    const handleChangeAktif = () => {
        setCheckedaktif(!checkedaktif)
        if (!checkedaktif) {
            setjumlahKolom([...jumlahKolom, 'D'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'D'))
            for (var i = 0; i < document.getElementsByName('keaktifan').length; i++) {
                let datas = inputFields[i]
                inputFields[i].keaktifan = ""
            }
        }
        for (var i = 0; i < document.getElementsByName('keaktifan').length; i++) {
            document.getElementsByName('keaktifan')[i].disabled = false;
        }
    }

    const handleChangeTgs = () => {
        setCheckedtgs(!checkedtgs)
        if (!checkedtgs) {
            setjumlahKolom([...jumlahKolom, 'E'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'E'))
            for (var i = 0; i < document.getElementsByName('tugas').length; i++) {
                let datas = inputFields[i]
                inputFields[i].tugas = ""
            }
        }
        for (var i = 0; i < document.getElementsByName('tugas').length; i++) {
            document.getElementsByName('tugas')[i].disabled = false;
        }
    }

    const handleChangeUts = () => {
        setCheckedUts(!checkedUts)
        if (!checkedUts) {
            setjumlahKolom([...jumlahKolom, 'F'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'F'))
            for (var i = 0; i < document.getElementsByName('uts').length; i++) {
                let datas = inputFields[i]
                inputFields[i].uts = ""
            }
        }
        for (var i = 0; i < document.getElementsByName('uts').length; i++) {
            document.getElementsByName('uts')[i].disabled = false;

        }
    }

    const handleChangeUas = () => {
        setCheckedUas(!checkedUas)
        if (!checkedUas) {
            setjumlahKolom([...jumlahKolom, 'G'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'G'))
            for (var i = 0; i < document.getElementsByName('uas').length; i++) {
                let datas = inputFields[i]
                inputFields[i].uas = ""
            }
        }
        for (var i = 0; i < document.getElementsByName('uas').length; i++) {
            document.getElementsByName('uas')[i].disabled = false;
        }
    }

    const handleChangeAbsen = () => {
        setCheckedAbsen(!checkedAbsen)
        if (!checkedAbsen) {
            setjumlahKolom([...jumlahKolom, 'H'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'H'))
            for (var i = 0; i < document.getElementsByName('absen').length; i++) {
                let datas = inputFields[i]
                inputFields[i].absen = ""
            }
        }
        for (var i = 0; i < document.getElementsByName('absen').length; i++) {
            document.getElementsByName('absen')[i].disabled = false;
        }
    }

    const getKelasById = async () => {
        const response = await axios.get(`v1/kelasKuliah/getKelasById/${location.state.idn}`)
        setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
        setFakul(response.data.data.fakultas[0].nama_fakultas)
        setProdi(response.data.data.prodis[0].nama_prodi)
        setTahun(response.data.data.tahunAjarans[0].tahun_ajaran)
        setNmKls(response.data.data.nama_kelas)
        setNmMk(response.data.data.mataKuliahs[0].nama_mata_kuliah)
        setSem(response.data.data.semesters[0].semester)
    }

    const getMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/kelasKuliah/getMhsByKelas/${location.state.kod}`)
            setMahasiswa(response.data.data)
            setJmlMhs(response.data.data.length)
        } catch (error) {

        }
    }

    const getPresentasi = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.presentasi))
        ))
        setPresentasi(newfield)
    }

    const getMateri = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.materi))
        ))
        setMateri(newfield)
    }

    const getPptx = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.pptx))
        ))
        setPptx(newfield)
    }

    const getKeaktifan = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.keaktifan))
        ))
        setKeaktifan(newfield)
    }

    const getTugas = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.tugas))
        ))
        setTugas(newfield)
    }

    const getUts = () => {
        let newfield = []
        inputFields.map(item => {
            newfield.push(parseInt(item.uts))
        }
        )
        setUts(newfield)
    }

    const getUas = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.uas))
        ))
        setUas(newfield)
    }

    const getAbsen = () => {
        let newfield = []
        inputFields.map(item => (
            newfield.push(parseInt(item.absen))
        ))
        setAbsen(newfield)
    }

    const getAverage = () => {
        if (jumlahKolom.length != 0) {
            const i = inputFields.map(el => {
                let presentasi = parseInt(el.presentasi) || 0
                let materi = parseInt(el.materi) || 0
                let pptx = parseInt(el.pptx) || 0
                let keaktifan = parseInt(el.keaktifan) || 0
                let tugas = parseInt(el.tugas) || 0
                let hadir = parseInt(el.absen) || 0
                let uts = parseInt(el.uts) || 0
                let uas = parseInt(el.uas) || 0
                let rataRata = (presentasi + materi + pptx + keaktifan + tugas + hadir + uts + uas) / jumlahKolom.length
                return rataRata
            })
            setNIlaiAkhir(i)
        }
    }

    const getSum = () => {
        if (jumlahKolom.length != 0) {
            const i = inputFields.map(el => {
                var presentasi = parseInt(el.presentasi) || 0
                var materi = parseInt(el.materi) || 0
                var pptx = parseInt(el.pptx) || 0
                var keaktifan = parseInt(el.keaktifan) || 0
                var tugas = parseInt(el.tugas) || 0
                var hadir = parseInt(el.absen) || 0
                var uts = parseInt(el.uts) || 0
                var uas = parseInt(el.uas) || 0
                var sum = (presentasi + materi + pptx + keaktifan + tugas + hadir + uts + uas)
                return sum
            })
            setNilaiSum(i)
        }
    }

    const cekNilai = async () => {
        let nilai = []
        let kode = []
        let status = []
        let promises = []
        try {
            for (let i = 0; i < nilaiAkhir.length; i++) {
                if (nilaiAkhir[i] === 0) {
                    promises.push("")
                } else {
                    const d = await axios.get(`/v1/nilaiKuliah/deteksiIndexNilai/${nilaiAkhir[i]}/${location.state.thn}`).then(response => {
                        nilai.push(response.data.data[0].nilai_huruf)
                        kode.push(response.data.data[0].code_kategori_nilai)
                        status.push(response.data.data[0].keterangan)
                    })
                    promises.push(d)
                }
            }
            Promise.all(promises).then(() => setNilaiHuruf(nilai))
            Promise.all(promises).then(() => setKodeNilai(kode))
            Promise.all(promises).then(() => setKet(status))
        } catch (error) {

        }
    }

    const simpanNilai = async (e) => {
        e.preventDefault()
        try {
            // setLoading(true)
            if (kodeNilai.length != Mahasiswa.length) {
                Swal.fire({
                    icon: 'error',
                    title: 'Input Nilai Belum Tuntas',
                })
            } else {

                await axios.post('v1/nilaiKuliah/create',
                    Mahasiswa.map((item, index) => ({
                        code_kelas: location.state.kod,
                        code_mata_kuliah: location.state.mk,
                        code_kategori_nilai: kodeNilai[index],
                        code_tahun_ajaran: location.state.thn,
                        code_semester: location.state.smt,
                        code_jenjang_pendidikan: location.state.jen,
                        code_fakultas: location.state.fak,
                        code_prodi: location.state.pro,
                        nim: item.nim,
                        nilai_presentasi: inputFields[index].presentasi,
                        nilai_penguasaan_materi: inputFields[index].materi,
                        nilai_slide_power_point: inputFields[index].pptx,
                        nilai_keaktifan: inputFields[index].keaktifan,
                        nilai_hadir: inputFields[index].absen,
                        nilai_tugas: inputFields[index].tugas,
                        nilai_uts: inputFields[index].uts,
                        nilai_uas: inputFields[index].uas,
                        nilai_jumlah: nilaiSum[index],
                        nilai_akhir: nilaiAkhir[index]
                    }))
                ).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate(`/detailnilai`, { state: { mk: location.state.mk, idn: location.state.idn, kod: location.state.kod, kodeThn: location.state.thn, collaps: 'kuliah', activ: '/penilaian' } })
                    });
                })
            }
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
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={simpanNilai}>
                            <div className="grid grid-cols-2 gap-3 mb-5 p-3 rounded-md">
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-36'>
                                        <label>
                                            <span className="">Jenjang Pendidikan</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{jenjang}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-36'>
                                        <label>
                                            <span className="">Tahun Ajaran</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{tahun}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-36'>
                                        <label>
                                            <span className="">Fakultas</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{fakul}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-36'>
                                        <label>
                                            <span className="">Semester</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{sem}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-36'>
                                        <label>
                                            <span className="">Prodi</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{prodi}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-36'>
                                        <label>
                                            <span className="">Mata Kuliah</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{nmMk}</a>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex-initial w-36'>
                                        <label>
                                            <span className="">Kelas</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{nmKls}</a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid">
                                <div className='mb-2'>
                                    <div className='float-right flex gap-2'>
                                        <Link to={`/detailnilai`} state={{ mk: location.state.mk, idn: location.state.idn, kod: location.state.kod, kodeThn: location.state.thn, collaps: 'kuliah', activ: '/penilaian' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply /> Kembali</Link>
                                        {jmlMhs == null ? "" : <button className='btn btn-sm btn-primary capitalize rounded-md'><FaSave /> simpan</button>}
                                    </div>
                                </div>
                                <div className="overflow-x-auto mb-2">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className='text-gray-700 bg-[#F2F2F2]'>
                                            <tr className='h-28'>
                                                <th scope="col" align='center' className="px-2 py-3 border w-10 text-[13px]">#</th>
                                                <th scope="col" align='center' className="px-2 py-3 border w-16 text-[13px]">NIM</th>
                                                <th scope="col" align='center' className="px-2 py-3 border text-[13px]">Nama</th>
                                                <th scope='col' align='center' className='py-3 border w-10'>
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checkedpres}
                                                                    onChange={() => handleChangePres()}
                                                                    className="checkbox checkbox-success checkbox-xs rounded-none"
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className='text-[13px] -rotate-90'>Presentasi</span>
                                                    </div>
                                                </th>
                                                <th scope='col' align='center' className='py-3 border w-10'>
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checkedmtr}
                                                                    onChange={() => handleChangeMateri()}
                                                                    className="checkbox checkbox-success checkbox-xs rounded-none"
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className='text-[13px] -rotate-90'>Penguasaan</span>
                                                    </div>
                                                </th>
                                                <th scope='col' align='center' className='py-3 border w-10'>
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checkedppt}
                                                                    onChange={() => handleChangePptx()}
                                                                    className="checkbox checkbox-success checkbox-xs rounded-none"
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className='text-[13px] -rotate-90'>Power&nbsp;Point</span>
                                                    </div>
                                                </th>
                                                <th scope='col' align='center' className='py-3 border w-10'>
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checkedaktif}
                                                                    onChange={() => handleChangeAktif()}
                                                                    className="checkbox checkbox-success checkbox-xs rounded-none"
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className='text-[13px] -rotate-90'>Keaktifan</span>
                                                    </div>
                                                </th>
                                                <th scope="col" align='center' className="py-3 border w-10">
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checkedtgs}
                                                                    onChange={() => handleChangeTgs()}
                                                                    className="checkbox checkbox-success checkbox-xs rounded-none"
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className='text-[13px] -rotate-90'>Tugas</span>
                                                    </div>
                                                </th>
                                                <th scope="col" align='center' className="py-3 border w-10">
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checkedUts}
                                                                    onChange={handleChangeUts}
                                                                    className="checkbox checkbox-success checkbox-xs rounded-none"
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className='text-[13px] -rotate-90'>UTS</span>
                                                    </div>
                                                </th>
                                                <th scope="col" align='center' className='py-3 border w-10'>
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checkedUas}
                                                                    onChange={handleChangeUas}
                                                                    className="checkbox checkbox-success checkbox-xs rounded-none"
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className='text-[13px] -rotate-90'>UAS</span>
                                                    </div>
                                                </th>
                                                <th scope="col" align='center' className='py-3 border w-10'>
                                                    <div className='flex gap-1 items-center justify-center'>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checkedAbsen}
                                                                    onChange={handleChangeAbsen}
                                                                    className="checkbox checkbox-success checkbox-xs rounded-none"
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className='text-[13px] -rotate-90'>Absen</span>
                                                    </div>
                                                </th>
                                                <th scope="col" align='center' className='px-2 py-3 border w-28'>Jumlah</th>
                                                <th scope="col" align='center' className='px-2 py-3 border w-20'>Nilai</th>
                                                <th scope="col" align='center' className='px-2 py-3 border w-20'>Grade</th>
                                                <th scope="col" align='center' className='px-2 py-3 border w-28'>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Mahasiswa.map((mhs, index) => (
                                                <tr key={index} className='bg-white border text-gray-900'>
                                                    <td className='px-2 py-2 border' align='center'>{index + 1}</td>
                                                    <td className='px-2 py-2 border'>{mhs.nim}</td>
                                                    <td className='px-2 py-2 border'>{mhs.mahasiswas[0].nama}</td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='presentasi' value={presentasi[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[70px]' disabled={!checkedpres} />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='materi' value={materi[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[70px]' disabled={!checkedmtr} />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='pptx' value={pptx[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[70px]' disabled={!checkedppt} />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='keaktifan' value={keaktifan[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[70px]' disabled={!checkedaktif} />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='tugas' value={tugas[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[70px]' disabled={!checkedtgs} />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='uts' value={uts[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[70px]' disabled={!checkedUts} />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='uas' value={uas[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[70px]' disabled={!checkedUas} />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='absen' value={absen[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[70px]' disabled={!checkedAbsen} />
                                                    </td>
                                                    <td className='px-2 py-2 border'>{nilaiSum[index] == 0 ? "" : nilaiSum[index]}</td>
                                                    <td className='px-2 py-2 border'>{nilaiAkhir[index] == "0" ? "" : nilaiAkhir[index]}</td>
                                                    <td className='px-2 py-2 border'>{nilaiHuruf[index]}</td>
                                                    <td className='px-2 py-2 border'>{ket[index]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default InputNilaiMhs