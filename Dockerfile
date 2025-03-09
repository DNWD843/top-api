FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production # очистка от лишних дев-зависимостей
CMD ["node", "./dist/main.js"]