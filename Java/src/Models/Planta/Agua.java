package Models.Planta;

public class Agua {
    int min;
    int max;

    // Constructor
    public Agua(int min, int max) {
        this.min = min;
        this.max = max;
    }

    @Override
    public String toString() {
        return min + " - " + max;
    }
}