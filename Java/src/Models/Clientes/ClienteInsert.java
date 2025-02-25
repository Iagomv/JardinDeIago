package Models.Clientes;

public class ClienteInsert {
    String email;
    String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ClienteInsert() {
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public ClienteInsert(String email, String password) {
        this.email = email;
        this.password = password;
    }

}
