package Nicolas_End.demo.infra.util.model;

import Nicolas_End.demo.infra.util.clock.DateUtil;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@MappedSuperclass
@NoArgsConstructor
@Getter
@Setter
public class BasicEntityModel {


    @Column(nullable = false, updatable = false,name = "created_at")
    protected Date createdAt;

    @Column(name = "updated_at")
    protected Date updatedAt;

    @PrePersist
    public void prePersist(){
        this.createdAt = DateUtil.GetPresent();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = DateUtil.GetPresent();}


}
