import React, { useEffect, useState, useRef } from 'react'
import { format } from "timeago.js";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { FaSmile } from "react-icons/fa"
import EmojiPicker from 'emoji-picker-react'
import { PiPaperPlaneRightFill } from "react-icons/pi"
import { io } from "socket.io-client"
import "../../assets/css/Chat.css"


const ChatBox = (props) => {
    const [listPesan, setListPesan] = useState([])
    const [senderId, setsenderId] = useState("")
    const [status, setStatus] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const { isError, user } = useSelector((state) => state.auth)
    const [messageId, setmessageId] = useState("")
    const [pesan, setPesan] = useState("")
    const [newMassage, setNewMassage] = useState("")
    const [emot, setEmot] = useState(false)
    const [socket, setSocket] = useState(null)
    const [onlineUser, setOnlineUser] = useState(null)


    useEffect(() => {
        cekmessageIdDosen()
    }, [user])

    useEffect(() => {
        getPesan()
    }, [messageId])

    const scroll = useRef()
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [listPesan])

    //  connect socket
    useEffect(() => {
        const newSocket = io("http://localhost:4001");
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
    }, [socket])

    // send message to socket server
    useEffect(() => {

        let reciptenId = ""
        if (senderId === "dns932610220") {
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



    const cekmessageIdDosen = async () => {
        try {
            if (user) {
                setEmail(user.data.email)
                const response = await axios.get(`v1/contactDosen/checkContactDosen/${user.data.email}`)
                setsenderId(response.data.data.code_contact_dosen)
            }
        } catch (error) {
            setStatus(error.response.status)
        }
    }
    const getPesan = async () => {
        // if (messageId) {
        const messageId = "123456789"
        const response = await axios.get(`v1/message/historyMessage/${messageId}`)
        setListPesan(response.data.data)
        // }
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
        setEmot(false)
    }

    const kirimPesan = async (e) => {
        e.preventDefault()
        if (pesan != 0) {
            await axios.post('v1/message/sendMessage', {
                message_id: "123456789",
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
        <>
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
        </>
    )
}

export default ChatBox
