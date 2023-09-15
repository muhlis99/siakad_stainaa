const express = require("express")
const messageModel = require('../models/messageModel.js')
const router = express.Router()

const socketSendMessage = function (io) {
    router.post("/sendMessage", async (req, res) => {
        const { code_message, sender_id, text_message } = req.body
        const date = new Date().toJSON()
        const postMessage = await messageModel.create({
            code_message: code_message,
            sender_id: sender_id,
            text_message: text_message,
            sent_datetime: date,
            read_message: "0",
        }).then(result => {
            if (!result) {
                res.json({
                    message: "message not exits"
                }).status(401)
            }
            res.status(201).json({
                message: "message is delivered",
                data: result
            })
        })


        // io.to(user.socketId).emit("send_message", sendMessage)
        // io.broadcast.emit("send_message", sendMessage)

    })

    return router
}

router.get("/historyMessage/:code_message", async (req, res) => {
    const { code_message } = req.params
    await messageModel.findAll({
        where: {
            code_message: code_message,
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