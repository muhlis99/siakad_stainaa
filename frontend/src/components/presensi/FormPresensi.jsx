import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loading from '../Loading'
import { Link, useLocation } from "react-router-dom"
import Swal from 'sweetalert2'
import moment from 'moment'
import icon from "../../assets/img/wifi.png"
import { FaReply } from "react-icons/fa"
import ProgressBar from "@ramonak/react-progress-bar"

const FormPresensi = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const [kodeRfid, setKodeRfid] = useState()
    let time = new Date().toLocaleTimeString()
    const [jam, setJam] = useState(time)
    const [jumlahPresensiMasuk, setJumlahPresensiMasuk] = useState("")
    const [jumlahPresensiPulang, setJumlahPresensiPulang] = useState("")
    const [jumlahDsn, setJumlahDsn] = useState("")

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        console.log(location.state)
    }, [location])

    useEffect(() => {
        getProgres()
    }, [location])

    const simpanAbsenDosen = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/presensiDosen/presensiByRfid', {
                codeRfid: kodeRfid,
                tgl: location.state.tgl,
            }).then(function (response) {
                // console.log(response);
                if (response.data.message == 'Data presensi berhasil disimpan') {
                    Swal.fire({
                        title: response.data.message,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setKodeRfid("")
                        getProgres()
                    })
                } else {
                    Swal.fire({
                        title: response.data.message,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setKodeRfid("")
                        getProgres()
                    })
                }
            })
        } catch (error) {
            // console.log(error.response);
            Swal.fire({
                title: 'Tidak dapat melakukan absen',
                icon: 'error',
                text: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const getProgres = async () => {
        try {
            const response = await axios.get(`v1/presensiDosen/progresPresensi/${location.state.tgl}/${location.state.kodeTahun}`)
            setJumlahDsn(response.data.data.jumlah_dosen)
            setJumlahPresensiMasuk(response.data.data.jumlah_dosen_presensi_masuk)
            setJumlahPresensiPulang(response.data.data.jumlah_dosen_presensi_pulang)
        } catch (error) {

        }
    }

    const updateJam = () => {
        time = new Date().toLocaleTimeString()
        setJam(time)
    }

    setInterval(updateJam)

    return (
        <div className='bg-[#EDEDED] h-full'>
            <div className='h-screen p-4'>
                <div className={`w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50 ${loading == true ? '' : 'hidden'}`}>
                    <div className='w-[74px] mx-auto mt-72'>
                        <Loading />
                    </div>
                </div>
                <section className='mb-3'>
                    <h1 className='text-2xl font-bold'>Presensi</h1>
                </section>
                <section>
                    <div className='flex justify-center'>
                        <div className='w-full lg:w-1/2 text-center'>
                            <ProgressBar
                                completed={`${jumlahPresensiMasuk}`}
                                maxCompleted={jumlahDsn}
                                bgColor='#17A2B8'
                            />
                            <p className='lg:text-xl mt-1 text-muted'>{jumlahPresensiMasuk} dari {jumlahDsn} dosen telah melakukan absen</p>
                        </div>
                    </div>
                    <div className='flex justify-center mt-3'>
                        <div className='w-full lg:w-1/2 text-center'>
                            <ProgressBar
                                completed={`${jumlahPresensiPulang}`}
                                maxCompleted={jumlahDsn}
                                bgColor='#DC3545'
                            />
                            <p className='lg:text-xl mt-1 text-muted'>{jumlahPresensiPulang} dari {jumlahDsn} dosen telah mengakhiri kelas</p>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <img src={icon} width={300} alt="" />
                    </div>
                    <div className='text-center'>
                        <h1 className='text-xl font-bold'>{location.state.mom}</h1>
                        <h1 className='text-xl font-bold my-2'>{jam}</h1>
                    </div>
                    <div className='flex gap-1 justify-center'>
                        <Link to='/presensi/dosen' state={{ select: 'absen' }} className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex items-center gap-1 no-underline'>Keluar</Link>
                        <Link className='bg-[#17A2B8] py-1 px-2 rounded text-white inline-flex items-center gap-1 no-underline'>Validasi</Link>
                    </div>
                    <form onSubmit={simpanAbsenDosen}>
                        <input type="text" value={kodeRfid} className='bg-[#EDEDED] focus:outline-none focus:ring-transparent focus:border-transparent caret-transparent text-[#EDEDED]' onChange={(e) => setKodeRfid(e.target.value)} autoFocus />
                    </form>
                </section>
            </div>
        </div>
    )
}

export default FormPresensi