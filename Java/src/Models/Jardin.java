package Models;

import java.util.HashMap;
import java.util.Map;

import Models.Planta.Planta;
import Models.Planta.PlantaConCantidad;

public class Jardin {

    private String id;
    private String bioma;
    private int temperatura;
    private int humedad;
    private int agua;
    private int calor;
    // Now, the key is the plant's ID and the value is the wrapped object
    private Map<String, PlantaConCantidad> plantasJardin = new HashMap<>();

    // Constructor
    public Jardin(String id, String bioma, int temperatura, int humedad, int agua, int calor,
            Map<String, PlantaConCantidad> plantasJardin) {
        this.id = (id != null) ? id : "";
        this.bioma = (bioma != null) ? bioma : "";
        this.temperatura = (temperatura >= 0) ? temperatura : 0;
        this.humedad = (humedad >= 0) ? humedad : 0;
        this.agua = (agua >= 0) ? agua : 0;
        this.calor = (calor >= 0) ? calor : 0;
        this.plantasJardin = plantasJardin != null ? plantasJardin : new HashMap<>();
    }

    public Jardin() {
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBioma() {
        return bioma;
    }

    public void setBioma(String bioma) {
        this.bioma = bioma;
    }

    public int getTemperatura() {
        return temperatura;
    }

    public void setTemperatura(int temperatura) {
        this.temperatura = temperatura;
    }

    public int getHumedad() {
        return humedad;
    }

    public void setHumedad(int humedad) {
        this.humedad = humedad;
    }

    public int getAgua() {
        return agua;
    }

    public void setAgua(int agua) {
        this.agua = agua;
    }

    public int getCalor() {
        return calor;
    }

    public void setCalor(int calor) {
        this.calor = calor;
    }

    public Map<String, PlantaConCantidad> getPlantasJardin() {
        return plantasJardin;
    }

    public void setPlantasJardin(Map<String, PlantaConCantidad> plantasJardin) {
        this.plantasJardin = plantasJardin;
    }

    @Override
    public String toString() {
        // Optionally, implement a custom toString for debugging
        return "Jardin{" + "id='" + id + '\'' + ", bioma='" + bioma + '\'' + '}';
    }
}
