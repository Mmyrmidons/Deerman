#!/bin/bash
clear
pm2 stop 0 --watch
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3099
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-ports 3098