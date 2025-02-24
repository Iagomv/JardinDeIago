package UI;

import Manager.Consultor;
import Models.ConfigRange;
import com.google.gson.Gson;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

public class ModuloConfigRange extends JPanel {
    private JTextField temperaturaMinField, temperaturaMaxField, calorMinField, calorMaxField,
            humedadMinField, humedadMaxField, aguaMinField, aguaMaxField;

    public ModuloConfigRange() {
        setLayout(new BorderLayout());

        JPanel formularioPanel = new JPanel(new GridLayout(9, 2, 5, 5));
        formularioPanel.setBorder(BorderFactory.createTitledBorder("Configuración de Rangos"));

        temperaturaMinField = new JTextField();
        temperaturaMaxField = new JTextField();
        calorMinField = new JTextField();
        calorMaxField = new JTextField();
        humedadMinField = new JTextField();
        humedadMaxField = new JTextField();
        aguaMinField = new JTextField();
        aguaMaxField = new JTextField();

        formularioPanel.add(new JLabel("Temperatura Min:"));
        formularioPanel.add(temperaturaMinField);
        formularioPanel.add(new JLabel("Temperatura Max:"));
        formularioPanel.add(temperaturaMaxField);
        formularioPanel.add(new JLabel("Calor Min:"));
        formularioPanel.add(calorMinField);
        formularioPanel.add(new JLabel("Calor Max:"));
        formularioPanel.add(calorMaxField);
        formularioPanel.add(new JLabel("Humedad Min:"));
        formularioPanel.add(humedadMinField);
        formularioPanel.add(new JLabel("Humedad Max:"));
        formularioPanel.add(humedadMaxField);
        formularioPanel.add(new JLabel("Agua Min:"));
        formularioPanel.add(aguaMinField);
        formularioPanel.add(new JLabel("Agua Max:"));
        formularioPanel.add(aguaMaxField);

        JButton guardarBtn = new JButton("Guardar Configuración");
        guardarBtn.addActionListener(this::guardarConfiguracion);

        add(formularioPanel, BorderLayout.CENTER);
        add(guardarBtn, BorderLayout.SOUTH);

        cargarConfiguracion();
    }

    private void cargarConfiguracion() {
        Consultor consultor = new Consultor();
        String respuesta = consultor.get("config/");

        if (respuesta != null) {
            Gson gson = new Gson();
            ConfigRange config = gson.fromJson(respuesta, ConfigRange.class);

            temperaturaMinField.setText(String.valueOf(config.getTemperaturaMin()));
            temperaturaMaxField.setText(String.valueOf(config.getTemperaturaMax()));
            calorMinField.setText(String.valueOf(config.getCalorMin()));
            calorMaxField.setText(String.valueOf(config.getCalorMax()));
            humedadMinField.setText(String.valueOf(config.getHumedadMin()));
            humedadMaxField.setText(String.valueOf(config.getHumedadMax()));
            aguaMinField.setText(String.valueOf(config.getAguaMin()));
            aguaMaxField.setText(String.valueOf(config.getAguaMax()));
        } else {
            JOptionPane.showMessageDialog(this, "No se pudo cargar la configuración actual.");
        }
    }

    private void guardarConfiguracion(ActionEvent e) {
        try {
            ConfigRange config = new ConfigRange();
            config.setTemperaturaMin(Double.parseDouble(temperaturaMinField.getText()));
            config.setTemperaturaMax(Double.parseDouble(temperaturaMaxField.getText()));
            config.setCalorMin(Double.parseDouble(calorMinField.getText()));
            config.setCalorMax(Double.parseDouble(calorMaxField.getText()));
            config.setHumedadMin(Double.parseDouble(humedadMinField.getText()));
            config.setHumedadMax(Double.parseDouble(humedadMaxField.getText()));
            config.setAguaMin(Double.parseDouble(aguaMinField.getText()));
            config.setAguaMax(Double.parseDouble(aguaMaxField.getText()));

            Gson gson = new Gson();
            String json = gson.toJson(config);

            Consultor consultor = new Consultor();
            String respuesta = consultor.post("config/", json);

            if (respuesta != null) {
                JOptionPane.showMessageDialog(this, "Configuración guardada exitosamente.");
            } else {
                JOptionPane.showMessageDialog(this, "Error al guardar la configuración.");
            }
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Por favor, ingrese valores numéricos válidos.");
        }
    }
}
