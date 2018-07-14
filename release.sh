#!/bin/bash

source ~/.profile
echo "Used constants:"
echo $SZOLNOK_APP_HOME
echo $SERVER_USERNAME
echo $SERVER_1
echo $SERVER_2

echo "Building docker image"
cd ${SZOLNOK_APP_HOME}/szolnok-timetable
sudo docker build --tag szolnok-timetable .
imageid="$(sudo docker images -q szolnok-timetable)"
echo "IMAGE_ID: ${imageid}"
commitHash="$(git rev-parse HEAD | cut -c 1-8)"
timestamp="$(date +%x-%H-%M-%S)"
dockerTag=${timestamp}-${commitHash}
echo $dockerTag
sudo docker tag ${imageid} cszoltan422/szolnok-timetable:latest
sudo docker tag ${imageid} cszoltan422/szolnok-timetable:${dockerTag}
sudo docker push cszoltan422/szolnok-timetable
sudo docker push cszoltan422/szolnok-timetable:${dockerTag}

echo "Connect to server #1"
ssh ${SERVER_USERNAME}@${SERVER_1} screen -d -m ./rundocker.sh

echo "Connect to server #2"
ssh ${SERVER_USERNAME}@${SERVER_2} screen -d -m ./rundocker.sh

echo "Release succesful"
