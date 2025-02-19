import {
  findRecipeById,
  updateRecipe,
} from "@/features/recipes/actions/recipes";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const requestParams = await params;

    if (!requestParams.id) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const recipe = await findRecipeById(requestParams.id);

    return Response.json({ data: recipe });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Erro ao atualizar a receita" },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const requestParams = await params;
    console.log("requestParams", requestParams);
    const { data } = await request.json();
    console.log("data", data);

    if (!requestParams.id || !data) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const recipe = await updateRecipe(requestParams.id, {
      title: data.title,
      description: data.description,
      ingredients: data.ingredients,
      instructions: data.instructions,
      status: "done",
    });

    console.log("recipe updates", recipe);

    revalidateTag("recipes");

    return new Response("Recipe updated", { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Erro ao atualizar a receita" },
      { status: 500 },
    );
  }
}
