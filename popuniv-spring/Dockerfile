FROM openjdk:17-jdk-alpine

WORKDIR /usr/src/spring
COPY . /usr/src/spring
VOLUME /tmp

RUN chmod +x run.sh

EXPOSE 8080

CMD [ "sh" , "run.sh" ]