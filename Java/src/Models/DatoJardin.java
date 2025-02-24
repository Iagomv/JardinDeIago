package Models;

public class DatoJardin {
    private String id;
    private double humedad;
    private double temperatura;
    private double temperaturaF;
    private double calorF;
    private double calor;
    private double agua;
    private double posicion;
    private double retardo;

    // Constructor, getters y setters
    public DatoJardin(String id, double humedad, double temperatura, double temperaturaF,
            double calorF, double calor, double agua, double posicion, double retardo) {
        this.id = id;
        this.humedad = humedad;
        this.temperatura = temperatura;
        this.temperaturaF = temperaturaF;
        this.calorF = calorF;
        this.calor = calor;
        this.agua = agua;
        this.posicion = posicion;
        this.retardo = retardo;
    }

    public String getId() {
        return id;
    }

    public double getHumedad() {
        return humedad;
    }

    public double getTemperatura() {
        return temperatura;
    }

    public double getTemperaturaF() {
        return temperaturaF;
    }

    public double getCalorF() {
        return calorF;
    }

    public double getCalor() {
        return calor;
    }

    public double getAgua() {
        return agua;
    }

    public double getPosicion() {
        return posicion;
    }

    public double getRetardo() {
        return retardo;
    }
}
