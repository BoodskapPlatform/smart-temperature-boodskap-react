# How to start the Dragino LHT65 System?

### Getting Started
This plugin requires node `>= 6.0.0` and npm `>= 1.4.15` (latest stable is recommended).

```shell
> git clone https://github.com/BoodskapPlatform/boodskap-ui
```

Once the repository has been cloned:
```shell
> cd smart-temperature-boodskap-react
```

### NPM Module Installation

```shell
> npm install
```

## Configuration

### Properties
In `config.js` file,
```shell
#default property


[boodskap]
platformUrl= /api
domainKey = `give Domain Key of the platform`
```

#### Note
If you are downloading the platform (or) running in our own dedicated server.You may have to change the `config.js`

#### Output

```shell
***************************************
Boodskap - Dragino LHT65
***************************************
1] Setting web properties success
Mon Feb 13 2023 12:33:22 GMT+0530 (IST) | Boodskap UI Build Success
Now execute > npm start
```

### How to start the UI node server?

```shell
> npm start
```
#### Output

```shell
************************************************************************************
Mon Feb 13 2023 12:33:22 GMT+0530 (IST) | Boodskap - Dragino LHT65 Listening on 3000
************************************************************************************
```
Open the Brower with this URL: http://0.0.0.0:3000
