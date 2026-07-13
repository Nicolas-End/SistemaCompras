#=== CONSTRUINDO AMBIENTE ====
FROM maven:3.9.16-eclipse-temurin-17  AS builder

WORKDIR /spring-development

COPY pom.xml .
COPY mvnw .
COPY mvnw.cmd .
COPY src ./src

RUN mvn clean package -DskipTests

#=== ETAPA PARA RODAR A APLICAÇÃO SPRING ===
FROM eclipse-temurin:17-jre AS runner

WORKDIR /spring-development

COPY --from=builder /spring-development/target/*.jar spring-app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "spring-app.jar"]

