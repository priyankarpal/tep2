## ts-prisma-postgres-express boilerplate

This is boilerplate for expressjs, typescript with prisma & postgresql

## I am using Postgresql with docker, if you are using with docker please check this blog

- https://ppal.hashnode.dev/setting-up-postgresql-with-docker
- there is a part where you need to replace to postgres container IP here is the command to find the ip

```

docker inspect my-postgres -f "{{json .NetworkSettings.Networks }}"

```

### command to generate migrations

```

npx prisma migrate dev --name=<add a name>

```
