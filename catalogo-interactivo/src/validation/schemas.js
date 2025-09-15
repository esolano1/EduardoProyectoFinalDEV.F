import { z } from "zod";

// Login (Fake Store):
// demo: username: mor_2314  | password: 83r5^_
export const loginSchema = z.object({
  username: z.string().min(3, "El usuario debe tener al menos 3 caracteres."),
  password: z.string().min(3, "La contraseña debe tener al menos 3 caracteres."),
});

// Ejemplo de formulario de búsqueda/filtros (opcional):
export const searchSchema = z.object({
  q: z.string().optional().default(""),
  min: z
    .union([z.string(), z.number()])
    .optional()
    .refine((v) => v === undefined || `${v}` === "" || !isNaN(Number(v)), {
      message: "Mínimo debe ser numérico",
    }),
  max: z
    .union([z.string(), z.number()])
    .optional()
    .refine((v) => v === undefined || `${v}` === "" || !isNaN(Number(v)), {
      message: "Máximo debe ser numérico",
    }),
}).refine((vals) => {
  const min = Number(vals.min);
  const max = Number(vals.max);
  if (isNaN(min) || isNaN(max)) return true;
  return min <= max;
}, { message: "El precio mínimo no puede ser mayor al máximo" });
