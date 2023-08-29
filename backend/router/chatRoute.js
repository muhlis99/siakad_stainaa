const express = require("express")
const chatMessageModel = require('../models/chatMessageModel.js')
const router = express.Router()

const socketSendMessage = function (io) {
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

router.get("/historyMessage/:contact/:member", async (req, res) => {
    const { contact, member } = req.params
    await chatMessageModel.findAll({
        where: {
            from_contact: contact,
            to_contact: member
        }
    }).then(result => {
        res.status(201).json({
            message: result
        })
    }).catch(err => {
        next(err)
    })
})

module.exports = socketSendMessage, router 