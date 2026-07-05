package Nicolas_End.demo.enums.annex;


import lombok.Getter;

@Getter
public enum AnnexTypes {
    PDF("application/pdf"),
    PNG("image/png"),
    JPEG("image/jpeg");

    private final String annexType;

    AnnexTypes(String annexType){
        this.annexType = annexType;
    }


}
