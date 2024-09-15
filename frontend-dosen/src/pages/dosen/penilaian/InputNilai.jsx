import React, { useState, useEffect } from 'react'
import Layout from '../../Layout'
import { Row, Col, Card, Table, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../../features/authSlice"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import axios from 'axios'
import { FaPencilAlt, FaReply, FaSave } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { Circles } from "react-loader-spinner"

const InputNilai = () => {
    const { isError, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [detailKls, setDetailKls] = useState([])
    const [Mahasiswa, setMahasiswa] = useState([])
    const [jmlMhs, setJmlMhs] = useState("")
    const [inputFields, setInputFields] = useState([])
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
    const [nilaiFix, setNilaiFix] = useState([])
    const [nilaiFixed, setNilaiFixed] = useState("")
    const [nilaiHuruf, setNilaiHuruf] = useState("")
    const [ket, setKet] = useState([])
    const [kodeNilai, setKodeNilai] = useState("")
    const [nilaiSum, setNilaiSum] = useState("")
    const [load, setLoad] = useState(false)
    const [show, setShow] = useState(false)
    const [nama, setNama] = useState("")
    const [nim, setNim] = useState("")
    const [nims, setNims] = useState("")
    const [kelulusan, setKelulusan] = useState("")
    const [Nilai, setNilai] = useState([])

    // const handleFormChange = (index, event) => {
    //     let data = [...inputFields]
    //     data[index][event.target.name] = Math.max(Number(min), Math.min(Number(max), Number(event.target.value)))
    //     setInputFields(data)
    // }

    useEffect(() => {
        getKelasById()
        // console.log(location.state)
        getNilaiMahasiswa()
    }, [location])

    useEffect(() => {
        getMahasiswa()
    }, [location, nims])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    // useEffect(() => {
    //     addFields()
    // }, [jmlMhs])

    useEffect(() => {
        getAverage()
        getSum()
        getNilaiFixed()
    }, [presentasi, materi, pptx, keaktifan, tugas, uts, uas, absen])

    useEffect(() => {
        getNimMahasiswa()
    }, [Nilai])

    // useEffect(() => {
    // getPresentasi()
    // getMateri()
    // getPptx()
    // getKeaktifan()
    // getTugas()
    // getAbsen()
    // getUas()
    // getUts()
    // }, [inputFields])

    // useEffect(() => {
    // getAverage()
    // getSum()
    // getNilaiFixed()
    // }, [inputFields, presentasi, pptx, materi, keaktifan, uts, tugas, uas, absen])

    // useEffect(() => {
    // cekNilai()
    // }, [nilaiAkhir, detailKls])

    const getKelasById = async () => {
        try {
            const response = await axios.get(`v1/kelasKuliah/getKelasById/${location.state.idKelas}`)
            setDetailKls(response.data.data)
        } catch (error) {

        }
    }

    // const addFields = () => {
    //     let newfield = []
    //     for (let index = 1; index <= jmlMhs; index++) {
    //         newfield.push({ presentasi: '', materi: '', pptx: '', keaktifan: '', tugas: '', uts: '', uas: '', absen: '' })
    //     }
    //     setInputFields(newfield)
    //     // console.log(newfield);
    // }

    const getNilaiMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/nilaiKuliah/all?codeMakul=${location.state.kodeMk}&codeKls=${location.state.kodeKls}&codeThnAjr=${location.state.kodeThn}`)
            setNilai(response.data.data)
        } catch (error) {

        }
    }

    const getNimMahasiswa = () => {
        var i = Nilai.map(item => (
            item.mahasiswas[0].nim
        ))
        setNims(i)
        console.log(i);
    }

    const getMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/kelasKuliah/getMhsByKelas/${location.state.kodeKls}`)
            const filter = response.data.data.filter((item) =>
                !nims.includes(item.nim)
            )
            setMahasiswa(filter)
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
                const response = await axios.get(`/v1/nilaiKuliah/deteksiIndexNilai/${nilaiAkhir}/${location.state.kodeThn}`)
                setNilaiHuruf(response.data.data[0].nilai_huruf)
                setKelulusan(response.data.data[0].keterangan)
                setKodeNilai(response.data.data[0].code_kategori_nilai)
            }
        } catch (error) {

        }
    }

    const handleShow = (e, f) => {
        setNim(e)
        setNama(f)
        setShow(true)
    };
    const handleClose = () => {
        setNim()
        setNama()
        setPresentasi()
        setMateri()
        setPptx()
        setKeaktifan()
        setTugas()
        setUts()
        setUas()
        setAbsen()
        setNilaiHuruf()
        setNilaiSum()
        setNilaiFixed()
        setKelulusan()
        setShow(false)
    };

    // const handleChangePres = () => {
    //     setCheckedpres(!checkedpres)
    //     if (!checkedpres) {
    //         setjumlahKolom([...jumlahKolom, 'A'])
    //     } else {
    //         setjumlahKolom(jumlahKolom.filter((o) => o !== 'A'))
    //         for (var i = 0; i < document.getElementsByName('presentasi').length; i++) {
    //             let g = document.getElementsByName('presentasi')[i].value = ''
    //             setPresentasi([])
    //             let datas = inputFields[i]
    //             inputFields[i].presentasi = ""
    //         }
    //     }
    //     for (var i = 0; i < document.getElementsByName('presentasi').length; i++) {
    //         document.getElementsByName('presentasi')[i].disabled = false;
    //     }
    // }

    // const handleChangeMateri = () => {
    //     setCheckedmtr(!checkedmtr)
    //     if (!checkedmtr) {
    //         setjumlahKolom([...jumlahKolom, 'B'])
    //     } else {
    //         setjumlahKolom(jumlahKolom.filter((o) => o !== 'B'))
    //         for (var i = 0; i < document.getElementsByName('materi').length; i++) {
    //             setMateri([])
    //             let datas = inputFields[i]
    //             inputFields[i].materi = ""
    //         }
    //     }
    //     for (var i = 0; i < document.getElementsByName('materi').length; i++) {
    //         document.getElementsByName('materi')[i].disabled = false;
    //     }
    // }

    // const handleChangePptx = () => {
    //     setCheckedppt(!checkedppt)
    //     if (!checkedppt) {
    //         setjumlahKolom([...jumlahKolom, 'C'])
    //     } else {
    //         setjumlahKolom(jumlahKolom.filter((o) => o !== 'C'))
    //         for (var i = 0; i < document.getElementsByName('pptx').length; i++) {
    //             setPptx([])
    //             let datas = inputFields[i]
    //             inputFields[i].pptx = ""
    //         }
    //     }
    //     for (var i = 0; i < document.getElementsByName('pptx').length; i++) {
    //         document.getElementsByName('pptx')[i].disabled = false;
    //     }
    // }

    // const handleChangeAktif = () => {
    //     setCheckedaktif(!checkedaktif)
    //     if (!checkedaktif) {
    //         setjumlahKolom([...jumlahKolom, 'D'])
    //     } else {
    //         setjumlahKolom(jumlahKolom.filter((o) => o !== 'D'))
    //         for (var i = 0; i < document.getElementsByName('keaktifan').length; i++) {
    //             setKeaktifan([])
    //             let datas = inputFields[i]
    //             inputFields[i].keaktifan = ""
    //         }
    //     }
    //     for (var i = 0; i < document.getElementsByName('keaktifan').length; i++) {
    //         document.getElementsByName('keaktifan')[i].disabled = false;
    //     }
    // }

    // const handleChangeTgs = () => {
    //     setCheckedtgs(!checkedtgs)
    //     if (!checkedtgs) {
    //         setjumlahKolom([...jumlahKolom, 'E'])
    //     } else {
    //         setjumlahKolom(jumlahKolom.filter((o) => o !== 'E'))
    //         for (var i = 0; i < document.getElementsByName('tugas').length; i++) {
    //             setTugas([])
    //             let datas = inputFields[i]
    //             inputFields[i].tugas = ""
    //         }
    //     }
    //     for (var i = 0; i < document.getElementsByName('tugas').length; i++) {
    //         document.getElementsByName('tugas')[i].disabled = false;
    //     }
    // }

    // const handleChangeUts = () => {
    //     setCheckedUts(!checkedUts)
    //     if (!checkedUts) {
    //         setjumlahKolom([...jumlahKolom, 'F'])
    //     } else {
    //         setjumlahKolom(jumlahKolom.filter((o) => o !== 'F'))
    //         for (var i = 0; i < document.getElementsByName('uts').length; i++) {
    //             setUts([])
    //             let datas = inputFields[i]
    //             inputFields[i].uts = ""
    //         }
    //     }
    //     for (var i = 0; i < document.getElementsByName('uts').length; i++) {
    //         document.getElementsByName('uts')[i].disabled = false;

    //     }
    // }

    // const handleChangeUas = () => {
    //     setCheckedUas(!checkedUas)
    //     if (!checkedUas) {
    //         setjumlahKolom([...jumlahKolom, 'G'])
    //     } else {
    //         setjumlahKolom(jumlahKolom.filter((o) => o !== 'G'))
    //         for (var i = 0; i < document.getElementsByName('uas').length; i++) {
    //             setUas([])
    //             let datas = inputFields[i]
    //             inputFields[i].uas = ""
    //         }
    //     }
    //     for (var i = 0; i < document.getElementsByName('uas').length; i++) {
    //         document.getElementsByName('uas')[i].disabled = false;
    //     }
    // }

    // const handleChangeAbsen = () => {
    //     setCheckedAbsen(!checkedAbsen)
    //     if (!checkedAbsen) {
    //         setjumlahKolom([...jumlahKolom, 'H'])
    //     } else {
    //         setjumlahKolom(jumlahKolom.filter((o) => o !== 'H'))
    //         for (var i = 0; i < document.getElementsByName('absen').length; i++) {
    //             setAbsen([])
    //             let datas = inputFields[i]
    //             inputFields[i].absen = ""
    //         }
    //     }
    //     for (var i = 0; i < document.getElementsByName('absen').length; i++) {
    //         document.getElementsByName('absen')[i].disabled = false;
    //     }
    // }

    // const getPresentasi = () => {
    //     let newfield = []
    //     inputFields.map(item => (
    //         newfield.push(parseInt(item.presentasi))
    //     ))
    //     setPresentasi(newfield)
    // }

    // const getMateri = () => {
    //     let newfield = []
    //     inputFields.map(item => (
    //         newfield.push(parseInt(item.materi))
    //     ))
    //     setMateri(newfield)
    // }

    // const getPptx = () => {
    //     let newfield = []
    //     inputFields.map(item => (
    //         newfield.push(parseInt(item.pptx))
    //     ))
    //     setPptx(newfield)
    // }

    // const getKeaktifan = () => {
    //     let newfield = []
    //     inputFields.map(item => (
    //         newfield.push(parseInt(item.keaktifan))
    //     ))
    //     setKeaktifan(newfield)
    // }

    // const getTugas = () => {
    //     let newfield = []
    //     inputFields.map(item => (
    //         newfield.push(parseInt(item.tugas))
    //     ))
    //     setTugas(newfield)
    // }

    // const getUts = () => {
    //     let newfield = []
    //     inputFields.map(item => {
    //         newfield.push(parseInt(item.uts))
    //     }
    //     )
    //     setUts(newfield)
    // }

    // const getUas = () => {
    //     let newfield = []
    //     inputFields.map(item => (
    //         newfield.push(parseInt(item.uas))
    //     ))
    //     setUas(newfield)
    // }

    // const getAbsen = () => {
    //     let newfield = []
    //     inputFields.map(item => (
    //         newfield.push(parseInt(item.absen))
    //     ))
    //     setAbsen(newfield)
    // }

    // const getAverage = () => {
    //     if (jumlahKolom.length != 0) {
    //         const i = inputFields.map(el => {
    //             let presentasi = parseInt(el.presentasi) || 0
    //             let materi = parseInt(el.materi) || 0
    //             let pptx = parseInt(el.pptx) || 0
    //             let keaktifan = parseInt(el.keaktifan) || 0
    //             let tugas = parseInt(el.tugas) || 0
    //             let hadir = parseInt(el.absen) || 0
    //             let uts = parseInt(el.uts) || 0
    //             let uas = parseInt(el.uas) || 0
    //             let rataRata = (presentasi + materi + pptx + keaktifan + tugas + hadir + uts + uas) / jumlahKolom.length
    //             let fix = (presentasi + materi + pptx + keaktifan + tugas + hadir + uts + uas) / jumlahKolom.length
    //             return rataRata
    //         })
    //         setNIlaiAkhir(i)
    //     }
    // }

    // const getNilaiFixed = () => {
    //     if (jumlahKolom.length != 0) {
    //         const i = inputFields.map(el => {
    //             let presentasi = parseInt(el.presentasi) || 0
    //             let materi = parseInt(el.materi) || 0
    //             let pptx = parseInt(el.pptx) || 0
    //             let keaktifan = parseInt(el.keaktifan) || 0
    //             let tugas = parseInt(el.tugas) || 0
    //             let hadir = parseInt(el.absen) || 0
    //             let uts = parseInt(el.uts) || 0
    //             let uas = parseInt(el.uas) || 0
    //             let rataRata = (presentasi + materi + pptx + keaktifan + tugas + hadir + uts + uas) / jumlahKolom.length
    //             return rataRata.toFixed(2)
    //         })
    //         setNilaiFix(i)
    //     }
    // }

    // const getSum = () => {
    //     if (jumlahKolom.length != 0) {
    //         const i = inputFields.map(el => {
    //             var presentasi = parseInt(el.presentasi) || 0
    //             var materi = parseInt(el.materi) || 0
    //             var pptx = parseInt(el.pptx) || 0
    //             var keaktifan = parseInt(el.keaktifan) || 0
    //             var tugas = parseInt(el.tugas) || 0
    //             var hadir = parseInt(el.absen) || 0
    //             var uts = parseInt(el.uts) || 0
    //             var uas = parseInt(el.uas) || 0
    //             var sum = (presentasi + materi + pptx + keaktifan + tugas + hadir + uts + uas)
    //             return sum
    //         })
    //         setNilaiSum(i)
    //     }
    // }

    // const cekNilai = async () => {
    //     let nilai = []
    //     let kode = []
    //     let status = []
    //     let promises = []
    //     for (let i = 0; i < nilaiAkhir.length; i++) {
    //         if (nilaiAkhir[i] === 0) {
    //             promises.push("")
    //         } else {
    //             const d = await axios.get(`/v1/nilaiKuliah/deteksiIndexNilai/${nilaiAkhir[i]}/${detailKls.code_tahun_ajaran}`).then(response => {
    //                 nilai.push(response.data.data[0].nilai_huruf)
    //                 kode.push(response.data.data[0].code_kategori_nilai)
    //                 status.push(response.data.data[0].keterangan)
    //             })
    //             promises.push(d)
    //         }
    //     }
    //     Promise.all(promises).then(() => setNilaiHuruf(nilai))
    //     Promise.all(promises).then(() => setKodeNilai(kode))
    //     Promise.all(promises).then(() => setKet(status))
    // }

    // const simpanNilai = async (e) => {
    //     e.preventDefault()
    //     setLoad(true)
    //     try {
    //         if (kodeNilai.length != Mahasiswa.length) {
    //             setLoad(false)
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Input Nilai Belum Tuntas',
    //             })
    //         } else {
    //             await axios.post('v1/nilaiKuliah/create',
    //                 Mahasiswa.map((item, index) => ({
    //                     code_kelas: location.state.kodeKls,
    //                     code_mata_kuliah: location.state.kodeMk,
    //                     code_kategori_nilai: kodeNilai[index],
    //                     code_tahun_ajaran: detailKls.code_tahun_ajaran,
    //                     code_semester: detailKls.code_semester,
    //                     code_jenjang_pendidikan: detailKls.code_jenjang_pendidikan,
    //                     code_fakultas: detailKls.code_fakultas,
    //                     code_prodi: detailKls.code_prodi,
    //                     nim: item.nim,
    //                     nilai_presentasi: inputFields[index].presentasi,
    //                     nilai_penguasaan_materi: inputFields[index].materi,
    //                     nilai_slide_power_point: inputFields[index].pptx,
    //                     nilai_keaktifan: inputFields[index].keaktifan,
    //                     nilai_hadir: inputFields[index].absen,
    //                     nilai_tugas: inputFields[index].tugas,
    //                     nilai_uts: inputFields[index].uts,
    //                     nilai_uas: inputFields[index].uas,
    //                     nilai_jumlah: nilaiSum[index],
    //                     nilai_akhir: nilaiFix[index]
    //                 }))
    //             ).then(function (response) {
    //                 setLoad(false)
    //                 Swal.fire({
    //                     title: response.data.message,
    //                     icon: "success"
    //                 }).then(() => {
    //                     navigate(`/detailnilai`, {
    //                         state: {
    //                             idKelas: location.state.idKelas,
    //                             kodeMk: location.state.kodeMk,
    //                             kodeKls: location.state.kodeKls,
    //                             kodeThn: location.state.kodeThn,
    //                             kodeSmt: location.state.kodeSmt,
    //                             kodeJen: location.state.kodeJen,
    //                             kodeFk: location.state.kodeFk,
    //                             kodeProd: location.state.kodeProd
    //                         }
    //                     })
    //                 });
    //             })
    //         }
    //     } catch (error) {
    //         setLoad(false)
    //         if (error.response) {
    //             Swal.fire({
    //                 title: error.response.data.errors[0].msg,
    //                 icon: "error"
    //             })
    //         }
    //     }
    // }

    const simpanNilai = async (e) => {
        e.preventDefault()
        setLoad(true)
        try {
            await axios.post('v1/nilaiKuliah/createByOne', {
                code_kelas: location.state.kodeKls,
                code_mata_kuliah: location.state.kodeMk,
                code_kategori_nilai: kodeNilai,
                code_tahun_ajaran: detailKls.code_tahun_ajaran,
                code_semester: detailKls.code_semester,
                code_jenjang_pendidikan: detailKls.code_jenjang_pendidikan,
                code_fakultas: detailKls.code_fakultas,
                code_prodi: detailKls.code_prodi,
                nim: nim,
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
                handleClose()
                setLoad(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getNilaiMahasiswa()
                    getMahasiswa()
                })
            })
        } catch (error) {

        }
    }

    return (
        <Layout>
            <title>Penilaian</title>
            {isError ? <Navigate to="/login" />
                :
                <>
                    {load ?
                        <div className='h-100 absolute z-50 left-0 right-0 top-0 w-full bg-[#E9EAE1] flex justify-center items-center' style={{ height: '100%' }}>
                            <div className=''>
                                <Circles
                                    height="80"
                                    width="80"
                                    color="#000"
                                    ariaLabel="circles-loading"
                                    wrapperStyle={{}}
                                    wrapperclassName=""
                                    visible={true}
                                />
                            </div>
                        </div>
                        :
                        <div className="content-wrapper">
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                size='lg'
                                keyboard={false}
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <form onSubmit={simpanNilai}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{nim} | {nama}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Row className='mb-3'>
                                            <Col>
                                                <h5>Sebelum melakukan input nilai mahasiswa, silakan centang pilihan di bawah ini!</h5>
                                                <div className="row">
                                                    <div className="col-lg-3">
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                value=""
                                                                id="flexCheckDefault1"
                                                                checked={checkedpres}
                                                                onChange={() => handleChangePres()}
                                                            />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                Presentasi
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox"
                                                                checked={checkedmtr}
                                                                onChange={() => handleChangeMateri()}
                                                                value="" id="flexCheckDefault2" />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                                Materi
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" checked={checkedppt}
                                                                onChange={() => handleChangePptx()} value="" id="flexCheckDefault3" />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault3">
                                                                Power Point
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" checked={checkedaktif}
                                                                onChange={() => handleChangeAktif()} value="" id="flexCheckDefault4" />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault4">
                                                                Keaktifan
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" checked={checkedtgs}
                                                                onChange={() => handleChangeTgs()} value="" id="flexCheckDefault5" />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault5">
                                                                Tugas
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" checked={checkedUts}
                                                                onChange={() => handleChangeUts()} value="" id="flexCheckDefault6" />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault6">
                                                                UTS
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" checked={checkedUas}
                                                                onChange={() => handleChangeUas()} value="" id="flexCheckDefault7" />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault7">
                                                                UAS
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" checked={checkedAbsen}
                                                                onChange={() => handleChangeAbsen()} value="" id="flexCheckDefault8" />
                                                            <label className="form-check-label" htmlFor="flexCheckDefault8">
                                                                Absen
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="presentasi" className="form-label">Presentasi</label>
                                                <input type="number" className="form-control" name='presentasi' id="presentasi" value={presentasi} onChange={(e) => setPresentasi(e.target.value)} placeholder="Presentasi" disabled={!checkedpres} />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="materi" className="form-label">Materi</label>
                                                <input type="number" className="form-control" name='materi' id="materi" value={materi} onChange={(e) => setMateri(e.target.value)} placeholder="materi" disabled={!checkedmtr} />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="pptx" className="form-label">Power Point</label>
                                                <input type="number" className="form-control" name='pptx' id="pptx" value={pptx} onChange={(e) => setPptx(e.target.value)} placeholder="pptx" disabled={!checkedppt} />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="keaktifan" className="form-label">Keaktifan</label>
                                                <input type="number" className="form-control" name='keaktifan' id="keaktifan" value={keaktifan} onChange={(e) => setKeaktifan(e.target.value)} placeholder="keaktifan" disabled={!checkedaktif} />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="tugas" className="form-label">Tugas</label>
                                                <input type="number" className="form-control" name='tugas' id="tugas" onChange={(e) => setTugas(e.target.value)} placeholder="tugas" disabled={!checkedtgs} />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="uts" className="form-label">UTS</label>
                                                <input type="number" className="form-control" name='uts' id="uts" value={uts} onChange={(e) => setUts(e.target.value)} placeholder="uts" disabled={!checkedUts} />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="uas" className="form-label">UAS</label>
                                                <input type="number" className="form-control" name='uas' id="uas" value={uas} onChange={(e) => setUas(e.target.value)} placeholder="uas" disabled={!checkedUas} />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="absen" className="form-label">Absen</label>
                                                <input type="number" className="form-control" name='absen' id="absen" value={absen} onChange={(e) => setAbsen(e.target.value)} placeholder="absen" disabled={!checkedAbsen} />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="exampleFormControlInput9" className="form-label">Jumlah</label>
                                                <input type="number" className="form-control" id="exampleFormControlInput9" readOnly value={nilaiSum} placeholder="Jumlah" />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="exampleFormControlInput10" className="form-label">Nilai</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput10" readOnly value={nilaiFixed} placeholder="Nilai" />
                                            </div>
                                            <div className="mb-2 col-lg-4">
                                                <label htmlFor="exampleFormControlInput11" className="form-label">Grade</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput11" readOnly value={nilaiHuruf} placeholder="Grade" />
                                            </div>
                                            <div className="mb-3 col-lg-4">
                                                <label htmlFor="exampleFormControlInput12" className="form-label">Status</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput12" readOnly value={kelulusan} placeholder="Status" />
                                            </div>
                                        </Row>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <button className='btn btn-sm btn-primary'>Simpan</button>
                                    </Modal.Footer>
                                </form>
                            </Modal>

                            <div className="page-header">
                                <h2 className='fs-4 font-bold'>Penilaian</h2>
                            </div>
                            <Row>
                                <Col>
                                    <Card>
                                        <Card.Body className='py-3'>
                                            <Row className='bg-[#E9EAE1] py-3 px-3 shadow-sm rounded'>
                                                <Col lg="6" sm="12">
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Jenjang</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.jenjangPendidikans[0].nama_jenjang_pendidikan : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Fakultas</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.fakultas[0].nama_fakultas : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Prodi</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.prodis[0].nama_prodi : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Kelas</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls.nama_kelas}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg="6" sm="12">
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Periode</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.tahunAjarans[0].tahun_ajaran : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Semester</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.semesters[0].semester : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Mata kuliah</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.mataKuliahs[0].nama_mata_kuliah : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                    <Row className='mb-2'>
                                                        <Col className='p-0' lg="3" md="3" sm="5" xs="5">
                                                            <Card.Text className='fw-bold text-uppercase'>Kode MK</Card.Text>
                                                        </Col>
                                                        <Col className='p-0'>
                                                            <Card.Text className='fw-bold text-uppercase'>: {detailKls != 0 ? detailKls.mataKuliahs[0].code_mata_kuliah : ""}</Card.Text>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    {/* <form onSubmit={simpanNilai}> */}
                                    <Card className='mt-3'>
                                        <Card.Body>
                                            <Row>
                                                <Col className='p-0'>
                                                    <div className="table-responsive">
                                                        <Table hover>
                                                            <thead>
                                                                <tr className='border'>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>NO</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>NIM</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Nama</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Presentasi</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Materi</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Power Point</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Keaktifan</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Tugas</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>UTS</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>UAS</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Absen</span></th>
                                                                    <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Jumlah</span></th>
                                                                    <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Nilai</span></th>
                                                                    <th className='fw-bold py-3 px-1 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Grade</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Status</span></th>
                                                                    <th className='fw-bold py-3 text-center border-2' style={{ background: '#E9EAE1' }}><span className='text-[11px]'>Aksi</span></th>
                                                                </tr>
                                                                {/* <tr className='border'>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedpres}
                                                                                    onChange={() => handleChangePres()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedmtr}
                                                                                    onChange={() => handleChangeMateri()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedppt}
                                                                                    onChange={() => handleChangePptx()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedaktif}
                                                                                    onChange={() => handleChangeAktif()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedtgs}
                                                                                    onChange={() => handleChangeTgs()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedUts}
                                                                                    onChange={() => handleChangeUts()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedUas}
                                                                                    onChange={() => handleChangeUas()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                        <th className='fw-bold py-1 px-1 text-center border-2' style={{ background: '#E9EAE1' }}>
                                                                            <div className="form-check">
                                                                                <input className="form-check-input"
                                                                                    checked={checkedAbsen}
                                                                                    onChange={() => handleChangeAbsen()}
                                                                                    type="checkbox" />
                                                                            </div>
                                                                        </th>
                                                                    </tr> */}
                                                            </thead>
                                                            <tbody>
                                                                {Nilai.map((item, index) => (
                                                                    <tr key={index} className='border'>
                                                                        <td className='py-2 border text-center'><span className='text-[11px]'>{index + 1}</span></td>
                                                                        <td className='py-2 border text-capitalize' align='center'><span className='text-[11px]'>{item.mahasiswas[0].nim}</span></td>
                                                                        <td className='py-2 border text-capitalize'><span className='text-[11px]'>{item.mahasiswas[0].nama}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_presentasi}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_penguasaan_materi}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_slide_power_point}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_keaktifan}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_tugas}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_uts}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_uas}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_hadir}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_jumlah}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.nilai_akhir}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'><span className='text-[11px]'>{item.kategoriNilais[0].nilai_huruf}</span></td>
                                                                        <td className='py-2 border text-capitalize' align='center'>
                                                                            {item.kategoriNilais[0].keterangan == 'LULUS' ?
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline font-bold leading-none text-white text-[11px]">{item.kategoriNilais[0].keterangan}</span>
                                                                                :
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline font-bold leading-none text-white text-[11px]">{item.kategoriNilais[0].keterangan}</span>
                                                                            }
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'>
                                                                            {/* <Link to={'/editnilai'} state={{
                                                                                idNilai: item.id_nilai_kuliah,
                                                                                kodeMk: location.state.kodeMk,
                                                                                idKelas: location.state.idKelas,
                                                                                kodeKls: location.state.kodeKls,
                                                                                kodeThn: location.state.kodeThn,
                                                                                kodeSmt: location.state.kodeSmt,
                                                                                kodeJen: location.state.kodeJen,
                                                                                kodeFk: location.state.kodeFk,
                                                                                kodeProd: location.state.kodeProd
                                                                            }} className='bg-[#28A745] py-2 px-2 rounded-full text-white inline-flex items-center'><FaPencilAlt /></Link> */}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                                {Mahasiswa.map((mhs, index) => (
                                                                    <tr key={index} className='border'>
                                                                        <td className='py-2 border text-center'><span className='text-[11px]'>{index + 1 + Nilai.length}</span></td>
                                                                        <td className='py-2 border text-capitalize' align='center'><span className='text-[11px]'>{mhs.nim}</span></td>
                                                                        <td className='py-2 border text-capitalize'><span className='text-[11px]'>{mhs.mahasiswas[0].nama}</span></td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <span className='text-[11px]'></span>
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <span className='text-[11px]'></span>
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <span className='text-[11px]'></span>
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <span className='text-[11px]'></span>
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <span className='text-[11px]'></span>
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <span className='text-[11px]'></span>
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <span className='text-[11px]'></span>
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'>
                                                                            <span className='text-[11px]'></span>
                                                                        </td>
                                                                        <td className='py-2 border px-1 text-capitalize'></td>
                                                                        <td className='py-2 border px-1 text-capitalize'></td>
                                                                        <td className='py-2 border px-1 text-capitalize'></td>
                                                                        <td className='py-2 border px-1 text-capitalize'></td>
                                                                        <td className='py-2 border px-1 text-capitalize' align='center'>
                                                                            <button onClick={() => handleShow(mhs.nim, mhs.mahasiswas[0].nama)} className='bg-[#0D6EFD] py-2 px-2 rounded-full text-white inline-flex items-center'><FaPencilAlt /></button>
                                                                        </td>
                                                                    </tr>
                                                                ))}




                                                                {/* {Mahasiswa.map((mhs, index) => (
                                                                        <tr key={index} className='border'>
                                                                            <td className='py-2 border text-center'>{index + 1}</td>
                                                                            <td className='py-2 border text-capitalize' align='center'>{mhs.nim}</td>
                                                                            <td className='py-2 border text-capitalize'>{mhs.mahasiswas[0].nama}</td>
                                                                            <td className='py-2 border px-1 text-capitalize'>
                                                                                <input type="number" name='presentasi' value={presentasi[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' disabled={!checkedpres} style={{ width: '70px' }} />
                                                                            </td>
                                                                            <td className='py-2 border px-1 text-capitalize'>
                                                                                <input type="number" name='materi' value={materi[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' disabled={!checkedmtr} style={{ width: '70px' }} />
                                                                            </td>
                                                                            <td className='py-2 border px-1 text-capitalize'>
                                                                                <input type="number" name='pptx' value={pptx[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' disabled={!checkedppt} style={{ width: '70px' }} />
                                                                            </td>
                                                                            <td className='py-2 border px-1 text-capitalize'>
                                                                                <input type="number" name='keaktifan' value={keaktifan[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' disabled={!checkedaktif} style={{ width: '70px' }} />
                                                                            </td>
                                                                            <td className='py-2 border px-1 text-capitalize'>
                                                                                <input type="number" name='tugas' value={tugas[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' disabled={!checkedtgs} style={{ width: '70px' }} />
                                                                            </td>
                                                                            <td className='py-2 border px-1 text-capitalize'>
                                                                                <input type="number" name='uts' value={uts[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' disabled={!checkedUts} style={{ width: '70px' }} />
                                                                            </td>
                                                                            <td className='py-2 border px-1 text-capitalize'>
                                                                                <input type="number" name='uas' value={uas[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' disabled={!checkedUas} style={{ width: '70px' }} />
                                                                            </td>
                                                                            <td className='py-2 border px-1 text-capitalize'>
                                                                                <input type="number" name='absen' value={absen[index] || ''} onChange={event => handleFormChange(index, event)} className='form-control' disabled={!checkedAbsen} style={{ width: '70px' }} />
                                                                            </td>
                                                                            <td className='py-2 border px-1 text-capitalize'>{nilaiSum[index] == 0 ? "" : nilaiSum[index]}</td>
                                                                            <td className='py-2 border px-1 text-capitalize'>{nilaiFix[index] == 0 ? "" : nilaiFix[index]}</td>
                                                                            <td className='py-2 border px-1 text-capitalize'>{nilaiHuruf[index]}</td>
                                                                            <td className='py-2 border px-1 text-capitalize'>{ket[index] == 'LULUS' ?
                                                                                <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#17A2B8] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">{ket[index]}</span>
                                                                                : ket[index] == 'TIDAK LULUS' ?
                                                                                    <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-[#DC3545] px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-white">{ket[index]}</span>
                                                                                    :
                                                                                    ""
                                                                            }
                                                                            </td>
                                                                        </tr>
                                                                    ))} */}
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row>
                                                <Col>
                                                    <Link to='/detailnilai' state={{ kodeMk: location.state.kodeMk, idKelas: location.state.idKelas, kodeKls: location.state.kodeKls, kodeThn: location.state.kodeThn }} className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex items-center no-underline'><FaReply /> &nbsp; <span>Kembali</span></Link>
                                                    {/* <Link to='/detailnilai' state={{ kodeMk: location.state.kodeMk, idKelas: location.state.idKelas, kodeKls: location.state.kodeKls, kodeThn: location.state.kodeThn }} className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center float-right'><FaSave /> &nbsp; <span>Simpan</span></Link> */}
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                    {/* </form> */}
                                </Col>
                            </Row>
                        </div>
                    }
                </>
            }
        </Layout>
    )
}

export default InputNilai