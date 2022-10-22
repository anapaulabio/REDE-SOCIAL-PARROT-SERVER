# REDE-SOCIAL-PARROT-SERVER

```

$ npm install

- Crie e ajuste o arquivo .env a partir do .env.example

Gere o build:
$npx tsc

Crie banco de dados automaticamente:
$ npx sequelize db:create

apague o arquivo migrate dist/infrastructure/persistence/misql/migrations/posts.migration.ts

Crie a primeira migration:
$ npx sequelize-cli db:migrate

Gere o build novamente:
$npx tsc

Crie a segunda migration
$ npx sequelize-cli db:migrate



```