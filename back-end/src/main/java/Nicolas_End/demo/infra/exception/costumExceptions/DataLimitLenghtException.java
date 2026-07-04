package Nicolas_End.demo.infra.exception.costumExceptions;

public class DataLimitLenghtException extends RuntimeException {
    public DataLimitLenghtException(String message) {
        super(message);
    }
}
