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
  
    console.log("Dados de login enviados:", datas);
    const userToken = await api.post<LoginResponse>("/staff/login", datas);
    console.log("Resposta do login:", userToken);
    if (!userToken.sucess || userToken.datas.token === null){
        console.error("Login falhou:", userToken.message);
        return false
    }

    setTokenFromCookies(userToken.datas.token);
    return true; 

    }catch (error) {
        
        console.error("Erro ao fazer login:", error);
        return false;
    }
    
}