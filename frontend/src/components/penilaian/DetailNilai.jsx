import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const DetailNilai = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const { kodeMk } = useParams()
    const { kodeKls } = useParams()
    const { idMk } = useParams()
    const [fakul, setFakul] = useState("")
    const [prodi, setProdi] = useState("")
    const [tahun, setTahun] = useState("")

    useEffect(() => {
        getMakulById()
    }, [idMk])

    useEffect(() => {
        getMahasiswa()
    }, [kodeMk, kodeKls])

    const getMahasiswa = async () => {
        if (kodeMk != 0 & kodeKls != 0) {
            const response = await axios.get(`v1/nilaiKuliah/all?codeMakul=${kodeMk}&codeKls=${kodeKls}`)
            setMahasiswa(response.data.data)
        }
    }

    const getMakulById = async () => {
        const response = await axios.get(`v1/mataKuliah/getById/${idMk}`)
        setFakul(response.data.data.fakultas[0].nama_fakultas)
        setProdi(response.data.data.prodis[0].nama_prodi)
        setTahun(response.data.data.tahunAjarans[0].tahun_ajaran)
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Penilaian Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
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
                                        <span className="">Fakultas</span>
                                    </label>
                                </div>
                                {/* <div className='flex-initial w-80'>
                                        <select className='select select-sm select-bordered w-full' value={kodeKelas} onChange={(e) => setKodeKelas(e.target.value)}>
                                            <option value="">Kelas</option>
                                            {Kelas.map((item) => (
                                                <option key={item.id_kelas} value={item.code_kelas}>Kelas {item.nama_kelas}</option>
                                            ))}
                                        </select>
                                    </div> */}
                            </div>
                        </div>
                        <div className="grid">
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
                                                <td className='px-2 py-2 border'>{mhs.nilai_tugas}</td>
                                                <td className='px-2 py-2 border'>{mhs.nilai_uts}</td>
                                                <td className='px-2 py-2 border'>{mhs.nilai_uas}</td>
                                                <td className='px-2 py-2 border'>{mhs.nilai_hadir}</td>
                                                <td className='px-2 py-2 border'>{mhs.nilai_jumlah}</td>
                                                <td className='px-2 py-2 border'>{mhs.nilai_akhir}</td>
                                                <td className='px-2 py-2 border'>{mhs.kategoriNilais[0].nilai_huruf}</td>
                                                <td className='px-2 py-2 border'>{mhs.kategoriNilais[0].keterangan}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default DetailNilai