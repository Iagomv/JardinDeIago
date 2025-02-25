package UI.Clientes;

import Manager.Consultor;
import Models.Clientes.Cliente;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableCellRenderer;
import java.awt.*;
import java.awt.event.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ModuloCliente extends JPanel {
    private JTable tablaClientes;
    private DefaultTableModel modeloTabla;
    private JPanel formularioPanel;

    private JTextField idField, createdAtField, emailVerifiedField, passwordUpdatedAtField, lastLoginAtField,
            validSinceField, jardinesField, lastRefreshAtField, localIdField, emailField, passwordHashField;

    public ModuloCliente() {
        setLayout(new BorderLayout());

        String[] columnas = { "ID", "Created At", "Email Verificado", "Password Updated At", "Last Login At",
                "Valid Since", "Jardines", "Last Refresh At", "Local ID", "Email", "Password Hash",
                "Editar", "Eliminar" };

        modeloTabla = new DefaultTableModel(columnas, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return column == 11 || column == 12;
            }
        };
        JButton botonNuevoCliente = new JButton("Nuevo Cliente");
        botonNuevoCliente.addActionListener(e -> mostrarInsertarCliente());
        add(botonNuevoCliente, BorderLayout.NORTH);
        tablaClientes = new JTable(modeloTabla);
        tablaClientes.getColumn("Editar").setCellRenderer(new ButtonRenderer());
        tablaClientes.getColumn("Editar").setCellEditor(new ButtonEditor(new JCheckBox(), "Editar"));
        tablaClientes.getColumn("Eliminar").setCellRenderer(new ButtonRenderer());
        tablaClientes.getColumn("Eliminar").setCellEditor(new ButtonEditor(new JCheckBox(), "Eliminar"));

        add(new JScrollPane(tablaClientes), BorderLayout.CENTER);

        formularioPanel = new JPanel(new GridBagLayout());
        formularioPanel.setBorder(BorderFactory.createTitledBorder("Agregar / Editar Cliente"));

        idField = new JTextField();
        createdAtField = new JTextField();
        emailVerifiedField = new JTextField();
        passwordUpdatedAtField = new JTextField();
        lastLoginAtField = new JTextField();
        validSinceField = new JTextField();
        jardinesField = new JTextField();
        lastRefreshAtField = new JTextField();
        localIdField = new JTextField();
        emailField = new JTextField();
        passwordHashField = new JTextField();

        int row = 0;
        addFormField("ID:", idField, 0, row);
        addFormField("Created At:", createdAtField, 2, row++);
        addFormField("Email Verificado:", emailVerifiedField, 0, row);
        addFormField("Password Updated At:", passwordUpdatedAtField, 2, row++);
        addFormField("Last Login At:", lastLoginAtField, 0, row);
        addFormField("Valid Since:", validSinceField, 2, row++);
        addFormField("Jardines (IDs separados por comas):", jardinesField, 0, row++);
        addFormField("Last Refresh At:", lastRefreshAtField, 0, row);
        addFormField("Local ID:", localIdField, 2, row++);
        addFormField("Email:", emailField, 0, row);
        addFormField("Password Hash:", passwordHashField, 2, row++);

        JButton botonGuardar = new JButton("Guardar");
        botonGuardar.addActionListener(this::agregarOActualizarCliente);

        JButton botonLimpiar = new JButton("Limpiar");
        botonLimpiar.addActionListener(e -> limpiarFormulario());

        JPanel botonesPanel = new JPanel();
        botonesPanel.add(botonGuardar);
        botonesPanel.add(botonLimpiar);

        formularioPanel.add(botonesPanel);
        add(formularioPanel, BorderLayout.SOUTH);

        cargarClientes();
    }

    private void addFormField(String label, JTextField field, int gridx, int gridy) {
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.anchor = GridBagConstraints.WEST;
        gbc.gridx = gridx;
        gbc.gridy = gridy;
        formularioPanel.add(new JLabel(label), gbc);

        gbc.gridx = gridx + 1;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 0.5;
        formularioPanel.add(field, gbc);
    }

    private void cargarClientes() {
        Consultor consultor = new Consultor();
        String respuesta = consultor.get("users/get");

        if (respuesta != null && respuesta.startsWith("[")) {
            Gson gson = new Gson();
            Type listType = new TypeToken<List<Cliente>>() {
            }.getType();
            List<Cliente> clientes = gson.fromJson(respuesta, listType);

            modeloTabla.setRowCount(0);

            for (Cliente cliente : clientes) {
                modeloTabla.addRow(new Object[] {
                        cliente.getId(), cliente.getCreatedAt(), cliente.isEmailVerified(),
                        cliente.getPasswordUpdatedAt(), cliente.getLastLoginAt(), cliente.getValidSince(),
                        cliente.getJardines().toString(), cliente.getLastRefreshAt(), cliente.getLocalId(),
                        cliente.getEmail(), cliente.getPasswordHash(), "Editar", "Eliminar"
                });
            }
            revalidate();
            repaint();
        } else {
            JOptionPane.showMessageDialog(this, "Error al obtener clientes: " + respuesta);
        }
    }

    private void agregarOActualizarCliente(ActionEvent e) {
        try {
            String id = idField.getText();
            String createdAt = createdAtField.getText();
            boolean emailVerified = Boolean.parseBoolean(emailVerifiedField.getText());
            String passwordUpdatedAt = passwordUpdatedAtField.getText();
            String lastLoginAt = lastLoginAtField.getText();
            String validSince = validSinceField.getText();
            String jardinesText = jardinesField.getText();
            List<Integer> jardines = new ArrayList<>();
            if (!jardinesText.isEmpty()) {
                Arrays.stream(jardinesText.split(","))
                        .map(String::trim)
                        .mapToInt(Integer::parseInt)
                        .forEach(jardines::add);
            }
            String lastRefreshAt = lastRefreshAtField.getText();
            String localId = localIdField.getText();
            String email = emailField.getText();
            String passwordHash = passwordHashField.getText();

            Cliente cliente = new Cliente(id, createdAt, emailVerified, passwordUpdatedAt, lastLoginAt, validSince,
                    jardines, lastRefreshAt, localId, email, passwordHash);

            Gson gson = new Gson();
            Consultor consultor = new Consultor();
            String json = gson.toJson(cliente);

            if (!id.isEmpty()) {
                consultor.post("users/update", json);
                JOptionPane.showMessageDialog(this, "Cliente actualizado exitosamente.");
            } else {
                consultor.post("users/post", json);
                JOptionPane.showMessageDialog(this, "Cliente agregado exitosamente.");
            }

            limpiarFormulario();
            cargarClientes();
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Error en los datos ingresados: " + ex.getMessage());
        }
    }

    private void limpiarFormulario() {
        JTextField[] fields = { idField, createdAtField, emailVerifiedField, passwordUpdatedAtField, lastLoginAtField,
                validSinceField, jardinesField, lastRefreshAtField, localIdField, emailField, passwordHashField };
        for (JTextField field : fields) {
            field.setText("");
        }
    }

    // Método para mostrar el panel de creación de cliente
    private void mostrarInsertarCliente() {
        JDialog dialog = new JDialog((Frame) SwingUtilities.getWindowAncestor(this), "Crear Nuevo Cliente", true);
        dialog.setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE);

        InsertarClientePanel insertarClientePanel = new InsertarClientePanel();
        dialog.getContentPane().add(insertarClientePanel);
        dialog.pack();
        dialog.setLocationRelativeTo(this); // Centrar el diálogo sobre el panel
        dialog.setVisible(true);

        // Recargar clientes después de cerrar el diálogo
        cargarClientes();
    }

    class ButtonRenderer extends JButton implements TableCellRenderer {
        public ButtonRenderer() {
            setOpaque(true);
        }

        public Component getTableCellRendererComponent(JTable table, Object value, boolean isSelected, boolean hasFocus,
                int row, int column) {
            setText((value == null) ? "" : value.toString());
            return this;
        }
    }

    class ButtonEditor extends DefaultCellEditor {
        private String label;
        private JButton button;

        public ButtonEditor(JCheckBox checkBox, String action) {
            super(checkBox);
            button = new JButton();
            button.setOpaque(true);
            this.label = action;
            button.addActionListener(e -> fireEditingStopped());
        }

        public Component getTableCellEditorComponent(JTable table, Object value, boolean isSelected, int row,
                int column) {
            button.setText(label);
            if (label.equals("Editar"))
                editarCliente(row);
            else if (label.equals("Eliminar"))
                eliminarCliente(row);
            return button;
        }

        public Object getCellEditorValue() {
            return label;
        }

        private void editarCliente(int row) {
            idField.setText(modeloTabla.getValueAt(row, 0).toString());
            createdAtField.setText(modeloTabla.getValueAt(row, 1).toString());
            emailVerifiedField.setText(modeloTabla.getValueAt(row, 2).toString());
            passwordUpdatedAtField.setText(modeloTabla.getValueAt(row, 3).toString());
            lastLoginAtField.setText(modeloTabla.getValueAt(row, 4).toString());
            validSinceField.setText(modeloTabla.getValueAt(row, 5).toString());
            jardinesField.setText(modeloTabla.getValueAt(row, 6).toString().replaceAll("[\\[\\] ]", ""));

            lastRefreshAtField.setText(modeloTabla.getValueAt(row, 7).toString());
            localIdField.setText(modeloTabla.getValueAt(row, 8).toString());
            emailField.setText(modeloTabla.getValueAt(row, 9).toString());
            passwordHashField.setText(modeloTabla.getValueAt(row, 10).toString());
        }

        private void eliminarCliente(int row) {
            int confirm = JOptionPane.showConfirmDialog(null, "¿Eliminar este cliente?", "Confirmar",
                    JOptionPane.YES_NO_OPTION);
            if (confirm == JOptionPane.YES_OPTION) {
                String id = modeloTabla.getValueAt(row, 0).toString();
                Consultor consultor = new Consultor();
                consultor.post("users/delete", new Gson().toJson(new IdWrapper(id)));
                cargarClientes();
                JOptionPane.showMessageDialog(null, "Cliente eliminado.");
            }
        }
    }

    class IdWrapper {
        private String id;

        public IdWrapper(String id) {
            this.id = id;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }
    }
}
