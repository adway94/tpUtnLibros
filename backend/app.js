const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

const mongoose = require("mongoose");
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
const apiRoutes = require("./routes/apiRoutes");

const { urlencoded } = require("body-parser");
const port = process.env.PORT ? process.env.PORT : 3001;

// Conexion con la base de datos MongoDB
var mongoDB = "mongodb://localhost/whereismybook";
mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => {
    // Conexion exitosa
    console.log("Conexion exitosa con MongoDB");
  })
  .catch((err) => {
    console.log("No me pude conectar con MongoDB");
    console.log(err);
  });

// Manejo de parmetros url y json
app.use(urlencoded());
app.use(express.json());

// Prueba de servidor en index
app.get("/", (req, res) => {
  res.send("Estas vivo en el: " + port);
});

// Agregamos rutas API
app.use(apiRoutes);

// Escucha puerto
app.listen(port, () => {
  console.log("Im alive at port: " + port);
});
