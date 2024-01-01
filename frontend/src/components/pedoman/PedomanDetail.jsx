import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import moment from "moment"
import { FaCalendarAlt } from 'react-icons/fa'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import './cek.css'

const PedomanDetail = () => {
    const [judul, setJudul] = useState("")
    const [deskripsi, setDeskripsi] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [level, setLevel] = useState("")
    const [filePedoman, setFilePedoman] = useState("")
    const [urlDoc, setUrlDoc] = useState("")
    const location = useLocation()

    useEffect(() => {
        const getPedomanById = async () => {
            try {
                const response = await axios.get(`v1/pedoman/getById/${location.state.idPedoman}`)
                setJudul(response.data.data.judul_pedoman)
                setDeskripsi(response.data.data.deskripsi)
                setTanggal(response.data.data.tanggal_terbit)
                setLevel(response.data.data.level)
                setFilePedoman(response.data.data.file_pedoman)
            } catch (error) {

            }
        }
        getPedomanById()
    }, [location])

    useEffect(() => {
        if (filePedoman == null) {
            setUrlDoc('')
        } else {
            setUrlDoc('http://localhost:4001/v1/pedoman/public/seeLampiranPedoman/lampiranPedoman/' + filePedoman)
        }
    }, [filePedoman])

    const docs = [
        { uri: urlDoc }
    ]

    const download = () => {
        fetch(`http://localhost:4001/v1/pedoman/public/seeLampiranPedoman/lampiranPedoman/${filePedoman}`).then((response) => {
            response.blob().then((blob) => {
                const fileURL = window.URL.createObjectURL(blob)

                let alink = document.createElement("a")
                alink.href = fileURL
                alink.download = judul
                alink.click()
            })
        })
    }

    return (
        <div className='mt-2 container'>
            <section className='mb-5'>
                <h1 className='text-2xl font-bold'>Pedoman</h1>
            </section>
            <section>
                <div className="card bg-base-100 card-bordered shadow-md mb-2">
                    <div className="card-body p-4">
                        <h1 className='font-bold text-[23px] uppercase'>{judul}</h1>
                        <span className='flex gap-1 text-[#666666]'><FaCalendarAlt />{moment(tanggal).format('DD MMMM YYYY')}</span>
                        <p className='mt-3 mb-3'>{deskripsi}</p>
                        <div className='flex justify-center'>
                            <button className='btn btn-sm btn-primary' onClick={download}>Download</button>
                        </div>
                        <div>
                            <DocViewer
                                documents={docs}
                                config={{
                                    header: {
                                        disableHeader: false,
                                        disableFileName: true,
                                        retainURLParams: false,
                                    }
                                }}
                                pluginRenderers={DocViewerRenderers}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PedomanDetail