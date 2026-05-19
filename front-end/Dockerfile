

FROM node:22
#------- CONFIGURANDO AMBIENTE DE TRABALHO ------

WORKDIR /front-end

COPY . . 

#------  BAIXANDO DEPRENDENCIAS -------

RUN npm install 

#------ RODANDO PROGAMA --------

EXPOSE 6379

RUN npm run build

CMD ["npm", "start","-h", "0.0.0.0", "-p", "6379"]
