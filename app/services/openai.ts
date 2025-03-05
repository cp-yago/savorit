"use server";

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const RecipeEvent = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(
    z.object({
      name: z.string(),
      quantity: z.string().nullable(),
      unit: z.string().nullable(),
    }),
  ),
  instructions: z.array(
    z.object({
      step: z.number(),
      description: z.string(),
    }),
  ),
});

const preparePrompt = (caption: string) => {
  const prompt = `
O texto abaixo foi extraído da legenda de um post do Instagram, esse post é de uma receita, formate-o em JSON, considerando as instruções abaixo:
- Certifique-se de que o texto recebido seja de uma receita. Se o texto não for uma receita, retorne um erro.
- Você pode retornar valores que não estão explicitamente no texto, mas não invente ingredientes e etapas.
- Caso a receita não tenha uma descrição, crie uma descrição com base no texto fornecido, o texto deve conter no máximo 200 caracteres.
- Os valores quantity e unit dos ingredientes podem ser nulos caso não estejam especificados.
- O texto pode ser fornecido em inglês, português ou outro idioma, retorne sempre em português.
Receita:
${caption}
`;
  return prompt;
};

export async function formatRecipeAI(caption: string) {
  const prompt = preparePrompt(caption);
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    store: true,
    messages: [
      {
        role: "system",
        content: "Você é um assistente que formata receitas em JSON.",
      },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(RecipeEvent, "event"),
  });

  const event = completion.choices[0]?.message?.parsed;
  if (!event) {
    throw new Error("Recipe event parsing failed: parsed event is null");
  }
  return event;
}
