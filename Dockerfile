FROM node:14.9.0-alpine3.10
WORKDIR /opt/app
COPY . ./opt/app
RUN yarn
EXPOSE 8000
CMD yarn start
