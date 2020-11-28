FROM node:lts-alpine

WORKDIR /root/app

COPY . .

RUN npm install --only=prod && \
    npm run build

CMD ["npm", "run", "deploy:prod"]