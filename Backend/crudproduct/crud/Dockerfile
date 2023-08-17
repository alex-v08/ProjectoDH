# Dockerfile for java_app service
FROM openjdk:17-jdk-alpine

# Copia el archivo JAR de tu aplicación a la imagen
COPY ./target/crud-0.0.1-SNAPSHOT.jar crudproduct.jar

# Expone el puerto en el que la aplicación Spring Boot se ejecutará
EXPOSE 8081

# Comando para ejecutar la aplicación cuando se inicie el contenedor
ENTRYPOINT ["java","-jar","/crudproduct.jar"]
