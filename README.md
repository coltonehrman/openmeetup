### Setup PostgreSQL DB with PostGIS
- Start Docker container: `docker container run --name pg_db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=test_db -d -p 5432:5432 mdillon/postgis`
- BASH into container: `docker container exec -it pg_db bash`
  - Open PSQL prompt: `psql -U postgres`
    - Create PostGIS Extension - `CREATE EXTENSION postgis;`
    - Quit out of prompt: `\q`
  - Exit container BASH: `exit`