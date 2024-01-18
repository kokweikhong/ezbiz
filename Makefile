docker-down-up: docker-down docker-up

docker-up:
	@echo "Starting docker containers..."
	@docker compose up -d --build
	@echo "Docker containers started"

docker-down:
	@echo "Stopping docker containers..."
	@docker compose down
	@echo "Docker containers stopped"

docker-build:
	@echo "Building docker containers..."
	@docker compose build
	@echo "Docker containers built"

docker-restart:
	@echo "Restarting docker containers..."
	@docker compose restart
	@echo "Docker containers restarted"

docker-logs:
	@echo "Showing docker logs..."
	@docker compose logs -f

docker-ps:
	@echo "Showing docker containers..."
	@docker compose ps

docker-prune:
	@echo "Pruning docker containers..."
	# docker prune all include volumes, images, networks, etc
	@docker system prune -a -f
	@echo "Docker containers pruned"

# only up postgres container
docker-postgres:
	@echo "Starting postgres container..."
	@docker compose up -d postgres
	@echo "Postgres container started"

