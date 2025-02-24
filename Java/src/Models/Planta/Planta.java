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
        return "Planta [nombre=" + nombre + ", humedad=" + humedad + ", temperatura=" + temperatura + ", calor=" + calor
                + ", agua=" + agua + ", precio=" + precio + ", imagen=" + imagen + ", bioma=" + bioma + "]";
    }

}
