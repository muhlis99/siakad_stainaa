import React, { useState, useEffect } from 'react'
import { FaTimes, FaSave } from "react-icons/fa"
import axios from 'axios'
import Swal from 'sweetalert2'

const FormAddPloting = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [Ruangs, setRuangs] = useState([])
    const [Semesters, setSemesters] = useState([])
    const [idRuang, setIdRuang] = useState("")
    const [kelas, setKelas] = useState("")
    const [ruang, setRuang] = useState("")
    const [semester, setSemester] = useState("")
    const [checked, setChecked] = useState([])

    useEffect(() => {
        getMahasiswa()
    }, [])

    useEffect(() => {
        getRuangs()
        getSemesters()
    })

    useEffect(() => {
        getRuangById()
    }, [idRuang])

    const getMahasiswa = async () => {
        const response = await axios.get(`v1/mahasiswa/all`)
        setMahasiswa(response.data.data)
    }

    const getRuangs = async () => {
        const response = await axios.get('v1/ruang/all')
        setRuangs(response.data.data)
    }

    const getRuangById = async () => {
        if (idRuang != 0) {
            const response = await axios.get(`v1/ruang/getById/${idRuang}`)
            setKelas(response.data.data.code_kelas)
            setRuang(response.data.data.code_ruang)
        } else {
            setKelas("")
            setRuang("")
        }
    }

    const getSemesters = async () => {
        const response = await axios.get('v1/semester/all')
        setSemesters(response.data.data)
    }

    const handleCheck = (e, c) => {
        if (e.target.checked) {
            setChecked([...checked, c.nim])
        } else {
            setChecked(checked.filter((item) => item !== c.nim))
        }
        console.log(checked)
    }

    const simpanPlotKelas = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/plotingKelas/create', [
                checked.map((item) =>
                    [
                        {
                            nim: item,
                            code_kelas: kelas,
                            code_ruang: ruang,
                            code_semester: semester
                        }
                    ]
                )
            ]).then(function (response) {
                Swal.fire({
                    title: response.data.message,
                    icon: "success"
                }).then(() => {
                    getMahasiswa()
                });
            })
        } catch (error) {
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
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Ploting Kelas</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-36">
                    <div className="card-body p-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <select className='select select-bordered select-sm w-full' value={idRuang} onChange={(e) => setIdRuang(e.target.value)}>
                                    <option value="">Pilih Ruang</option>
                                    {Ruangs.map((item) => (
                                        <option key={item.id_ruang} value={item.id_ruang}>{item.nama_ruang}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select className='select select-bordered select-sm w-full' value={semester} onChange={(e) => setSemester(e.target.value)}>
                                    <option value="">Pilih Semester</option>
                                    {Semesters.map((item) => (
                                        <option key={item.id_semester} value={item.code_semester}>Semester {item.semester}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-span-2 mt-1'>
                                <hr className='w-full' />
                            </div>
                        </div>
                        <div className='overflow-x-auto mt-2'>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" className="pl-6 pr-0 py-3">
                                            {/* <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                                <input
                                                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                                    type="checkbox"
                                                    value=""
                                                    id="checkboxDefault" />
                                                <label
                                                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                                    htmlFor="checkboxDefault">
                                                    Semua
                                                </label>
                                            </div> */}
                                        </th>
                                        <th scope="col" className="px-6 py-3">NIM</th>
                                        <th scope="col" className="px-6 py-3">Nama</th>
                                        <th scope="col" className="px-6 py-3">Fakultas</th>
                                        <th scope="col" className="px-6 py-3">Prodi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Mahasiswa.map((c) => (
                                        <tr key={c.id_mahasiswa} className='bg-white border-b text-gray-500'>
                                            <th scope="row" className="px-6 py-2 font-medium whitespace-nowrap">
                                                <input type="checkbox"
                                                    checked={checked.includes(c.nim)}
                                                    onChange={(e) => handleCheck(e, c)}
                                                    className="checkbox checkbox-sm"
                                                />
                                            </th>
                                            <td className='px-6 py-2'>{c.nim}</td>
                                            <td className='px-6 py-2'>{c.nama}</td>
                                            <td className='px-6 py-2'>{c.fakultas[0].nama_fakultas}</td>
                                            <td className='px-6 py-2'>{c.prodis[0].nama_prodi}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="grid grid-cols-2">
                                <div className="col-span-2">
                                    <hr className='my-2' />
                                </div>
                                <div>
                                    <button className='btn btn-sm btn-danger'><FaTimes /><span className="ml-1">batal</span></button>
                                </div>
                                <div>
                                    <button className='btn btn-sm btn-default float-right' onClick={simpanPlotKelas}><FaSave /><span className="ml-1">simpan</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FormAddPloting