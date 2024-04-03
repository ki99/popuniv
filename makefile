.PHONY: build-dev
build-dev:
	cd popuniv-spring && ./gradlew build
	docker compose -f docker-compose.dev.yml up --build
	
.PHONY: dev-down
dev-down:
	docker compose -f docker-compose.dev.yml down -v

.PHONY: dev
dev:
	docker compose -f docker-compose.dev.yml up --build


.PHONY: prod
prod:
	cd popuniv-spring && ./gradlew build
	docker compose -f docker-compose.prod.yml up --build

.PHONY: push-web
push-web:
	cd popuniv-web && docker build -f prod.Dockerfile -t ki99/popuniv-web:latest .
	docker push ki99/popuniv-web:latest

.PHONY: push-api
push-api:
	cd popuniv-spring && docker build -t ki99/popuniv-spring:latest .
	docker push ki99/popuniv-spring:latest