package UI.Clientes;

import Manager.Consultor;
import Models.Clientes.ClienteInsert;

import com.google.gson.Gson;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;

public class InsertarClientePanel extends JPanel {
    private JTextField emailField;
    private JPasswordField passwordField;
    private JButton botonCrear;

    public InsertarClientePanel() {
        setLayout(new GridBagLayout());
        setBorder(BorderFactory.createTitledBorder("Crear Nuevo Cliente"));

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Campo Email
        gbc.gridx = 0;
        gbc.gridy = 0;
        add(new JLabel("Email:"), gbc);

        emailField = new JTextField(20);
        gbc.gridx = 1;
        add(emailField, gbc);

        // Campo Password
        gbc.gridx = 0;
        gbc.gridy = 1;
        add(new JLabel("Password:"), gbc);

        passwordField = new JPasswordField(20);
        gbc.gridx = 1;
        add(passwordField, gbc);

        // Botón Crear
        botonCrear = new JButton("Crear Cliente");
        botonCrear.addActionListener(this::crearCliente);
        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.gridwidth = 2;
        add(botonCrear, gbc);
    }

    private void crearCliente(ActionEvent e) {
        String email = emailField.getText();
        String password = new String(passwordField.getPassword());

        if (email.isEmpty() || password.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Todos los campos son obligatorios.", "Error",
                    JOptionPane.ERROR_MESSAGE);
            return;
        }

        ClienteInsert cliente = new ClienteInsert();
        cliente.setEmail(email);
        cliente.setPassword(password);

        Gson gson = new Gson();
        Consultor consultor = new Consultor();
        String json = gson.toJson(cliente);

        String respuesta = consultor.post("users/registro", json);

        if (respuesta != null) {
            JOptionPane.showMessageDialog(this, "Cliente creado exitosamente.");
            limpiarFormulario();
        } else {
            JOptionPane.showMessageDialog(this, "Error al crear cliente.", "Error", JOptionPane.ERROR_MESSAGE);
        }
    }

    private void limpiarFormulario() {
        emailField.setText("");
        passwordField.setText("");
    }
}
