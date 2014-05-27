##
# NodeJS MongoDB Redis
#
# This creates an image which contains an environment for NodeJS app ecosystem
# - Node.js 0.10.23
# - MongoDB 2.4.8
# - Redis 2.4.15
##

FROM ubuntu:12.10

MAINTAINER TruongSinh Tran-Nguyen <i@truongsinh.pro>

# Ensure the package repository is up to date
RUN echo "deb http://archive.ubuntu.com/ubuntu quantal main universe" > /etc/apt/sources.list && apt-get update

# Install Node.js
RUN apt-get install -y software-properties-common python-software-properties python g++ make cmake \
 && add-apt-repository -y ppa:chris-lea/node.js \
 && apt-get update \
 && apt-get install -y nodejs \


 # && apt-get purge -y software-properties-common python-software-properties python g++ make cmake \
 # && apt-get autoremove -y

RUN /usr/bin/python -V

# Fix upstart under a virtual host https://github.com/dotcloud/docker/issues/1024
# RUN dpkg-divert --local --rename --add /sbin/initctl \ && ln -s /bin/true /sbin/initctl

# Configure Package Management System (APT) & install MongoDB
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 \
 && echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list \
 && apt-get update \
 && apt-get install -y mongodb-10gen

# Install git 
RUN apt-get install -y git

# Redis server
RUN apt-get install -y redis-server

RUN npm install -g node-gyp


# start freebase
# Bundle app source
ADD . /src

RUN npm cache clean

# Install app dependencies
RUN cd /src; npm install


RUN mkdir -p /data/db
RUN mkdir -p /var/log/

EXPOSE  8080

CMD mongod run --config "/src/mongo.conf" && redis-server "/src/redis.conf" && node "/src/service.js"


