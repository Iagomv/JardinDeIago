package UI;

import Manager.Consultor;
import Models.DatoJardin; // Asegúrate de tener la clase DatoJardin definida en Models
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.lang.reflect.Type;
import java.util.List;

public class ModuloJardin extends JPanel {
    private JTextField fechaField;
    private JButton btnCargar;
    private JTable tablaDatos;
    private DefaultTableModel modeloTabla;
    private JLabel lblPromedios;
    // Puedes agregar un panel para gráficos, por ejemplo: private ChartPanel
    // chartPanel;

    public ModuloJardin() {
        setLayout(new BorderLayout());

        // Panel superior: selector de fecha y botón
        JPanel panelSuperior = new JPanel(new FlowLayout());
        panelSuperior.add(new JLabel("Fecha (ddMMyyyy):"));
        fechaField = new JTextField(10);
        panelSuperior.add(fechaField);
        btnCargar = new JButton("Cargar Datos");
        panelSuperior.add(btnCargar);
        add(panelSuperior, BorderLayout.NORTH);

        // Tabla para mostrar los datos
        String[] columnas = { "ID", "Humedad", "Temperatura", "TemperaturaF", "CalorF", "Calor", "Agua", "Posicion",
                "Retardo" };
        modeloTabla = new DefaultTableModel(columnas, 0);
        tablaDatos = new JTable(modeloTabla);
        add(new JScrollPane(tablaDatos), BorderLayout.CENTER);

        // Etiqueta para mostrar promedios
        lblPromedios = new JLabel("Promedios: ");
        add(lblPromedios, BorderLayout.SOUTH);

        // Acción del botón
        btnCargar.addActionListener((ActionEvent e) -> cargarDatos());
    }

    private void cargarDatos() {
        String fecha = fechaField.getText().trim();
        if (fecha.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Ingrese una fecha válida en formato ddMMyyyy.");
            return;
        }
        // Construir el JSON de solicitud
        Consultor consultor = new Consultor();
        // Se asume que el método post envía el JSON y retorna la respuesta del servidor
        String respuesta = consultor.get("registros/get?fecha=" + fecha);
        if (respuesta == null || !respuesta.startsWith("[")) {
            JOptionPane.showMessageDialog(this, "Error al obtener datos: " + respuesta);
            return;
        }
        // Parsear la respuesta JSON
        Gson gson = new Gson();
        Type listType = new TypeToken<List<DatoJardin>>() {
        }.getType();
        List<DatoJardin> datos = gson.fromJson(respuesta, listType);

        // Limpiar tabla
        modeloTabla.setRowCount(0);

        // Variables para calcular promedios
        double sumHumedad = 0, sumTemperatura = 0, sumTemperaturaF = 0, sumCalorF = 0, sumCalor = 0, sumAgua = 0,
                sumPosicion = 0, sumRetardo = 0;
        int count = datos.size();

        // Agregar cada registro a la tabla
        for (DatoJardin dj : datos) {
            Object[] fila = { dj.getId(), dj.getHumedad(), dj.getTemperatura(), dj.getTemperaturaF(), dj.getCalorF(),
                    dj.getCalor(), dj.getAgua(), dj.getPosicion(), dj.getRetardo() };
            modeloTabla.addRow(fila);
            sumHumedad += dj.getHumedad();
            sumTemperatura += dj.getTemperatura();
            sumTemperaturaF += dj.getTemperaturaF();
            sumCalorF += dj.getCalorF();
            sumCalor += dj.getCalor();
            sumAgua += dj.getAgua();
            sumPosicion += dj.getPosicion();
            sumRetardo += dj.getRetardo();
        }

        // Calcular promedios y mostrarlos
        if (count > 0) {
            String promedios = String.format(
                    "Promedios - Humedad: %.2f, Temperatura: %.2f, TemperaturaF: %.2f, CalorF: %.2f, Calor: %.2f, Agua: %.2f, Posicion: %.2f, Retardo: %.2f",
                    sumHumedad / count, sumTemperatura / count, sumTemperaturaF / count, sumCalorF / count,
                    sumCalor / count, sumAgua / count, sumPosicion / count, sumRetardo / count);
            lblPromedios.setText(promedios);
        } else {
            lblPromedios.setText("No hay datos para la fecha indicada.");
        }

    }
}
