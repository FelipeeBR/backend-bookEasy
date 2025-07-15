FROM node:current-alpine3.22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./

COPY . .

CMD ["npm", "run", "dev"]

# Etapa 2: produção
FROM node:current-alpine3.22

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

CMD ["node", "dist/index.js"]
