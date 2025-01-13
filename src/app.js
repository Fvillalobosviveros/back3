import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mocksRouter from "./routes/mocks.router.js"; // Importa el router de mocks

// Configurar dotenv para leer variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar con MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
connectDB();

// Rutas
app.use("/api/mocks", mocksRouter);

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
