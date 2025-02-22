# Savorit

Seu livro de receitas baseado em social medias e AI.

https://www.instagram.com/p/DE8P7thz_iD/

# Requisitos (MVP)

- [ x ] O app deve permitir a criação de uma receita a partir de uma URL de um post do Instagram.
- [ ] O app deve permitir que o usuário se logue com o google e apple.
- [ ] O app deve exibir todas as receitas geradas pelo usuário.
- [ ] A primeira receita do usuário deve ficar salva no local storage do navegador.
- [ ] Para criar a segunda receita em diante, o usuário deve fazer login com o Google.
- [ ] O app deve permitir a criação da primeira receita sem login (Despriorizado).

# To do

- [ ] Implementar fluxo de login com Google e Apple utilizando Clerk
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

## Ideias

- [ ] Ao inserir uma url, mudar o ícone do botão conforme a rede social.

## Refatorações

- [ ] Separar actions das métodos de db

## Prompt

Considere o seguinte fluxo na minha aplicação que usa react 19 e next 15:

A aplicação consiste em um app web que extrai receitas de posts do instagram e as salva de forma organizada no app.

O fluxo que estou desenvolvendo é o seguinte:

1. Usuário preenche formulário e insere link de um post do Instagram
2. Após submiter o formulário e ele for validado, um registro é criado no db, esse registro é uma receita que tem somente id e status pending.
3. Usuário é redirecionado para a página da receita "recipes/{id}"
4. Ao acessar a página "recipes/{id}" a página fica com status de loading, são exibidos skeletons para dar esse feedback visual ao usuário.

O comportamento que está acontecendo é que ao submeter o form, o usuário é imediatamente redirecionado para a página "/recipes/{id}" porém ao finalizar o restante do processamento que atualiza os dados da receita, a página não é atualizada imediatamente, fazendo se necessário dar um f5.

O que pode estar acontecendo? Me sugira como resolver isso utilizando os recursos mais recentes do next e react. se possivel mude a abordagem e não utilize o componente RecipePolling.
