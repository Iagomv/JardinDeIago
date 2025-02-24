package Models.Planta;

public class Calor {
    double min;
    double max;

    // Constructor
    public Calor(double min, double max) {
        this.min = min;
        this.max = max;
    }

    @Override
    public String toString() {
        return min + " - " + max;
    }
}