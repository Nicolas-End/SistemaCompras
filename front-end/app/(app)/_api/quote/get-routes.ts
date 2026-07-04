import { ApiResponse, Orcamento, ResponseFront } from "@/lib/types";
import { api } from "@/services/api";
import { getStaffInfosFromCookies } from "@/services/cookies";

type ApiProviderResponse = ApiResponse & {
    datas: Orcamento[]
}

export async function getQuotes(): Promise<ResponseFront>{
    try{
            var itensDatas: ApiProviderResponse; 

            const staffInfos = await getStaffInfosFromCookies(); 
        
            if(staffInfos.staffRole === "ADMINISTRADOR" || staffInfos.staffRole === "COMPRADOR"){
                itensDatas = await api.get('/quote'); 
            }else{
                itensDatas = await api.get('/quote/my'); 
            }

           

            if (!itensDatas.success){
                return {success:false,title:"Erro Interno",message:"Não foi possivel encontrar fornecedores"};
            }
            
            return {success:true, datas:itensDatas.datas};
        }catch(error ) {
            
            return {success:false, title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"}
        }
}