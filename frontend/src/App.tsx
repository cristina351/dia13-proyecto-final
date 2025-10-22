import { useEffect, useState } from "react";
import { api } from "./api";

// =======================
// Interfaces de tipos
// =======================
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

interface Tarea {
  id: number;
  titulo: string;
  descripcion?: string;
  completada: boolean;
  usuarioId: number;
  usuario: { nombre: string };
}

function App() {
  // =======================
  // Estados para Usuarios
  // =======================
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  // =======================
  // Función para obtener usuarios del backend
  // =======================
  const obtenerUsuarios = async () => {
    const res = await api.get("/usuarios");
    setUsuarios(res.data); // Guardamos la lista en el estado
  };

  // =======================
  // Función para agregar un usuario
  // =======================
  const agregarUsuario = async () => {
    if (!nombre || !email) {
      alert("Por favor completa todos los campos.");
      return;
    }
    await api.post("/usuarios", { nombre, email });
    obtenerUsuarios(); // Actualizamos la lista de usuarios
    setNombre(""); // Limpiamos los inputs
    setEmail("");
  };

  // =======================
  // Estados para Tareas
  // =======================
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  // =======================
  // Función para obtener tareas del backend
  // =======================
  const obtenerTareas = async () => {
    const res = await api.get("/tareas");
    setTareas(res.data); // Guardamos la lista de tareas
  };

  // =======================
  // Función para agregar una tarea
  // =======================
  const agregarTarea = async () => {
    if (!titulo.trim() || !usuarioId) {
      alert("Completa todos los campos y selecciona un usuario.");
      return;
    }

    try {
      await api.post("/tareas", {
        titulo: titulo.trim(),
        descripcion: descripcion || "",
        usuarioId,
        completada: false, // Por defecto, la tarea no está completada
      });
      obtenerTareas(); // Actualizamos la lista de tareas
      setTitulo(""); // Limpiamos los inputs
      setDescripcion("");
      setUsuarioId(null);
    } catch (error) {
      console.error("Error al guardar tarea:", error);
      alert("Hubo un error al guardar la tarea, revisa la consola del backend");
    }
  };

  // =======================
  // Función para marcar tarea como completada
  // =======================
  const marcarCompletada = async (id: number) => {
    try {
      await api.patch(`/tareas/${id}`, { completada: true });
      // Actualizamos el estado local para reflejar el cambio en la UI
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completada: true } : t))
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  // =======================
  // useEffect: se ejecuta al cargar el componente
  // =======================
  useEffect(() => {
    obtenerUsuarios(); // Cargar usuarios al inicio
    obtenerTareas();   // Cargar tareas al inicio
  }, []);

  // =======================
  // Render del componente
  // =======================
  return (
    <div className="container-fluid py-5 px-4">
      <div className="row justify-content-center gx-4">
        {/* =======================
            Formulario Usuarios
        ======================= */}
        <div className="col-12 col-lg-5 mb-4">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body p-4">
              <h1 className="text-center mb-4 text-success fw-bold">
                Gestión de Usuarios 👥
              </h1>
              <div className="mb-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <label htmlFor="nombre">Nombre</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email">Correo electrónico</label>
                </div>
                <button
                  onClick={agregarUsuario}
                  className="btn btn-success w-100 py-2 fw-semibold"
                >
                  Agregar Usuario
                </button>
              </div>
              <ul className="list-group">
                {usuarios.map((u) => (
                  <li
                    key={u.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{u.nombre}</strong>
                      <div className="text-muted small">{u.email}</div>
                    </div>
                    <span className="badge bg-success rounded-pill">Activo</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* =======================
            Formulario Tareas
        ======================= */}
        <div className="col-12 col-lg-5 mb-4">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body p-4">
              <h2 className="text-success fw-bold mb-3">Gestión de Tareas 📝</h2>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <select
                  className="form-select mb-2"
                  value={usuarioId ?? ""}
                  onChange={(e) => setUsuarioId(Number(e.target.value))}
                >
                  <option value="">Selecciona un usuario</option>
                  {usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nombre}
                    </option>
                  ))}
                </select>

                <button
                  className="btn btn-success w-100"
                  onClick={agregarTarea}
                >
                  Agregar Tarea
                </button>
              </div>

              <ul className="list-group">
                {tareas.map((t) => (
                  <li
                    key={t.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{t.titulo}</strong>{" "}
                      <small className="text-muted">({t.usuario.nombre})</small>
                      {t.descripcion && <p className="mb-0">{t.descripcion}</p>}
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      {/* Badge que indica si la tarea está completada */}
                      <span
                        className={`badge ${
                          t.completada ? "bg-success" : "bg-secondary"
                        }`}
                      >
                        {t.completada ? "Completada" : "Pendiente"}
                      </span>
                      {/* Botón para marcar completada */}
                      {!t.completada && (
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => marcarCompletada(t.id)}
                        >
                          Marcar completada
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
