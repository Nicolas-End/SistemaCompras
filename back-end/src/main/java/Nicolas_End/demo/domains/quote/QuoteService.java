package Nicolas_End.demo.domains.quote;

import Nicolas_End.demo.domains.annex.AnnexEntity;
import Nicolas_End.demo.domains.annex.AnnexService;
import Nicolas_End.demo.domains.items.ItemsService;
import Nicolas_End.demo.domains.itens_order.ItemsQuoteEntity;
import Nicolas_End.demo.domains.itens_order.ItemsQuoteService;
import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.domains.staff.StaffEntity;
import Nicolas_End.demo.dtos.annex.AnnexPostDTO;
import Nicolas_End.demo.dtos.items.ItemEntityAndQuantityDTO;
import Nicolas_End.demo.dtos.items.ItemQuantityDTO;
import Nicolas_End.demo.dtos.quotes.AllQuoteInfosDTO;
import Nicolas_End.demo.dtos.quotes.QuoteBasicInfosDTO;
import Nicolas_End.demo.dtos.quotes.QuoteEditableDatasDTO;
import Nicolas_End.demo.dtos.quotes.QuotePostDatasDTO;
import Nicolas_End.demo.enums.quotes.QuoteStatus;
import Nicolas_End.demo.enums.staff.StaffRoles;
import Nicolas_End.demo.infra.security.auth.AutheticatedStaff;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
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
        List<AnnexEntity> annexEntities = this.saveAnnexes(userQuote.annexes());
        QuoteEntity  quoteEntity = new QuoteEntity.Builder().annex(annexEntities).observation(userQuote.observation()).build();

        /* cria uma lista dos items para cadastrar juntamente com o orçamento*/
        List<ItemsQuoteEntity> itemsQuoteEntities = this.convertItemQuantityToItemQuoteEntity(userQuote.items(), quoteEntity);
        quoteEntity.setItems(itemsQuoteEntities);

        QuoteEntity quote = this.quoteRepository.save(quoteEntity);
        QuoteBasicInfosDTO basicInfosDTO = this.createRetunableQuoteUserInfos(quote);

        return this.responseUtil.sucess(basicInfosDTO, "Orçamento cadatrado com sucesso", HttpStatus.OK);


    }

    public ApiResponse getAllQuoteInfoById(UUID id){
        StaffEntity staffEntity = AutheticatedStaff.Get();

        AllQuoteInfosDTO quoteInfosDTO;

        Optional<QuoteEntity> quote = this.quoteRepository.findById(id);

        if(
                quote.isEmpty()
        ){
            throw new EntityNotFoundException("Orçamento solicitado não encontrado");
        }
        if (
                staffEntity.getRole() != StaffRoles.ADMINISTRADOR
                        && !staffEntity.equals(quote.get().getRequestFor())
        ) {
            return this.responseUtil.error(
                    "FORBIDDEN",
                    "Permissão insuficiente para acessar pedido",
                    HttpStatus.FORBIDDEN
            );
        }



        /*
        Preenche as informações que não precisam ser "remodeladas"
        para um DTO que eu criei para tornar as informações do banco de dados retornaveis para JSON
         */
        quoteInfosDTO = this.fillBasicAllQuoteInfosDTOByQuoteEntity(quote.get());





        return this.responseUtil.sucess(quoteInfosDTO,null,HttpStatus.OK);
    }

    @Transactional
    public ApiResponse editQuoteDatas(QuoteEditableDatasDTO userQuote){

        QuoteEntity dataBaseQuote = this.quoteRepository.findById(userQuote.id()).orElse(null);
        if(dataBaseQuote == null)
            return this.responseUtil.error("Quote Not Found", "Não foi possivel encontrar o orçamento solicitado", HttpStatus.NOT_FOUND);

        // valida se a troca  status é valida
        if(!this.editQuoteStatusIfDistinctOfDataBase(dataBaseQuote, userQuote.status())){
            return this.responseUtil.error("Invalid Quote Status Change", "Verifique se seu cargo ou status são validos", HttpStatus.UNPROCESSABLE_CONTENT);
        }


        // verica se o items são diferentes e edita os dados
        this.editQuoteItemsIfDistinctOfDataBase(dataBaseQuote, userQuote.items());

        this.editQuoteAnnexIfDistinctOfDatabase(dataBaseQuote,userQuote.annexes());


        this.quoteRepository.save(dataBaseQuote);
        return this.responseUtil.sucess("Quote Updated","Orçamento atualizado com sucesso",HttpStatus.OK);


    }

    

    public ApiResponse getAllQuotes(){
        List<QuoteEntity> quote = this.quoteRepository.findAllByDeletedStatus(false);
        List<QuoteBasicInfosDTO> basicInfosList = quote.stream().map(
                this::createRetunableQuoteUserInfos
        ).toList();

        return this.responseUtil.sucess(basicInfosList,"Orçamentos Encontrados",HttpStatus.OK);


    }

    /*cria as entidades dos items para cadastra no orçamento em questão
    * precisando do orçamento
    * e de uma lista de uuid de items com a quantitdade */
    private List<ItemsQuoteEntity> convertItemQuantityToItemQuoteEntity(List<ItemQuantityDTO> items, QuoteEntity dataBaseQuote){
        List<ItemEntityAndQuantityDTO> itemsEntities = this.getAllItems(items);
        if(itemsEntities != null) {

            return this.itemsQuoteService.creatItemsQuoteEntitiesList(itemsEntities, dataBaseQuote);
        }
        return  null;
    }

    /* RETORNAR APENAS OS ORÇAMENTOS DE UM DETERMINADO FUNCINARIO
    *   SERVE PARA QUEM TEM CARGO "BAIXO" COMO O VENDEDOR */
    public ApiResponse getOwnStaffQuotes(){
        StaffEntity staffDatas = AutheticatedStaff.Get();
        List<QuoteEntity> quoteEntities = this.quoteRepository.findAllByRequestForAndDeletedStatus(staffDatas,false);

        List<QuoteBasicInfosDTO> basicInfosList = quoteEntities.stream().map(
                this::createRetunableQuoteUserInfos
        ).toList();

        return this.responseUtil.sucess(basicInfosList,"Orçamentos Encontrados",HttpStatus.OK);


    }

    private ApiResponse validateStatusQuoteTransition(QuoteStatus currentQuote, QuoteStatus newQuoteStatus) {
        if( !QuoteEntity.IS_ALLOWED_STATUS_TRANSITION_BY_STAFF_ROLE(currentQuote, AutheticatedStaff.Get().getRole()) || !QuoteEntity.IS_A_NEXT_ALLOWED_STATUS_TRANSITION(currentQuote, newQuoteStatus)){
        return this.responseUtil.error("INVALID QUOTE STATUS CHANGE", "Troca de status de orçamento invalido", HttpStatus.CONFLICT);
        }

        return this.responseUtil.sucess(null, null ,HttpStatus.OK);

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

    private boolean editQuoteStatusIfDistinctOfDataBase(QuoteEntity databaseQuote,   QuoteStatus newQuoteStatus){
        if(newQuoteStatus != null && newQuoteStatus != databaseQuote.getStatus()){

            // verifica se é possivel realizar a troca de status
            ApiResponse isAValidQuoteTransition = this.validateStatusQuoteTransition(databaseQuote.getStatus(), newQuoteStatus);

            if (!isAValidQuoteTransition.getSuccess()){
                return false;
            }
            databaseQuote.setStatus(newQuoteStatus);
        }
        return true ;

    }

    private void editQuoteItemsIfDistinctOfDataBase(QuoteEntity databaseQuote, List<ItemQuantityDTO> items){

        if(items != null) {
            List<ItemsQuoteEntity> convertedItemQuoteEntity = this.convertItemQuantityToItemQuoteEntity(items, databaseQuote);
            if ((convertedItemQuoteEntity != null && !convertedItemQuoteEntity.isEmpty()) && !convertedItemQuoteEntity.equals(databaseQuote.getItems())) {
                databaseQuote.setItems(convertedItemQuoteEntity);

            }
        }
    }

    private void editQuoteAnnexIfDistinctOfDatabase(QuoteEntity databaseQuote, List<AnnexPostDTO> annexes){

        if(annexes != null) {

            List<AnnexEntity> annexEntities = this.annexService.findAnnexByAnnexPostDTO(annexes);
            if ((annexEntities != null && !annexEntities.isEmpty()) && !annexEntities.equals(databaseQuote.getAnnexes())) {
                databaseQuote.setAnnexes(annexEntities);
            }
        }

    }



    private AllQuoteInfosDTO fillBasicAllQuoteInfosDTOByQuoteEntity(QuoteEntity quote){


        return AllQuoteInfosDTO.builder(quote.getId(),quote.getRequestFor().getName(),quote.getStatus(),quote.getCreatedAt())
                .observation(quote.getObservation())
                .updatedAt(quote.getUpdatedAt())
                .itemsByEntity(quote.getItems())
                .annexesByEntity(quote.getAnnexes())
                .build();
    }




}
