import React, { useState, useEffect } from 'react'
import { FaBookmark, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa'
import axios from "axios"
import Chart from "chart.js/auto"
import { Bar } from "react-chartjs-2"

const Beranda = () => {
    const [putera, setPutera] = useState("")
    const [puteri, setPuteri] = useState("")
    const [dosen, setDosen] = useState("")
    const [prodi, setProdi] = useState("")
    const [Diagram, setDiagram] = useState([])

    useEffect(() => {
        getMhsPutera()
        getMhsPuteri()
        getDosen()
        getProdi()
        getDiagramMhs()
    }, [])

    const getMhsPutera = async () => {
        const response = await axios.get('v1/home/totalMahasiswaPutera')
        setPutera(response.data.data)
    }

    const getMhsPuteri = async () => {
        const response = await axios.get('v1/home/totalMahasiswaPuteri')
        setPuteri(response.data.data)
    }

    const getDosen = async () => {
        const response = await axios.get('v1/home/totalDosen')
        setDosen(response.data.data)
    }

    const getProdi = async () => {
        const response = await axios.get('v1/home/totalProdi')
        setProdi(response.data.data)
    }

    const getDiagramMhs = async () => {
        const response = await axios.get('v1/home/diagramMahasiswa')
        setDiagram(response.data.data);
    }

    const labels = Diagram.map(item => (
        item.tahun
    ))

    const Jumlah = Diagram.map(item => (
        item.jumlahMahasiswa
    ))

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Mahasiswa pertahun",
                backgroundColor: "rgb(3, 103, 252, 0.7)",
                borderColor: "rgb(28, 118, 253)",
                borderWidth: 2,
                borderRadius: 5,
                data: Jumlah,
            },
        ],
    }

    return (
        <div className="container mt-2">
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
            </section>
            <section>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                        <div className='w-full h-36 bg-[#60B033] hover:bg-[#4c8a28] drop-shadow-xl rounded-md px-3 py-3 grid grid-cols-3'>
                            <div className='col-span-2'>
                                <h1 className='text-md text-white'>Mahasiswa Putera</h1>
                                <h1 className='text-3xl text-white font-bold mt-2'>{putera}</h1>
                            </div>
                            <div>
                                <h1 className='text-white text-4xl float-right'><FaUserGraduate /></h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-full h-36 bg-[#725648] rounded-md px-3 py-3 grid grid-cols-3'>
                            <div className='col-span-2'>
                                <h1 className='text-md text-white'>Mahasiswa Puteri</h1>
                                <h1 className='text-3xl text-white font-bold mt-2'>{puteri}</h1>
                            </div>
                            <div>
                                <h1 className='text-white text-4xl float-right'><FaUserGraduate /></h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-full h-36 bg-[#D4C403] rounded-md px-3 py-3 grid grid-cols-2'>
                            <div>
                                <h1 className='text-md text-white'>Dosen</h1>
                                <h1 className='text-3xl text-white font-bold mt-2'>{dosen}</h1>
                            </div>
                            <div>
                                <h1 className='text-white text-4xl float-right'><FaChalkboardTeacher /></h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-full h-36 bg-[#2D677F] rounded-md px-3 py-3 grid grid-cols-2'>
                            <div>
                                <h1 className='text-md text-white'>Program Studi</h1>
                                <h1 className='text-3xl text-white font-bold mt-2'>{prodi}</h1>
                            </div>
                            <div>
                                <h1 className='text-white text-4xl float-right'><FaBookmark /></h1>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="card bg-base-100 card-bordered shadow-md mb-2 rounded-md w-1/2">
                    <div className="card-body p-4">
                        <Bar data={data} className='relative h-60' />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Beranda