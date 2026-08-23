package Nicolas_End.demo.domains.orders;

import Nicolas_End.demo.dtos.order.OrderPatchDatasDTO;
import Nicolas_End.demo.dtos.order.OrderPatchDatasWithOutIdDTO;
import Nicolas_End.demo.dtos.order.OrderPostDatasDTO;
import Nicolas_End.demo.enums.order.OrderStatus;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/order")
/*=== ENDPOINT PARA MOODIFICAÇÕES E ACESSO A PARTE DE PEDIDOS ===*/
public class OrderController {

    private final OrderService orderService;
    private final ResponseUtil responseUtil;

    public OrderController(OrderService orderService, ResponseUtil responseUtil){
        this.responseUtil = responseUtil;
        this.orderService = orderService;
    }

    @PostMapping("/{id}")
    public ResponseEntity registerNewOrder(@PathVariable UUID id, @RequestBody String internalId){

        OrderPostDatasDTO orderDatas = new OrderPostDatasDTO(id,internalId);

        ApiResponse response = this.orderService.registerNewOrder(orderDatas);

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PatchMapping("/{id}")
    public ResponseEntity changeOrderInfos(@PathVariable UUID id, @RequestBody OrderPatchDatasWithOutIdDTO orderDTO) {

        OrderPatchDatasDTO newOrderDatas = new OrderPatchDatasDTO(id, orderDTO.internalId(), orderDTO.status());

        ApiResponse apiResponse = this.orderService.patchOrderInfos(newOrderDatas);

        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
