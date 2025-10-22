"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareaController_1 = require("../controllers/tareaController");
const router = (0, express_1.Router)();
router.get("/", tareaController_1.getTareas); // GET /api/tareas
router.post("/", tareaController_1.postTarea); // POST /api/tareas
router.patch("/:id", tareaController_1.patchTarea); // PATCH /api/tareas/:id
exports.default = router;
