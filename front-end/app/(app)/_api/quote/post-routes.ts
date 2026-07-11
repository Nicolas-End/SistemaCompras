import { ApiResponse, Orcamento } from "@/lib/types"
import { api } from "@/services/api"
import { error } from "console"
import { da } from "date-fns/locale"



export async function registerNewQuote(observation:string, items: {id:string, quantity:number}[], annexes: {url:string, type:string, key:string, name:string}[]) {
    
    const datas = {observation, items, annexes}

    const response:ApiResponse  = await api.post("/quote", datas)

    
    

    return {sucess: response.success, error:response.error, message: response.message }; 
}


