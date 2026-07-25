package Nicolas_End.demo.domains.annex;

import Nicolas_End.demo.dtos.annex.AnnexPostDTO;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AnnexService {
    private final AnnexRepository annexRepository;
    private final ResponseUtil responseUtil;
    public AnnexService(AnnexRepository annexRepository, ResponseUtil responseUtil){
        this.annexRepository = annexRepository;
        this.responseUtil = responseUtil;

    }

    public List<AnnexEntity> registerManyAnnex(List<AnnexPostDTO> annexesList){



        List<AnnexEntity> annexesEntity = annexesList.stream().map(annex -> {
      
           return new AnnexEntity.Builder(annex.url(), annex.key())
                   .name(annex.name())
                    .type(annex.type())
                    .build();


        }).toList();

        return this.annexRepository.saveAll(annexesEntity);


    }

    public List<AnnexEntity> findAnnexByAnnexPostDTO(List<AnnexPostDTO> annexesList){
        /* converte a lista de annexos enviada pelo usuario
        * em uma lista das chave destes anexos*/
        List<String> annexesKeys = annexesList.stream().map(
                AnnexPostDTO::key
        ).toList();

        return this.annexRepository.findAllByKey(annexesKeys);

    }


}
