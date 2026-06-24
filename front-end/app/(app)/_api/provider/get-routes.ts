import { ApiResponse, ProviderDatas, ResponseFront } from "@/lib/types"
import { getAllItens } from "../items/get-routes"
import { api } from "@/services/api";

type ApiProviderResponse = ApiResponse & {
    datas: ProviderDatas[]
}

export async function getAllProviders(): Promise<ResponseFront>{
    try{
            const itensDatas: ApiProviderResponse = await api.get('/provider'); 
           
        
            if (!itensDatas.success){
                return {success:false,title:"Erro Interno",message:"Não foi possivel encontrar fornecedores"};
            }
            
            return {success:true, datas:itensDatas.datas};
        }catch(error ) {
            
            return {success:false, title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"}
        }
}