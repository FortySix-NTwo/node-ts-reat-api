#!bin/bash
#################################################################################
#                       Project generator script for                            #
#                         Node.js Back-End Server                               #
#                                    ---                                        #
#                         Author: Jonathan Farber                               #
#                                    ---                                        #
#     Usage:                                                                    #
#                                                                               #
#             Make sure to run all bash-script within the terminal,             #
#             from service's root folder.                                       #
#                                                                               #
#                 $ bash ./bin/gen-service.sh                                   #
#                                    ---                                        #
#      Contact Information:                                                     #
#                                                                               #
#      GitHub:           https://github.com/FortySix-NTwo                       #
#                                                                               #
#      Twitter:          https://twitter.com/_JonathanFarber                    #
#                                                                               #
#      LinkedIn:         https://www.linkedin.com/in/jonathan-farber-7197aa19   #
#                                                                               #
#             for more information regarding bash scripts,                      #
#             please follow this like -> https://www.gnu.org/software/bash/     #
#                                                                               #
#                                    ---                                        #
#                                                                               #
################################ Application ####################################
# Initialize npm package manger
npm init -y

# Initialize local Git repository
git init

# Create all folders for project
mkdir -p src/ src/types/ src/server/ src/middleware/ src/config/ \
  src/controller/ src/utils/ src/entity/ src/entity/model/ src/entity/repository/ \
  src/entity/migrations/ src/entity/seeders/ src/routes/ test/

# Generate index.ts files per each folder except bin folder
for folder in $(ls -d **/**) 
do
  case "$folder" in
  *"bin"*) ;;
  *) touch $folder/index.ts 
  ;;
  esac
done
echo "console.log('working!!')" >> src/index.ts

# Create .gitignore
echo "# Generated node modules
node_modules

# Environment Variables
.env

# Visual Studio Code Settings
.vscode

# Mac OS Specific files
.DS_Store" >> .gitignore

# create a .env file
echo "# Environment Staging
NODE_ENV=

# Http Server Port & Host
PORT=
HOST=

# PostgreSQL Database Variables
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_PORT=
POSTGRES_HOST=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=" >> .env && cp .env .env.example

# Create a config file
echo "import dotenv from 'dotenv'
dotenv.config();

export default {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  pg_port: process.env.POSTGRES_PORT,
  pg_host: process.env.POSTGRES_HOST,
  pg_db: process.env.POSTGRES_DB,
  pg_user: process.env.POSTGRES_USER,
  pg_pass: process.env.POSTGRES_PASSWORD,
}as const" >> src/config/config.ts

# exporting the config file
echo "export { default as config } from './config' " >> src/config/index.ts

#################################### Docker ######################################
# Create Docker file 
echo "FROM node:12
WORKDIR /opt/app
COPY . ./opt/app
RUN yarn
EXPOSE 8080
CMD yarn start" >> Dockerfile

# create a docker-compose.yml file
echo 'version: "3"
services:

  server:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: server
    depends_on:
      - pg_db
    restart: always
    working_dir: /opt/app
    volumes:
      - ./:/opt/app
    ports:
      - 0.0.0.0:8000:8000
    networks:
    - server_network

  pg_db:
    image: postgres:12
    mem_limit: 1536MB
    mem_reservation: 1G
    env_file:
      - ./.env
    ports:
    - 0.0.0.0:8001:5432
    volumes:
    - db-data:/var/lib/postgresql/data
    networks:
    - server_network

  pg_admin:
    image: dpage/pgadmin4
    env_file:
      - ./.env
    ports:
    - 0.0.0.0:8002:80
    networks:
    - server_network

networks:
  server_network:
    driver: bridge

volumes:
  db-data: 
    bridge: local' >> docker-compose.yml

################################ typeORM ####################################
# Create ormconfig.ts file
echo "import { ConnectionOptions } from 'typeorm';
import { config } from 'config';

export default {
  type: 'postgres',
  host: config.pg_host,
  port: config.pg_port,
  username: config.pg_user,
  password: config.pg_pass,
  database: config.pg_db,
  entities: [__dirname + 'entity/model/**/*{.ts,.js}'],
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [__dirname + 'entity/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/entity/migrations',
  },
}as Parameters<typeof ConnectionOptions>[0]" >> src/entity/ormconfig.ts

############################## dependencies ###################################
# install dependencies 
yarn add pg pg-hstore typeorm express cors morgan helmet dotenv reflect-metadata

# install devDependencies
yarn add -D @types/node typescript nodemon ts-node eslint

# Create a tsconfig.json file
npx tsconfig.json

# setup eslint
.node_modules/.bin/eslint init

# setup prettier
echo 'trailingComma: "es5"
tabWidth: 4
semi: false
singleQuote: true' >> .prettierrc

# add all files to local repository 
git add .

# commit initial files to local repository
git commit -m "Initial Commit - Generated by bash script"

################################ scripts ######################################
# copy the following scripts into package.json file
# "scripts": {
#    "watch": "tsc -w",
#    "dev": "nodemon dist/index.js",
#    "start": "node dist/index.js",
#    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/entity/ormconfig.ts",
#    "typeorm:migrate": "npm run typeorm migration:generate -- -n",
#    "typeorm:run": "npm run typeorm migration:run"
# },
