# bsi-cli

bsi (Black Shiba Inu)

![](./assets/bsi.jpeg)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Install

```
npm install -g bsi-cli
```

## Usage

### Create

create framework template for frontend,including

- vue admin
- vue component
- react
- express
- koa

```
bsi create <template-name>
```

### Date

transfrom timestamps to formated(yyyy-MM-dd HH:mm:ss) value, vice versa

```
bsi date <value>
```

### Compress

### serve

serving a static file server in the assigned dictionary,default is current dictionary

```
bsi serve <dic-name>
```

### translate

more usage please type `bsi` or `bsi --help` for detailed usage of all command

## TODO

- [ ] compress
- [x] date
- [ ] create
- [x] serve
- [ ] translate
