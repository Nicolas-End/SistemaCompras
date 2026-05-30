import { ApiResponse, LoginDatas, User } from "@/lib/types";
import { api} from "@/services/api";
import { setTokenFromCookies, getTokenFromCookies, setStaffInfos} from "@/services/cookies";

type LoginResponse = ApiResponse & {
    datas: User & {    
        
        token: string|null

        
    
    }
}


export const getStaffLogin = async (datas:LoginDatas):Promise<boolean>  => {
    try{
  

    const staffDatas = await api.post<LoginResponse>("/staff/login", datas);


    if (!staffDatas.sucess || staffDatas.datas.token === null){
        if(staffDatas.status === "404 NOT_FOUND"){
            return false;
        }
        console.error("Login falhou:", staffDatas.message);
        return false
    }

    staffDatas.datas.token?await setTokenFromCookies(staffDatas.datas.token) : ""

    return true; 

    }catch (error) {
        
        console.error("Erro ao fazer login:", error);
        return false;
    }
    
}