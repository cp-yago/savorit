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

## Done

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
