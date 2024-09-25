


# run pocketbase serve in background

../server/pocketbase serve &

# wait for pocketbase to start on port 8090

# while ! nc -z localhost 8090; do
#   sleep 0.1
# done

# wait for 1 second

sleep 1

# run vinxi start

yarn workspace @timeline/client vinxi start