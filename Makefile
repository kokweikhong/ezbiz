build:
	@echo "Building the application..."
	@npm --prefix web run postcss
	@go build -o bin/ezbiz cmd/ezbiz/main.go

run: build
	@echo "Running the application..."
	@./bin/ezbiz


test:
	@echo "Running tests..."
	@go test -v ./...

clean:
	@echo "Cleaning up..."
	@rm -rf bin

air:
	@echo "Running Air..."
	@npm --prefix web run build
	@air

SQLC_YAML=internal/sqlc/sqlc.yaml

sqlc:
	@echo "Generating SQLC..."
	@sqlc generate -f $(SQLC_YAML)
	@echo "SQLC generated successfully"

DB_MIGRATION_DIR=database/migrations
POSTGRES_DSN=postgresql://ezbiz_owner:zjPgqNx1n4oR@ep-divine-field-a1w49xkx.ap-southeast-1.aws.neon.tech/ezbiz?sslmode=require

migrate-create:
	@echo "Creating migration..."
	@migrate create -ext sql -dir $(DB_MIGRATION_DIR) -seq $(name)
	@echo "Migration created successfully"

migrate-up:
	@echo "Applying migration..."
	@migrate -database $(POSTGRES_DSN) -path $(DB_MIGRATION_DIR) up
	@echo "Migration applied successfully"

migrate-down:
	@echo "Rolling back migration..."
	@migrate -database $(POSTGRES_DSN) -path $(DB_MIGRATION_DIR) down
	@echo "Migration rolled back successfully"

migrate-force:
	@echo "Forcing migration..."
	@migrate -database $(POSTGRES_DSN) -path $(DB_MIGRATION_DIR) force $(version)
	@echo "Migration forced successfully"

migrate-reset:
	@echo "Resetting migration..."
	@migrate -database $(POSTGRES_DSN) -path $(DB_MIGRATION_DIR) reset
	@echo "Migration reset successfully"
