# Spa Angular

## Product Manager
+ Criação de uma `navbar` utilizando o `mat-sidenav` com um menu dinâmico para o usuário navegar pela aplicação.
+ Criação de um componente header que recebe as especificações da `view` e exibe um `mat-toolbar` com essas especificações.
+ Criação de um `module` de produtos tendo um `service` de produtos como `provider` para realizar chamadas http para um backend `json-server`.
+ Criação de um `module` de campos com componentes que recebem por `@Input` as especificações do campo, fazendo a validação dos inputs através de um `service` de validação e mostrando erros com o `mat-error` em se o campo for invalido. Esses componentes também atualizam os controles do `FormGroup` do componente pai.
+ Cadastro de produtos utilizando um `mat-card` com um `form`, inserindo os dados em um `FormGroup` e enviando mensagens dinâmicas para o usuário após ações serem realizadas através do `MatDialog`, que utiliza um componente de alerta e uma `interface` para configurações da mensagem.
+ Listagem de produtos utilizando um `mat-card` com um filtro de pesquisa e uma tabela utilizando `mat-table`, que recebe, filtra e pagina os produtos através de um `service` de configuração de parâmetros http. Tendo opções como editar que navega para a `view` de Cadastro já adaptada para edição, info que navega para a `view` de Info mostrando os dados do produto através de um `mat-list` e deletar que remove o produto da listagem e do banco de dados, essas ações também possuem mensagens dinâmicas que são exibidas para o usuário através do `MatDialog`.

