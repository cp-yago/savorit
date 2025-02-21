# Savorit

Seu livro de receitas baseado em social medias e AI.

https://www.instagram.com/p/DE8P7thz_iD/

# Requisitos (MVP)

- [ x ] O app deve permitir a criação de uma receita a partir de uma URL de um post do Instagram.
- [ ] O app deve exibir todas as receitas geradas na página de receitas.
- [ ] O app deve permitir a criação da primeira receita sem login.
- [ ] A primeira receita do usuário deve ficar salva no local storage do navegador.
- [ ] Para criar a segunda receita em diante, o usuário deve fazer login com o Google.

# To do

- [ ] Caso não tenha nenhuma receita criada, mostrar algum aviso em tela
- [ ] Layout página de perfil (Logged in and Logged out)
- [ ] Ajustar componente de bottom menu para que ele fique igual ao layout, com a aba ativa mais destacada
- [ ] Fazer o endpoint /status da api

## Done

- [ x ] Implementar fluxo de criação de receita
- [ x ] Retornar a imagem da receita e exibir ela em tela
- [ x ] Transformar o Badge da página da receita em um link para o instagram
- [ x ] Definir, e talvez criar layout no figma de estado de carregamento
- [ x ] Inserir validação no input de url (talvez desabilitar botão caso não tenha link)
- [ x ] Implementação inicial da feature de gerar receita
- [ x ] Configurar o Drizzle
- [ x ] Ao clicar em um card de receita, ser redirecionado para a página de receitas
- [ x ] Ao clicar no botão de adicionar na página de receitas, redirecionar para add page
- [ x ] Criar página /account só como placeholder
- [ x ] Remover barra de pesquisa da página de lista de receitas
- [ x ] Melhorar layout do card da receita, talvez colocar algum hover event
- [ x ] Mudar title das páginas
- [ x ] Ajustar navegação através do bottom menu, que funciona mal
- [ x ] Remover item Collections do menu inicial
- [ x ] Ajustar texto da página de criar receita para ficar mais específico o foco no instagram
- [ x ] Tela de adicionar receita (Layout)
- [ x ] Tela de lista de receitas (Layout)
- [ x ] Microservice Python que recebe uma url do instagram e devolve uma receita já formatada

## Feature criação da receita

## Ideias

- [ ] Ao inserir uma url, mudar o ícone do botão conforme a rede social.

## Refatorações

- [ ] Separar actions das métodos de db

Considere o seguinte fluxo na minha aplicação que usa react 19 e next 15:

A aplicação consiste em um app web que extrai receitas de posts do instagram e as salva de forma organizada no app.

O fluxo que estou desenvolvendo é o seguinte:

1. Usuário preenche formulário e insere link de um post do Instagram
2. Após submiter o formulário e ele for validado, um registro é criado no db, esse registro é uma receita que tem somente id e status pending.
3. Usuário é redirecionado para a página da receita "recipes/{id}"
4. Ao acessar a página "recipes/{id}" a página fica com status de loading, são exibidos skeletons para dar esse feedback visual ao usuário.

A função que é chamada ao submeter o formulário é essa abaixo, ela é uma server action:

```ts
export async function createRecipe(data: InsertRecipe) {
  // Create the recipe in the DB quickly with pending status
  const newRecipe = await insertRecipeDb(data);

  // Fire-and-forget the slow update operations
  (async () => {
    try {
      const instagramPost = await getInstagramPost(data.sourceUrl);
      const recipeFormatted = await formatRecipeAI(instagramPost.caption);
      await updateRecipe(newRecipe.id, {
        ...recipeFormatted,
        status: "done",
        imageUrl: instagramPost.displayUrl,
      });
    } catch (error) {
      console.error("Error processing recipe update:", error);
    }
  })();

  // Immediately redirect the user for a loading view
  redirect(`/recipes/${newRecipe.id}`);
}
```

essa é a função updateRecipe, ela também é uma server action:

```ts
export async function updateRecipe(
  id: string,
  data: Partial<Omit<SelectRecipe, "id">>,
) {
  const updatedRecipe = await updateRecipeDb(id, data);
  revalidateTag("recipe-data");
  return updatedRecipe;
}
```

A estrutura da página "/recipes/{id}" é essa:

```ts
export default async function RecipePage({
  params,
}: {
  params: Promise<Params>;
}) {
  "use cache";
  cacheTag("recipe-data");

  const { id: recipeId } = await params;

  const recipe = await findRecipeById(recipeId);

  console.log("recipe", recipe);

  if (!recipe) {
    return notFound();
  }

  return (
    <div>
      {recipe.status === "pending" ? (
        <>
          <RecipeStatusPage />
          <RecipePolling />
        </>
      ) : (
        <>
            // aqui vai o conteúdo da receita
        </>
      )}
    </div>
  );
}

```

O componente RecipePolling é esse:

```ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RecipePolling = () => {
    const router = useRouter();

    useEffect(() => {
        // Poll every 3 seconds by triggering a refresh of the server component
        const interval = setInterval(() => {
            router.refresh();
        }, 3000);
        return () => clearInterval(interval);
    }, [router]);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <p>Aguardando atualização da receita...</p>
            {/* Spinner opcional poderia ser adicionado aqui */}
        </div>
    );
};

export default RecipePolling;
```

O comportamento que está acontecendo é que ao submeter o form, o usuário é imediatamente redirecionado para a página "/recipes/{id}" porém ao finalizar o restante do processamento que atualiza os dados da receita, a página não é atualizada imediatamente, fazendo se necessário dar um f5.

O que pode estar acontecendo? Me sugira como resolver isso utilizando os recursos mais recentes do next e react. se possivel mude a abordagem e não utilize o componente RecipePolling.
