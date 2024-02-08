FROM openjdk:17-jdk

RUN microdnf install findutils
WORKDIR /usr/src/spring
COPY . /usr/src/spring
VOLUME /tmp

RUN chmod +x /usr/src/spring/run.sh

EXPOSE 8080

ENTRYPOINT [ "/usr/src/spring/run.sh" ]