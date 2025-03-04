package Models.Planta;

import Models.Planta.Planta;

public class PlantaConCantidad {
    private Planta planta;
    private int cantidad;

    public PlantaConCantidad() {
    }

    public PlantaConCantidad(Planta planta, int cantidad) {
        this.planta = planta;
        this.cantidad = cantidad;
    }

    public Planta getPlanta() {
        return planta;
    }

    public void setPlanta(Planta planta) {
        this.planta = planta;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
