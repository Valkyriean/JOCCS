# specify the node base image with your desired version node:<version>
FROM node:alpine
# replace this with your application's default port
EXPOSE 4000
USER root
ENV HOME /home/node
ADD . $HOME

ARG buildtime_env=production
ENV NODE_ENV=$buildtime_env

WORKDIR $HOME
CMD
CMD node $HOME/bin/www
