import { ApiResponse, LoginDatas, ResponseFront, UserRole } from "@/lib/types";
import { api } from "@/services/api";
import { setTokenFromCookies, setStaffInfos } from "@/services/cookies";
import { stringify } from "querystring";

type LoginResponse = ApiResponse & {
    datas: {    
        token: string | null;
        email: string | null;
        name: string | null;
        role: UserRole | null;
    }
}



export const getStaffLogin = async (datas: LoginDatas): Promise< ResponseFront> => {
    try {
        const staffDatas = await api.post<LoginResponse>("/staff/login", datas);

        if (!staffDatas.success || staffDatas.datas.token === null) {
            if (staffDatas.status === "401 UNAUTHORIZED") {
                return {success:false,title:"Login Invalido",message:"E-mail ou senha incorretos. Verifique suas credenciais e tente novamente."};
            }
            
            return {success:false,title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"};
        }

        // Salva o token nos cookies
        await setTokenFromCookies(staffDatas.datas.token);

        // Salva as informacoes do usuario nos cookies
        await setStaffInfos({
            name: staffDatas.datas.name || undefined,
            email: staffDatas.datas.email || undefined,
            role: staffDatas.datas.role || undefined,
        });

        return {success:true}; 

    } catch (error) {
        
        return {success:false, title:"Sistema Indesponivel", message:"Tente novamente mais tarde, estamos solucionando problema em questão"}
    }
}