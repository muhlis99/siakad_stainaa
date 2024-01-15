import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaEdit, FaReply, FaSave } from 'react-icons/fa'
import Loading from '../Loading'

const UpdateNilaiMhs = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [jenjang, setJenjang] = useState("")
    const [nmKls, setNmKls] = useState("")
    const [nmMk, setNmMk] = useState("")
    const [fakul, setFakul] = useState("")
    const [prodi, setProdi] = useState("")
    const [tahun, setTahun] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [sem, setSem] = useState("")
    const [kodeMk, setKodeMk] = useState("")

    const [inputFields, setInputFields] = useState([])
    const [jmlMhs, setJmlMhs] = useState(1)
    const [presentasi, setPresentasi] = useState("")
    const [checkedpres, setCheckedpres] = useState(false)
    const [materi, setMateri] = useState("")
    const [checkedmtr, setCheckedmtr] = useState(false)
    const [tugas, setTugas] = useState("")
    const [checkedtgs, setCheckedtgs] = useState(false)
    const [pptx, setPptx] = useState("")
    const [checkedppt, setCheckedppt] = useState(false)
    const [keaktifan, setKeaktifan] = useState("")
    const [checkedaktif, setCheckedaktif] = useState(false)
    const [uts, setUts] = useState("")
    const [checkedUts, setCheckedUts] = useState(false)
    const [uas, setUas] = useState("")
    const [checkedUas, setCheckedUas] = useState(false)
    const [absen, setAbsen] = useState("")
    const [checkedAbsen, setCheckedAbsen] = useState(false)
    const [jumlahKolom, setjumlahKolom] = useState([])
    const [nilaiAkhir, setNIlaiAkhir] = useState("")
    const [nilaiFixed, setNilaiFixed] = useState("")
    const [nilaiHuruf, setNilaiHuruf] = useState([])
    const [nama, setNama] = useState("")
    const [nim, setNim] = useState("")
    const [ket, setKet] = useState("")
    const [kodeNilai, setKodeNilai] = useState("")
    const [nilaiSum, setNilaiSum] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const min = 0
    const max = 100

    useEffect(() => {
        console.log(location.state);
    }, [location])

    // const handleFormChange = (index, event) => {
    //     let data = [...inputFields]
    //     data[index][event.target.name] = Math.max(Number(min), Math.min(Number(max), Number(event.target.value)))
    //     setInputFields(data)
    // }

    useEffect(() => {
        const getKelasById = async () => {
            const response = await axios.get(`v1/kelasKuliah/getKelasById/${location.state.idn}`)
            setJenjang(response.data.data.jenjangPendidikans[0].nama_jenjang_pendidikan)
            setFakul(response.data.data.fakultas[0].nama_fakultas)
            setProdi(response.data.data.prodis[0].nama_prodi)
            setTahun(response.data.data.tahunAjarans[0].tahun_ajaran)
            setNmKls(response.data.data.nama_kelas)
            setNmMk(response.data.data.mataKuliahs[0].nama_mata_kuliah)
            setSem(response.data.data.semesters[0].semester)
            setKodeTahun(response.data.data.code_tahun_ajaran)
            setKodeMk(response.data.data.code_mata_kuliah)
        }
        getKelasById()
    }, [location.state])

    useEffect(() => {
        getMahasiswa()
    }, [location])

    useEffect(() => {
        getAverage()
        getSum()
        getNilaiFixed()
    }, [presentasi, materi, pptx, keaktifan, tugas, uts, uas, absen])

    const getMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/nilaiKuliah/getById/${location.state.idNilai}/${location.state.thn}`)
            setNama(response.data.data.mahasiswas[0].nama)
            setNim(response.data.data.mahasiswas[0].nim)
            setNilaiSum(response.data.data.nilai_jumlah)
            setNIlaiAkhir(response.data.data.nilai_akhir)
            // setNilaiHuruf(response.data.data.kategoriNilais[0].nilai_huruf)
            // setKet(response.data.data.kategoriNilais[0].keterangan)
            let u = []
            if (response.data.data.nilai_presentasi) {
                setCheckedpres(true)
                setPresentasi(response.data.data.nilai_presentasi)
                handleChangePres()
                u.push('A')
            }
            if (response.data.data.nilai_penguasaan_materi) {
                setCheckedmtr(true)
                setMateri(response.data.data.nilai_penguasaan_materi)
                handleChangeMateri()
                u.push('B')
            }
            if (response.data.data.nilai_slide_power_point) {
                setCheckedppt(true)
                setPptx(response.data.data.nilai_slide_power_point)
                handleChangePptx()
                u.push('C')
            }
            if (response.data.data.nilai_keaktifan) {
                setCheckedaktif(true)
                setKeaktifan(response.data.data.nilai_keaktifan)
                handleChangeAktif()
                u.push('D')
            }
            if (response.data.data.nilai_tugas) {
                setCheckedtgs(true)
                setTugas(response.data.data.nilai_tugas)
                handleChangeTgs()
                u.push('E')
            }
            if (response.data.data.nilai_uts) {
                setCheckedUts(true)
                setUts(response.data.data.nilai_uts)
                handleChangeUts()
                u.push('F')
            }
            if (response.data.data.nilai_uas) {
                setCheckedUas(true)
                setUas(response.data.data.nilai_uas)
                handleChangeUas()
                u.push('G')
            }
            if (response.data.data.nilai_hadir) {
                setCheckedAbsen(true)
                setAbsen(response.data.data.nilai_hadir)
                handleChangeAbsen()
                u.push('H')
            }

            setjumlahKolom(u);
        } catch (error) {

        }
    }

    const handleChangePres = () => {
        setCheckedpres(!checkedpres)
        document.getElementById('presentasi').disabled = true;
        if (!checkedpres) {
            setjumlahKolom([...jumlahKolom, 'A'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'A'))
        }
    }

    const handleChangeMateri = () => {
        setCheckedmtr(!checkedmtr)
        document.getElementById('materi').disabled = true;
        if (!checkedmtr) {
            setjumlahKolom([...jumlahKolom, 'B'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'B'))
        }
    }

    const handleChangePptx = () => {
        setCheckedppt(!checkedppt)
        document.getElementById('pptx').disabled = true;
        if (!checkedppt) {
            setjumlahKolom([...jumlahKolom, 'C'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'C'))
        }
    }

    const handleChangeAktif = () => {
        setCheckedaktif(!checkedaktif)
        document.getElementById('keaktifan').disabled = true;
        if (!checkedaktif) {
            setjumlahKolom([...jumlahKolom, 'D'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'D'))
        }
    }

    const handleChangeTgs = () => {
        setCheckedtgs(!checkedtgs)
        document.getElementById('tugas').disabled = true;
        if (!checkedtgs) {
            setjumlahKolom([...jumlahKolom, 'E'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'E'))
        }
    }

    const handleChangeUts = () => {
        setCheckedUts(!checkedUts)
        document.getElementById('uts').disabled = true;
        if (!checkedUts) {
            setjumlahKolom([...jumlahKolom, 'F'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'F'))
        }
    }

    const handleChangeUas = () => {
        setCheckedUas(!checkedUas)
        document.getElementById('uas').disabled = true;
        if (!checkedUas) {
            setjumlahKolom([...jumlahKolom, 'G'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'G'))
        }
    }

    const handleChangeAbsen = () => {
        setCheckedAbsen(!checkedAbsen)
        document.getElementById('absen').disabled = true;
        if (!checkedAbsen) {
            setjumlahKolom([...jumlahKolom, 'H'])
        } else {
            setjumlahKolom(jumlahKolom.filter((o) => o !== 'H'))
        }
    }

    const getAverage = () => {
        if (jumlahKolom.length != 0) {
            var a = parseInt(presentasi) || 0
            var b = parseInt(materi) || 0
            var c = parseInt(pptx) || 0
            var d = parseInt(keaktifan) || 0
            var e = parseInt(tugas) || 0
            var f = parseInt(absen) || 0
            var g = parseInt(uts) || 0
            var h = parseInt(uas) || 0
            var rataRata = (a + b + c + d + e + f + g + h) / jumlahKolom.length
            setNIlaiAkhir(rataRata)
        }
    }

    const getNilaiFixed = () => {
        if (jumlahKolom.length != 0) {
            var a = parseInt(presentasi) || 0
            var b = parseInt(materi) || 0
            var c = parseInt(pptx) || 0
            var d = parseInt(keaktifan) || 0
            var e = parseInt(tugas) || 0
            var f = parseInt(absen) || 0
            var g = parseInt(uts) || 0
            var h = parseInt(uas) || 0
            var rataRata = (a + b + c + d + e + f + g + h) / jumlahKolom.length
            var n = rataRata.toFixed(2)
            setNilaiFixed(n)
        }
    }

    const getSum = () => {
        if (jumlahKolom.length != 0) {
            var a = parseInt(presentasi) || 0
            var b = parseInt(materi) || 0
            var c = parseInt(pptx) || 0
            var d = parseInt(keaktifan) || 0
            var e = parseInt(tugas) || 0
            var f = parseInt(absen) || 0
            var g = parseInt(uts) || 0
            var h = parseInt(uas) || 0
            var sum = (a + b + c + d + e + f + g + h)
            setNilaiSum(sum);
        }
    }

    useEffect(() => {
        cekNilai()
    }, [nilaiAkhir, location])

    const cekNilai = async () => {
        try {
            if (nilaiAkhir) {
                const response = await axios.get(`/v1/nilaiKuliah/deteksiIndexNilai/${nilaiAkhir}/${location.state.thn}`)
                setNilaiHuruf(response.data.data);
            }
        } catch (error) {

        }
    }

    const simpanNilai = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.put(`v1/nilaiKuliah/update/${location.state.idNilai}`,
                {
                    id_nilai_kuliah: location.state.idNilai,
                    code_kategori_nilai: nilaiHuruf[0].code_kategori_nilai,
                    nilai_presentasi: presentasi,
                    nilai_penguasaan_materi: materi,
                    nilai_slide_power_point: pptx,
                    nilai_keaktifan: keaktifan,
                    nilai_hadir: absen,
                    nilai_tugas: tugas,
                    nilai_uts: uts,
                    nilai_uas: uas,
                    nilai_jumlah: nilaiSum,
                    nilai_akhir: nilaiFixed
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate(`/detailnilai`, {
                            state:
                            {
                                idNilai: location.state.idNilai,
                                thn: location.state.thn,
                                smt: location.state.smt,
                                jen: location.state.jen,
                                fak: location.state.fak,
                                pro: location.state.pro,
                                mk: location.state.mk,
                                idn: location.state.idn,
                                kod: location.state.kod,
                                collaps: 'kuliah',
                                activ: '/penilaian'
                            }
                        })
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
                                <div className="overflow-x-auto mb-2">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className='text-gray-700 bg-[#F2F2F2]'>
                                            <tr className='h-28'>
                                                <th scope="col" align='center' className="px-3 py-3 border w-16">NIM</th>
                                                <th scope="col" align='center' className="px-3 py-3 border">Nama</th>
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
                                                                    onChange={() => handleChangeUts()}
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
                                                                    onChange={() => handleChangeUas()}
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
                                                                    onChange={() => handleChangeAbsen()}
                                                                    className="checkbox checkbox-success checkbox-xs rounded-none"
                                                                />
                                                            </label>
                                                        </div>
                                                        <span className='text-[13px] -rotate-90'>Absen</span>
                                                    </div>
                                                </th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-28'>Jumlah</th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-20'>Nilai</th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-20'>Grade</th>
                                                <th scope="col" align='center' className='px-3 py-3 border w-28'>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='bg-white border text-gray-900'>
                                                <td className='px-2 py-2 border'>{nim}</td>
                                                <td className='px-2 py-2 border'>{nama}</td>
                                                <td className='px-2 py-2 border'>
                                                    <input type="number" name='presentasi' id='presentasi' value={presentasi} onChange={(e) => setPresentasi(e.target.value)} className='input input-sm input-bordered w-[70px]' disabled={!checkedpres} />
                                                </td>
                                                <td className='px-2 py-2 border'>
                                                    <input type="number" name='materi' id='materi' value={materi} onChange={(e) => setMateri(e.target.value)} className='input input-sm input-bordered w-[70px]' disabled={!checkedmtr} />
                                                </td>
                                                <td className='px-2 py-2 border'>
                                                    <input type="number" name='pptx' id='pptx' value={pptx} onChange={(e) => setPptx(e.target.value)} className='input input-sm input-bordered w-[70px]' disabled={!checkedppt} />
                                                </td>
                                                <td className='px-2 py-2 border'>
                                                    <input type="number" name='keaktifan' id='keaktifan' value={keaktifan} onChange={(e) => setKeaktifan(e.target.value)} className='input input-sm input-bordered w-[70px]' disabled={!checkedaktif} />
                                                </td>
                                                <td className='px-2 py-2 border'>
                                                    <input type="number" name='tugas' id='tugas' value={tugas} onChange={(e) => setTugas(e.target.value)} className='input input-sm input-bordered w-[70px]' disabled={!checkedtgs} />
                                                </td>
                                                <td className='px-2 py-2 border'>
                                                    <input type="number" name='uts' id='uts' value={uts} onChange={(e) => setUts(e.target.value)} className='input input-sm input-bordered w-[70px]' disabled={!checkedUts} />
                                                </td>
                                                <td className='px-2 py-2 border'>
                                                    <input type="number" name='uas' id='uas' value={uas} onChange={(e) => setUas(e.target.value)} className='input input-sm input-bordered w-[70px]' disabled={!checkedUas} />
                                                </td>
                                                <td className='px-2 py-2 border'>
                                                    <input type="number" name='absen' id='absen' value={absen} onChange={(e) => setAbsen(e.target.value)} className='input input-sm input-bordered w-[70px]' disabled={!checkedAbsen} />
                                                </td>
                                                <td className='px-2 py-2 border'>{nilaiSum}</td>
                                                <td className='px-2 py-2 border'>{nilaiFixed}</td>
                                                <td className='px-2 py-2 border'>{nilaiHuruf.length != 0 ? nilaiHuruf[0].nilai_huruf : ""}</td>
                                                <td className='px-2 py-2 border'>{nilaiHuruf.length != 0 ? nilaiHuruf[0].keterangan : ""}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-2'>
                                    <Link to={`/detailnilai`} state={{ mk: location.state.mk, idn: location.state.idn, kod: location.state.kod, thn: location.state.thn, smt: location.state.smt, collaps: 'kuliah', activ: '/penilaian' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply /> Kembali</Link>
                                    <div className='float-right flex gap-2'>
                                        {jmlMhs == null ? "" : <button className='btn btn-sm btn-primary capitalize rounded-md'><FaEdit /> update</button>}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default UpdateNilaiMhs