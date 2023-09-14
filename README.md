# API Tamagochi

## Geral

API desenvolvida para o trabalho da disciplina de Desenvolvimento de Aplicativos Móveis.

## Modelagem e fluxo geral

A API conta com 2 entidades: usuários e pets, onde cada usuário pode ter N pets e 1 pet é de apenas um usuário.

O usuário deverá se cadastrar e logar para conseguir acessar os pets. A autenticação é feita via JWT, onde deve ser passado o token do usuário para as rotas relacionadas a pets para validar a requisição.

A URL base é: `https://tamagochiapi-clpsampedro.b4a.run`

A cada X tempo o PET via perdendo pontos de alimentação, descanso e diversão.

## Rotas de usuário

- `POST /register`: Criação de usuários. A senha deve conter pelo menos 6 caracteres. Retorna mensagem de sucesso
  - Body:

```
        {
            "email": "email@email.com",
            "password": "123456"
        }
```

- `POST /login`: rota de login. Retorna o token do usuário
  - Body:

```
        {
            "email": "email@email.com",
            "password": "123456"
        }
```

## Rotas de PETS

TODAS as rotas de pet precisam estar autenticadas, ou seja, receberem o token do usuário como header

`x-access-token   tokenDoUsuario`

- `POST /pet`: Criação de pet
  - Body:

```
        {
            "name": "pet 6"
        }
```

- `PUT /pet/:id`: atualiza o nome do pet
  - Body:

```
        {
            "name": "pet 6"
        }
```

- `DELETE  /pet/:id`: deleta o pet

- `GET /pets`: retorna todos os pets do usuário

- `GET /pet/:id`: retorna o pet que possui o ID informado

- `POST /pet/:id/food`: Alimenta o pet

- `POST /pet/:id/rest`: Aumenta o descanso do pet

- `POST /pet/:id/play`: Brinca com o pet
