source ~/.profile
echo "Used constants:"
echo $SZOLNOK_APP_HOME
echo $SERVER_USERNAME
echo $SERVER_1
echo $SERVER_2

echo "Connect to server #1"
ssh ${SERVER_USERNAME}@${SERVER_1} screen -d -m ./rundocker.sh

echo "Connect to server #2"
ssh ${SERVER_USERNAME}@${SERVER_2} screen -d -m ./rundocker.sh