<div align="center">
  <img src="./frontend/src/assets/logo-README.png" width="400" />
</div>

# Introdução

**Time2Play** é uma aplicação de aluguel de quadras esportivas que facilita o intermédio entre clientes que desejam praticar esportes e proprietários que desejam alugar suas quadras. 

# Descrição do produto

O sistema permite que donos de quadras as disponibilizem para locação, e que clientes possam alugá-las para uso. Time2Play gerencia a disponibilidade das quadras e reservas, garantindo uma experiência completa e satisfatória para as partes.

## Prototipação do projeto

### Figma.

## Estágio inicial de desenvolvimento

<img src="./frontend/src/assets/estagioInicial.png" width="200" style="display: block;"/>

# Tecnologias

## Frontend

Desenvolvido em 
- Typescript (v5.6.2)
- React (v18.3.1).

### Estruturação de pastas

```
frontend/
│
├── uploads/
└── src/
    |── pages/
    ├── assets/
    └── shared
        ├──components
        ├──contexts
        └──utils
```

### Como rodar o projeto
```
npm install
npm run dev
```

## Backend

Desenvolvido em 
- Express (v4.21.1)
- Prisma (v6.0.0)
- Typescript (v5.6.3)
- PostgreSQL (v17.2)

### Estruturação de pastas

```
backend/
│
├── uploads/
└── src/
    │
    ├── app/
    |   ├──controllers
    |   ├──middlewares
    |   └──schemas
    |── prisma/
    ├── database/
    └── modules/
        ├── Mail
        └── Cloudinary
```

### Como rodar o projeto
```
npm install
npm run dev
```

### Comandos do prisma
```bash
npx prisma generate
npx prisma migrate dev
npx prisma studio
```


### Regras de git

- Regras de commit: Os commits devem ser feitos de forma a dizer, inicialmente, qual é o propósito do commit (feat, docs, fix, test...)
- Uso de branches: As branches são: develop e main. Após uma issue ser resolvida na develop, deve-se fazer o merge na main

### Regras de boas práticas

1.  Adoção de um padrão de notação de código: utilizar o padrão camelCase para variáveis, métodos e funções. Utilizar PascalCase para classes.
2. Documentação e comentários no código: comentar o código sempre que a lógica for complexa ou não óbvia.
3. Seguir os princípios do SOLID: aplicar os princípios SOLID para modularidade e manutenibilidade.
4. Aplicar o CLEAN CODE: código limpo e legível; dar nomes significativos às variáveis e funções/métodos; remover código não utilizado; funções/métodos curtos que focam em uma tarefa
5. Testes automatizados: Desenvolver testes unitários e/ou de integração para garantir que cada parte do sistema funcione como esperado.
6. Modularização do Código: dividir o código em módulos pequenos e reutilizáveis, tanto no frontend quanto no backend.

# Autoria

Projeto feito em 2024/2, por [Frederico Maia](https://github.com/fredmaia), [Otávio Sbampato](https://github.com/otaviosbampato/), e [Mateus Milani](https://github.com/milanimateus).