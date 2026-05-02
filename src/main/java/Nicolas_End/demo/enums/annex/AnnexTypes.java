package Nicolas_End.demo.enums.annex;


import lombok.Getter;

@Getter
public enum AnnexTypes {
    PDF("PDF"),
    LINK("LINK"),
    IMAGEM("IMAGEM");

    private final String annexType;

    AnnexTypes(String annexType){
        this.annexType = annexType;
    }


}
