## Description

[Tim Robinson:](https://github.com/Wheredidigo/adobe) Adobe coding exercise repository to convert integers into Roman Numerals.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:debug

# production
$ npm run start:prod
```

## Running the app in a container

```bash
# development
$ docker compose up dev

# production
$ docker compose up prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Kubernetes Deployment

Included in the ./deployment/helm folder is a helm chart that can be used to deploy this api with minimal updates.

The following endpoints are provided specifically to aid in kubernetes deployments:
- /k8s/startup
- /k8s/liveness
- /k8s/readiness

## Stay in touch

- Author - [Tim Robinson](https://github.com/Wheredidigo)

## License

[GNU licensed](LICENSE).
