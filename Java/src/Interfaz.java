
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import UI.PanelModulo; // Asegúrate de tener una clase PanelModulo para gestionar el contenido

public class Interfaz extends JFrame implements ActionListener {

    private JMenuBar menuBar;
    private JMenu opciones, tamaño, icono;
    // Menús para los módulos de la aplicación
    private JMenu plantas, registros, clientes, empleados;

    // Ítems del menú "Plantas"
    private JMenuItem plantasCatalogoItem, articulosItem, jardines;
    // Ítems del menú "Registros"
    private JMenuItem registrosDiarios, configuracionRangos, tiempoReal;
    // Ítems del menú "Clientes"
    private JMenuItem mostrarClientes;
    private JMenuItem mostrarEmpleados;

    // Ítems para opciones de ventana
    private JMenuItem tamañoPequeño, tamañoMediano, tamañoGrande, icono1, icono2, icono3;

    private PanelModulo panelModulo;
    private Font fuentePequeña = new Font("Serif", Font.PLAIN, 16);
    private Font fuenteGrande = new Font("Serif", Font.PLAIN, 20);

    public Interfaz() {
        menuBar();
        initPantalla();
    }

    private void menuBar() {
        menuBar = new JMenuBar();
        setJMenuBar(menuBar);
        menuOpciones();
        menuPlantas();
        menuRegistros();
        menuClientes();
        menuEmpleados();
        // Aplicar fuente a la barra de menú
        menuBar.setFont(fuentePequeña);
    }

    private void menuPlantas() {
        plantas = new JMenu("Plantas");
        aplicarFuenteGrande(plantas); // Fuente para el menú "Plantas"

        plantasCatalogoItem = new JMenuItem("Plantas en catálogo");
        plantasCatalogoItem.addActionListener(this);
        aplicarFuente(plantasCatalogoItem);

        articulosItem = new JMenuItem("Complementos");
        articulosItem.addActionListener(this);
        aplicarFuente(articulosItem);

        jardines = new JMenuItem("Jardines");
        jardines.addActionListener(this);
        aplicarFuente(jardines);

        plantas.add(plantasCatalogoItem);
        plantas.add(articulosItem);
        plantas.add(jardines);
        menuBar.add(plantas);
    }

    private void menuRegistros() {
        registros = new JMenu("Registros");
        aplicarFuenteGrande(registros); // Fuente para el menú "Servicios"

        registrosDiarios = new JMenuItem("Registros diarios");
        registrosDiarios.addActionListener(this);
        aplicarFuente(registrosDiarios);

        configuracionRangos = new JMenuItem("Configuracion de rangos");
        configuracionRangos.addActionListener(this);
        aplicarFuente(configuracionRangos);

        tiempoReal = new JMenuItem("Datos en tiempo real");
        tiempoReal.addActionListener(this);
        aplicarFuente(tiempoReal);

        registros.add(registrosDiarios);
        registros.add(configuracionRangos);
        registros.add(tiempoReal);

        menuBar.add(registros);
    }

    private void menuClientes() {
        clientes = new JMenu("Clientes");
        aplicarFuenteGrande(clientes);

        mostrarClientes = new JMenuItem("Mostrar clientes");
        mostrarClientes.addActionListener(this);
        aplicarFuente(mostrarClientes);

        clientes.add(mostrarClientes);
        menuBar.add(clientes);
    }

    private void menuEmpleados() {
        empleados = new JMenu("Empleados");
        aplicarFuenteGrande(empleados);

        mostrarEmpleados = new JMenuItem("Mostrar empleados");
        mostrarEmpleados.addActionListener(this);
        aplicarFuente(mostrarEmpleados);

        empleados.add(mostrarEmpleados);
        menuBar.add(empleados);
    }

    private void menuOpciones() {
        opciones = new JMenu("Opciones");
        aplicarFuenteGrande(opciones);
        menuBar.add(opciones);

        tamaño = new JMenu("Tamaño de la ventana");
        aplicarFuente(tamaño);
        opciones.add(tamaño);

        icono = new JMenu("Cambiar icono");
        aplicarFuente(icono);
        opciones.add(icono);

        tamañoPequeño = new JMenuItem("1024x768");
        tamaño.add(tamañoPequeño);
        tamañoPequeño.addActionListener(this);
        aplicarFuente(tamañoPequeño);

        tamañoMediano = new JMenuItem("1368x920");
        tamaño.add(tamañoMediano);
        tamañoMediano.addActionListener(this);
        aplicarFuente(tamañoMediano);

        tamañoGrande = new JMenuItem("Full HD");
        tamaño.add(tamañoGrande);
        tamañoGrande.addActionListener(this);
        aplicarFuente(tamañoGrande);

        icono1 = new JMenuItem("Icono 1");
        icono.add(icono1);
        icono1.addActionListener(this);
        aplicarFuente(icono1);

        icono2 = new JMenuItem("Icono 2");
        icono.add(icono2);
        icono2.addActionListener(this);
        aplicarFuente(icono2);

        icono3 = new JMenuItem("Icono 3");
        icono.add(icono3);
        icono3.addActionListener(this);
        aplicarFuente(icono3);
    }

    private void initPantalla() {
        setTitle("Plantas y Servicios");
        getContentPane().setBackground(new Color(245, 245, 245));
        setSize(1368, 920);
        setLocationRelativeTo(null);
        setResizable(false);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        setVisible(true);
    }

    private void añadirIcono(int numeroIcono) {
        String rutaIcono = "imagenes\\icon" + numeroIcono + ".png"; // Ajusta la ruta según corresponda
        ImageIcon icon = new ImageIcon(rutaIcono);
        setIconImage(icon.getImage());
        repaint();
    }

    // Gestión de actionPerformed -> Cambio de paneles según el módulo seleccionado
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == tamañoPequeño) {
            setSize(1024, 768);
        } else if (e.getSource() == tamañoMediano) {
            setSize(1368, 920);
            setLocationRelativeTo(null);
        } else if (e.getSource() == tamañoGrande) {
            setSize(1920, 1080);
            setLocationRelativeTo(null);
        } else if (e.getSource() == plantasCatalogoItem) {
            cambiarPanel(1); // Panel para "Plantas en catálogo"
        } else if (e.getSource() == articulosItem) {
            cambiarPanel(2); // Panel para agregar una nueva planta
        } else if (e.getSource() == registrosDiarios) {
            cambiarPanel(3); // Panel para ver registro de datos
        } else if (e.getSource() == configuracionRangos) {
            cambiarPanel(4); // Panel para el "Histórico de servicios"
        } else if (e.getSource() == mostrarEmpleados) {
            cambiarPanel(5); // Panel para gestionar empleados
        } else if (e.getSource() == mostrarClientes) {
            cambiarPanel(6); // Panel para gestionar clientes
        } else if (e.getSource() == tiempoReal) {
            cambiarPanel(7); // Panel para ver datos en tiempo real
        } else if (e.getSource() == jardines) {
            cambiarPanel(8); // Panel para gestionar jardines
        } else if (e.getSource() == icono1) {
            añadirIcono(1);
        } else if (e.getSource() == icono2) {
            añadirIcono(2);
        } else if (e.getSource() == icono3) {
            añadirIcono(3);
        }
    }

    // Método para cambiar el panel de contenido; se espera que PanelModulo gestione
    // los diferentes tipos de panel
    private void cambiarPanel(int tipo) {
        if (panelModulo != null) {
            remove(panelModulo);
        }
        panelModulo = new PanelModulo(tipo);
        add(panelModulo, BorderLayout.CENTER);
        revalidate();
        repaint();
    }

    private void aplicarFuente(JComponent componente) {
        componente.setFont(fuentePequeña);
    }

    private void aplicarFuenteGrande(JComponent componente) {
        componente.setFont(fuenteGrande);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new Interfaz());
    }
}
