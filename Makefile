.PHONY: dev dev-down prod prod-down logs ps

dev:
	docker compose -f compose.dev.yml up --build

dev-down:
	docker compose -f compose.dev.yml down

prod:
	docker compose pull
	docker compose up -d

prod-down:
	docker compose down

logs:
	docker compose logs -f

ps:
	docker compose ps
