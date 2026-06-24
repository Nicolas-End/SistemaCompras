import { ApiResponse, Item, ResponseFront } from "@/lib/types";
import { api } from "@/services/api";
import { getTokenFromCookies } from "@/services/cookies";





export async function registerNewItem(datas:{name:string,code:string, price:number, providerCNPJ:string| null}): Promise<{title?:string, message:string, success:boolean} > {
    try{
        if (datas.providerCNPJ === "null"){
            datas.providerCNPJ = null;
        }
    
        const apiRespose: ApiResponse = await api.post('/itens',datas); 
       
        if (apiRespose.success){
            
            return {success:true, message:apiRespose.message?apiRespose.message:"", title:"Item cadastrado com Sucesso"};
        }
       if (apiRespose.message === "409 CONFLICT"){
        return {success:false, message:apiRespose.message?apiRespose.message:"",title:"Item já cadastrado"}
       }else{
            
        return {success:false, message:apiRespose.message?apiRespose.message:"",title:"Erro Interno no sistema"}
       }
    

    }catch(error ) {
        throw error
    }
    
   
}