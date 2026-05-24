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
  
    const userToken = await api.post<LoginResponse>("/staffs/login", datas);
    if (userToken.sucess == false || !userToken.datas.token){
        
        return false
    }

    setTokenFromCookies(userToken.datas.token);
    return true; 

    }catch (error) {
        console.log("TIPO: ", typeof api.post)
        console.error("Erro ao fazer login:", error);
        return false;
    }
    
}