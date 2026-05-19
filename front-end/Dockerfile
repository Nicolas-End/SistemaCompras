

FROM node:22
#------- CONFIGURANDO AMBIENTE DE TRABALHO ------

WORKDIR /front-end

COPY package*.json ./



#------  BAIXANDO DEPRENDENCIAS -------

RUN npm install 


#------ RODANDO PROGAMA --------

COPY . . 

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
