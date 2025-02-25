package Models.Empleados;

public class Empleado {
    private String docId;
    private String nombre;
    private String email;
    private String rol;
    private String departamento;

    public String getDocId() {
        return docId;
    }

    public void setDocId(String docId) {
        this.docId = docId;
    }

    private String fecha_inicio;
    private double salario;
    private String ubicacion;
    private String estado;

    public Empleado() {
    }

    public Empleado(String docId, String nombre, String email, String rol, String departamento, String fecha_inicio,
            double salario,
            String ubicacion, String estado) {
        this.docId = docId;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.departamento = departamento;
        this.fecha_inicio = fecha_inicio;
        this.salario = salario;
        this.ubicacion = ubicacion;
        this.estado = estado;
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getFecha_inicio() {
        return fecha_inicio;
    }

    public void setFecha_inicio(String fecha_inicio) {
        this.fecha_inicio = fecha_inicio;
    }

    public double getSalario() {
        return salario;
    }

    public void setSalario(double salario) {
        this.salario = salario;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
