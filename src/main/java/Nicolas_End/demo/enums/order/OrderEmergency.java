package Nicolas_End.demo.enums.order;

public enum OrderEmergency {

    MAXIMA("MAXIMA"),
    MEDIO("MEDIO"),
    BASICO("BASICO");

    private final String emergency;

    OrderEmergency(String emergency) {
        this.emergency = emergency;
    }


    private   String getEmergency(){
        return  this.emergency;
    }

}
