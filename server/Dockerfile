FROM node:20

# Define o diretório de trabalho
WORKDIR /app-backend

# Copia apenas os arquivos de dependências primeiro (para aproveitar o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia os demais arquivos para o container
COPY . .

# Gera os arquivos do Prisma
RUN npx prisma generate

# Expõe a porta 3333 (boa prática)
EXPOSE 3333

# Define o comando padrão
CMD ["npm", "run", "dev"]