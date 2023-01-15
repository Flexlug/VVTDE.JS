FROM node:18

WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci --only=production
COPY . .

EXPOSE 80

CMD [ "node", "app.js" ]