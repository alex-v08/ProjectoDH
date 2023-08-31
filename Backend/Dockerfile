# Dockerfile for java_app service
FROM openjdk:17-jdk-alpine

COPY ./target/crud-back-user-0.0.1-SNAPSHOT.jar cruduser.jar

ENTRYPOINT ["java","-jar","/cruduser.jar"]

EXPOSE 8080
