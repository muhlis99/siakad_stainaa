const express = require("express")
const chatMessageModel = require('../models/chatMessageModel.js')

function SocketRouter(io) {
    const router = express.Router()
    router.post("/sendMessage", async (req, res) => {
        const { from_contact, to_contact, text_message, id_detail_contact } = req.body
        const date = new Date().toJSON()
        // const date = new Date().toISOString().replace(/T/, ' ')
        const sendMessage = {
            text: text_message,
            date: date
        }
        const postMessage = await chatMessageModel.create({
            from_contact: from_contact,
            to_contact: to_contact,
            text_message: text_message,
            sent_datetime: date,
            read_message: "0",
            id_detail_contact: id_detail_contact
        })
        if (!postMessage) {
            res.json({ message: "message not exits" }).status(401)
        }
        io.emit("send_message", sendMessage)
        res.status(201).json({
            message: "message is delivered"
        })
    })

    return router
}

module.exports = SocketRouter