export function zodErrorsToRecord(zodError) {
  // Convierte issues de Zod en { campo: "mensaje" }
  const out = {};
  for (const issue of zodError.issues) {
    const key = issue.path.join(".") || "_form";
    out[key] = issue.message;
  }
  return out;
}
