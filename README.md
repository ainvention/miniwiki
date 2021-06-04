# App descriptions

## Structure

- backend (Strapi)
- client (React)

## Dependencies injection

```sh
/mini-wiki/backend$ yarn or npm install
/mini-wiki/client$ yarn or npm install
```

## Run Code

```sh
### 1.  Use backend with mockapi.io
// Please replace URL on .env file with below link.
// path: $/mini-wiki/client/.env

https://60b7479217d1dc0017b897a2.mockapi.io/api/v1/
```

```sh
### 2. Use backend with Strapi

> /mini-wiki/backend$ yarn start or yarn develop
> /mini-wiki/client$ yarn start
```

## These features currently in development

1. Darkmode
2. Update a wiki
3. need more refactoring about natural separation for state-management, business and presentational components
4. searchable using a search-engine