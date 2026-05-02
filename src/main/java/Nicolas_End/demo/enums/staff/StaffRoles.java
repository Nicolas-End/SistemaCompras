package Nicolas_End.demo.enums.staff;


public enum StaffRoles {
    COMPRADOR("COMPRADOR"),
    ADMINISTRADOR("ADMINISTRADOR"),
    VENDEDOR("VENDEDOR"),
    MOTORISTA("MOTORISTA");

    private final String role;

    private StaffRoles(String role){
        this.role = role;
    }

    private String getRole(){
        return this.role;
    }
}
