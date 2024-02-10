import React, { useState, useEffect } from 'react'
import { FaSearch, FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaReply } from "react-icons/fa"
import { SlOptions } from 'react-icons/sl'
import { Link, useLocation } from "react-router-dom"
import axios from 'axios'
// import ReactPaginate from "react-paginate"
import Swal from "sweetalert2"
import Loading from '../Loading'
import moment from 'moment'

const ListJurnal = () => {
    const [loading, setLoading] = useState(false)
    const [Jurnal, setJurnal] = useState([])
    const location = useLocation()

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    useEffect(() => {
        getJurnalKehadiran()
    }, [location])

    const getJurnalKehadiran = async () => {
        try {
            const response = await axios.get(`v1/jurnalDosen/all/${location.state.kodeJdl}`)
            setJurnal(response.data.data)
        } catch (error) {
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
                <h1 className='text-2xl font-bold'>Jurnal Kehadiran</h1>
            </section>
            <section>
                <div className='card bg-base-100 card-bordered shadow-md mt-3'>
                    <div className='card-body p-4'>
                        <div className="grid grid-cols-2 gap-1 mb-2 p-3 rounded-md">
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="text-sm">Matakuliah</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a className="text-sm">{location.state.makul}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="text-sm">Jenjang Pendidikan</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a className='text-sm'>{location.state.jenjang}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="text-sm">Kode MK</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a className="text-sm">{location.state.kodeMk}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="text-sm">Fakultas</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a className="text-sm">{location.state.fakultas}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="text-sm">Dosen</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a className="text-sm">{location.state.dosen}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="text-sm">Prodi</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a className="text-sm">{location.state.prodi}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="text-sm">Tahun Ajaran</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a className="text-sm">{location.state.tahun}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="text-sm">Semester</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a className="text-sm">{location.state.semester}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card bg-base-100 card-bordered shadow-md mt-3'>
                    <div className='card-body p-4'>
                        <div>
                            <Link to="/jurnal" state={{
                                idJenjangPendidikan: location.state.idJenjangPendidikan,
                                idFakultas: location.state.idFakultas,
                                idProdi: location.state.idProdi,
                                idTahun: location.state.idTahun,
                                idSemester: location.state.idSemester,
                            }} className='bg-[#DC3545] py-1 px-2 rounded text-white inline-flex gap-1 items-center no-underline'><FaReply />Kembali</Link>
                        </div>
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#d4cece]'>
                                    <tr>
                                        <th scope="col" className="px-3 py-2 text-sm">NO</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Tanggal</th>
                                        <th scope="col" className="px-3 py-2 text-sm">Materi Pembahasan</th>
                                        <th scope="col" className="px-3 py-2 text-sm" align='center'>Keterangan</th>
                                        {/* <th scope="col" className="px-3 py-2 text-sm" align='center'>Aksi</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Jurnal.length == 0 ?
                                        <tr className='bg-white border-b text-gray-500 border-x'>
                                            <td className='px-3 py-2 font-semibold' colSpan={4} align='center'>Data jurnal kosong</td>
                                        </tr>
                                        :
                                        Jurnal.map((item, index) => (
                                            <tr key={item.id_jurnal_dosen} className='bg-white border-b text-gray-500 border-x'>
                                                <td className='px-3 py-2 font-semibold'>{index + 1}</td>
                                                <td className='px-3 py-2 font-semibold'>{moment(item.tanggal).format('DD MMMM YYYY')}</td>
                                                <td className='px-3 py-2 font-semibold'>{item.materi_pembahasan}</td>
                                                <td className='px-3 py-2 font-semibold' align='center'>{item.keterangan}</td>
                                                {/* <td className='px-3 py-2 font-semibold'>{item.dosenPengajar[0].nama}</td> */}
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListJurnal