package Nicolas_End.demo.domains.orders;

import Nicolas_End.demo.domains.quote.QuoteEntity;
import Nicolas_End.demo.domains.quote.QuoteService;
import Nicolas_End.demo.domains.staff.StaffEntity;
import Nicolas_End.demo.dtos.order.OrderPatchDatasDTO;
import Nicolas_End.demo.dtos.order.OrderPostDatasDTO;
import Nicolas_End.demo.enums.quotes.QuoteStatus;
import Nicolas_End.demo.enums.staff.StaffRoles;
import Nicolas_End.demo.infra.security.auth.AutheticatedStaff;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.OptionalInt;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final QuoteService quoteService;
    private final ResponseUtil responseUtil;

    public OrderService(OrderRepository orderRepository, QuoteService quoteService, ResponseUtil responseUtil){
        this.quoteService = quoteService;
        this.orderRepository = orderRepository;
        this.responseUtil = responseUtil;
    }

    public ApiResponse registerNewOrder(OrderPostDatasDTO orderDatas){
        Optional<QuoteEntity> quoteEntity = this.quoteService.getQuoteEntity(orderDatas.quoteId());

        /* verifica se o orçamento existe e
        * se o status deste orçamento é valido para ser gerado como pedido*/
        ApiResponse isNotAValidQuote = this.validateQuoteEntityToRegister(quoteEntity);
        if(!isNotAValidQuote.getSuccess()){
            return isNotAValidQuote;
        }

        OrderEntity order = new OrderEntity.Builder(quoteEntity.get()).Id(orderDatas.internalId()).build();

        this.orderRepository.save(order);



        return this.responseUtil.sucess(order,null, HttpStatus.OK);
    }

    @Transactional
    public ApiResponse patchOrderInfos(OrderPatchDatasDTO orderDatas){
        ApiResponse notFailedChangeOrderInfos = this.validatePatchOrderInfos(orderDatas);
        if(!notFailedChangeOrderInfos.getSuccess()){
            return notFailedChangeOrderInfos;
        }
        OrderEntity order = (OrderEntity) notFailedChangeOrderInfos.getDatas();

        this.orderRepository.save(order);

        return this.responseUtil.sucess("Order Updated", "Pedido Modificado com sucesso", HttpStatus.OK);

    }

    private ApiResponse validateQuoteEntityToRegister(Optional<QuoteEntity> quote){
        StaffEntity staff = AutheticatedStaff.Get();

        if(quote.isEmpty()){
            throw new EntityNotFoundException("Orçamento solicitado não econtrado no sistema");
        }else if(this.orderRepository.existsByQuoteId(quote.get())){
           return this.responseUtil.error("Quote Already Ordered", "Este orçamento já foi lançado como pedido",HttpStatus.CONFLICT);
        }
        else if(!quote.get().getStatus().equals(QuoteStatus.APROVADO)){
            return this.responseUtil.error("Invalid Order Status", "O status do orçamento é invalido, status atual: "+quote.get().getStatus(),HttpStatus.CONFLICT);
        }else if(!staff.getRole().equals(StaffRoles.COMPRADOR) && !staff.getRole().equals(StaffRoles.ADMINISTRADOR)){
            return this.responseUtil.error("Invalid Staff Role", "Você não tem um cargo para transformar este orçamento em pedido",HttpStatus.UNAUTHORIZED);
        }
        return this.responseUtil.sucess(null,null,null);

    }

    private ApiResponse validatePatchOrderInfos(OrderPatchDatasDTO newOrderDatas){
        OrderEntity order = this.findValidaOrder(newOrderDatas.id());

        // verifica se o status do pedido não e o mesmo depois faz a verificação para ver se é uma troca valida
        if (newOrderDatas.status() == null || !newOrderDatas.status().equals(order.getOrderStatus()) ) {

            if (!OrderEntity.IS_A_NEXT_ALLOWED_STATUS_TRANSITION(order.getOrderStatus(), newOrderDatas.status())) {

                return this.responseUtil.error("Invalid Change Order Status", "Mudanca de status invalida", HttpStatus.BAD_REQUEST);
            }

            order.setOrderStatus(newOrderDatas.status());
        }
        if(!newOrderDatas.internalId().isBlank() && !newOrderDatas.internalId().equals(order.getInternalId())){
            order.setInternalId(newOrderDatas.internalId());
        }

        return this.responseUtil.sucess(order,null,null);


    }

    private OrderEntity findValidaOrder(UUID id){
        Optional<OrderEntity> order = this.orderRepository.findById(id);

        if (order.isEmpty()){
            throw new EntityNotFoundException("Pedido solicitado não econtrado no sistema");
        }
        return order.get();
    }

}
