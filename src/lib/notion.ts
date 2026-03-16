const NOTION_API_KEY = process.env.NOTION_API_KEY || "";
const PIPELINE_DB_ID = process.env.NOTION_PIPELINE_DB_ID || "719f92b5d7da45758476b5e6676d35d1";

export async function createPipelineLead({
  name,
  email,
  company,
  message,
}: {
  name: string;
  email: string;
  company?: string;
  message: string;
}) {
  if (!NOTION_API_KEY) return;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const followUpDate = tomorrow.toISOString().split("T")[0];

  await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: PIPELINE_DB_ID },
      properties: {
        Lead: { title: [{ text: { content: company || name } }] },
        Contacto: { rich_text: [{ text: { content: name } }] },
        Email: { email },
        Stage: { select: { name: "Identificado" } },
        Canal: { select: { name: "Website" } },
        Probabilidad: { select: { name: "10%" } },
        Notas: { rich_text: [{ text: { content: message.slice(0, 2000) } }] },
        "Próxima Acción": { rich_text: [{ text: { content: "Responder mensaje del formulario web" } }] },
        "Fecha Próxima Acción": { date: { start: followUpDate } },
      },
    }),
  });
}
