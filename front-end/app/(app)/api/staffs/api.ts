import { ApiResponse, LoginDatas, UserRole } from "@/lib/types";
import { api } from "@/services/api";
import { setTokenFromCookies, setStaffInfos } from "@/services/cookies";

type LoginResponse = ApiResponse & {
    datas: {    
        token: string | null;
        email: string | null;
        name: string | null;
        role: UserRole | null;
    }
}

interface errorsLoginReturnIf{
    sucess: boolean
    title? : string,
    message?: string,
}

export const getStaffLogin = async (datas: LoginDatas): Promise<errorsLoginReturnIf> => {
    try {
        
        // Salva o token nos cookies
        await setTokenFromCookies("staffDatas.datas.token");

        // Salva as informacoes do usuario nos cookies
        await setStaffInfos({
            name: "staffDatas.datas.name || undefined",
            email: "staffDatas.datas.email || undefined",
            role: "ADMINISTRADOR",
        });

        return {sucess:true}; 

    } catch (error) {
        
        return {sucess:false, title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"}
    }
}
