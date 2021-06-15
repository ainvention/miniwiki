# App descriptions

## Structure

- backend (Strapi)
- client (React)

## Dependencies injection

```sh
/mini-wiki/backend$ npm install
/mini-wiki/client$ npm install
```

## Run Code

```sh
### 1. Use backend with Strapi

> /mini-wiki/backend$ npm run develop
> /mini-wiki/client$ npm run start

// then, access to http://localhost:1337/admin

Login with...
ex)
email: 'admin@admin.io'
password: 'Admin1234'
```

## These features currently in development

1. ~~Darkmode~~
2. ~~Update a wiki~~
3. need more refactoring about natural separation for state-management, business and presentational components
4. searchable using a search-engine by Algolia or ElasticSearch
