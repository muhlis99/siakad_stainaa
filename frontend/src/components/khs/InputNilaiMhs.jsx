import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InputNilaiMhs = () => {
    const [Mahasiswa, setMahasiswa] = useState([])
    const [inputFields, setInputFields] = useState([])
    const [jmlMhs, setJmlMhs] = useState("")
    const [nilaiAkhir, setNIlaiAkhir] = useState([])
    const [nilaiHuruf, setNilaiHuruf] = useState([])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        // console.log(data);
    }

    useEffect(() => {
        getMahasiswa()
    }, [])

    useEffect(() => {
        addFields()
    }, [jmlMhs])

    useEffect(() => {
        getAverage()
    }, [inputFields])

    useEffect(() => {
        cekNilai()
    }, [nilaiAkhir])

    const addFields = () => {
        let newfield = []
        for (let index = 1; index <= jmlMhs; index++) {
            newfield.push({ tugas: '', uts: '', uas: '', absen: '' })
        }
        // console.log(newfield);
        setInputFields(newfield);

    }

    const getMahasiswa = async () => {
        const response = await axios.get('/v1/mahasiswa/all')
        setMahasiswa(response.data.data)
        setJmlMhs(response.data.data.length)
    }

    const getAverage = () => {
        const i = inputFields.map(el => {
            var tugas = parseInt(el.tugas) || 0
            var hadir = parseInt(el.absen) || 0
            var uts = parseInt(el.uts) || 0
            var uas = parseInt(el.uas) || 0
            var rataRata = (tugas + hadir + uts + uas) / 4
            return rataRata
        })
        setNIlaiAkhir(i)
    }

    const cekNilai = async () => {
        let nilai = []
        let promises = []
        for (let i = 0; i < nilaiAkhir.length; i++) {
            if (nilaiAkhir[i] === 0) {
                promises.push("")
            } else {
                const d = await axios.get(`/v1/nilaiKuliah/deteksiIndexNilai/${nilaiAkhir[i]}`).then(response => {
                    nilai.push(response.data.data[0].nilai_huruf)
                })
                promises.push(d)
            }
        }
        Promise.all(promises).then(() => setNilaiHuruf(nilai))
        console.log(nilai);
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-xl font-bold'>Nilai Mahasiswa</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md">
                    <div className="card-body p-4">
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className='text-gray-700 bg-[#F2F2F2]'>
                                    <tr>
                                        <th scope="col" align='center' className="px-3 py-3 border w-10">#</th>
                                        <th scope="col" align='center' className="px-3 py-3 border w-16">NIM</th>
                                        <th scope="col" align='center' className="px-3 py-3 border">Nama</th>
                                        <th scope="col" align='center' className="px-3 py-3 border w-28">Tugas Individu</th>
                                        <th scope="col" align='center' className="px-3 py-3 border w-28">UTS</th>
                                        <th scope="col" align='center' className='px-3 py-3 border w-28'>UAS</th>
                                        <th scope="col" align='center' className='px-3 py-3 border w-28'>Absen</th>
                                        <th scope="col" align='center' className='px-3 py-3 border w-20'>Nilai</th>
                                        <th scope="col" align='center' className='px-3 py-3 border w-20'>Grade</th>
                                        <th scope="col" align='center' className='px-3 py-3 border w-28'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Mahasiswa.map((mhs, index) => (
                                        <tr key={index} className='bg-white border text-gray-900'>
                                            <td className='px-2 py-2 border' align='center'>{index + 1}</td>
                                            <td className='px-2 py-2 border'>{mhs.nim}</td>
                                            <td className='px-2 py-2 border'>{mhs.nama}</td>
                                            <td className='px-2 py-2 border'>
                                                <input type="number" name='tugas' onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                            </td>
                                            <td className='px-2 py-2 border'>
                                                <input type="number" name='uts' onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                            </td>
                                            <td className='px-2 py-2 border'>
                                                <input type="number" name='uas' onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                            </td>
                                            <td className='px-2 py-2 border'>
                                                <input type="number" name='absen' onChange={event => handleFormChange(index, event)} className='input input-sm input-bordered w-[94px]' />
                                            </td>
                                            <td className='px-2 py-2 border'>{nilaiAkhir[index] == "0" ? "" : nilaiAkhir[index]}</td>
                                            <td className='px-2 py-2 border'>{nilaiHuruf[index]}</td>
                                            <td className='px-2 py-2 border'></td>
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

export default InputNilaiMhs