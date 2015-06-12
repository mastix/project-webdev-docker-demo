# Pull base image.
FROM docker_ubuntubase

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get update --fix-missing
RUN curl -sL https://deb.nodesource.com/setup_iojs_2.x | bash -

RUN apt-get install -y iojs gcc make build-essential openssl make node-gyp
RUN npm install -g npm@latest
RUN npm install -g gulp
RUN npm install -g pm2@latest
RUN apt-get update --fix-missing

RUN mkdir -p /var/log/pm2
RUN mkdir -p /var/www/html

# Cleanup
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN apt-get autoremove -y

RUN ln -s /usr/bin/nodejs /usr/local/bin/node

WORKDIR /var/www/html

CMD ["pm2", "start", "index.js","--name","projectwebdevapi","--log","/var/log/pm2/pm2.log","--watch","--no-daemon"]