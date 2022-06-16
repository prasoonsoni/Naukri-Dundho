const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const connectToDatabase = require('./database/connection')
connectToDatabase()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<center><h1>Welcome to CryptoNaukri Backend</h1>' +
        '<h3><a href="https://github.com/prasoonsoni/CryptoNaukri-Task" target="_blank">Visit Repository</a></h3></center>')
})

app.use('/user', require('./routes/userRoutes'))
app.use('/job', require('./routes/jobRoutes'))

app.listen(port, () => {
    console.log(`CryptoNaukri Backend listening on http://localhost:${port}`)
})