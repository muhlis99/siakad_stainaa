import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FaReply } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ViewKhs = () => {
    const [ViewKhs, setViewKhs] = useState([])
    const [jumSks, setJumSks] = useState("")
    const [jumSksIndeks, setJumSksIndex] = useState("")
    const [jenjang, setJenjang] = useState("")
    const [fakultas, setFakultas] = useState("")
    const [Prodi, setProdi] = useState("")
    const [tahun, setTahun] = useState("")
    const [semt, setSemt] = useState("")
    const [nama, setNama] = useState("")
    const [nimnya, setNim] = useState("")
    const [ips, setIps] = useState("")
    const { nim } = useParams()
    const { kodeFk } = useParams()
    const { kodeJnjg } = useParams()
    const { kodeProdi } = useParams()
    const { kodeSmt } = useParams()
    const { kodeThn } = useParams()


    useEffect(() => {
        const getViewKhs = async () => {
            try {
                const response = await axios.get(`v1/khs/viewKhs/${kodeThn}/${kodeSmt}/${kodeJnjg}/${kodeFk}/${kodeProdi}/${nim}`)
                setViewKhs(response.data.data)
                setJumSks(response.data.jumlahSks)
                setJumSksIndex(response.data.jumlahSksIndex)
                setJumSksIndex(response.data.jumlahSksIndex)
                setIps(response.data.IPS)
                setNim(response.data.nim)
                setNama(response.data.mahasiswa)
                setJenjang(response.data.jenjangPendidikan)
                setFakultas(response.data.fakultas)
                setProdi(response.data.prodi)
                setTahun(response.data.tahunAjaran)
                setSemt(response.data.semester)
            } catch (error) {

            }
        }
        getViewKhs()
    }, [nim, kodeFk, kodeJnjg, kodeProdi, kodeSmt, kodeThn])



    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Kartu Hasil Studi</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <div className='py-2'>
                            <Link to="/khs" className='btn btn-sm btn-danger'><FaReply /><span className="ml-1">Kembali</span></Link>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-5 bg-base-200 p-3 rounded-md">
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="">Nama</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a>{nama}</a>
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
                                        <span className="">NIM</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a>{nimnya}</a>
                                </div>
                            </div>
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
                                        <span className="">Fakultas</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a>{fakultas}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="">Semester</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a>{semt}</a>
                                </div>
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex-initial w-36'>
                                    <label>
                                        <span className="">Prodi</span>
                                    </label>
                                </div>
                                <div className='flex-initial w-80'>
                                    <a>{Prodi}</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 w-5">#</th>
                                        <th scope="col" className="px-6 py-9">Kode MK</th>
                                        <th scope="col" className="px-6 py-3">Mata Kuliah</th>
                                        <th scope="col" className="px-6 py-3">(SKS)</th>
                                        <th scope="col" className="px-6 py-3">Angka</th>
                                        <th scope="col" className="px-6 py-3">Huruf</th>
                                        <th scope="col" className="px-6 py-3">Indeks</th>
                                        <th scope="col" className="px-6 py-3">SKS*Indeks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ViewKhs.map((item, index) => (
                                        <tr className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap border">{index + 1}</th>
                                            <td className='px-6 py-2 border'>{item.mataKuliahs[0].code_mata_kuliah}</td>
                                            <td className='px-6 py-2 border'>{item.mataKuliahs[0].nama_mata_kuliah}</td>
                                            <td className='px-6 py-2 border'>{item.mataKuliahs[0].sks}</td>
                                            <td className='px-6 py-2 border'>{item.nilai_akhir}</td>
                                            <td className='px-6 py-2 border'>{item.kategoriNilais[0].nilai_huruf}</td>
                                            <td className='px-6 py-2 border'>{item.kategoriNilais[0].interfal_skor}</td>
                                            <td className='px-6 py-2 border'>{item.sksIndexs}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className='px-6 py-2 border' colSpan="3">Jumlah</td>
                                        <td className='px-6 py-2 border'>{jumSks}</td>
                                        <td className='px-6 py-2 border' colSpan="3"></td>
                                        <td className='px-6 py-2 border'>{jumSksIndeks}</td>
                                    </tr>
                                    <tr>
                                        <td className='px-6 py-2 border' colSpan="7">IPS (Index Prestasi Semester)</td>
                                        <td className='px-6 py-2 border'>{ips}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default ViewKhs