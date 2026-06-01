package Nicolas_End.demo.dtos.itens;

import java.util.Optional;

public record ItemNamePriceAndProviderCNPJDTO(String itemName, Double itemPrice, Optional<String> providerCNPJ) {
}
