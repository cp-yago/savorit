# Savorit

Seu livro de receitas baseado em social medias e AI.

# Requisitos (MVP)

- [ ] O app deve permitir a criação de uma receita a partir de uma URL de um post do Instagram.
- [ ] O app deve exibir todas as receitas geradas na página de receitas.
- [ ] O app deve permitir a criação da primeira receita sem login.
- [ ] A primeira receita do usuário deve ficar salva no local storage do navegador.
- [ ] Para criar a segunda receita em diante, o usuário deve fazer login com o Google.

# To do

- [ ] Caso não tenha nenhuma receita criada, mostrar algum aviso em tela
- [ ] Inserir validação no input de url (talvez desabilitar botão caso não tenha link)
- [ ] Layout página de perfil (Logged in and Logged out)
- [ ] Implementar fluxo de criação de receita
- [ ] Definir, e talvez criar layout no figma de estado de carregamento
- [ ] Ajustar componente de bottom menu para que ele fique igual ao layout, com a aba ativa mais destacada
- [ ] Fazer o endpoint /status da api

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
- [ x ] Feedback para o Usuário,Exibir um estado visual de carregamento enquanto a receita está sendo processada (Skeleton).
- [ ] Criar endpoint para atualizar receita
- [ ] Ao criar a receita pending no db, enviar request para o microserviço de receitas para extrair ela.
- [ ] Após geração da receita, bater no endpoint (next side) para atualização da receita e exibir valores reais
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


Considere o seguinte fluxo na minha aplicação que usa react 19 e next 15:

- Usuário insere link de um post do instagram no input (o post deve ser de uma receita)
- Ao clicar em submit o form é validado e caso passe, um registro é criado no db, uma receita que tem somente id e status pending. No mesmo momento, uma request é enviada para o microserviço que extrai as informações da receita do post do instagram e retorna um json com ela formatada
- Usuário é redirecionado para a página da receita "recipes/{id}" enquanto o microserviço gera a receita.
- Ao finalizar a gereção da receita o microserviço ira enviar um request para a api do next que atualizará a receita com os dados faltantes.

Quero sua ajuda para desenvolver esse fluxo.

Estou no estágio onde a receita já foi gerada, somente com id e status pending e o usuário foi redirecionado para a página da receita.

Quero que enquanto a receita não seja gerada, ou seja, enquanto o microserviço não bater de volta no endpoint do lado do next, seja exibido um status de loading na página.

Qual é a melhor abordagem para implementar isso utilizando as melhores e mais atuais práticas do next e react?
