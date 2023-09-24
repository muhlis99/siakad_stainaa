import React, { useEffect, useState, useRef } from 'react'
import Layout from '../Layout'
import { Row, Col, Card, Button, Form, Image } from 'react-bootstrap'
import face from "../../assets/images/male.svg"
import chatBlank from "../../assets/images/noChat.svg"
import dataBlank from "../../assets/images/noData.svg"
import "../../assets/css/demo_2/chat.css"
import "../../assets/css/Chat.css"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'
import { FaSmile, FaTimes } from "react-icons/fa"
import { io } from "socket.io-client"
import { PiPaperPlaneRightFill } from "react-icons/pi"
import { format } from "timeago.js"
import EmojiPicker from 'emoji-picker-react'
// import ChatBox from "./ChatBox"
import { FaPlus } from 'react-icons/fa'


const Chat = () => {
    const dispatch = useDispatch()
    const { isError, user, role } = useSelector((state) => state.auth)
    const [status, setStatus] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [level, setLevel] = useState("")
    const [show, setShow] = useState(false)
    const [showForm, setShowForm] = useState(false)

    const [listPesan, setListPesan] = useState([])
    const [listTambahDaftarKontak, setListTambahDaftarKontak] = useState([])
    const [listDaftarKontak, setListDaftarKontak] = useState([])
    const [NamaRecipient, setNamaRecipient] = useState("________")
    const [reciptenId, setReciptenId] = useState("")
    const [imageRecipten, setImageRecipten] = useState("")
    const [prevImagesReciptenes, setPrevImagesReciptenes] = useState("")
    const [senderId, setsenderId] = useState("")
    const [messageId, setmessageId] = useState("")
    const [pesan, setPesan] = useState("")
    const [newMassage, setNewMassage] = useState("")
    const [emot, setEmot] = useState(false)
    const [onlineUser, setOnlineUser] = useState(null)
    const [socket, setSocket] = useState(null)
    const [namaKontak, setNamaKontak] = useState(false)
    const [namaChat, setNamaChat] = useState("")
    const [kontakImage, setKontakImage] = useState("")
    const [prevKontakImage, setPrevKontakImage] = useState("")
    const [listImage, setlistImage] = useState([])
    const [listImageTambahKontak, setlistImageTambahKontak] = useState([])
    const [prevListImageTambahKontak, setPrevListImageTambahKontak] = useState([])
    const [listKontakImage, setlistKontakImage] = useState([])
    const [listKontakImageDafatarKontak, setlistKontakImageDafatarKontak] = useState([])
    const [prevListKontakImageDafatarKontak, setPrevListKontakImageDafatarKontak] = useState([])
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        cekmessageIdKontak()
    }, [user])

    useEffect(() => {
        loopListDaftarKontak()
    }, [senderId])

    useEffect(() => {
        loopListtambahDaftarKontak()
    }, [senderId, level])

    useEffect(() => {
        kontakImages()
    }, [kontakImage])


    useEffect(() => {
        getDafatrKontakImage()
    }, [listKontakImage])

    useEffect(() => {
        getListImageDaftarKontak()
    }, [listKontakImageDafatarKontak])

    useEffect(() => {
        getImageKontak()
    }, [listImage])

    useEffect(() => {
        getListImageKontak()
    }, [listImageTambahKontak])


    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getPesan()
    }, [messageId])

    useEffect(() => {
        imagesReciptens()
    }, [imageRecipten])


    const emoji = () => {
        if (emot) {
            setEmot(false)
        } else {
            setEmot(true)
        }
    }

    const onEmojiClick = (e, o) => {
        let sym = e.unified.split("-")
        let codesArray = []
        sym.forEach((el) => codesArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codesArray)
        setPesan(pesan + [emoji])
        setEmot(false)
    }

    const scroll = useRef()
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [listPesan])


    useEffect(() => {
        const newSocket = io("http://localhost:4001")
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [])

    // get user to socket server
    useEffect(() => {
        if (socket === null) return
        socket.emit("addNewUser", senderId)
        socket.on("getOnlineUser", (res) => {
            setOnlineUser(res)
        })
        return () => {
            socket.off("getOnlineUser")
        }
    }, [socket, senderId])

    // send message to socket server
    useEffect(() => {
        // const oneline = onlineUser.find((user) => console.log(user.userId, newMassage, reciptenId))
        if (socket === null) return
        socket.emit("sendMessage", { ...newMassage, reciptenId })
    }, [newMassage, socket, reciptenId])

    //  recive messge 
    useEffect(() => {
        if (socket === null) return
        socket.on("getMessage", res => {
            setListPesan((prev) => [...prev, res])
        })

        return () => {
            socket.off("getMessage")
        }
    }, [socket])

    const cekmessageIdKontak = async () => {
        try {
            if (user) {
                setEmail(user.data.email)
                setLevel(user.data.role)
                const response = await axios.get(`v1/kontak/checkKontak/${user.data.email}`)
                setsenderId(response.data.data.code_kontak)
                setNamaChat(response.data.data.username)
                setKontakImage(response.data.data.image)
            }
        } catch (error) {
            setStatus(error.response.status)
        }
    }

    const kontakImages = async () => {
        try {
            if (kontakImage) {
                await axios.get(`v1/kontak/public/seeImage/kontak/${kontakImage}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevKontakImage(base64)
                })
            }
        } catch (error) {
        }
    }

    const imagesReciptens = async () => {
        try {
            if (imageRecipten) {
                await axios.get(`v1/kontak/public/seeImage/kontak/${imageRecipten}`, {
                    responseType: 'arraybuffer'
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    setPrevImagesReciptenes(base64)
                })
            }
        } catch (error) {
        }
    }

    const getDafatrKontakImage = () => {
        var i = listKontakImage.map(item => (
            item.image
        ))
        setlistKontakImageDafatarKontak(i)
    }

    const getListImageDaftarKontak = async () => {
        if (listKontakImageDafatarKontak != 0) {
            let imagesKontak = []
            let promises = []
            for (let i = 0; i < listKontakImageDafatarKontak.length; i++) {
                const t = await axios.get('v1/kontak/public/seeImage/kontak/' + listKontakImageDafatarKontak[i], {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    imagesKontak.push(base64)
                })
                promises.push(t)
            }
            Promise.all(promises).then(() => setPrevListKontakImageDafatarKontak(imagesKontak))
        }
    }


    const getImageKontak = () => {
        var i = listImage.map(item => (
            item.image
        ))
        setlistImageTambahKontak(i)
    }

    const getListImageKontak = async () => {
        if (listImageTambahKontak != 0) {
            let imagesKontak = []
            let promises = []
            for (let i = 0; i < listImageTambahKontak.length; i++) {
                const t = await axios.get('v1/kontak/public/seeImage/kontak/' + listImageTambahKontak[i], {
                    responseType: "arraybuffer"
                }).then((response) => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ''
                        )
                    )
                    imagesKontak.push(base64)
                })
                promises.push(t)
            }
            Promise.all(promises).then(() => setPrevListImageTambahKontak(imagesKontak))
        }
    }

    const simpanReg = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/v1/kontak/registrasiKontak', {
                username: username,
                email: email,
                level: level
            }).then(function (response) {
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    setUsername("")
                    setLevel("")
                    cekmessageIdKontak()
                    setStatus("")
                })
            })
        } catch (error) {
        }
    }

    const loopListtambahDaftarKontak = async () => {
        try {
            if (senderId && level) {
                const response = await axios.get(`/v1/kontak/getKontak?codekontak=${senderId}&level=${level}`)
                setListTambahDaftarKontak(response.data.data)
                setlistImage(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loopListDaftarKontak = async () => {
        try {
            if (senderId) {
                const response = await axios.get(`/v1/kontak/getMemberByKontak/?kontak=${senderId}`)
                setListDaftarKontak(response.data.data)
                setlistKontakImage(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const setKontakPenerima = async (e, a, b, c) => {
        setShowForm(true)
        setmessageId("")
        setNamaRecipient("")
        setReciptenId("")
        setImageRecipten("")
        setmessageId(e)
        setNamaRecipient(a)
        setReciptenId(b)
        setImageRecipten(c)
    }

    const tambahDaftarKontak = async (e) => {
        await axios.post(`/v1/kontak/createMemberKontak`, {
            kontak: senderId,
            memberKontak: e
        }).then(function () {
            loopListtambahDaftarKontak()
            loopListDaftarKontak()
        })
    }

    const getPesan = async (e) => {
        if (messageId) {
            const response = await axios.get(`v1/message/historyMessage/${messageId}`)
            setListPesan(response.data.data)
        }
    }
    const kirimPesan = async (e) => {
        e.preventDefault()
        if (pesan != 0) {
            await axios.post('v1/message/sendMessage', {
                code_message: messageId,
                sender_id: senderId,
                text_message: pesan,
            }).then(function (el) {
                setNewMassage(el.data.data)
                getPesan()
                setPesan("")
                setEmot(false)
            })
        }
    }

    console.log(listPesan);
    return (
        <Layout>
            {isError ? <Navigate to="/login" /> :
                <div className="content-wrapper">
                    {status ?
                        <Card className='shadow'>
                            <Card.Body>
                                <Row style={{ height: '400px' }}>
                                    <Col>
                                        <Row className=''>
                                            <Col lg="auto" className='mx-auto'>
                                                <h6 style={{ marginTop: '120px' }}>Anda belum melakukan registrasi messageId</h6>
                                                <div>
                                                    <Form onSubmit={simpanReg}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>nama kontak</Form.Label>
                                                            <Form.Control type="text" size='sm'
                                                                value={username}
                                                                onChange={(e) => e.target.value.length > 15 ? setNamaKontak(true) : setUsername(e.target.value) || e.target.value.length > 15 ? setNamaKontak(true) : setNamaKontak(false)}
                                                                placeholder="Masukkan username anda" />
                                                            {namaKontak && <p className='text-danger'>Nama harus 15 karakter</p>}
                                                        </Form.Group>
                                                        <Button type='submit' variant='info' size='sm' className='mx-auto'>Simpan</Button>
                                                    </Form>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        :
                        <Row>
                            <Col className='d-flex'>
                                {show ?
                                    <Card className='w-30' id="chat3">
                                        <Card.Header>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col lg={10}>
                                                            <div className="d-flex">
                                                                {prevKontakImage ? <Image src={`data:;base64,${prevKontakImage}`} thumbnail width={40} roundedCircle alt='image' /> : <Image src={face} width={40} roundedCircle alt='image' thumbnail />}
                                                                <div>
                                                                    <p className="mt-2 ms-1 mb-0 fw-bold fs-sm text-secondary">{namaChat}</p>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col lg={2}>
                                                            <div className='ms-1 mt-2 float-end d-flex'>
                                                                <button className='btn btn-secondary btn-xs p-1' title='Kembali kedaftar kontak Anda' onClick={handleClose}><FaTimes /></button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body style={{ background: '#e6e6e6' }}>
                                            <div className="">
                                                <div className="overflow-auto position-relative faq-body" style={{ height: '365px' }}>
                                                    <div className='text-center'>
                                                        <p className='fw-bold text-secondary'>Tambah Daftar Kontak Anda</p>
                                                    </div>
                                                    <ul className="list-unstyled mb-0">
                                                        {listTambahDaftarKontak.length == 0
                                                            ?
                                                            <li className='d-flex justify-content-center'>
                                                                <Image src={dataBlank} className='mt-4 ' width={150} />
                                                            </li>
                                                            :
                                                            listTambahDaftarKontak.map((datas, index) => (
                                                                <li key={datas.id_kontak} className="p-2  border-bottom border-dark" onClick={() => tambahDaftarKontak(datas.code_kontak)}>
                                                                    <a href='#' className="d-flex justify-content-between text-decoration-none">
                                                                        <div className="d-flex flex-row">
                                                                            <div>
                                                                                {prevListImageTambahKontak[index] ? <img src={`data:;base64,${prevListImageTambahKontak[index]}`} alt='kontak' className="d-flex align-self-center me-3 rounded-circle border border-dark"
                                                                                    width="40" /> : ""}
                                                                                <span className="badge bg-success badge-dot"></span>
                                                                            </div>
                                                                            <div className="pt-2">
                                                                                <p className="fw-bold mb-0 text-secondary">{datas.username}</p>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    :
                                    <Card className='w-30' id="chat3">
                                        <Card.Header>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col lg={10}>
                                                            <div className="d-flex">
                                                                {prevKontakImage ? <Image src={`data:;base64,${prevKontakImage}`} thumbnail width={40} roundedCircle alt='image' /> : <Image src={face} width={40} roundedCircle alt='image' thumbnail />}
                                                                <div>
                                                                    <p className="mt-2 ms-3 mb-0 fw-bold fs-sm text-secondary">{namaChat}</p>
                                                                </div>
                                                            </div>

                                                        </Col>
                                                        <Col lg={2}>
                                                            <div className='ms-1 mt-2 float-end d-flex'>
                                                                <button className='btn btn-secondary btn-xs p-1' title='Tambah Daftar Kontak Anda' onClick={handleShow}><FaPlus /></button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body className='p-0'>
                                            <div className="">
                                                <div className="overflow-auto position-relative faq-body" style={{ height: '365px' }}>
                                                    <ul className="list-unstyled mb-0">
                                                        <ul className="list-unstyled mb-0">
                                                            {listDaftarKontak.length == 0
                                                                ?
                                                                <li className='d-flex justify-content-center'>
                                                                    <Image src={dataBlank} className='mt-4 ' width={150} />
                                                                </li>
                                                                :
                                                                listDaftarKontak.map((list, index) => (
                                                                    <li key={list.id_detail_kontak} className={`p-2  border-bottom border-dark mt-1 mb-1 ${list.username == NamaRecipient ? 'bg-primary' : ''}`}
                                                                        onClick={() => setKontakPenerima(list.code_detail_kontak, list.username, list.member_kontak, list.image)
                                                                        }
                                                                    >
                                                                        <a href='#' className="d-flex justify-content-between text-decoration-none ">
                                                                            <div className="d-flex flex-row">
                                                                                <div>
                                                                                    {prevListKontakImageDafatarKontak[index] ? <img src={`data:;base64,${prevListKontakImageDafatarKontak[index]}`} alt='kontak' className="d-flex align-self-center me-3 rounded-circle border border-dark"
                                                                                        width="40" /> : ""}
                                                                                    <span className="badge bg-success badge-dot"></span>
                                                                                </div>
                                                                                <div className="pt-2">
                                                                                    <p className={`fw-bold mb-0 ${list.username == NamaRecipient ? 'text-white' : 'text-secondary'}`}>{list.username}</p>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </ul>
                                                </div>

                                            </div>
                                        </Card.Body>
                                    </Card>}

                                <Card className='w-75 '>
                                    <Card.Header>
                                        <div className='p-1'>
                                            <div className="d-flex flex-row">
                                                <div>
                                                    {prevImagesReciptenes ? <img src={`data:;base64,${prevImagesReciptenes}`} alt='kontak' className="d-flex align-self-center me-3 rounded-circle border border-secondary"
                                                        width="40" /> : ""}
                                                </div>
                                                <div className="pt-2">
                                                    <p className="fw-bold mb-0 text-secondary ">{NamaRecipient}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <div
                                            className="pt-3 pe-3 overflow-auto position-relative faq-body" id='message' style={{ height: '353px' }}>
                                            {listPesan.length == 0 || listPesan[0].reciptenId == ""
                                                ?
                                                <Row>
                                                    <Col>
                                                        <div className='d-flex justify-content-center mt-5'>
                                                            <Image src={chatBlank} width={500} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                :
                                                listPesan.map((chat, index) => (
                                                    < div
                                                        ref={scroll}
                                                        key={index} className={chat.sender_id === senderId ? "d-flex flex-row justify-content-end mb-2" : "d-flex flex-row justify-content-start mb-2"} >
                                                        <div>
                                                            <p className={`small p-2 me-3 mb-1 text-white rounded-3 ${chat.sender_id === senderId ? "bg-primary" : "bg-warning"}`}>
                                                                {chat.text_message}
                                                            </p>
                                                            <p className="small me-3 mb-3 rounded-3 text-muted">{format(chat.sent_datetime)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        {showForm ?
                                            <form onSubmit={kirimPesan}>
                                                <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                                    <a href='#' className="me-3 fs-4 text-black-50" onClick={emoji}><FaSmile /></a>
                                                    <input type="text" className="form-control form-control-sm" value={pesan} onChange={(e) => setPesan(e.target.value)}
                                                        placeholder="Type message" />
                                                    <button type='submit' className="ms-3 btn btn-primary btn-sm rounded-circle"><PiPaperPlaneRightFill /></button>
                                                    {
                                                        emot ?
                                                            <div className='position-absolute top-0'>
                                                                <EmojiPicker onEmojiClick={onEmojiClick} searchDisabled height={400} emojiStyle='facebook' />
                                                            </div>
                                                            :
                                                            ""
                                                    }

                                                </div>
                                            </form>
                                            :
                                            ""
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    }
                </div>
            }
        </Layout >
    )
}

export default Chat