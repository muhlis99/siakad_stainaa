const express = require("express")
const chatMessageModel = require('../models/chatMessageModel.js')
const router = express.Router()

const socketSendMessage = function (io) {
    router.post("/sendMessage", async (req, res) => {
        const { message_id, sender_id, text_message, id_detail_contact } = req.body
        const date = new Date().toJSON()
        // const sendMessage = {
        //     text: text_message,
        //     date: date
        // }
        const postMessage = await chatMessageModel.create({
            message_id: message_id,
            sender_id: sender_id,
            text_message: text_message,
            sent_datetime: date,
            read_message: "0",
            id_detail_contact: id_detail_contact
        })
        if (!postMessage) {
            res.json({
                message: "message not exits"
            }).status(401)
        }


        // io.to(user.socketId).emit("send_message", sendMessage)
        // io.broadcast.emit("send_message", sendMessage)
        res.status(201).json({
            message: "message is delivered",

        })
    })

    return router
}

router.get("/historyMessage/:message_id", async (req, res) => {
    const { message_id } = req.params
    await chatMessageModel.findAll({
        where: {
            message_id: message_id,
        }
    }).then(result => {
        res.status(201).json({
            message: "data berhasil",
            data: result
        })
    }).catch(err => {
        next(err)
    })
})

module.exports = socketSendMessage, router 