import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const InputNilaiMhs = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [jmlMhs, setJmlMhs] = useState("")
    const [nilaiAkhir, setNIlaiAkhir] = useState([])
    const [nilaiHuruf, setNilaiHuruf] = useState([])
    const [kodeNilai, setKodeNilai] = useState([])
    const [nilaiSum, setNilaiSum] = useState([])
    const { kodeMk } = useParams()
    const { kodeSmt } = useParams()
    const { kodeTahun } = useParams()
    const { idMk } = useParams()
    const [Kelas, setKelas] = useState([])
    const [kodeKelas, setKodeKelas] = useState("")
    const [btn, setBtn] = useState("")
    const navigate = useNavigate()
    const [inputFields, setInputFields] = useState([])
    const [fakul, setFakul] = useState("")
    const [prodi, setProdi] = useState("")
    const [tahun, setTahun] = useState("")

    const [value, setValue] = useState()

    const handleFormChange = (index, event) => {
        // let data = Math.max(min, Math.min(max, Number([...inputFields])))
        let data = [...inputFields]
        data[index][event.target.name] = event.target.value
        // if (event.target.value <= 100) {
        //     setInputFields(data)
        // } else {
        //     alert('lebih')
        //     data[index][event.target.name] = ""
        setInputFields(data)
        // }
        // console.log(data)
    }

    useEffect(() => {
        getMakulById()
    }, [idMk])

    useEffect(() => {
        getKelas()
    }, [kodeMk])

    useEffect(() => {
        getMahasiswa()
    }, [kodeSmt, kodeMk, kodeKelas])

    useEffect(() => {
        addFields()
    }, [jmlMhs])

    useEffect(() => {
        getAverage()
        getSum()
    }, [inputFields])

    useEffect(() => {
        cekNilai()
    }, [nilaiAkhir, kodeTahun])

    const getMakulById = async () => {
        const response = await axios.get(`v1/mataKuliah/getById/${idMk}`)
        setFakul(response.data.data.fakultas[0].nama_fakultas)
        setProdi(response.data.data.prodis[0].nama_prodi)
        setTahun(response.data.data.nama_mata_kuliah)
    }

    const getKelas = async () => {
        const response = await axios.get(`v1/kelasKuliah/getKelasByMakul/${kodeMk}`)
        setKelas(response.data.data)
    }

    const addFields = () => {
        let newfield = []
        for (let index = 1; index <= jmlMhs; index++) {
            newfield.push({ tugas: '', uts: '', uas: '', absen: '' })
        }
        // console.log(newfield)
        setInputFields(newfield)

    }

    const getMahasiswa = async () => {
        if (kodeMk != 0 & kodeSmt != 0 & kodeKelas != 0) {
            const response = await axios.get(`v1/nilaiKuliah/getMhsByKelas/${kodeSmt}/${kodeMk}/${kodeKelas}`)
            setMahasiswa(response.data.data)
            setJmlMhs(response.data.data.length)
            setBtn('simpan')
        } else {
            setBtn("")
        }
    }

    const getAverage = () => {
        const i = inputFields.map(el => {
            var tugas = parseInt(el.tugas) || 0
            var hadir = parseInt(el.absen) || 0
            var uts = parseInt(el.uts) || 0
            var uas = parseInt(el.uas) || 0
            var rataRata = (tugas + hadir + uts + uas) / 4
            return rataRata
        })
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
        let promises = []
        for (let i = 0; i < nilaiAkhir.length; i++) {
            if (nilaiAkhir[i] === 0) {
                promises.push("")
            } else {
                const d = await axios.get(`/v1/nilaiKuliah/deteksiIndexNilai/${nilaiAkhir[i]}/${kodeTahun}`).then(response => {
                    nilai.push(response.data.data[0].nilai_huruf)
                    kode.push(response.data.data[0].code_kategori_nilai)
                })
                promises.push(d)
            }
        }
        Promise.all(promises).then(() => setNilaiHuruf(nilai))
        Promise.all(promises).then(() => setKodeNilai(kode))
    }

    const simpanNilai = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/nilaiKuliah/create',
                Mahasiswa.map((item, index) => ({
                    code_kelas: kodeKelas,
                    code_mata_kuliah: kodeMk,
                    code_kategori_nilai: kodeNilai[index],
                    nim: item.nim,
                    nilai_hadir: inputFields[index].absen,
                    nilai_tugas: inputFields[index].tugas,
                    nilai_uts: inputFields[index].uts,
                    nilai_uas: inputFields[index].uas,
                    nilai_jumlah: nilaiSum[index],
                    nilai_akhir: nilaiAkhir[index]
                }))
            ).then(function (response) {
                console.log(response)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    navigate(`/detail/${kodeMk}/${kodeKelas}/${idMk}`)
                });
            })
        } catch (error) {
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
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Penilaian Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <form onSubmit={simpanNilai}>
                            <div className="grid grid-cols-2 gap-3 mb-5 bg-base-200 p-3 rounded-md">
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
                                            <span className="">Mata Kuliah</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <a>{tahun}</a>
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
                                            <span className="">Kelas</span>
                                        </label>
                                    </div>
                                    <div className='flex-initial w-80'>
                                        <select className='select select-sm select-bordered w-full' value={kodeKelas} onChange={(e) => setKodeKelas(e.target.value)}>
                                            <option value="">Kelas</option>
                                            {Kelas.map((item) => (
                                                <option key={item.id_kelas} value={item.code_kelas}>{item.nama_kelas}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="grid">
                                <div className='mb-1'>
                                    {btn && <button className='btn btn-sm btn-default float-right'>simpan</button>}
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
                                                        <input type="number" name='tugas' onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='uts' onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='uas' onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                                    </td>
                                                    <td className='px-2 py-2 border'>
                                                        <input type="number" name='absen' onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                                    </td>
                                                    <td className='px-2 py-2 border'>{nilaiSum[index] == 0 ? "" : nilaiSum[index]}</td>
                                                    <td className='px-2 py-2 border'>{nilaiAkhir[index] == "0" ? "" : nilaiAkhir[index]}</td>
                                                    <td className='px-2 py-2 border'>{nilaiHuruf[index]}</td>
                                                    <td className='px-2 py-2 border'></td>
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