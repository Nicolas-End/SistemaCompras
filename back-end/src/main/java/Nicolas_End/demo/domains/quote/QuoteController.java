package Nicolas_End.demo.domains.quote;


import Nicolas_End.demo.dtos.quotes.QuotePostDatasDTO;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quote")
public class QuoteController {

    @PostMapping
    public ResponseEntity registerNewQuote(@Valid @RequestBody QuotePostDatasDTO quote ){


        return ResponseEntity.ok().build();
    }


}
