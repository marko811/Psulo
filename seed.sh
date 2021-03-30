CONTAINER_NAME=$(docker ps -qf "ancestor=postgres:12.1-alpine")
docker cp dump.dump $CONTAINER_NAME:/dump.dump
docker exec -it $CONTAINER_NAME pg_restore -c /dump.dump -d psulo-test-task-sample --user=postgres --no-owner &> /dev/null
echo "Database seeded!"
