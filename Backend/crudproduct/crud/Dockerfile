# Dockerfile for java_app service
FROM openjdk:17-jdk-alpine

COPY ./target/crud-0.0.1-SNAPSHOT.jar crudproduct.jar

ENTRYPOINT ["java","-jar","/crudproduct.jar"]

EXPOSE 8081
