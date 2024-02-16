import React, { useState, useEffect } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { FaCheck, FaReply } from 'react-icons/fa'

const DetailRekapPersemester = () => {
    const [dataRekap, setDataRekap] = useState([])
    const [total, setTotal] = useState([])
    const [nmDosen, setNmDosen] = useState("")
    const location = useLocation()
    const { nip } = useParams()
    const { kodeThn } = useParams()
    const { kodeSmt } = useParams()
    const { kodeJnj } = useParams()
    const { kodeFkl } = useParams()
    const { kodePro } = useParams()

    useEffect(() => {
        getDetailRekapPersemester()
    }, [nip, kodeThn, kodeSmt, kodeJnj, kodeFkl, kodePro])

    const getDetailRekapPersemester = async () => {
        try {
            const response = await axios.get(`v1/presensiDosen/detailRekapPresensiPersmt/${nip}/${kodeThn}/${kodeSmt}/${kodeJnj}/${kodeFkl}/${kodePro}`)
            setDataRekap(response.data.data)
            setNmDosen(response.data.data[0].dosens[0].nama)
            setTotal(response.data.datas)
        } catch (error) {

        }
    }

    return (
        <>
            <div className='card bg-base-100 card-bordered shadow-md mb-3'>
                <div className='card-body p-4'>
                    <div className="grid grid-cols-2 gap-3 mb-2 p-3 rounded-md">
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Dosen</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{nmDosen}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Prodi</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{location.state.prodi}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Jenjang Pendidikan</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{location.state.jenjang}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Tahun Ajaran</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{location.state.tahun}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Fakultas</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{location.state.fakultas}</a>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex-initial w-36'>
                                <label>
                                    <span className="">Semester</span>
                                </label>
                            </div>
                            <div className='flex-initial w-80'>
                                <a>{location.state.semester}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='card bg-base-100 card-bordered shadow-md'>
                <div className='card-body p-4'>
                    <div>
                        <Link to="/presensi/rekappersemester"
                            state={{
                                idJenjangPendidikan: location.state.idJenjangPendidikan,
                                idFakultas: location.state.idFakultas,
                                idProdi: location.state.idProdi,
                                idTahun: location.state.idTahun,
                                idSemester: location.state.idSemester,
                                tab: 'persemester'
                            }}
                            className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex gap-1 items-center no-underline'><FaReply /> Kembali</Link>
                    </div>
                    <div className="overflow-x-auto mb-2">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className='text-gray-700 bg-[#d4cece]'>
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center' rowSpan={2}>No</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center' rowSpan={2}>Pertemuan</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center' rowSpan={2}>Tanggal</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center' rowSpan={2}>Jam Masuk</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center' rowSpan={2}>Jam Pulang</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center' colSpan={3}>Status Kehadiran</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center'>Hadir</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center'>Zoom</th>
                                    <th scope="col" className="px-3 py-2 text-sm border" align='center'>Izin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataRekap.map((item, index) => (
                                    <tr key={item.id_presensi_dosen} className='bg-white border-b text-gray-500 border-x'>
                                        <td className='px-3 py-2 font-semibold border' align='center'>{index + 1}</td>
                                        <td className='px-3 py-2 font-semibold border'>Pertemuan ke {item.jadwalPertemuans[0].pertemuan}</td>
                                        <td className='px-3 py-2 font-semibold border'>{moment(item.tanggal).format('DD MMMM YYYY')}</td>
                                        <td className='px-3 py-2 font-semibold border' align='center'>{item.jam_masuk}</td>
                                        <td className='px-3 py-2 font-semibold border' align='center'>{item.jam_pulang}</td>
                                        <td className='px-3 py-2 font-semibold border' align='center'>
                                            {item.masuk_luring == '1' ?
                                                <span className='text-blue-500'><FaCheck /></span>
                                                : ""
                                            }
                                        </td>
                                        <td className='px-3 py-2 font-semibold border' align='center'>
                                            {item.masuk_daring == '1' ?
                                                <span className='text-[#28A745]'><FaCheck /></span>
                                                : ""
                                            }
                                        </td>
                                        <td className='px-3 py-2 font-semibold border' align='center'>
                                            {item.izin == '1' ?
                                                <span className='text-[#6C757D]'><FaCheck /></span>
                                                : ""
                                            }
                                        </td>
                                    </tr>
                                ))}
                                <tr className='bg-white border-b text-gray-500 border-x'>
                                    <td className='px-3 py-2 font-semibold border' colSpan={2}>
                                        Total Hadir
                                    </td>
                                    <td className='px-3 py-2 font-semibold border' colSpan={6}>
                                        {total.length != 0 ? total[0].total_masuk_luring : ""}
                                    </td>
                                </tr>
                                <tr className='bg-white border-b text-gray-500 border-x'>
                                    <td className='px-3 py-2 font-semibold border' colSpan={2}>
                                        Total Zoom
                                    </td>
                                    <td className='px-3 py-2 font-semibold border' colSpan={6}>
                                        {total.length != 0 ? total[0].total_masuk_daring : ""}
                                    </td>
                                </tr>
                                <tr className='bg-white border-b text-gray-500 border-x'>
                                    <td className='px-3 py-2 font-semibold border' colSpan={2}>
                                        Total Izin
                                    </td>
                                    <td className='px-3 py-2 font-semibold border' colSpan={6}>
                                        {total.length != 0 ? total[0].total_izin : ""}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailRekapPersemester