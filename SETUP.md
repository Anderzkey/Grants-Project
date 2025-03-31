# Grant Project Setup

## 1. Install PostgreSQL
Download here: https://www.postgresql.org/download/

## 2. Create Database
Run in Terminal:
```bash
createdb grant_project_db

## 3. Set Up Tables
```bash
migrate -path ./migrations -database "postgres://$(whoami)@localhost:5432/grant_project_db?sslmode=disable" up
## 4. Import Real Data
```bash
psql grant_project_db < seeds.sql