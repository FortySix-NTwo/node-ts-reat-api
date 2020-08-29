FROM node:12
WORKDIR /opt/app
COPY . ./opt/app
RUN yarn
EXPOSE 8080
CMD yarn start
