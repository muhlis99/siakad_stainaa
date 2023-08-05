import React, { useState, useEffect } from 'react'
import { FaBookmark, FaChalkboardTeacher, FaGraduationCap, FaUserGraduate, FaUserTie } from 'react-icons/fa'
import axios from "axios"
import Chart from "chart.js/auto"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from "react-chartjs-2"
import { Line } from "react-chartjs-2"
import PuffLoader from "react-spinners/PuffLoader";

const Beranda = () => {
    const [putera, setPutera] = useState("")
    const [puteri, setPuteri] = useState("")
    const [dosen, setDosen] = useState("")
    const [prodi, setProdi] = useState("")
    const [Diagram, setDiagram] = useState([])
    const [DiagramDsn, setDiagramDsn] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])


    useEffect(() => {
        getMhsPutera()
        getMhsPuteri()
        getDosen()
        getProdi()
        getDiagramMhs()
        getDiagramDsn()
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

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        }
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Mahasiswa Pertahun',
                backgroundColor: "rgb(3, 103, 252, 0.7)",
                borderColor: "rgb(28, 118, 253)",
                borderWidth: 2,
                borderRadius: 5,
                data: Jumlah,
            },
        ]
    }

    const getDiagramDsn = async () => {
        const response = await axios.get('v1/home/diagramDosen')
        setDiagramDsn(response.data.data);
    }

    const label = DiagramDsn.map(item => (
        item.tahun
    ))

    const Jmlh = DiagramDsn.map(item => (
        item.jumlahDosen
    ))

    const dataDsn = {
        labels: label,
        datasets: [
            {
                label: 'Dosen Pertahun',
                backgroundColor: "rgb(3, 103, 252, 0.7)",
                borderColor: "rgb(28, 118, 253)",
                borderWidth: 2,
                borderRadius: 5,
                data: Jmlh,
            },
        ],
    }

    return (
        <>
            {loading ?
                <div className='w-full min-h-screen bg-white fixed top-0 left-0 right-0 bottom-0 z-50'>
                    <div className='h-28 w-28 mx-auto mt-72'>
                        <PuffLoader className='' size={109} />
                    </div>
                </div>
                :
                <div className="container mt-2">
                    <section className='mb-5'>
                        <h1 className='text-2xl font-bold'>Dashboard</h1>
                    </section>
                    <section>
                        <div className="grid grid-cols-4 gap-4 mb-4">
                            <div className='w-full h-28 border-l-4 border-l-[#60B033] bg-base-100 drop-shadow-xl rounded-md px-4 py-3 grid grid-cols-3'>
                                <div className='col-span-2 my-auto'>
                                    <h1 className='text-md text-[#60B033]'>Mahasiswa Putera</h1>
                                    <h1 className='text-2xl text-slate-500 font-bold'>{putera}</h1>
                                </div>
                                <div className='my-auto'>
                                    <h1 className='text-slate-300 text-4xl float-right'><FaUserGraduate /></h1>
                                </div>
                            </div>
                            <div className='w-full h-28 border-l-4 border-l-[#725648] bg-base-100 drop-shadow-xl rounded-md px-4 py-3 grid grid-cols-3'>
                                <div className='col-span-2 my-auto'>
                                    <h1 className='text-md text-[#725648]'>Mahasiswa Puteri</h1>
                                    <h1 className='text-2xl text-slate-500 font-bold'>{puteri}</h1>
                                </div>
                                <div className='my-auto'>
                                    <h1 className='text-slate-300 text-4xl float-right'><FaUserGraduate /></h1>
                                </div>
                            </div>
                            <div className='w-full h-28 border-l-4 border-l-[#D4C403] bg-base-100 drop-shadow-xl rounded-md px-4 py-3 grid grid-cols-2'>
                                <div className='my-auto'>
                                    <h1 className='text-md text-[#D4C403]'>Dosen</h1>
                                    <h1 className='text-2xl text-slate-500 font-bold'>{dosen}</h1>
                                </div>
                                <div className='my-auto'>
                                    <h1 className='text-slate-300 text-4xl float-right'><FaUserTie /></h1>
                                </div>
                            </div>
                            <div className='w-full h-28 border-l-4 border-l-[#2D677F] bg-base-100 drop-shadow-xl rounded-md px-4 py-3 grid grid-cols-2'>
                                <div className='my-auto'>
                                    <h1 className='text-md text-[#2D677F]'>Program Studi</h1>
                                    <h1 className='text-2xl text-slate-500 font-bold'>{prodi}</h1>
                                </div>
                                <div className='my-auto'>
                                    <h1 className='text-slate-300 text-4xl float-right'><FaBookmark /></h1>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="card bg-base-100 card-bordered shadow-md mb-2 rounded-md">
                                <div className='pl-4 pt-2 pb-2 border-b-2 bg-slate-100 rounded-e-md'>
                                    <span className='my-auto font-semibold text-slate-500'>Mahasiswa</span>
                                </div>
                                <div className="card-body p-4">
                                    <Line options={options} data={data} className='relative h-60' />
                                </div>
                            </div>
                            <div className="card bg-base-100 card-bordered shadow-md mb-2 rounded-md">
                                <div className='pl-4 pt-2 pb-2 border-b-2 bg-slate-100 rounded-e-md'>
                                    <span className='my-auto font-semibold text-slate-500'>Dosen</span>
                                </div>
                                <div className="card-body p-4">
                                    <Bar options={options} data={dataDsn} className='relative h-60' />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            }
        </>
    )
}

export default Beranda