.PHONY: dev
dev:
	cd popuniv-spring && ./gradlew build
	docker compose -f docker-compose.dev.yml up --build

.PHONY: prod
prod:
	cd popuniv-spring && ./gradlew build
	docker compose -f docker-compose.prod.yml up --build