## docker 이용하여 개발환경 셋업
1. MySQL 실행
```
docker run -d -p 3306:3306 --name mysql_qa -e MYSQL_ROOT_PASSWORD=rootpass -v popuniv-qa:/var/lib/mysql mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```
2. Redis 실행
```
docker run redis
```
3. java 빌드
```
./gradlew build
```
4. jar 파일 실행(백엔드 띄우기)
```
jara -jar build/libs/popuniv-0.0.1-SNAPSHOT.jar
```