const express = require('express');
const router = express.Router();

module.exports = (app) => {

    router.get('/', (req, res) => {
        const actualPage = '/lists/index'
        console.log('here lists')
        app.render(req, res, actualPage, {})
    })

    router.get('/:address/members', (req, res) => {
        const actualPage = '/lists/members'
        console.log('here members')
        const queryParams = { address: req.params.address }
        app.render(req, res, actualPage, queryParams)
    })

    return router
}
