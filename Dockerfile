FROM node:12
WORKDIR /opt/app
COPY . ./opt/app
RUN yarn
EXPOSE 8000
CMD yarn start
