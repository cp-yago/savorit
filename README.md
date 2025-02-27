# Savorit

Seu livro de receitas baseado em social medias e AI.

https://www.instagram.com/p/DE8P7thz_iD/

# Requisitos (MVP)

- [ x ] O app deve permitir a criação de uma receita a partir de uma URL de um post do Instagram.
- [ x ] O app deve permitir que o usuário se logue com o google e apple.
- [ x ] O app deve exibir todas as receitas geradas pelo usuário.
- [ ] O usuário pode criar até x receitas grátis

# To do

- [ ] Ajustar componente de bottom menu para que ele fique igual ao layout, com a aba ativa mais destacada
- [ ] Deploy Clerk to production
- [ ] Funcionalidade excluir receita

# Melhorias de experiência do usuário e layout

- [ ] O comportamento do botão de Sign out não está funcionando corretamente, ajustar isso
- [ ] O comportamento do botão de deletar conta não está funcionando corretamente, ajustar isso

## Done

- [ x ] Caso não tenha nenhuma receita criada, mostrar algum aviso em tela
- [ x ] Na página de listar receitas, os cards ficam com tamanhos diferentes a depender do tamanho da imagem, ajustar isso
- [ x ] Layout página de perfil (Logged in and Logged out)
- [ x ] Página de loading da listagem de receitas com skeleton
- [ x ] Implementar loading na página de listagem de receita
- [ x ] Ao clicar em "Salvar Receita", desabilitar o botão e mostrar um loading (Spinner)
- [ x ] Exibir as receitas do usuário na página de receitas
- [ x ] Ao criar receita, linkar ao usuário
- [ x ] Ao criar usuário, chamar o webhook de criação de usuário e salvá-lo no banco
- [ x ] Implementar fluxo de login com Google e Apple utilizando Clerk
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
