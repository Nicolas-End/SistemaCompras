package Nicolas_End.demo.domains.staff;

import Nicolas_End.demo.dtos.staff.StaffDatasDTO;
import Nicolas_End.demo.dtos.staff.StaffEmailAndPasswordDTO;
import Nicolas_End.demo.dtos.staff.StaffTokenDTO;
import Nicolas_End.demo.dtos.staff.StaffTokenEmailNameAndRole;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import Nicolas_End.demo.infra.security.token.TokenService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {
    private final StaffRepository staffRespository;
    private final TokenService tokenService;
    private final ResponseUtil responseUtil;

    public StaffService(StaffRepository staffRespository, ResponseUtil responseUtil, TokenService tokenService){
        this.responseUtil = responseUtil;
        this.tokenService = tokenService;
        this.staffRespository = staffRespository;

    }

    public <T>ApiResponse<T> registerNewStaff(StaffDatasDTO datas ){

            if(this.staffIsRegistered(datas.email())){
                return  responseUtil.error("User already registered", "Usuario Já cadastrado no sistema",  HttpStatus.CONFLICT);
            }


            // gera a Entidade para eu conseguir salvar seus dados
            StaffEntity staff = this.createStaffEntity(datas);

            this.staffRespository.saveAndFlush(staff);


            return responseUtil.sucess(null, "Usuario Cadastrado com Sucesso",HttpStatus.CREATED);

        // caso ja haja cadastro voltara um erro ao cliente


    }


    @Transactional
    public  <T>ApiResponse<T> validateStaffLogin(StaffEmailAndPasswordDTO datas){


            StaffEntity staffEntity = this.getEspecificStaffByEmailAndValidateCredentials(datas);
            if (staffEntity == null){
                return  responseUtil.error("User Not Found","Usuario não encontrado",HttpStatus.UNAUTHORIZED);
            }

            StaffTokenEmailNameAndRole allStaffInfos = this.joinAllStaffInfos(staffEntity);
            



            return responseUtil.sucess((T) allStaffInfos, "Usuario encontrado", HttpStatus.OK);



    }



    public <T> ApiResponse getAllStaff(){

            List<StaffDatasDTO> staffs = this.getAllStaffs();
            
            return responseUtil.sucess(staffs, "Usuario Encontrados", HttpStatus.OK);



    }

    private StaffTokenEmailNameAndRole joinAllStaffInfos(StaffEntity staffEntity){
        StaffTokenDTO userToken = this.setStaffTokenReturn(staffEntity);
        StaffDatasDTO staffDatas = this.getJustNonVunerableStaffInfos(staffEntity);

        return new StaffTokenEmailNameAndRole(userToken.token(),staffDatas.email(),staffDatas.name(),staffDatas.role());
    }
    // valida se o usuario existe e se as credenciais estão correta
    private StaffEntity getEspecificStaffByEmailAndValidateCredentials(StaffEmailAndPasswordDTO datas){
        StaffEntity staffEntity = staffRespository.findByEmail(datas.email());
        boolean staffCredentials = this.validateStaffCredentials(staffEntity, datas.password());

        if (!staffCredentials){
            return  null;
        }
        return staffEntity;
    }


    private boolean validateStaffCredentials(StaffEntity staffEntity, String staffPasswordInput ){

        if(staffEntity == null){
            return false;
        }

        return this.validateStaffPassword(staffPasswordInput, staffEntity.getPassword());
    }

    private boolean validateStaffPassword(String staffPasswordInput, String staffPasswordEncode){
        return new BCryptPasswordEncoder().matches(staffPasswordInput, staffPasswordEncode);
    }


    private StaffEntity createStaffEntity(StaffDatasDTO staffDatas){
        return StaffEntity.createStaff(
                staffDatas.email(),
                staffDatas.name(),
                staffDatas.role()
        );

    }


    private StaffTokenDTO setStaffTokenReturn(StaffEntity staffEntity){

        return new StaffTokenDTO(this.tokenService.generateToken(staffEntity));
    }


    private boolean staffIsRegistered(String email){
        return this.staffRespository.findByEmail(email) != null;

    }

    private StaffDatasDTO getJustNonVunerableStaffInfos(StaffEntity staffEntity){
        return  new StaffDatasDTO(staffEntity.getEmail(),staffEntity.getName(),staffEntity.getRole());

    }
    private List<StaffDatasDTO> getAllStaffs(){
        return this.staffRespository.findAllBy();
    }

}
