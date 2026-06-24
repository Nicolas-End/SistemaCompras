package Nicolas_End.demo.dtos.itens;

import java.util.Optional;

public record ItemAndProviderCnpjDTO(Optional<String> code,String name, Double price, Optional<String> providerCNPJ) {
}
