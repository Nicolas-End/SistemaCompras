import { getTokenFromCookies } from "./cookies";

const  API_URL = process.env.API_URL;

type RequestOption = RequestInit /* "metodo" padrão do fetch para colocar info principais para requisição*/ 

// cria uma função que centraliza as requisições
async function request <T>(endpoint:string,
     options: RequestOption = {}):Promise<T>{
    const { headers, ...rest }  = options; 
    
    // Para chamadas client-side, não obtém token do servidor
    let authHeader = "";
    if (typeof window === "undefined") {
        // Lado servidor - pode acessar cookies
        const token = await getTokenFromCookies();
        authHeader = token ? `Bearer ${token}` : "";
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...rest,
        headers: {
            "Content-Type":"application/json",
            ...(authHeader && { Authorization: authHeader }),
            ...headers
        }
    });

    
    return response.json() as Promise<T>;

}


// objeto que permite as requisições a Api
export const api = {
    get: <T> (endopint:string ): Promise<T> =>{
        return request(endopint,{
            method: "GET",
           
        })
    },

    post: <T> (endpoint:string,body?:unknown,  ): Promise<T> =>{
        return request(endpoint, {
            method: "POST",
          
            body: JSON.stringify(body)
            
        })
    },

    put: <T> (endpoint:string, body?:unknown): Promise<T> => {
        return request(endpoint, {
            method: "PUT",

            body: JSON.stringify(body)
        })

    },

    delete: <T> (endpoint:string,): Promise<T> =>{
        return request(endpoint , {
            method: "DELETE",
  
            
        })
             
        
    }
}


