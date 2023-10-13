FROM node:16-alpine

WORKDIR /home/node/app

COPY package.json ./

RUN npm i

COPY ./src .
COPY tsconfig.json .
COPY .env .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]