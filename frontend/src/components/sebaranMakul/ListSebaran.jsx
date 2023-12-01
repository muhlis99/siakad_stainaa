import React, { useState, useEffect, useRef } from 'react'
import { FaPlus, FaEdit, FaTimes, FaSave, FaInfo, FaTrash, FaCopy } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import Select from "react-select"
import Loading from '../Loading'

const ListSebaran = () => {
    const [Jenjang, setJenjang] = useState([])
    const [Fakultas, setFakultas] = useState([])
    const [Program, setProgram] = useState([])
    const [Tahun, setTahun] = useState([])
    const [Semester, setSemester] = useState([])
    const [Semesters, setSemesters] = useState([])
    const [ListNilai, setListNilai] = useState([])
    const [Makul, setMakul] = useState([])
    const [smt, setSmt] = useState([])
    const [Sebaran, setSebaran] = useState([])
    const [satuan, setSatuan] = useState([])
    const [kodeJenjang, setKodeJenjang] = useState("")
    const [kodeFakultas, setKodeFakultas] = useState("")
    const [kodeProdi, setKodeProdi] = useState("")
    const [kodeTahun, setKodeTahun] = useState("")
    const [kodeThnNow, setKodeThnNow] = useState("")
    const [kodeTahunAjaran, setKodeTahunAjaran] = useState("")
    const [kodeThnOld, setKodeThnOld] = useState("")
    const [kodeMakul, setKodeMakul] = useState("")
    const [kodeSmt, setKodeSmt] = useState("")
    const [smtNow, setSmtNow] = useState("")
    const [kodeSmtNow, setKodeSmtNow] = useState("")
    const [kodeSmtOld, setKodeSmtOld] = useState("")
    const [kodeNilai, setKodeNilai] = useState("")
    const [statusBobot, setStatusBobot] = useState("")
    const [status, setStatus] = useState("")
    const [statusMk, setStatusMk] = useState(true)
    const [paket, setPaket] = useState(true)
    const [id, setId] = useState("")
    const [jenis, setJenis] = useState("")
    const [nama, setNama] = useState("")
    const [sks, setSks] = useState("")
    const [sksPrak, setSksPrak] = useState("")
    const [sksPrakLap, setSksPrakLap] = useState("")
    const [sksSim, setSksSim] = useState("")
    const [bobot, setBobot] = useState("")
    const [statusMakul, setStatusMakul] = useState("")
    const [judul, setJudul] = useState("")
    const [prodi, setProdi] = useState("")
    const [smtr, setSmtr] = useState("")
    const [nilai, setNilai] = useState("")
    const [select2, setSelect2] = useState([])
    const [isClearable, setIsClearable] = useState(true);
    const [reset, setReset] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        getTahunAjaran()
        getJenjangPendidikan()
    }, [])

    useEffect(() => {
        getFakultas()
    }, [kodeJenjang])

    useEffect(() => {
        getProdi()
    }, [kodeFakultas])

    useEffect(() => {
        if (statusMk === true) {
            setStatusBobot("wajib")
        } else {
            setStatusBobot("tidak_wajib")
        }

        if (paket === false) {
            setStatus("pilih_sendiri")
        } else {
            setStatus("paket")
        }
    }, [statusMk, paket])


    useEffect(() => {
        getDataSemester()
    }, [kodeProdi, kodeTahun])

    useEffect(() => {
        getDataSemester2()
    }, [kodeProdi, kodeThnOld])

    useEffect(() => {
        getKategoriNilai()
    }, [kodeProdi, kodeTahun])

    useEffect(() => {
        getMakulAll()
    }, [kodeJenjang, kodeFakultas, kodeProdi, kodeTahun])

    useEffect(() => {
        options()
    }, [Makul])

    useEffect(() => {
        getCodeSemester()
        options()
    }, [Semester])

    useEffect(() => {
        sebaranMakul()
    }, [kodeProdi, smt, kodeTahun, kodeFakultas, kodeJenjang])

    // useEffect(() => {
    //     getMakulById()
    // }, [])

    const getJenjangPendidikan = async () => {
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
            setProgram(response.data.data)
        }
    }

    const getTahunAjaran = async () => {
        const response = await axios.get('v1/tahunAjaran/all')
        setTahun(response.data.data)
    }

    const getMakulAll = async () => {
        try {
            if (kodeFakultas != 0 & kodeJenjang != 0 & kodeProdi != 0 & kodeTahun != 0) {
                const response = await axios.get(`v1/sebaranMataKuliah/autocompleteMakul/${kodeTahun}/${kodeJenjang}/${kodeFakultas}/${kodeProdi}`)
                setMakul(response.data.data)
            }
        } catch (error) {

        }
    }

    const options = () => {
        var i = Makul.map(item => ({
            value: item.code_mata_kuliah,
            label: item.code_mata_kuliah + " | " + item.nama_mata_kuliah,
        }))
        setSelect2(i)
    }

    const onchange = (e) => {
        console.log(e ? e.value : "");
        setKodeMakul(e ? e.value : "")
    }

    const getKategoriNilai = async () => {
        if (kodeProdi != 0 & kodeTahun != 0) {
            const response = await axios.get(`v1/sebaranMataKuliah/katNilaiByThnAjr/${kodeTahun}`)
            setListNilai(response.data.data)
        }
    }

    const getDataSemester = async () => {
        try {
            if (kodeProdi != 0 & kodeTahun != 0) {
                const response = await axios.get(`v1/sebaranMataKuliah/smtByThnAjr/${kodeTahun}`)
                setSemester(response.data.data)
            }
        } catch (error) {

        }
    }

    const getDataSemester2 = async () => {
        try {
            if (kodeProdi != 0 & kodeThnOld != 0) {
                const response = await axios.get(`v1/sebaranMataKuliah/smtByThnAjr/${kodeThnOld}`)
                setSemesters(response.data.data)
            }
        } catch (error) {

        }
    }

    const getCodeSemester = () => {
        var i = Semester.map(item => ({
            kode: item.code_semester
        }))
        setSmt(i)
    }

    const sebaranMakul = async () => {
        if (smt.length != 0) {
            let sebar = []
            let sksnya = []
            let promises = []
            for (let i = 0; i < smt.length; i++) {
                promises.push(
                    await axios.get('v1/sebaranMataKuliah/all?sebaranProdi=' + kodeProdi + '&sebaranSemester=' + smt[i].kode + '&sebaranTahunAjaran=' + kodeTahun + '&sebaranJenPen=' + kodeJenjang + '&sebaranFks=' + kodeFakultas).then(response => {
                        sebar.push(response.data.data)
                        sksnya.push(response.data.total_sks)
                    })
                )
            }
            if (smt.length != 0) {
                Promise.all(promises).then(() => setSebaran(sebar))
                Promise.all(promises).then(() => setSatuan(sksnya))
            }
        }
    }

    const modalSalinData = async (e, f, g) => {
        setKodeThnNow(e)
        // console.log(e)
        setKodeSmtNow(f)
        // console.log(f)
        setSmtNow(g)
        document.getElementById('modal-salin').checked = true
    }

    const simpanSebaran = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (kodeJenjang == 0) {
                setLoading(false)
                Swal.fire({
                    title: "Jenjang Pendidikan kosong",
                    icon: 'error'
                })
            } else if (kodeFakultas == 0) {
                setLoading(false)
                Swal.fire({
                    title: "Fakultas kosong",
                    icon: 'error'
                })
            } else if (kodeProdi == 0) {
                setLoading(false)
                Swal.fire({
                    title: "Prodi kosong",
                    icon: 'error'
                })
            } else if (kodeTahun == 0) {
                setLoading(false)
                Swal.fire({
                    title: "Semester kosong",
                    icon: 'error'
                })
            } else if (kodeSmt == 0) {
                setLoading(false)
                Swal.fire({
                    title: "Semester kosong",
                    icon: 'error'
                })
            } else if (kodeNilai == 0) {
                setLoading(false)
                Swal.fire({
                    title: "Nilai kosong",
                    icon: 'error'
                })
            } else {
                await axios.post('v1/sebaranMataKuliah/create', {
                    code_semester: kodeSmt,
                    code_kategori_nilai: kodeNilai,
                    status_bobot_makul: statusBobot,
                    status_makul: status,
                    code_tahun_ajaran: kodeTahun,
                    code_mata_kuliah: kodeMakul
                }).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        getMakulAll()
                        setKodeSmt("")
                        setKodeNilai("")
                        setPaket(true)
                        sebaranMakul()
                    })
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

    const getMakulById = async (e, f) => {
        document.getElementById('my-modal').checked = true
        try {
            if (f != null) {
                setJudul(e)
                const response = await axios.get(`v1/sebaranMataKuliah/getById/${f}`)
                setId(response.data.data.id_sebaran)
                setNama(response.data.data.mataKuliahs[0].nama_mata_kuliah)
                setJenis(response.data.data.mataKuliahs[0].jenis_mata_kuliah)
                setSmtr(response.data.data.semesters[0].semester)
                setKodeTahunAjaran(response.data.data.code_tahun_ajaran)
                setKodeSmt(response.data.data.code_semester)
                setKodeNilai(response.data.data.code_kategori_nilai)
                setNilai(response.data.data.kategoriNilais[0].nilai_huruf)
                setSks(response.data.data.mataKuliahs[0].sks)
                setSksPrak(response.data.data.mataKuliahs[0].sks_praktek)
                setSksPrakLap(response.data.data.mataKuliahs[0].sks_prak_lapangan)
                setSksPrakLap(response.data.data.mataKuliahs[0].sks_prak_lapangan)
                setSksSim(response.data.data.mataKuliahs[0].sks_simulasi)
                setBobot(response.data.data.status_bobot_makul)
                setStatusMakul(response.data.data.status_makul)
                let st = response.data.data.status_makul
                if (st === 'paket') {
                    setPaket(true)
                } else {
                    setPaket(false)
                }
                let bb = response.data.data.status_bobot_makul
                if (bb === 'wajib') {
                    setStatusMk(true)
                } else {
                    setStatusMk(false)
                }
            }
        } catch (error) {

        }
    }

    const modalAddClose = () => {
        document.getElementById('my-modal').checked = false
        setId("")
        setNama("")
        setJenis("")
        setProdi("")
        setKodeSmt("")
        setKodeNilai("")
        setSks("")
        setSmtr("")
        setSksPrak("")
        setSksPrakLap("")
        setSksPrakLap("")
        setSksSim("")
        setBobot("")
        setStatusMakul("")
        setStatusMk(true)
        setPaket(true)
    }

    const salinDataSebaran = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post(`v1/sebaranMataKuliah/salinData`, {
                code_tahun_ajaran_baru: kodeThnNow,
                code_semester_baru: kodeSmtNow,
                code_tahun_ajaran_lama: kodeThnOld,
                code_semester_lama: kodeSmtOld
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    modalClose()
                    sebaranMakul()
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    const modalClose = () => {
        document.getElementById('modal-salin').checked = false
        setKodeSmtOld("")
        setKodeThnOld("")
    }

    const updateSebaran = async (e) => {
        e.preventDefault()
        try {
            document.getElementById('my-modal').checked = false
            setLoading(true)
            await axios.put(`v1/sebaranMataKuliah/update/${id}`, {
                code_semester: kodeSmt,
                code_kategori_nilai: kodeNilai,
                status_bobot_makul: statusBobot,
                status_makul: status,
                code_tahun_ajaran: kodeTahunAjaran
            }).then(function (response) {
                setLoading(false)
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    setId("")
                    setNama("")
                    setJenis("")
                    setProdi("")
                    setKodeSmt("")
                    setKodeNilai("")
                    setSks("")
                    setSmtr("")
                    setSksPrak("")
                    setSksPrakLap("")
                    setSksPrakLap("")
                    setSksSim("")
                    setBobot("")
                    setStatusMakul("")
                    setStatusMk(true)
                    setPaket(true)
                    sebaranMakul()
                })
            })
        } catch (error) {
            setLoading(false)
            if (error.response.data.message) {
                Swal.fire({
                    title: error.response.data.message,
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: error.response.data.errors[0].msg,
                    icon: 'error'
                })
            }
        }
    }

    const nonaktifkan = (makulId) => {
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
                        `v1/sebaranMataKuliah/delete/${makulId}`
                    ).then((response) => {
                        console.log(response.data)
                        Swal.fire({
                            title: "Terhapus",
                            text: response.data.message,
                            icon: "success"
                        }).then(() => {
                            getMakulAll()
                            sebaranMakul()
                        })
                    })

                } catch (error) {

                }
            }
        })
    }

    return (
        <div className='mt-2 container'>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-2xl relative">
                    <button className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalAddClose}><FaTimes /></button>
                    <h3 className="font-bold text-xl">{judul}</h3>
                    <div className='py-4'>
                        {
                            judul === 'Detail' ?
                                <div className='mb-4'>
                                    <div>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className='uppercase'>Mata Kuliah</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>{nama}</td>
                                                </tr>
                                                <tr>
                                                    <td className='uppercase'>Jenis Mk</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>{jenis}</td>
                                                </tr>
                                                <tr>
                                                    <td className='uppercase'>Semester</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>Semester {smtr}</td>
                                                </tr>
                                                <tr>
                                                    <td className='uppercase'>Nilai Minimal</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>{nilai}</td>
                                                </tr>
                                                <tr>
                                                    <td className='uppercase'>SKS</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>{sks}</td>
                                                </tr>
                                                <tr>
                                                    <td className='uppercase'>SKS Praktek</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>{sksPrak}</td>
                                                </tr>
                                                <tr>
                                                    <td className='uppercase'>SKS Prak Lapangan</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>{sksPrakLap}</td>
                                                </tr>
                                                <tr>
                                                    <td className='uppercase'>SKS Simulasi</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>{sksSim}</td>
                                                </tr>
                                                <tr>
                                                    <td className='uppercase'>Status Bobot</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>{bobot}</td>
                                                </tr>
                                                <tr>
                                                    <td className='uppercase'>Status MK</td>
                                                    <td>&nbsp;:&nbsp;</td>
                                                    <td className='uppercase'>{statusMakul}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                :
                                <form onSubmit={updateSebaran}>
                                    <div className='grid grid-cols-2 gap-2 mb-4'>
                                        <div className='col-span-2'>
                                            <label className="label">
                                                <span className="text-base label-text font-semibold">Nama Mata Kuliah</span>
                                            </label>
                                            <input type="text" value={nama} className="input input-sm input-bordered w-full" disabled />
                                        </div>
                                        <div className='col-span-2'>
                                            <div className='grid grid-cols-4 gap-2'>
                                                <div>
                                                    <label className="label">
                                                        <span className="text-base label-text font-semibold">SKS</span>
                                                    </label>
                                                    <input type="text" value={sks} className="input input-sm input-bordered w-full" disabled />
                                                </div>
                                                <div>
                                                    <label className="label">
                                                        <span className="text-base label-text font-semibold">SKS Praktek</span>
                                                    </label>
                                                    <input type="text" value={sksPrak} className="input input-sm input-bordered w-full" disabled />
                                                </div>
                                                <div>
                                                    <label className="label">
                                                        <span className="text-base label-text font-semibold">SKS Prak Lapang</span>
                                                    </label>
                                                    <input type="text" value={sksPrakLap} className="input input-sm input-bordered w-full" disabled />
                                                </div>
                                                <div>
                                                    <label className="label">
                                                        <span className="text-base label-text font-semibold">SKS Simulasi</span>
                                                    </label>
                                                    <input type="text" value={sksSim} className="input input-sm input-bordered w-full" disabled />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label className="label">
                                                        <span className="text-base label-text font-semibold">Semester</span>
                                                    </label>
                                                    <select className='select select-bordered select-sm w-full' value={kodeSmt} onChange={(e) => setKodeSmt(e.target.value)}>
                                                        <option value="">Semester</option>
                                                        {Semester.map((item) => (
                                                            <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="label">
                                                        <span className="text-base label-text font-semibold">Nilai Min</span>
                                                    </label>
                                                    <select className='select select-bordered select-sm w-full' value={kodeNilai} onChange={(e) => setKodeNilai(e.target.value)}>
                                                        <option value="">Kategori Nilai</option>
                                                        {ListNilai.map((item) => (
                                                            <option key={item.id_kategori_nilai} value={item.code_kategori_nilai}>{item.nilai_huruf} ({item.nilai_bawah} - {item.nilai_atas})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="label">
                                                        <span className="text-base label-text font-semibold">Opsi Tambahan</span>
                                                    </label>
                                                    <div className='flex gap-3'>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label">
                                                                <input type="checkbox" checked={statusMk} onChange={(e) => setStatusMk(e.target.checked)} className="checkbox checkbox-sm checkbox-success mr-1" />
                                                                <span className="label-text">MK Wajib</span>
                                                            </label>
                                                        </div>
                                                        <div className="form-control">
                                                            <label className="cursor-pointer label">
                                                                <input type="checkbox" checked={paket} onChange={(e) => setPaket(e.target.checked)} className="checkbox checkbox-sm checkbox-success mr-1" />
                                                                <span className="label-text">MK Paket</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-2'>
                                            <button className='btn btn-sm btn-primary float-right'><FaSave /><span className='ml-1'>simpan</span></button>
                                        </div>
                                    </div>
                                </form>
                        }
                    </div>
                </div>
            </div>

            <input type="checkbox" id="modal-salin" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box grid p-0 rounded-md">
                    <form onSubmit={salinDataSebaran}>
                        <div className='bg-base-200 border-b-2 p-3'>
                            <h3 className="font-bold text-xl mb-1">Salin Data Sebaran Semester {smtNow}</h3>
                            <button type='button' className="btn btn-xs btn-circle btn-error absolute right-2 top-2" onClick={modalClose}><FaTimes /></button>
                        </div>
                        <div className="mb-2">
                            <div className="py-4 px-4">
                                <div>
                                    <label className="label flex-initial w-64">
                                        <span className="text-base label-text font-semibold">Tahun Ajaran</span>
                                    </label>
                                    <select className='my-1 select select-bordered select-sm w-full' value={kodeThnOld} onChange={(e) => setKodeThnOld(e.target.value)}>
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
                                    <select className='my-1 select select-bordered select-sm w-full' value={kodeSmtOld} onChange={(e) => setKodeSmtOld(e.target.value)}>
                                        <option value="">Semester</option>
                                        {Semesters.map((item) => (
                                            <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='p-3 border-t-2 text-center'>
                            <button type='submit' className="btn btn-sm btn-primary capitalize"><FaSave /> Simpan</button>
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
                <h1 className='text-2xl font-bold'>Sebaran Mata Kuliah</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <div className="grid lg:grid-cols-2 gap-2 p-2 rounded-md">
                            <div className='flex gap-2'>
                                <label className="label flex-initial w-64">
                                    <span className="text-base label-text font-semibold">Jenjang Pendidikan</span>
                                </label>
                                <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeJenjang} onChange={(e) => setKodeJenjang(e.target.value)}>
                                    <option value="">Jenjang Pendidikan</option>
                                    {Jenjang.map((item) => (
                                        <option key={item.id_jenjang_pendidikan} value={item.code_jenjang_pendidikan}>{item.nama_jenjang_pendidikan}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-2'>
                                <label className="label flex-initial w-64">
                                    <span className="text-base label-text font-semibold">Fakultas</span>
                                </label>
                                <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeFakultas} onChange={(e) => setKodeFakultas(e.target.value)}>
                                    <option value="">Fakultas</option>
                                    {Fakultas.map((item) => (
                                        <option key={item.id_fakultas} value={item.code_fakultas}>{item.nama_fakultas}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-2'>
                                <label className="label flex-initial w-64">
                                    <span className="text-base label-text font-semibold">Program Studi</span>
                                </label>
                                <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeProdi} onChange={(e) => setKodeProdi(e.target.value)}>
                                    <option value="">Program Studi</option>
                                    {Program.map((item) => (
                                        <option key={item.id_prodi} value={item.code_prodi}>{item.nama_prodi}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-2'>
                                <label className="label flex-initial w-64">
                                    <span className="text-base label-text font-semibold">Tahun Ajaran</span>
                                </label>
                                <select className='my-1 select select-bordered select-sm w-full max-w-xs' value={kodeTahun} onChange={(e) => setKodeTahun(e.target.value)}>
                                    <option value="">Tahun Ajaran</option>
                                    {Tahun.map((item) => (
                                        <option key={item.id_tahun_ajaran} value={item.code_tahun_ajaran}>{item.tahun_ajaran}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 card-bordered shadow-md mb-3">
                    <div className="card-body p-4">
                        <form onSubmit={simpanSebaran}>
                            <div className='grid lg:grid-cols-5 gap-4'>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Mata Kuliah</span>
                                    </label>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        options={select2}
                                        onChange={onchange}
                                        isClearable={isClearable}
                                        id='input-select'
                                    />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Semester</span>
                                    </label>
                                    <select className='my-1 select select-bordered select-sm w-full' value={kodeSmt} onChange={(e) => setKodeSmt(e.target.value)}>
                                        <option value="">Semester</option>
                                        {Semester.map((item) => (
                                            <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Nilai Min</span>
                                    </label>
                                    <select className='my-1 select select-bordered select-sm w-full' value={kodeNilai} onChange={(e) => setKodeNilai(e.target.value)}>
                                        <option value="">Nilai</option>
                                        {ListNilai.map((item) => (
                                            <option key={item.id_kategori_nilai} value={item.code_kategori_nilai}>{item.nilai_huruf} ({item.nilai_bawah} - {item.nilai_atas})</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-base label-text font-semibold">Opsi Tambahan</span>
                                    </label>
                                    <div className='flex gap-2'>
                                        <div className="form-control">
                                            <label className="cursor-pointer label">
                                                <input type="checkbox" checked={statusMk} onChange={(e) => setStatusMk(e.target.checked)} className="checkbox checkbox-sm checkbox-success mr-1" />
                                                <span className="label-text">MK Wajib</span>
                                            </label>
                                        </div>
                                        <div className="form-control">
                                            <label className="cursor-pointer label">
                                                <input type="checkbox" checked={paket} onChange={(e) => setPaket(e.target.checked)} className="checkbox checkbox-sm checkbox-success mr-1" />
                                                <span className="label-text">Paket MK</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <button className='btn btn-sm btn-primary capitalize rounded-md'><FaPlus /><span>Tambah</span></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {Semester.map((items, index) => (
                        <div key={items.id_semester} className="card bg-base-100 card-bordered shadow-md mb-3">
                            <div className="card-body p-4">
                                <div className="overflow-x-auto rounded-md">
                                    <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                                        <thead className='text-gray-700 bg-[#F2F2F2]'>
                                            <tr>
                                                <th scope="col" className="px-2 py-2 border" colSpan="6">Semester {items.semester}</th>
                                            </tr>
                                            <tr>
                                                <th scope="col" className="px-2 py-2 border">#</th>
                                                <th scope="col" className="px-2 py-2 border">Kode</th>
                                                <th scope="col" className="px-2 py-2 border">Mata Kuliah</th>
                                                <th scope="col" className="px-2 py-2 border">SKS</th>
                                                <th scope="col" className="px-2 py-2 border">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Sebaran != 0 ? <>
                                                {Sebaran[index].length == 0 ?
                                                    <tr className='bg-white border-b text-gray-500 border-x'>
                                                        <td className='px-6 py-2' align='center' colSpan='5'>
                                                            <p className=' font-semibold'>Data Mata Kuliah Kosong</p>
                                                            <div className='mt-1'>
                                                                <button className='btn btn-sm btn-primary capitalize rounded-md' onClick={() => modalSalinData(items.code_tahun_ajaran, items.code_semester, items.semester)}><FaCopy /><span>Salin Data</span></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    :
                                                    Sebaran[index].map((item, no) => (
                                                        <tr key={item.id_sebaran} className='bg-white border text-gray-700' >
                                                            <th scope="row" className="px-2 py-2 border font-medium whitespace-nowrap">{no + 1}</th>
                                                            <td className='px-2 py-2 border' align='center'>{item.code_mata_kuliah}</td>
                                                            <td className='px-2 py-2 border'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                                            <td className='px-2 py-2 border' align='center'>{item.mataKuliahs[0].sks}</td>
                                                            <td className='px-2 py-2 border' align='center'>
                                                                <div>
                                                                    <button onClick={() => getMakulById('Detail', item.id_sebaran)} className="btn btn-xs btn-circle text-white btn-info mr-1" title='Detail'><FaInfo /></button>
                                                                    <button onClick={() => getMakulById('Edit', item.id_sebaran)} className="btn btn-xs btn-circle text-white btn-warning" title='Edit'><FaEdit /></button>
                                                                    <button onClick={() => nonaktifkan(item.id_sebaran)} className="btn btn-xs btn-circle text-white btn-error ml-1" title='Hapus'><FaTrash /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </> :
                                                ""
                                            }
                                            <tr className='bg-white border text-gray-700'>
                                                <td colSpan="3" className='px-2 py-2 border'>Total SKS</td>
                                                <td colSpan="2" className='px-2 py-2 border' align='center'>{satuan[index]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section >
        </div >
    )
}

export default ListSebaran