import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'
import { FaEdit, FaFileSignature, FaReply, FaPencilAlt } from 'react-icons/fa'

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
    const [kodeMk, setKodeMk] = useState("")
    const [nmKls, setNmKls] = useState("")
    const [nmMk, setNmMk] = useState("")
    const [sem, setSem] = useState("")
    const [juml, setJuml] = useState("")
    const [nilaiFixed, setNilaiFixed] = useState([])
    const location = useLocation()

    useEffect(() => {
        getKelasById()
        console.log(location.state);
    }, [location.state])

    useEffect(() => {
        getMahasiswa()
    }, [location.state])

    useEffect(() => {
        getNilaiFixed()
    }, [Mahasiswa])

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
        setKodeMk(response.data.data.code_mata_kuliah)
    }

    const getMahasiswa = async () => {
        const response = await axios.get(`v1/nilaiKuliah/all?codeMakul=${location.state.mk}&codeKls=${location.state.kod}&codeThnAjr=${location.state.thn}`)
        setMahasiswa(response.data.data)
        setJuml(response.data.data.length)
    }

    const getNilaiFixed = () => {
        if (Mahasiswa.length != 0) {
            const i = Mahasiswa.map(el => {
                let fix = parseFloat(el.nilai_akhir)
                return fix.toFixed(2)
            })
            setNilaiFixed(i)
        }
    }


    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Penilaian Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-2 gap-3 mb-2 p-3 rounded-md">
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
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="">Kode Matakuliah</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a>{kodeMk}</a>
                                </div>
                            </div>
                        </div>
                        <div className="grid">
                            <div className='mb-2'>
                                <Link to="/penilaian" state={{ thn: kodeTahun, smt: kodeSemester, jen: kodeJenjang, fak: kodeFakultas, pro: kodeProdi, collaps: 'kuliah', activ: '/penilaian' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply />kembali</Link>
                                <div className='float-right flex gap-2'>
                                    {juml == 0 ?
                                        <Link to="/inputnilai" state={{ thn: location.state.thn, smt: location.state.smt, jen: kodeJenjang, fak: kodeFakultas, pro: kodeProdi, mk: location.state.mk, idn: location.state.idn, kod: location.state.kod, collaps: 'kuliah', activ: '/penilaian' }} className='btn btn-sm btn-primary capitalize rounded-md'><FaFileSignature />input nilai</Link>
                                        :
                                        ""}
                                </div>
                            </div>
                            <div className="overflow-x-auto mb-2">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className='text-gray-700 bg-[#F2F2F2]'>
                                        <tr>
                                            <th scope="col" align='center' className="px-2 text-[12px] py-3 border w-10">#</th>
                                            <th scope="col" align='center' className="px-2 text-[12px] py-3 border w-16">NIM</th>
                                            <th scope="col" align='center' className="px-2 text-[12px] py-3 border">Nama</th>
                                            <th scope="col" align='center' className="px-2 text-[12px] py-3 border w-28">Presentasi</th>
                                            <th scope="col" align='center' className="px-2 text-[12px] py-3 border w-28">Penguasaan Materi</th>
                                            <th scope="col" align='center' className="px-2 text-[12px] py-3 border w-28">Power Point</th>
                                            <th scope="col" align='center' className="px-2 text-[12px] py-3 border w-28">Keaktifan</th>
                                            <th scope="col" align='center' className="px-2 text-[12px] py-3 border w-28">Tugas</th>
                                            <th scope="col" align='center' className="px-2 text-[12px] py-3 border w-28">UTS</th>
                                            <th scope="col" align='center' className='px-2 text-[12px] py-3 border w-28'>UAS</th>
                                            <th scope="col" align='center' className='px-2 text-[12px] py-3 border w-28'>Absen</th>
                                            <th scope="col" align='center' className='px-2 text-[12px] py-3 border w-28'>Jumlah</th>
                                            <th scope="col" align='center' className='px-2 text-[12px] py-3 border w-20'>Nilai</th>
                                            <th scope="col" align='center' className='px-2 text-[12px] py-3 border w-20'>Grade</th>
                                            <th scope="col" align='center' className='px-2 text-[12px] py-3 border w-28'>Status</th>
                                            <th scope="col" align='center' className='px-2 text-[12px] py-3 border w-28'>Aksi</th>
                                        </tr>
                                    </thead>
                                    {juml == 0 ?
                                        <tbody>
                                            <tr>
                                                <td colSpan='15' align='center' className='px-2 py-2 border'><p>Anda belum melakukan input nilai mata kuliah {nmMk} Kelas {nmKls}</p></td>
                                            </tr>
                                        </tbody> :
                                        <tbody>
                                            {Mahasiswa.map((mhs, index) => (
                                                <tr key={index} className='bg-white border text-gray-900'>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{index + 1}</td>
                                                    <td className='px-2 text-[12px] py-2 border'>{mhs.nim}</td>
                                                    <td className='px-2 text-[12px] py-2 border'>{mhs.mahasiswas[0].nama}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.nilai_presentasi}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.nilai_penguasaan_materi}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.nilai_slide_power_point}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.nilai_keaktifan}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.nilai_tugas}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.nilai_uts}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.nilai_uas}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.nilai_hadir}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.nilai_jumlah}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{nilaiFixed[index]}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.kategoriNilais[0].nilai_huruf}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>{mhs.kategoriNilais[0].keterangan}</td>
                                                    <td className='px-2 text-[12px] py-2 border' align='center'>
                                                        <Link to="/updatenilai" state={{
                                                            idNilai: mhs.id_nilai_kuliah,
                                                            thn: kodeTahun,
                                                            smt: kodeSemester,
                                                            jen: kodeJenjang,
                                                            fak: kodeFakultas,
                                                            pro: kodeProdi,
                                                            mk: location.state.mk,
                                                            idn: location.state.idn,
                                                            kod: location.state.kod,
                                                            collaps: 'kuliah',
                                                            activ: '/penilaian'
                                                        }} className="btn btn-xs btn-circle text-white btn-info" title='Edit'><FaPencilAlt /></Link>
                                                    </td>
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