package Nicolas_End.demo.enums.quotes;
public enum QuoteEmergency {

    MAXIMA("MAXIMA"),
    MEDIO("MEDIO"),
    BASICO("BASICO");

    private final String emergency;

    QuoteEmergency(String emergency) {
        this.emergency = emergency;
    }


    private   String getEmergency(){
        return  this.emergency;
    }

}
