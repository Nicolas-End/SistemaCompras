import { ApiResponse, Orcamento, ResponseFront } from "@/lib/types";
import { api } from "@/services/api";

type ApiProviderResponse = ApiResponse & {
    datas: Orcamento[]
}

export async function getMyQuotes(): Promise<ResponseFront>{
    try{
            const itensDatas: ApiProviderResponse = await api.get('/quote/my'); 
           
        
            if (!itensDatas.success){
                return {success:false,title:"Erro Interno",message:"Não foi possivel encontrar fornecedores"};
            }
            
            return {success:true, datas:itensDatas.datas};
        }catch(error ) {
            
            return {success:false, title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"}
        }
}