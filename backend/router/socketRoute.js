const express = require("express");

function SocketRouter(io) {
    const router = express.Router();

    router.get("/forecast", (req, res) => {
        const count = req.query.count;
        if (!count) {
            res
                .json({
                    message: "count not exits",
                })
                .status(401);
        }

        io.emit("mod_forecast", count);
        res.json({
            message: "data delivered",
        });
    });

    return router;
}

module.exports = SocketRouter;

// const express = require('express')
// const router = express.Router()
// const socketController = require('../controllers/socketController.js')

// router.get('/all/:codeThnAjr/:codeSmt/:codeJnjPen/:codeFks/:codePrd', socketController.getAll)
// router.get('/smtByThnAjr/:thnAjr', socketController.smtByThnAjr)
// router.post('/create', socketController.post)

// module.exports = router