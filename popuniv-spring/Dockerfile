FROM gradle:8.3-jdk17-alpine as build

WORKDIR /build

# 그래들 파일이 변경되었을 때만 새롭게 의존패키지 다운로드 받게함.
COPY build.gradle settings.gradle /build/
RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true

# 빌더 이미지에서 애플리케이션 빌드
COPY . /build
RUN gradle build -x test --parallel

FROM openjdk:17-jdk

WORKDIR /app

# 빌더 이미지에서 jar 파일만 복사
COPY --from=build /app.jar .

EXPOSE 8080

# ENV SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/popuniv_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&useUnicode=yes&characterEncoding=UTF-8
# ENV SPRING_DATASOURCE_USERNAME=root
# ENV SPRING_DATASOURCE_PASSWORD=rootpass 


USER root
ENTRYPOINT [                                                \
    "java",                                                 \
    "-jar",                                                 \
    "app.jar"              \
]