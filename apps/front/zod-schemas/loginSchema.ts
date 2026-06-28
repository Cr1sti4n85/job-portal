import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Correo electrónico no válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, { message: "La contraseña debe tener menos de 20 caracteres" })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial",
    }),

  role: z.string().min(8, { message: "Rol no válido" }),
});

export type User = z.infer<typeof loginSchema>;
