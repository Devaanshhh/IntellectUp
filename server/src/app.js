const express = require("express")
const cors = require("cors")
const path = require("path")
const authRoutes = require("./routes/authRoutes")
const folderRoutes = require(
  "./routes/folderRoutes"
)
const errorMiddleware = require("./middleware/errorMiddleware")
const resourceRoutes = require(
  "./routes/resourceRoutes"
)
const app = express()

app.use(cors())
app.use(express.json())

app.use( "/uploads", express.static( path.join( __dirname, "uploads", "documents" ) ) )


app.get("/", (req, res) => {
  res.json({
    message: "IntellectUp API Running",
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/resources", resourceRoutes)
app.use("/api/folders", folderRoutes)
app.use(errorMiddleware)

module.exports = app