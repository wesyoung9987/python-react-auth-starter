# Microservices with Docker, Flask, and React

[![Build Status](https://travis-ci.org/testdrivenio/testdriven-app-2.3.svg?branch=master)](https://travis-ci.org/testdrivenio/testdriven-app-2.3)

# Running Locally

### Set environment variable for client

```
export REACT_APP_USERS_SERVICE_URL=http://localhost
```

### Build docker images

```
docker-compose -f docker-compose-dev.yml build
```

### Bring up docker containers

```
docker-compose -f docker-compose-dev.yml up -d
```

### Set up database

```
docker-compose -f docker-compose-dev.yml run users python manage.py recreate-db
```

### Seed database (optional)

```
docker-compose -f docker-compose-dev.yml run users python manage.py seed-db
```

Open browser to http://localhost:3007 for client. Backend API can be accessed at http://localhost:5001.
