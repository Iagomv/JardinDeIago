package Models;

// Clase modelo para la configuración de rangos
public class ConfigRange {
    private double temperaturaMin;
    private double temperaturaMax;
    private double calorMin;
    private double calorMax;
    private double humedadMin;
    private double humedadMax;
    private double aguaMin;
    private double aguaMax;

    public ConfigRange() {
        this.temperaturaMin = 0;
        this.temperaturaMax = 0;
        this.calorMin = 0;
        this.calorMax = 0;
        this.humedadMin = 0;
        this.humedadMax = 0;
        this.aguaMin = 0;
        this.aguaMax = 0;
    }

    // Getters y Setters
    public double getTemperaturaMin() {
        return temperaturaMin;
    }

    public void setTemperaturaMin(double temperaturaMin) {
        this.temperaturaMin = temperaturaMin;
    }

    public double getTemperaturaMax() {
        return temperaturaMax;
    }

    public void setTemperaturaMax(double temperaturaMax) {
        this.temperaturaMax = temperaturaMax;
    }

    public double getCalorMin() {
        return calorMin;
    }

    public void setCalorMin(double calorMin) {
        this.calorMin = calorMin;
    }

    public double getCalorMax() {
        return calorMax;
    }

    public void setCalorMax(double calorMax) {
        this.calorMax = calorMax;
    }

    public double getHumedadMin() {
        return humedadMin;
    }

    public void setHumedadMin(double humedadMin) {
        this.humedadMin = humedadMin;
    }

    public double getHumedadMax() {
        return humedadMax;
    }

    public void setHumedadMax(double humedadMax) {
        this.humedadMax = humedadMax;
    }

    public double getAguaMin() {
        return aguaMin;
    }

    public void setAguaMin(double aguaMin) {
        this.aguaMin = aguaMin;
    }

    public double getAguaMax() {
        return aguaMax;
    }

    public void setAguaMax(double aguaMax) {
        this.aguaMax = aguaMax;
    }

    @Override
    public String toString() {
        return "Temperatura: " + temperaturaMin + " - " + temperaturaMax +
                ", Calor: " + calorMin + " - " + calorMax +
                ", Humedad: " + humedadMin + " - " + humedadMax +
                ", Agua: " + aguaMin + " - " + aguaMax;
    }
}