package Nicolas_End.demo.dtos.quotes;

import Nicolas_End.demo.domains.annex.AnnexEntity;
import Nicolas_End.demo.domains.itens_order.ItemsQuoteEntity;
import Nicolas_End.demo.domains.quote.QuoteEntity;
import Nicolas_End.demo.dtos.annex.AnnexPostDTO;
import Nicolas_End.demo.dtos.items.ItemQuantityDTO;
import Nicolas_End.demo.enums.quotes.QuoteStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class AllQuoteInfosDTO {

    private UUID id;
    private List<ItemQuantityDTO> items;
    private List<AnnexPostDTO> annexes;
    private String observation;
    private String requestFor;
    private QuoteStatus status;
    private Date createdAt;
    private Date updatedAt;

    private AllQuoteInfosDTO() {
    }

    public static Builder builder(
            UUID id,
            String requestFor,
            QuoteStatus status,
            Date createdAt
    ) {
        return new Builder(id, requestFor, status, createdAt);
    }

    public static class Builder {

        private final AllQuoteInfosDTO dto;

        private Builder(
                UUID id,
                String requestFor,
                QuoteStatus status,
                Date createdAt
        ) {
            dto = new AllQuoteInfosDTO();
            dto.id = id;
            dto.requestFor = requestFor;
            dto.status = status;
            dto.createdAt = createdAt;
        }

        public Builder items(List<ItemQuantityDTO> items) {
            dto.items = items;
            return this;
        }

        public Builder itemsByEntity(List<ItemsQuoteEntity> items){

            if(items == null || items.isEmpty()){
                return this;
            }

            dto.items = items.stream().map(
                    item -> {
                        return new ItemQuantityDTO(item.getId().getItemId(), item.getQuantity()) ;
                    }
            ).toList();

            return this;
        }

        public Builder annexesByEntity(List<AnnexEntity> annexes){

            if(annexes == null || annexes.isEmpty()){
                return this;
            }

            dto.annexes = annexes.stream().map(
                    annex -> {
                        return new AnnexPostDTO(annex.getUrl(),annex.getAnnexType(),annex.getKey(),annex.getName());
                    }
            ).toList();

            return this;
        }

        public Builder annexes(List<AnnexPostDTO> annexes) {
            dto.annexes = annexes;
            return this;
        }

        public Builder observation(String observation) {
            dto.observation = observation;
            return this;
        }

        public Builder updatedAt(Date updatedAt) {
            dto.updatedAt = updatedAt;
            return this;
        }

        public AllQuoteInfosDTO build() {
            return dto;
        }
    }



}