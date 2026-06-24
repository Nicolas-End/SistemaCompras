import { ApiResponse, Item, ResponseFront } from "@/lib/types";
import { api } from "@/services/api";



type ApiItensReponse = ApiResponse & {

    datas:Item[],
    
}

export async function getAllItens(): Promise<ResponseFront> {
    try{
        const itensDatas: ApiItensReponse = await api.get('/itens'); 
       
    
        if (!itensDatas.success){
            return {success:false,title:"Erro Interno",message:"Houve erro Interno no sistema"};
        }
        
        return {success:true, datas:itensDatas.datas};
    }catch(error ) {
        
        return {success:false, title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"}
    }
    
   
}