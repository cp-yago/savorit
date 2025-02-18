# Savorit

Seu livro de receitas baseado em social medias e AI.

# Requisitos (MVP)

- [ ] O app deve permitir a criação de uma receita a partir de uma URL de um post do Instagram.
- [ ] O app deve exibir todas as receitas geradas na página de receitas.
- [ ] O app deve permitir a criação da primeira receita sem login.
- [ ] A primeira receita do usuário deve ficar salva no local storage do navegador.
- [ ] Para criar a segunda receita em diante, o usuário deve fazer login com o Google.

# To do

- [ ] Fazer o endpoint /status da api
- [ ] Caso não tenha nenhuma receita criada, mostrar algum aviso em tela
- [ ] Inserir validação no input de url (talvez desabilitar botão caso não tenha link)
- [ ] Layout página de perfil (Logged in and Logged out)
- [ ] Implementar fluxo de criação de receita
- [ ] Definir, e talvez criar layout no figma de estado de carregamento
- [ ] Ajustar componente de bottom menu para que ele fique igual ao layout, com a aba ativa mais destacada

## Done

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

- [ x ] Criar uma função para validar a URL antes de enviar a requisição.
Exibir feedback instantâneo caso a URL seja inválida.
- [ x ] Submissão da Receita Criar um registro no banco com status pending.
Retornar o recipeId e redirecionar imediatamente para /recipes/:recipeId.
- [ ] Processamento Assíncrono da Receita Disparar a requisição para o microserviço em background.
Quando a resposta chegar, atualizar o registro no banco com os dados da receita e mudar o status para completed.
- [ ] Feedback para o Usuário
Exibir um estado visual de carregamento enquanto a receita está sendo processada.
Na página /recipes/:recipeId, exibir um placeholder ou esqueleto até que os dados sejam carregados.
- [ ] Atualização da UI em Tempo Real
Usar revalidatePath("/recipes/[recipeId]") para garantir que os dados sejam atualizados automaticamente.
Utilizar React Suspense + Streaming para exibir os dados assim que disponíveis.
- [ ] Cache e Performance
Implementar cache da resposta do microserviço (ex: Redis ou Next.js fetch com { next: { revalidate: 60 } }).
Avaliar o uso de WebSockets ou polling para uma experiência mais fluida.

## Ideias

- [ ] Ao inserir uma url, mudar o ícone do botão conforme a rede social.

## Refatorações

- [ ] Separar actions das métodos de db