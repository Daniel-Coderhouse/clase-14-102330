import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

// 1. Definir el esquema de validación con Zod
const authSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("Ingresa un formato de email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"), // Requisito mínimo de Firebase
});

const Auth = () => {
  const [firebaseError, setFirebaseError] = useState("");

  // 2. Inicializar React Hook Form con el resolver de Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Función unificada que recibe los datos ya validados por Zod
  const onSubmit = async (data, isRegister) => {
    setFirebaseError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <div>
      <h2>Firebase Authentication</h2>

      {/* Evitamos el submit nativo por defecto ya que cada botón dispara su propia acción */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit((data) => onSubmit(data, false))}
        >
          {isSubmitting ? "Cargando..." : "Iniciar sesión"}
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit((data) => onSubmit(data, true))}
        >
          {isSubmitting ? "Cargando..." : "Registrarse"}
        </button>
      </form>

      {firebaseError && <p>{firebaseError}</p>}
    </div>
  );
};

export default Auth;
