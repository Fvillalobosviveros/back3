import { Router } from "express";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import User from "../models/User.js"; // Modelo de usuarios
import Pet from "../models/Pet.js"; // Modelo de mascotas

const router = Router();

// Mocking de usuarios
router.get("/mockingusers", async (req, res) => {
  try {
    const users = [];
    for (let i = 0; i < 50; i++) {
      users.push({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("coder123", 10),
        role: faker.helpers.arrayElement(["user", "admin"]),
        pets: [],
      });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al generar usuarios ficticios" });
  }
});

// Generar e insertar usuarios y mascotas en la base de datos
router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    if (!users || !pets) {
      return res.status(400).json({ error: "Faltan parámetros numéricos" });
    }

    const generatedUsers = [];
    const generatedPets = [];

    // Generar usuarios
    for (let i = 0; i < users; i++) {
      const user = new User({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("coder123", 10),
        role: faker.helpers.arrayElement(["user", "admin"]),
        pets: [],
      });
      generatedUsers.push(user);
      await user.save();
    }

    // Generar mascotas
    for (let i = 0; i < pets; i++) {
      const pet = new Pet({
        name: faker.animal.type(),
        age: faker.datatype.number({ min: 1, max: 15 }),
        type: faker.helpers.arrayElement(["dog", "cat", "bird"]),
      });
      generatedPets.push(pet);
      await pet.save();
    }

    res.json({
      message: "Datos generados e insertados con éxito",
      users: generatedUsers,
      pets: generatedPets,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al generar datos" });
  }
});

export default router;
