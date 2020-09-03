dev:
		docker-compose down && docker-compose -f docker-compose.dev.yml up -d --build --remove-orphans

prod:
		docker-compose down && docker-compose -f docker-compose.yml up -d --build --remove-orphans

teardown:
		docker-compose down && docker container prune

purge:
		docker-compose down && docker container prune && docker system prune