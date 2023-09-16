import React, { useEffect, useState, useRef } from 'react'
import Layout from '../Layout'
import { Row, Col, Card, Button, Form, Image } from 'react-bootstrap'
import face from "../../assets/images/male.svg"
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
import { format } from "timeago.js";
// import ChatBox from "./ChatBox"
import { FaPlus } from 'react-icons/fa'


const Chat = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [status, setStatus] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [level, setLevel] = useState("")
    const [show, setShow] = useState(false);

    const [listPesan, setListPesan] = useState([])
    const [listTambahDaftarKontak, setListTambahDaftarKontak] = useState([])
    const [senderId, setsenderId] = useState("")
    const [messageId, setmessageId] = useState("")
    const [pesan, setPesan] = useState("")
    const [newMassage, setNewMassage] = useState("")
    const [emot, setEmot] = useState(false)
    const [onlineUser, setOnlineUser] = useState(null)
    const [socket, setSocket] = useState(null)
    const [namaKontak, setNamaKontak] = useState(false)
    const [namaChat, setNamaChat] = useState("")

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    useEffect(() => {
        cekmessageIdKontak()
    }, [user])

    useEffect(() => {
        loopListtambahDaftarKontak()
    }, [senderId, level])


    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        getPesan()
    }, [messageId])

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
        const newSocket = io("ws://localhost:4001/", {
            transports: ["websocket"]
        })
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [])

    // get user to socket server
    useEffect(() => {
        if (socket === null) return
        console.log(senderId)
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
        let reciptenId = ""
        if (senderId == "dns932610220") {
            reciptenId = "mhs389742654"
        } else {
            reciptenId = "dns932610220"
        }
        if (socket === null) return
        console.log(reciptenId);
        socket.emit("sendMessage", { ...newMassage, reciptenId })
    }, [newMassage])

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
                setLevel(user.data.level)
                const response = await axios.get(`v1/kontak/checkKontak/${user.data.email}`)
                setsenderId(response.data.data.code_kontak)
                setNamaChat(response.data.data.username)
            }
        } catch (error) {
            setStatus(error.response.status)
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
            const response = await axios.get(`/v1/kontak/getKontak?codekontak=${senderId}&level=${level}`)
            setListTambahDaftarKontak(response.data.data)
            console.log(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const loopListDaftarKontak = async () => {
        try {

        } catch (error) {

        }
    }

    const tambahDaftarKontak = async (i) => {
        await axios.post(`/v1/kontak/createMemberKontak`, {
            kontak: senderId,
            memberKontak: i
        }).then(function () {
            loopListtambahDaftarKontak()
        })
    }

    const getPesan = async () => {
        if (messageId) {
            const response = await axios.get(`v1/message/historyMessage/${messageId}`)
            setListPesan(response.data.data)
        }
    }

    const kirimPesan = async (e) => {
        e.preventDefault()
        if (pesan != 0) {
            await axios.post('v1/message/sendMessage', {
                message_id: messageId,
                sender_id: senderId,
                text_message: pesan,
                id_detail_contact: 1
            }).then(function (el) {
                setNewMassage(el.data.data)
                getPesan()
                setPesan("")
                setEmot(false)
            })
        }
    }

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
                                                                <Image src={face} width={40} roundedCircle alt='image' />
                                                                <div>
                                                                    <p className="mt-2 ms-1 mb-0 fw-bold fs-sm">{namaChat}</p>
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
                                                            <Image src={dataBlank} width={200} />
                                                            :
                                                            listTambahDaftarKontak.map((datas, index) => (
                                                                <li key={datas.id_kontak} className="p-2  border-bottom border-dark" onClick={() => tambahDaftarKontak(datas.code_kontak)}>
                                                                    <a href='#' className="d-flex justify-content-between text-decoration-none">
                                                                        <div className="d-flex flex-row">
                                                                            <div>
                                                                                <img src={face}
                                                                                    alt="avatar" className="d-flex align-self-center me-3 rounded-circle"
                                                                                    width="40" />
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
                                                                <Image src={face} width={40} roundedCircle alt='image' />
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
                                        <Card.Body>
                                            <div className="">
                                                <div className="overflow-auto position-relative faq-body" style={{ height: '365px' }}>
                                                    <ul className="list-unstyled mb-0">
                                                        <li className="p-2  border-bottom">
                                                            <a href="#" className="d-flex justify-content-between text-decoration-none">
                                                                <div className="d-flex flex-row">
                                                                    <div>
                                                                        <img src={face}
                                                                            alt="avatar" className="d-flex align-self-center me-3"
                                                                            width="40" />
                                                                        <span className="badge bg-success badge-dot"></span>
                                                                    </div>
                                                                    <div className="pt-2">
                                                                        <p className="fw-bold mb-0 text-secondary">Marie Horwitz</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
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
                                                    <img src={face}
                                                        alt="avatar" className="d-flex align-self-center me-3 shadow-sm rounded-circle"
                                                        width="32" />
                                                </div>
                                                <div className="pt-2">
                                                    <p className="fw-bold mb-0 text-secondary ">Marie Horwitz</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <div
                                            className="pt-3 pe-3 overflow-auto position-relative faq-body" id='message' style={{ height: '353px' }}>
                                            {listPesan.map((chat, index) => (
                                                <div
                                                    ref={scroll}
                                                    key={index} className={chat.sender_id === senderId ? "d-flex flex-row justify-content-end mb-2" : "d-flex flex-row justify-content-start mb-2"} >
                                                    <div>
                                                        <p className={`small p-2 me-3 mb-1 text-white rounded-3 ${chat.sender_id === senderId ? "bg-primary" : "bg-warning"}`}>{chat.text_message}</p>
                                                        <p className="small me-3 mb-3 rounded-3 text-muted">{format(chat.sent_datetime)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
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