# Savorit

Seu livro de receitas baseado em social medias e AI.

https://www.instagram.com/p/DE8P7thz_iD/

# Requisitos (MVP)

- [ ] O app deve permitir a criação de uma receita a partir de uma URL de um post do Instagram.
- [ ] O app deve exibir todas as receitas geradas na página de receitas.
- [ ] O app deve permitir a criação da primeira receita sem login.
- [ ] A primeira receita do usuário deve ficar salva no local storage do navegador.
- [ ] Para criar a segunda receita em diante, o usuário deve fazer login com o Google.

# To do

- [ ] Retornar a imagem da receita e exibir ela em tela
- [ ] Caso não tenha nenhuma receita criada, mostrar algum aviso em tela
- [ ] Layout página de perfil (Logged in and Logged out)
- [ ] Implementar fluxo de criação de receita
- [ ] Ajustar componente de bottom menu para que ele fique igual ao layout, com a aba ativa mais destacada
- [ ] Fazer o endpoint /status da api

## Done

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

- Usuário insere link de um post do instagram no input (o post deve ser de uma receita)
- Ao clicar em submit o form é validado e caso passe, um registro é criado no db, uma receita que tem somente id e status pending. No mesmo momento, uma request é enviada para o microserviço que extrai as informações da receita do post do instagram e retorna um json com ela formatada
- Usuário é redirecionado para a página da receita "recipes/{id}" enquanto o microserviço gera a receita.
- Ao finalizar a geração da receita o microserviço ira enviar um request para a api do next que atualizará a receita com os dados faltantes.

Quero sua ajuda para desenvolver esse fluxo.

Estou no estágio onde a receita já foi gerada, somente com id e status pending e o usuário foi redirecionado para a página da receita com status loading.

Quero que quando o microserviço finalizar a geração da receita ele bata no endpoint do lado do next enviando as informações da mesma, o endpoint deverá atualizar a receita no banco de dados e a página da receita "/recipes/{id}" deverá exibir a receita gerada

Qual é a melhor forma de implementar isso usando os recursos mais modernos do next 15 e react 19? Pensei em usar cache e invalidação, faz sentido?
