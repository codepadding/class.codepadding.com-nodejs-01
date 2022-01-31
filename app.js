const express = require('express')
const app = express()
const port = 8080;
require('./models/index')

app.use(express.json())

app.use("/", require('./routes/index'))

app.use((req, res) => {
    res.status(404).json({
        status: false,
        error: "page not found"
    })
})

app.listen(port, () => {
    console.log(`successfully run on http://localhost:${port}`);
})