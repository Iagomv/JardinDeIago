package UI;

import javax.swing.*;
import java.awt.*;
import javax.swing.border.MatteBorder;
import UI.Plantas.ModuloPlanta;
import UI.ModuloArticulo;
import UI.ModuloConfigRange;
import UI.Clientes.ModuloCliente;
import UI.Empleados.ModuloEmpleado;

// import UI.Servicios.ModuloAgregarServicio;

public class PanelModulo extends JPanel {
    private JTextArea legal;
    private JScrollPane scrollPane;

    // Constructor: recibe un entero que determina qué módulo cargar.
    public PanelModulo(int panelSeleccionado) {
        inicializarPanel();
        agregarPanelLegal(); // Agrega el área de información legal.
        setBackground(new Color(245, 245, 245));
        cargarModuloSeleccionado(panelSeleccionado); // Carga el módulo indicado.
    }

    // Configura el panel principal.
    private void inicializarPanel() {
        this.setBackground(new Color(245, 245, 245));
        this.setLayout(new GridBagLayout());
    }

    // Agrega el panel con la información legal.
    private void agregarPanelLegal() {
        legal = new JTextArea(
                "© 2024 MiAplicacion. Todos los derechos reservados. | Dirección: Calle Principal | Teléfono: 123456789 | Correo: legal@miaplicacion.com");
        legal.setBackground(new Color(245, 245, 245));
        legal.setLineWrap(true);
        legal.setWrapStyleWord(true);
        legal.setEditable(false);

        scrollPane = new JScrollPane(legal);
        scrollPane.setBorder(new MatteBorder(2, 0, 0, 0, Color.black));

        // Se coloca el área legal en la parte inferior del panel.
        GridBagConstraints gbc = crearGridBagConstraints(0, 1, 1.0, 0.05);
        this.add(scrollPane, gbc);
    }

    // Selecciona y carga el módulo según el parámetro recibido.
    private void cargarModuloSeleccionado(int panelSeleccionado) {
        JPanel panelAMostrar = null;

        try {
            switch (panelSeleccionado) {
                case 1:
                    // Mostrar catálogo de plantas
                    panelAMostrar = new ModuloPlanta();
                    break;

                case 2:
                    // Agregar nueva planta
                    panelAMostrar = new ModuloArticulo();
                    break;
                case 3:
                    // Mostrar servicios activos
                    panelAMostrar = new ModuloJardin();
                    break;
                case 4:
                    // Mostrar histórico de servicios
                    panelAMostrar = new ModuloConfigRange();
                    break;
                case 5:
                    // Agregar nuevo servicio
                    panelAMostrar = new ModuloEmpleado();
                    break;
                case 6:
                    // Mostrar clientes
                    panelAMostrar = new ModuloCliente();
                    break;
                default:
                    JOptionPane.showMessageDialog(null, "Panel no encontrado", "Error", JOptionPane.ERROR_MESSAGE);
                    return; // Salida anticipada si el panel no es válido.
            }
        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(this, "Error al cargar el módulo: " + e.getMessage(), "Error",
                    JOptionPane.ERROR_MESSAGE);
            return; // Salida en caso de error.
        }

        // Agrega el módulo seleccionado al panel principal.
        agregarModuloAlPanel(panelAMostrar);
    }

    // Agrega el módulo (panel) al panel principal usando GridBagConstraints.
    public void agregarModuloAlPanel(JPanel modulo) {
        GridBagConstraints gbc = crearGridBagConstraints(0, 0, 1.0, 0.9);
        this.add(modulo, gbc);
        revalidate(); // Refresca el diseño.
        repaint();
    }

    // Método auxiliar para crear y configurar GridBagConstraints.
    private GridBagConstraints crearGridBagConstraints(int gridX, int gridY, double weightX, double weightY) {
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridx = gridX;
        gbc.gridy = gridY;
        gbc.weightx = weightX;
        gbc.weighty = weightY;
        gbc.fill = GridBagConstraints.BOTH; // Ocupa todo el espacio disponible.
        gbc.insets = new Insets(10, 10, 10, 10); // Márgenes alrededor del componente.
        return gbc;
    }
}
