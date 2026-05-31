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
        const staffDatas = await api.post<LoginResponse>("/staff/login", datas);

        if (!staffDatas.sucess || staffDatas.datas.token === null) {
            if (staffDatas.status === "404 NOT_FOUND") {
                return {sucess:false,title:"Login Invalido",message:"E-mail ou senha incorretos. Verifique suas credenciais e tente novamente."};
            }
            
            return {sucess:false,title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"};
        }

        // Salva o token nos cookies
        await setTokenFromCookies(staffDatas.datas.token);

        // Salva as informacoes do usuario nos cookies
        await setStaffInfos({
            name: staffDatas.datas.name || undefined,
            email: staffDatas.datas.email || undefined,
            role: staffDatas.datas.role || undefined,
        });

        return {sucess:true}; 

    } catch (error) {
        
        return {sucess:false, title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"}
    }
}
