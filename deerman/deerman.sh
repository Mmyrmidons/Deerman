#!/bin/bash
clear
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3099
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3098
pm2 start ecosystem.config.js
#pm2 stop ecosystem.config.js