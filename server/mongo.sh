docker pull mongo
docker run --name mongo-db -d -p 27017:27017 mongo mongod --auth
sudo docker exec -i -t mongo-db bash
mongo
use ludu
db.createUser({user:"root", pwd:"root", roles:[{role:"root", db:"admin"}]})
exit && exit 