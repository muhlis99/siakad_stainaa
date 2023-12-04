import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Select from 'react-select'
import axios from 'axios'
import { FaPlus, FaReply, FaSave, FaTimes } from 'react-icons/fa'
import { Link } from "react-router-dom"
import Loading from '../Loading'

const SetMhsPerpembimbing = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    // const [MhsPembimbing, setMhsPembimbing] = useState([])
    // const [kodeBimbing, setKodeBimbing] = useState("")
    // const [nama, setNama] = useState("")
    // const [nipy, setNipy] = useState("")
    // const [jenjang, setJenjang] = useState("")
    // const [fakultas, setFakultas] = useState("")
    // const [prodi, setProdi] = useState("")
    // const [kuota, setKuota] = useState("")
    // const [jumlah, setJumlah] = useState("")
    // const [select2, setSelect2] = useState("")
    // const [isClearable, setIsClearable] = useState(true)
    // const [nim, setNim] = useState("")
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    // const [show, setShow] = useState(false)
    const [checked, setChecked] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMahasiswa()
        console.log(location.state);
    }, [location])

    const getMahasiswa = async () => {
        try {
            const response = await axios.get(`v1/pembimbingAkademik/getMhsForInsert/${location.state.kodePembimbing}/${location.state.jen}/${location.state.fak}/${location.state.pro}`)
            setMahasiswa(response.data.data)
        } catch (error) {

        }
    }

    const handleCheck = (e, item) => {
        if (e.target.checked) {
            setChecked([...checked, item.nim])
        } else {
            setChecked(checked.filter((o) => o !== item.nim))
        }
    }

    const simpanMahasiswa = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (Mahasiswa.length > location.state.kuota) {
                setLoading(false)
                Swal.fire({
                    title: 'Jumlah mahasiswa melebihi kuota',
                    icon: 'error'
                })
            } else {
                await axios.post('v1/pembimbingAkademik/createDetail',
                    Mahasiswa.map((item) => ({
                        nim: item.nim,
                        code_pembimbing_akademik: location.state.kodePembimbing
                    }))
                ).then(function (response) {
                    setLoading(false)
                    Swal.fire({
                        title: response.data.message,
                        icon: "success"
                    }).then(() => {
                        navigate(`/detailpembimbingakademik`, { state: { kodePembimbing: location.state.kodePembimbing, kuota: location.state.kuota, idDsn: location.state.idDsn, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, collaps: 'kuliah', activ: '/pembimbingakademik' } })
                    });
                })
            }
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
                <h1 className='text-2xl font-bold'>Pembimbing Akademik</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <form onSubmit={simpanMahasiswa}>
                            <div className="overflow-x-auto mb-2">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className='text-gray-700 bg-[#d4cece]'>
                                        <tr>
                                            {/* <th scope="col" className="px-2 py-2 text-sm"></th> */}
                                            <th scope="col" className="px-2 py-2 text-sm">NO</th>
                                            <th scope="col" className="px-2 py-2 text-sm">NIPY</th>
                                            <th scope="col" className="px-2 py-2 text-sm">Nama Mahasiswa</th>
                                            <th scope="col" className="px-2 py-2 text-sm">Jenjang Pendidikan</th>
                                            <th scope="col" className="px-2 py-2 text-sm">Fakultas</th>
                                            <th scope="col" className="px-2 py-2 text-sm">Prodi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Mahasiswa.map((item, index) => (
                                            <tr key={index} className='bg-white border-b text-gray-500 border-x'>
                                                {/* <th scope="row" className="px-2 py-2 font-semibold whitespace-nowrap">
                                                    <div className="form-control">
                                                        <label className="cursor-pointer label justify-center">
                                                            <input
                                                                type="checkbox"
                                                                checked={checked.includes(item.nim)}
                                                                onChange={(e) => handleCheck(e, item)}
                                                                className="checkbox checkbox-success checkbox-sm"
                                                            />
                                                        </label>
                                                    </div>
                                                </th> */}
                                                <th scope="row" className="px-2 py-2 font-semibold whitespace-nowrap">{index + 1}</th>
                                                <td className='px-2 py-2 font-semibold'>{item.nim}</td>
                                                <td className='px-2 py-2 font-semibold'>{item.nama}</td>
                                                <td className='px-2 py-2 font-semibold'>{item.code_jenjang_pendidikan}</td>
                                                <td className='px-2 py-2 font-semibold'>{item.code_fakultas}</td>
                                                <td className='px-2 py-2 font-semibold'>{item.code_prodi}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='mt-2'>
                                <Link to='/detailpembimbingakademik' state={{ kodePembimbing: location.state.kodePembimbing, kuota: location.state.kuota, idDsn: location.state.idDsn, jen: location.state.jen, fak: location.state.fak, pro: location.state.pro, collaps: 'kuliah', activ: '/pembimbingakademik' }} className='btn btn-sm btn-error capitalize rounded-md'><FaReply />Kembali</Link>
                                <button className='btn btn-sm btn-primary float-right'><FaSave /> Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div >
    )
}

export default SetMhsPerpembimbing