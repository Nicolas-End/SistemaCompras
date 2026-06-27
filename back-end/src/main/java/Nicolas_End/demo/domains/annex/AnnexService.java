package Nicolas_End.demo.domains.annex;

import Nicolas_End.demo.dtos.annex.AnnexPostDTO;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
           return new AnnexEntity.Builder(annex.url())
                    .type(annex.type())
                    .build();


        }).toList();

        return this.annexRepository.saveAll(annexesEntity);


    }


}
