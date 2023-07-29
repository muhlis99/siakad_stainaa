import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'
import { FaEdit, FaFileSignature, FaReply } from 'react-icons/fa'

const DetailNilai = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [jenjang, setJenjang] = useState("")
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [fakul, setFakul] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [prodi, setProdi] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [tahun, setTahun] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeSemester, setKodeSemester] = useState("")
    const [nmKls, setNmKls] = useState("")
    const [nmMk, setNmMk] = useState("")
    const [sem, setSem] = useState("")
    const [juml, setJuml] = useState("")
    const location = useLocation()

    useEffect(() => {
        getKelasById()
    }, [location.state])

    useEffect(() => {
        getMahasiswa()
    }, [location.state])

    const getMahasiswa = async () => {
        const response = await axios.get(`v1/nilaiKuliah/all?codeMakul=${location.state.mk}&codeKls=${location.state.kod}`)
        setMahasiswa(response.data.data)
        setJuml(response.data.data.length)
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
        setKodeFakultas(response.data.data.code_fakultas)
        setKodeJenjang(response.data.data.code_jenjang_pendidikan)
        setKodeProdi(response.data.data.code_prodi)
        setKodeTahun(response.data.data.code_tahun_ajaran)
        setKodeSemester(response.data.data.code_semester)
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Penilaian Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-2 gap-3 mb-2 bg-base-200 p-3 rounded-md">
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
                                    <Link to="/penilaian" state={{ thn: kodeTahun, smt: kodeSemester, jen: kodeJenjang, fak: kodeFakultas, pro: kodeProdi }} className='btn btn-sm btn-error'><FaReply />kembali</Link>
                                    {juml == 0 ? <Link to="/inputnilai" state={{ thn: kodeTahun, smt: kodeSemester, jen: kodeJenjang, fak: kodeFakultas, pro: kodeProdi, mk: location.state.mk, idn: location.state.idn, kod: location.state.kod }} className='btn btn-sm btn-primary'><FaFileSignature />input nilai</Link> : <Link to="/updatenilai" state={{ thn: kodeTahun, smt: kodeSemester, jen: kodeJenjang, fak: kodeFakultas, pro: kodeProdi, mk: location.state.mk, idn: location.state.idn, kod: location.state.kod }} className='btn btn-sm btn-primary'><FaEdit />edit nilai</Link>}
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
                                    {juml == 0 ?
                                        <tbody>
                                            <tr>
                                                <td colSpan='11' align='center' className='px-2 py-2 border'><p>Anda belum melakukan input nilai mata kuliah {nmMk} Kelas {nmKls}</p></td>
                                            </tr>
                                        </tbody> :
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
                                    }
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