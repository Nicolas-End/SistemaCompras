import { ApiResponse, LoginDatas } from "@/lib/types";
import { api} from "@/services/api";
import { setTokenFromCookies } from "@/services/cookies";

type LoginResponse = ApiResponse & {
    datas: {    
        token: string|null
    
    }
}


export const getStaffLogin = async (datas:LoginDatas):Promise<boolean>  => {
    try{
  

    const staffDatas = await api.post<LoginResponse>("/staff/login", datas);
    
    console.log("Resposta da API:", staffDatas); // Log para verificar a resposta da API


    if (!staffDatas.sucess || staffDatas.datas.token === null){
        console.error("Login falhou:", staffDatas.message);
        return false
    }

    setTokenFromCookies(staffDatas.datas.token);
    return true; 

    }catch (error) {
        
        console.error("Erro ao fazer login:", error);
        return false;
    }
    
}