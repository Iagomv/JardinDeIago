package Models.Planta;

public class Humedad {
    int min;
    int max;

    // Constructor
    public Humedad(int min, int max) {
        this.min = min;
        this.max = max;
    }

    // Métodos getter y setter
    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    // Método toString() para facilitar la visualización
    @Override
    public String toString() {
        return min + " - " + max;
    }
}