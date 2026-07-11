package Nicolas_End.demo.domains.quote;

import Nicolas_End.demo.domains.annex.AnnexEntity;
import Nicolas_End.demo.domains.annex.AnnexService;
import Nicolas_End.demo.domains.items.ItemsEntity;
import Nicolas_End.demo.domains.items.ItemsService;
import Nicolas_End.demo.domains.itens_order.ItemsQuoteEntity;
import Nicolas_End.demo.domains.itens_order.ItemsQuoteService;
import Nicolas_End.demo.domains.staff.StaffEntity;
import Nicolas_End.demo.dtos.annex.AnnexPostDTO;
import Nicolas_End.demo.dtos.items.ItemEntityAndQuantityDTO;
import Nicolas_End.demo.dtos.items.ItemQuantityDTO;
import Nicolas_End.demo.dtos.quotes.QuoteBasicInfosDTO;
import Nicolas_End.demo.dtos.quotes.QuotePostDatasDTO;
import Nicolas_End.demo.infra.security.auth.AutheticatedStaff;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import jakarta.transaction.Transactional;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class QuoteService {
    private final QuoteRepository quoteRepository;
    private final ResponseUtil responseUtil;
    private  final ItemsService itemsService;
    private final AnnexService annexService;
    private final ItemsQuoteService itemsQuoteService;
    public QuoteService(QuoteRepository quoteRepository, ResponseUtil responseUtil,ItemsService itemsService, AnnexService annexService, ItemsQuoteService itemsQuoteService){
        this.quoteRepository = quoteRepository;
        this.responseUtil = responseUtil;
        this.itemsService = itemsService;
        this.annexService = annexService;
        this.itemsQuoteService = itemsQuoteService;
    }

    @Transactional
    public ApiResponse registerNewQuote(QuotePostDatasDTO userQuote){
        List<ItemsQuoteEntity> itemsQuoteEntities;
        List<AnnexEntity> annexEntities = this.saveAnnexes(userQuote.annexes());
        QuoteEntity  quoteEntity = new QuoteEntity.Builder().annex(annexEntities).observation(userQuote.observation()).build();

        List<ItemEntityAndQuantityDTO> itemsEntities = this.getAllItems(userQuote.items());
        if(itemsEntities != null) {
            itemsQuoteEntities = this.itemsQuoteService.creatItemsQuoteEntitiesList(itemsEntities,quoteEntity);
            quoteEntity.setItems(itemsQuoteEntities);
        }

        QuoteEntity quote = this.quoteRepository.save(quoteEntity);
        QuoteBasicInfosDTO basicInfosDTO = this.createRetunableQuoteUserInfos(quote);

        return this.responseUtil.sucess(basicInfosDTO, "Orçamento cadatrado com sucesso", HttpStatus.OK);


    }

    public ApiResponse getAllQuotes(){
        List<QuoteEntity> quote = this.quoteRepository.findAll();
        List<QuoteBasicInfosDTO> basicInfosList = quote.stream().map(
                this::createRetunableQuoteUserInfos
        ).toList();

        return this.responseUtil.sucess(basicInfosList,"Orçamentos Encontrados",HttpStatus.OK);


    }

    public ApiResponse getOwnStaffQuotes(){
        StaffEntity staffDatas = AutheticatedStaff.Get();
        List<QuoteEntity> quoteEntities = this.quoteRepository.findAllByRequestFor(staffDatas);

        List<QuoteBasicInfosDTO> basicInfosList = quoteEntities.stream().map(
                this::createRetunableQuoteUserInfos
        ).toList();

        return this.responseUtil.sucess(basicInfosList,"Orçamentos Encontrados",HttpStatus.OK);


    }


    private List<AnnexEntity> saveAnnexes(List<AnnexPostDTO> annexes){
        if (annexes.isEmpty()){
            return null;
        }
        return this.annexService.registerManyAnnex(annexes);
    }

    private List<ItemEntityAndQuantityDTO> getAllItems(List<ItemQuantityDTO> uuidItemsList){

        if(uuidItemsList.isEmpty()){
            return null;
        }
        return this.itemsService.getManyItemByItemQuantityDTO(uuidItemsList);
    }

    private  QuoteBasicInfosDTO createRetunableQuoteUserInfos(QuoteEntity quote){



       return new QuoteBasicInfosDTO.Builder(quote.getId(), quote.getRequestFor().getName(), quote.getCreatedAt(),quote.getStatus())
               .annexQuantity(quote.getAnnexQuantity())
               .itemsQuantity(quote.getItemQuantity())
               .build();


    }

}
