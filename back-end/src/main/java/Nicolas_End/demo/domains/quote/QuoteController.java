package Nicolas_End.demo.domains.quote;


import Nicolas_End.demo.dtos.quotes.QuoteEditableDatasDTO;
import Nicolas_End.demo.dtos.quotes.QuotePostDatasDTO;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/quote")
public class QuoteController {

    private final QuoteService quoteService;
    private final ResponseUtil responseUtil;

    public QuoteController (QuoteService quoteService, ResponseUtil responseUtil ){
        this.quoteService    = quoteService ;
        this.responseUtil = responseUtil;
    }

    @PostMapping
    public ResponseEntity registerNewQuote(@Valid @RequestBody QuotePostDatasDTO userQuote ){

        ApiResponse apiResponse;

        if(userQuote.annexes() == null && userQuote.items() == null ){

            apiResponse =  responseUtil.error("Bad Request", "Formato enviado invalido", HttpStatus.BAD_REQUEST);

        }else{
            apiResponse = this.quoteService.registerNewQuote(userQuote);

        }
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity searchQuoteById(@PathVariable @Valid  UUID id){
        ApiResponse apiResponse = this.quoteService.getAllQuoteInfoById(id);

        return  ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }


    @GetMapping()
    public ResponseEntity getAllQuotes(){
        ApiResponse apiResponse = this.quoteService.getAllQuotes();

        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @GetMapping("/my")
    public ResponseEntity getOwnQuotes(){
        ApiResponse apiResponse = this.quoteService.getOwnStaffQuotes();

        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }


    @PatchMapping()
    public ResponseEntity partialQuoteEdit(@RequestBody @Valid QuoteEditableDatasDTO quotesDatas){

        ApiResponse apiResponse = this.quoteService.editQuoteDatas(quotesDatas);
        return  ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }


}
