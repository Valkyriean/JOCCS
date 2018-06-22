# specify the node base image with your desired version node:<version>
FROM node:alpine
# replace this with your application's default port
EXPOSE 3000
USER root
ENV HOME /home/node
ADD . $HOME

ARG buildtime_env=production
ENV NODE_ENV=$buildtime_env

WORKDIR $HOME
RUN npm install

CMD node $HOME/app.js
