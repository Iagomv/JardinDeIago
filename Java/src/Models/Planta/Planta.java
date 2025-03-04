package Models.Planta;

public class Planta {
    public String id;
    public String nombre;
    public Humedad humedad;
    public Temperatura temperatura;
    public Calor calor;
    public Agua agua;
    public double precio;
    public String imagen;
    public String bioma;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Humedad getHumedad() {
        return humedad;
    }

    public void setHumedad(Humedad humedad) {
        this.humedad = humedad;
    }

    public Temperatura getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(Temperatura temperatura) {
        this.temperatura = temperatura;
    }

    public Calor getCalor() {
        return calor;
    }

    public void setCalor(Calor calor) {
        this.calor = calor;
    }

    public Agua getAgua() {
        return agua;
    }

    public void setAgua(Agua agua) {
        this.agua = agua;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getBioma() {
        return bioma;
    }

    public void setBioma(String bioma) {
        this.bioma = bioma;
    }

    // Constructor
    public Planta(String id, String nombre, Humedad humedad, Temperatura temperatura,
            Calor calor, Agua agua, double precio, String imagen, String bioma) {
        this.id = id;
        this.nombre = nombre;
        this.humedad = humedad;
        this.temperatura = temperatura;
        this.calor = calor;
        this.agua = agua;
        this.precio = precio;
        this.imagen = imagen;
        this.bioma = bioma;
    }

    @Override
    public String toString() {
        return "{\n" +
                "  \"id\": \"" + id + "\",\n" +
                "  \"nombre\": \"" + nombre + "\",\n" +
                "  \"humedad\": \"" + humedad + "\",\n" +
                "  \"temperatura\": \"" + temperatura + "\",\n" +
                "  \"calor\": \"" + calor + "\",\n" +
                "  \"agua\": \"" + agua + "\",\n" +
                "  \"precio\": " + precio + ",\n" +
                "  \"imagen\": \"" + imagen + "\",\n" +
                "  \"bioma\": \"" + bioma + "\"\n" +
                "}";
    }
}
