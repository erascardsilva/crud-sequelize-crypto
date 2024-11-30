# Usar uma imagem base do Node.js
FROM node:18-alpine

# Criar o diretório da aplicação
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código da pasta 'backend' para o container
COPY . .

# Expor a porta 3000 (padrão do Node.js)
EXPOSE 3000

# Comando para atrasar a execução do backend por 5 segundos e depois iniciar o servidor
CMD sleep 5 && npm start
