# i18ner

the i18ner is simple localization tool.

- https://www.ksgr.net/i18ner/


## Development
### Running locally

```
$ docker-compose build
$ docker-compose up -d
```

Then open http://localhost:3080/


### Commands

```
# yarn
$ docker-compose run --rm app yarn

# Linter (ESLint)
$ docker-compose run --rm app yarn lint:check
$ docker-compose run --rm app yarn lint:fix

# Formatter (Prettier)
$ docker-compose run --rm app yarn fmt:check
$ docker-compose run --rm app yarn fmt:fix
```


## Built with
- [Vite](https://vitejs.dev)
- [Svelte](https://svelte.dev/)
- Linter ... [ESLint](https://eslint.org/)
- Formatter ... [Prettier](https://prettier.io/)
- UI Framework
  - [Bootstrap5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
    - with [SVELTESTRAP](https://sveltestrap.js.org/?path=/story/components--get-started)


