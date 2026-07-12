
# Instalar dependências

FROM node:22-alpine AS deps

WORKDIR /next-app

COPY package*.json ./

RUN npm install

#  Build da aplicação

FROM node:22 AS builder

WORKDIR /next-app

COPY --from=deps /next-app/node_modules ./node_modules

COPY . .

RUN npm run build


# Executar a aplicação

FROM node:22-alpine AS runner

WORKDIR /next-app

COPY --from=builder /next-app/.next/standalone ./
COPY --from=builder /next-app/.next/static ./.next/static
COPY --from=builder /next-app/public ./public

CMD ["npm", "start"]