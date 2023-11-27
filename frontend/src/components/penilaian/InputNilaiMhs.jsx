import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
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
    const [jumlahMhs, setJumlahMhs] = useState("")
    const [inputFields, setInputFields] = useState([])
    const [fakul, setFakul] = useState("")
    const [prodi, setProdi] = useState("")
    const [tahun, setTahun] = useState("")
    const [tugas, setTugas] = useState([])
    const [uts, setUts] = useState([])
    const [uas, setUas] = useState([])
    const [absen, setAbsen] = useState([])
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
        getTugas()
        getAbsen()
        getUas()
        getUts()
    }, [inputFields])

    useEffect(() => {
        getAverage()
        getSum()
    }, [inputFields])

    useEffect(() => {
        cekNilai()
    }, [nilaiAkhir, location.state])

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

    const addFields = () => {
        let newfield = []
        for (let index = 1; index <= jmlMhs; index++) {
            newfield.push({ tugas: '', uts: '', uas: '', absen: '' })
        }
        setInputFields(newfield)
        // console.log(newfield);
    }

    const getMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/kelasKuliah/getMhsByKelas/${location.state.kod}`)
            setMahasiswa(response.data.data)
            setJmlMhs(response.data.data.length)
        } catch (error) {

        }
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
        inputFields.map(item => (
            newfield.push(parseInt(item.uts))
        ))
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
        const i = inputFields.map(el => {
            let tugas = parseInt(el.tugas) || 0
            let hadir = parseInt(el.absen) || 0
            let uts = parseInt(el.uts) || 0
            let uas = parseInt(el.uas) || 0
            let rataRata = (tugas + hadir + uts + uas) / 4
            return rataRata
        })
        // console.log(i);
        setNIlaiAkhir(i)
    }

    const getSum = () => {
        const i = inputFields.map(el => {
            var tugas = parseInt(el.tugas) || 0
            var hadir = parseInt(el.absen) || 0
            var uts = parseInt(el.uts) || 0
            var uas = parseInt(el.uas) || 0
            var sum = (tugas + hadir + uts + uas)
            return sum
        })
        setNilaiSum(i)
    }

    const cekNilai = async () => {
        let nilai = []
        let kode = []
        let status = []
        let promises = []
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
    }

    const simpanNilai = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
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
                    navigate(`/detailnilai`, { state: { mk: location.state.mk, idn: location.state.idn, kod: location.state.kod, collaps: 'kuliah', activ: '/penilaian' } })
                });
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
                                        <Link to={`/detailnilai`} state={{ mk: location.state.mk, idn: location.state.idn, kod: location.state.kod, collaps: 'kuliah', activ: '/penilaian' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply /> Kembali</Link>
                                        {jmlMhs == null ? "" : <button className='btn btn-sm btn-primary capitalize rounded-md'><FaSave /> simpan</button>}
                                    </div>
                                </div>
                                <div className="overflow-x-auto mb-2">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className='text-gray-700 bg-[#F2F2F2]'>
                                            <tr>
                                                <th scope="col" align='center' className="px-3 py-3 border w-10">#</th>
                                                <th scope="col" align='center' className="px-3 py-3 border w-16">NIM</th>
                                                <th scope="col" align='center' className="px-3 py-3 border">Nama</th>
                                                <th scope="col" align='center' className="px-3 py-3 border w-28">Tugas Individu</th>
                                                <th scope="col" align='center' className="px-3 py-3 border w-28">UTS</th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-28'>UAS</th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-28'>Absen</th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-28'>Jumlah</th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-20'>Nilai</th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-20'>Grade</th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-28'>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Mahasiswa.map((mhs, index) => (
                                                <tr key={index} className='bg-white border text-gray-900'>
                                                    <td className='px-2 py-2 border' align='center'>{index + 1}</td>
                                                    <td className='px-2 py-2 border'>{mhs.nim}</td>
                                                    <td className='px-2 py-2 border'>{mhs.mahasiswas[0].nama}</td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='tugas' value={tugas[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='uts' value={uts[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='uas' value={uas[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='absen' value={absen[index] || ''} onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
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