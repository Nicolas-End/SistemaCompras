import { ApiResponse, Item, ResponseFront } from "@/lib/types";
import { api } from "@/services/api";
import { getTokenFromCookies } from "@/services/cookies";




type ApiItensReponse = ApiResponse & {

    datas:Item[],
    
}

export async function getAllItens(): Promise<ResponseFront> {
    try{
        const itensDatas: ApiItensReponse = await api.get('/itens'); 
       
    
        if (!itensDatas.sucess){
            return {sucess:false,title:"Erro Interno",message:"Houve erro Interno no sistema"};
        }
        
        return {sucess:true, datas:itensDatas.datas};
    }catch(error ) {
        
        return {sucess:false, title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"}
    }
    
   
}