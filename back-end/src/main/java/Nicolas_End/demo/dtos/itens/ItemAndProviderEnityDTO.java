package Nicolas_End.demo.dtos.itens;

import Nicolas_End.demo.domains.provider.ProviderEntity;

public record ItemAndProviderEnityDTO(String name, double price, ProviderEntity providerEntity) {
}
