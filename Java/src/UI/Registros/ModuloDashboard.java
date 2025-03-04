package UI.Registros;

import Manager.SocketClient;
import org.json.JSONObject;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

public class ModuloDashboard extends JPanel {
    private JLabel lblPosicion, lblCalor, lblHumedad, lblTemperatura, lblCalorF, lblTemperaturaF, lblRetardo, lblAgua;
    private SocketClient client;

    public ModuloDashboard() {
        setLayout(new BorderLayout());
        setBackground(new Color(30, 30, 30)); // Fondo oscuro

        // Panel de datos con GridLayout
        JPanel dataPanel = new JPanel(new GridLayout(8, 2, 15, 15));
        dataPanel.setBackground(new Color(40, 40, 40)); // Fondo gris oscuro
        dataPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20)); // Espaciado interno

        // Inicializar etiquetas
        lblPosicion = createLabel();
        lblCalor = createLabel();
        lblHumedad = createLabel();
        lblTemperatura = createLabel();
        lblCalorF = createLabel();
        lblTemperaturaF = createLabel();
        lblRetardo = createLabel();
        lblAgua = createLabel();

        // Agregar etiquetas al panel
        dataPanel.add(createTitleLabel("Posición:"));
        dataPanel.add(lblPosicion);
        dataPanel.add(createTitleLabel("Calor:"));
        dataPanel.add(lblCalor);
        dataPanel.add(createTitleLabel("Humedad:"));
        dataPanel.add(lblHumedad);
        dataPanel.add(createTitleLabel("Temperatura:"));
        dataPanel.add(lblTemperatura);
        dataPanel.add(createTitleLabel("Calor (F):"));
        dataPanel.add(lblCalorF);
        dataPanel.add(createTitleLabel("Temperatura (F):"));
        dataPanel.add(lblTemperaturaF);
        dataPanel.add(createTitleLabel("Retardo:"));
        dataPanel.add(lblRetardo);
        dataPanel.add(createTitleLabel("Agua:"));
        dataPanel.add(lblAgua);

        // Botón de conexión estilizado
        JButton connectButton = new JButton("Conectar WebSocket");
        connectButton.setFont(new Font("Arial", Font.BOLD, 16));
        connectButton.setBackground(new Color(70, 130, 180)); // Azul
        connectButton.setForeground(Color.WHITE);
        connectButton.setFocusPainted(false);
        connectButton.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));

        connectButton.addActionListener((ActionEvent e) -> {
            client = new SocketClient(this);
            JOptionPane.showMessageDialog(this, "Conectado al servidor WebSocket");
        });

        // Agregar elementos al panel
        add(connectButton, BorderLayout.NORTH);
        add(dataPanel, BorderLayout.CENTER);
    }

    // Método para crear etiquetas estilizadas
    private JLabel createLabel() {
        JLabel label = new JLabel("--", SwingConstants.CENTER);
        label.setFont(new Font("Arial", Font.BOLD, 18));
        label.setForeground(Color.WHITE);
        label.setOpaque(true);
        label.setBackground(new Color(60, 60, 60)); // Fondo gris
        label.setBorder(BorderFactory.createLineBorder(new Color(100, 100, 100), 2, true)); // Borde redondeado
        return label;
    }

    // Método para crear etiquetas de título
    private JLabel createTitleLabel(String text) {
        JLabel label = new JLabel(text, SwingConstants.RIGHT);
        label.setFont(new Font("Arial", Font.BOLD, 16));
        label.setForeground(Color.LIGHT_GRAY);
        return label;
    }

    // Método para actualizar los valores en pantalla
    public void updateData(JSONObject data) {
        lblPosicion.setText(data.optDouble("posicion", 0) + "°");
        lblCalor.setText(data.optDouble("calor", 0) + "°C");
        lblHumedad.setText(data.optDouble("humedad", 0) + "%");
        lblTemperatura.setText(data.optDouble("temperatura", 0) + "°C");
        lblCalorF.setText(data.optDouble("calorF", 0) + "°F");
        lblTemperaturaF.setText(data.optDouble("temperaturaF", 0) + "°F");
        lblRetardo.setText(data.optDouble("retardo", 0) + "s");
        lblAgua.setText(data.optDouble("agua", 0) + " ml");
    }
}
