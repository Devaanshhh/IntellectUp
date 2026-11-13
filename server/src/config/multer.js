const multer = require("multer")
const path = require("path")

// Storage config
const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(
      null,
      "src/uploads/documents"
    )

  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9)

    cb(
      null,
      uniqueName +
      path.extname(file.originalname)
    )

  },

})

// File filter
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    ".pdf",
    ".ppt",
    ".pptx",
    ".doc",
    ".docx",
  ]

  const ext =
    path.extname(file.originalname)
      .toLowerCase()

  if (allowedTypes.includes(ext)) {

    cb(null, true)

  } else {

    cb(
      new Error(
        "Only PDF, PPT, DOC files allowed"
      ),
      false
    )

  }

}

// Multer upload
const upload = multer({

  storage,

  fileFilter,

  fileSize:
  Number(process.env.MAX_FILE_SIZE)

})

module.exports = upload