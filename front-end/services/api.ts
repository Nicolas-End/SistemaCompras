
const  API_URL = process.env.API_URL;

type RequestOption = RequestInit /* "metodo" padrão do fetch para colocar info principais para requisição*/  & { 
    token?: string  ;
}

// cria uma função que centraliza as requisições
async function request <T>(endpoint:string,
     options: RequestOption = {}):Promise<T>{
    const {token, headers, ...rest }  = options; 

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...rest,
        headers: {
            "Content-Type":"application/json",
            Authorization: token ? `Barrer ${token}`: "",
            ...headers
        }
    });

    if (!response.ok){
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    return response.json();

}


// objeto que permite as requisições a Api
export const api = {
    get: <T> (endopint:string , token?:string) =>{
        request(endopint=endopint,{
            method: "GET",
            token
        })
    },

    post: <T> (endpoint:string,body?:unknown, token?:string ) =>{
        request(endpoint= endpoint, {
            method: "POST",
            token, 
            body: JSON.stringify(body)
            
        })
    },

    put: <T> (endpoint:string, body?:unknown, token?:string) => {
        request(endpoint = endpoint, {
            method: "GET",
            token,
            body: JSON.stringify(body)
        })

    },

    delete: <T> (endpoint:string, token?:string) =>{
        request(endpoint = endpoint, {
            method: "GET",
            token,
            
        })
             
        
    }
}


