# To enter the database container
bash-database:
    docker exec -it balancetonfichier-database-1 bash

# To enter express container
bash-express:
    docker exec -it balancetonfichier-express-1 bash

# To enter React container
bash-react:
    docker exec -it balancetonfichier-react-1 bash

# To start project
start:
    docker-compose up --build

# To end project
end:
    docker-compose down

clean:
    docker container prune