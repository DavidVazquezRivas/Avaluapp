@echo off
call mvn clean package -DskipTests
call docker-compose up --build