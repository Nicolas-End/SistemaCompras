package Nicolas_End.demo.domains.orders;

import Nicolas_End.demo.dtos.order.OrderPostDatasDTO;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;
    private final ResponseUtil responseUtil;

    public OrderController(OrderService orderService, ResponseUtil responseUtil){
        this.responseUtil = responseUtil;
        this.orderService = orderService;
    }

    @PostMapping()
    public ResponseEntity registerNewOrder(@RequestBody @Valid OrderPostDatasDTO orderDatas){


        ApiResponse response = this.orderService.registerNewOrder(orderDatas);

        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
