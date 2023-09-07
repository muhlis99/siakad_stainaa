import React, { useEffect, useState } from 'react'
import Layout from '../Layout'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import face from "../../assets/images/faces/face1.jpg"
import "../../assets/css/demo_2/chat.css"
import { FaSmile } from "react-icons/fa"
import { PiPaperPlaneRightFill } from "react-icons/pi"
import EmojiPicker from 'emoji-picker-react'
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../features/authSlice"
import { Navigate } from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'
import { io } from "socket.io-client"
import { format } from "timeago.js";

const Chat = () => {
    const [emot, setEmot] = useState(false)
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [messageId, setmessageId] = useState("")
    const [senderId, setsenderId] = useState("")
    const [status, setStatus] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pesan, setPesan] = useState("")
    const [listPesan, setListPesan] = useState([])

    useEffect(() => {
        cekmessageIdDosen()
    }, [user])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        const socket = io('http://localhost:4001');
        socket.on('connection', (data) => {
            console.log('socket connected');
        })
    }, [])

    // useEffect(() => {
    //     socket.current = io("http://localhost:4001");
    //     socket.current.emit("new-user-add", contact);
    //     socket.current.on("get-users", (users) => {
    //         setOnlineUsers(users)
    //         console.log(onlineUsers)
    //     })
    // }, [])

    useEffect(() => {
        getPesan()
    }, [messageId])

    const cekmessageIdDosen = async () => {
        try {
            if (user) {
                setEmail(user.data.email)
                const response = await axios.get(`v1/contactDosen/checkContactDosen/${user.data.email}`)
                setsenderId(response.data.data.code_contact_dosen)
                console.log(response.data.data.code_contact_dosen)
            }
        } catch (error) {
            setStatus(error.response.status)
        }
    }

    const simpanReg = async (e) => {
        e.preventDefault()
        try {
            await axios.post('v1/contactDosen/registrasiContactDosen', {
                username: username,
                email: email
            }).then(function (response) {
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message,
                    icon: "success"
                }).then(() => {
                    setUsername("")
                    cekmessageIdDosen()
                    setStatus("")
                })
            })
        } catch (error) {
        }
    }

    const emoji = () => {
        if (emot) {
            setEmot(false)
        } else {
            setEmot(true)
        }
    }

    const onEmojiClick = (e) => {
        let sym = e.unified.split("-")
        let codesArray = []
        sym.forEach((el) => codesArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codesArray)
        setPesan(pesan + emoji)
    }

    const kirimPesan = async (e) => {
        e.preventDefault()
        await axios.post('v1/message/sendMessage', {
            message_id: "123456789",
            sender_id: senderId,
            text_message: pesan,
            id_detail_contact: 1
        }).then(function () {
            getPesan()
            setPesan("")
            setEmot(false)
        })
    }

    const getPesan = async () => {
        // if (messageId) {
        const messageId = "123456789"
        const response = await axios.get(`v1/message/historyMessage/${messageId}`)
        setListPesan(response.data.data)
        // console.log(response.data)
        // }
    }


    return (
        <Layout>
            {isError ? <Navigate to="/login" /> :
                <div className="content-wrapper">
                    {status ?
                        <Card>
                            <Card.Body>
                                <Row style={{ height: '400px' }}>
                                    <Col>
                                        <Row className=''>
                                            <Col lg="auto" className='mx-auto'>
                                                <h6 style={{ marginTop: '120px' }}>Anda belum melakukan registrasi messageId</h6>
                                                <div>
                                                    <Form onSubmit={simpanReg}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Username</Form.Label>
                                                            <Form.Control type="text" size='sm' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username anda" />
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
                        <Card id="chat3">
                            <Card.Body>
                                <Row>
                                    <Col lg="4">
                                        <div className="p-3">
                                            <div className="overflow-auto position-relative" style={{ height: '400px' }}>
                                                <ul className="list-unstyled mb-0">
                                                    <li className="p-2 border-bottom">
                                                        <a href="#!" className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div>
                                                                    <img src={face}
                                                                        alt="avatar" className="d-flex align-self-center me-3"
                                                                        width="60" />
                                                                    <span className="badge bg-success badge-dot"></span>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="fw-bold mb-0">Marie Horwitz</p>
                                                                    <p className="small text-muted">Hello, Are you there?</p>
                                                                </div>
                                                            </div>
                                                            <div className="pt-1">
                                                                <p className="small text-muted mb-1">Just now</p>
                                                                <span
                                                                    className="badge bg-danger rounded-pill float-end">3</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg="8">
                                        <div className="pt-3 pe-3 overflow-auto position-relative" id='message' style={{ height: '353px' }}>

                                            {listPesan.map((chat) => (
                                                <div key={chat.id_chat_message} className={chat.sender_id === senderId ? "d-flex flex-row justify-content-end" : "d-flex flex-row justify-content-start"} >
                                                    <div>
                                                        <p className={`small p-2 me-3 mb-1 text-white rounded-3 ${chat.sender_id === senderId ? "bg-primary" : "bg-warning"}`}>{chat.text_message}</p>
                                                        <p className="small me-3 mb-3 rounded-3 text-muted">{format(chat.sent_datetime)}</p>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                        <form onSubmit={kirimPesan}>
                                            <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                                                <a className="me-3 text-muted" onClick={emoji}><FaSmile /></a>
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
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    }
                </div>
            }
        </Layout >
    )
}

export default Chat