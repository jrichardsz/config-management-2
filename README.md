# Cyber Properties Management

Easy, minimal, centralized and manageable platform for properties files.

![home](https://raw.githubusercontent.com/wiki/utec/cyber-properties-management/static-resources/home.gif)

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

# Prerequisites

What things you need to install the software and how to install them

```
Node JS
```

# Steps

```
npm install
```

Set required environment vars

```
export AUTH_USER=john
export AUTH_PASS=doe
export ENCRYPTION_KEY=1bea8891-e074-49aa-99b2-3238daee2682
export GENERATOR_ENDPOINT=57ace69d-df3c-4546-9a71-ce6ffe46fb51
export PORT=8085
```

Finally

```
npm run start
```

# Endpoints

## Create properties file

- Create a folder called **my-awesome-app** (for example) inside **properties**
- Inside this folder, create or paste a file with configuration content. This file name could be : application.json, application.yml or application.properties

## Generate secureId

We need create and id related to our application and its properties file.

If you have some instance of **app-properties-management** running in **http://localhost:8085**, this would be the steps

- Execute this command :

```
curl -u ${MYUSER}:${MYPASS} http://localhost:8085/v1/${GENERATOR_ENDPOINT}?id=${APP_NAME}
```

In which :

    - GENERATOR_ENDPOINT = Variable de entorno
    - APP_NAME = Identificador de la aplicacion. In this example : my-awesome-app
    - MYUSER = user to authenticate in app-properties-management app
    - MYPASS = password to authenticate in app-properties-management app

- This execution , will return :

```
{
  "uuid": "786i7nldc6b7",
  "status": "200",
  "message": "success",
  "content": {
    "secureId": "abcdrefghijklmnopqrstuvxyz"
  }
}
```

In which **secureId** is the id asociated to your app properties file

## Get propertie file

- Execute this command :

```
curl -u -u ${MYUSER}:${MYPASS} http://localhost:8085/v1/properties?id=${secureId}
```

In which :

    - secureId = Is the id returned in previous step
    - MYUSER = user to authenticate in app-properties-management app
    - MYPASS = password to authenticate in app-properties-management app

- This execution will return :

```
{
  "uuid": "o622p3l9e0na",
  "status": "200",
  "message": "success",
  "content": {
    "properties": {
      "securityEnable": true,
      "securityStrategy": "google",      
      "database": "mysql",      
      "port": "3306"      
    }
  }
}
```

# Versioning

1.0.0

# Authors

* **Richard Leon Ingaruca**


# License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
