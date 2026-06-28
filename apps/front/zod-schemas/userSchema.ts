import z from "zod";

export const userSchema = z.object({
  fullName: z.string().min(4, { message: "El nombre es muy corto" }),
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
  phoneNumber: z
    .string()
    .regex(/^\d{9}$/, { message: "Número de teléfono no válido" }),
  profilePhoto: z.url().min(5, { message: "URL no válida" }).optional(),
  profileSkills: z
    .string()
    .transform((value) => value.split(",").map((item) => item.trim()))
    .pipe(z.string().array())
    .optional(),
  profileResume: z.url().min(5, { message: "URL no válida" }).optional(),
  profileResumeOriginalName: z
    .string({
      message: "Nombre no válido",
    })
    .optional(),
  profileBio: z
    .string()
    .min(5, { message: "Descripción muy corta" })
    .optional(),
  role: z.string().min(8, { message: "Rol no válido" }).optional(),
});

export type User = z.infer<typeof userSchema>;
