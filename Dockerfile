FROM node:8-alpine

WORKDIR /usr/src/app

ADD https://raw.githubusercontent.com/eficode/wait-for/master/wait-for /wait-for

RUN chmod +x /wait-for

COPY package*.json ./

RUN ["npm", "install"]

COPY . .

RUN ["npm", "run", "build"]


EXPOSE 3000

CMD ["npm", "start"]
