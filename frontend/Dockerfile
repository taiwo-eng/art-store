FROM node:14

COPY . /frontend

WORKDIR /frontend

RUN npm install

COPY . .

EXPOSE 7777

CMD ["npm", "run", "dev"]
