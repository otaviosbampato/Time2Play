# Documentação dos cenários de casos de uso

<div align="center">
  <img src="../../frontend/src/assets/logo-README.png" width="400" />
</div>

## Caso de uso #01 [3+ tabelas]

##### Nome do caso de uso
Excluir reserva.

##### Atores
cliente

##### Resumo
Um cliente que esteja logado na plataforma deve ser capaz de excluir uma reserva de quadra que tenha realizado.

##### Pré-condição
O cliente precisa estar logado na plataforma, e precisa ter uma reserva pendente realizada.

##### Pós-condição
A reserva é excluida e some da aba de reservas.

## Caso de uso #02 [1 tabela]

##### Nome do caso de uso
Editar cliente.

##### Atores
Cliente

##### Resumo
Um cliente que esteja logado na plataforma deve ser capaz de editar seu nome e senha.

##### Pré-condição
O cliente precisa estar logado na plataforma.

##### Pós-condição
A foto do cliente será atualizada, tanto no frontend quanto no banco de dados.

## Caso de uso #03 [1 tabela]

##### Nome do caso de uso
Filtrar quadra.

##### Atores
Cliente

##### Resumo
Um cliente que esteja logado na plataforma deve ser capaz de filtrar as quadras que está pesquisando baseado nas seguintes condições: localização, preço, e esporte.

##### Pré-condição
O cliente precisa estar logado na plataforma.

##### Pós-condição
O sistema retorna as quadras que respeitam os filtros pré-estabelecidos.

## Caso de uso #04

##### Nome do caso de uso [3+ tabelas]
Realizar review.

##### Atores
Cliente

##### Resumo
Um cliente que esteja logado na plataforma deve ser capaz de realizar uma review sobre uma quadra que alugou.

##### Pré-condição
O cliente precisa estar logado na plataforma, e precisa ter uma reserva concluída na quadra sobre a qual está postando uma review.

##### Pós-condição
A review é postada na parte de avaliações da quadra.


## Caso de uso #05 [3+ tabelas]

##### Nome do caso de uso
Excluir reserva

##### Atores
Usuário

##### Resumo
Um usuário pode cancelar uma reserva de uma quadra para um dado horário.

##### Pré-condição
O usuário já deverá ter feito uma reserva para que ele possa cancelar

##### Pós-condição
O horário que foi cancelado pelo cliente agora será um horário disponível aos outros usuários


## Caso de uso #06 [3+ tabelas]

##### Nome do caso de uso
Excluir review

##### Atores
Proprietário

##### Resumo
Um proprietário que esteja logado na plataforma podrá excluir uma certa review de uma de suas quadras

##### Pré-condição
O proprietário precisa estar logado na plataforma.

##### Pós-condição
As avaliações da quadra serão atualizadas no banco de dados e atualizadas aos outros usuários

## Caso de uso #07 [1 tabela]

##### Nome do caso de uso
Cadastro proprietário

##### Atores
Proprietário

##### Resumo
Um cliente que esteja logado na plataforma deve ser capaz de excluir uma reserva de quadra que tenha realizado.

##### Pré-condição
O cliente precisa estar logado na plataforma, e precisa ter uma reserva pendente realizada.

##### Pós-condição
A reserva é excluida e some da aba de reservas.

## Caso de uso #08 [1 tabela]

##### Nome do caso de uso
Editar proprietário

##### Atores
Proprietário

##### Resumo
Um proprietário que esteja logado na plataforma deve ser capaz de editar seu nome e senha.

##### Pré-condição
O proprietário precisa estar logado na plataforma.

##### Pós-condição
O nome e senha do cliente será atualizado, tanto no frontend quanto no banco de dados.