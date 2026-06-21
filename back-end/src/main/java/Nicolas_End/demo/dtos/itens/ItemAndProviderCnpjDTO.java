package Nicolas_End.demo.dtos.itens;

import java.util.Optional;

public record ItemAndProviderCnpjDTO(String itemName, Double itemPrice, Optional<String> providerCNPJ) {
}
