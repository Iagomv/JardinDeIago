package UI.Empleados;

import Manager.Consultor;
import Models.Empleados.Empleado;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableCellRenderer;
import java.awt.*;
import java.awt.event.*;
import java.lang.reflect.Type;
import java.util.List;

public class ModuloEmpleado extends JPanel {
    private JTable tablaEmpleados;
    private DefaultTableModel modeloTabla;
    private JPanel formularioPanel;

    private JTextField nombreField, emailField, rolField, departamentoField, fechaInicioField, salarioField,
            ubicacionField, estadoField;
    private int editandoFila = -1;
    private String currentDocId = "";

    public ModuloEmpleado() {
        setLayout(new BorderLayout());

        String[] columnas = { "ID", "Nombre", "Email", "Rol", "Departamento", "Fecha Inicio", "Salario", "Ubicación",
                "Estado", "Editar", "Eliminar" };
        modeloTabla = new DefaultTableModel(columnas, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return column == 9 || column == 10;
            }
        };

        tablaEmpleados = new JTable(modeloTabla);
        tablaEmpleados.getColumn("Editar").setCellRenderer(new ButtonRenderer());
        tablaEmpleados.getColumn("Editar").setCellEditor(new ButtonEditor(new JCheckBox(), "Editar"));
        tablaEmpleados.getColumn("Eliminar").setCellRenderer(new ButtonRenderer());
        tablaEmpleados.getColumn("Eliminar").setCellEditor(new ButtonEditor(new JCheckBox(), "Eliminar"));

        add(new JScrollPane(tablaEmpleados), BorderLayout.CENTER);

        formularioPanel = new JPanel(new GridLayout(9, 2, 5, 5));
        formularioPanel.setBorder(BorderFactory.createTitledBorder("Agregar / Editar Empleado"));

        nombreField = new JTextField();
        emailField = new JTextField();
        rolField = new JTextField();
        departamentoField = new JTextField();
        fechaInicioField = new JTextField();
        salarioField = new JTextField();
        ubicacionField = new JTextField();
        estadoField = new JTextField();

        formularioPanel.add(new JLabel("Nombre:"));
        formularioPanel.add(nombreField);
        formularioPanel.add(new JLabel("Email:"));
        formularioPanel.add(emailField);
        formularioPanel.add(new JLabel("Rol:"));
        formularioPanel.add(rolField);
        formularioPanel.add(new JLabel("Departamento:"));
        formularioPanel.add(departamentoField);
        formularioPanel.add(new JLabel("Fecha Inicio:"));
        formularioPanel.add(fechaInicioField);
        formularioPanel.add(new JLabel("Salario:"));
        formularioPanel.add(salarioField);
        formularioPanel.add(new JLabel("Ubicación:"));
        formularioPanel.add(ubicacionField);
        formularioPanel.add(new JLabel("Estado:"));
        formularioPanel.add(estadoField);

        JButton botonGuardar = new JButton("Guardar");
        botonGuardar.addActionListener(this::guardarEmpleado);
        JButton botonLimpiar = new JButton("Limpiar");
        botonLimpiar.addActionListener(e -> limpiarFormulario());

        JPanel botonesPanel = new JPanel();
        botonesPanel.add(botonGuardar);
        botonesPanel.add(botonLimpiar);

        formularioPanel.add(botonesPanel);
        add(formularioPanel, BorderLayout.SOUTH);

        cargarEmpleados();
    }

    private void cargarEmpleados() {
        Consultor consultor = new Consultor();
        String respuesta = consultor.get("empleados/get");

        if (respuesta != null && respuesta.startsWith("[")) {
            Gson gson = new Gson();
            Type listType = new TypeToken<List<Empleado>>() {
            }.getType();
            List<Empleado> empleados = gson.fromJson(respuesta, listType);

            modeloTabla.setRowCount(0);

            for (Empleado empleado : empleados) {
                modeloTabla.addRow(new Object[] {
                        empleado.getDocId(), empleado.getNombre(), empleado.getEmail(), empleado.getRol(),
                        empleado.getDepartamento(), empleado.getFecha_inicio(), empleado.getSalario(),
                        empleado.getUbicacion(), empleado.getEstado(), "Editar", "Eliminar"
                });
            }
            revalidate();
            repaint();
        } else {
            JOptionPane.showMessageDialog(this, "Error al obtener empleados: " + respuesta);
        }
    }

    private void guardarEmpleado(ActionEvent e) {
        try {
            String nombre = nombreField.getText();
            String email = emailField.getText();
            String rol = rolField.getText();
            String departamento = departamentoField.getText();
            String fechaInicio = fechaInicioField.getText();
            double salario = Double.parseDouble(salarioField.getText());
            String ubicacion = ubicacionField.getText();
            String estado = estadoField.getText();

            Empleado empleado = new Empleado(currentDocId, nombre, email, rol, departamento, fechaInicio, salario,
                    ubicacion, estado);
            Gson gson = new Gson();
            Consultor consultor = new Consultor();
            String json = gson.toJson(empleado);

            if (!currentDocId.isEmpty()) {
                consultor.post("empleados/put", json);
                JOptionPane.showMessageDialog(this, "Empleado actualizado exitosamente.");
            } else {
                consultor.post("empleados/post", json);
                JOptionPane.showMessageDialog(this, "Empleado agregado exitosamente.");
            }

            limpiarFormulario();

            cargarEmpleados();

        } catch (Exception ex) {
            JOptionPane.showMessageDialog(this, "Error en los datos: " + ex.getMessage());
        }
    }

    private void limpiarFormulario() {
        JTextField[] fields = { nombreField, emailField, rolField, departamentoField, fechaInicioField, salarioField,
                ubicacionField, estadoField };
        for (JTextField field : fields) {
            field.setText("");
        }
        currentDocId = "";
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
            button.addActionListener(e -> fireEditingStopped());
            this.label = action;
        }

        public Component getTableCellEditorComponent(JTable table, Object value, boolean isSelected, int row,
                int column) {
            button.setText(label);
            if (label.equals("Editar")) {
                editarEmpleado(row);
            } else if (label.equals("Eliminar")) {
                eliminarEmpleado(row);
            }
            return button;
        }

        public Object getCellEditorValue() {
            return label;
        }

        private void editarEmpleado(int row) {
            editandoFila = row;
            currentDocId = modeloTabla.getValueAt(row, 0).toString();
            nombreField.setText(modeloTabla.getValueAt(row, 1).toString());
            emailField.setText(modeloTabla.getValueAt(row, 2).toString());
            rolField.setText(modeloTabla.getValueAt(row, 3).toString());
            departamentoField.setText(modeloTabla.getValueAt(row, 4).toString());
            fechaInicioField.setText(modeloTabla.getValueAt(row, 5).toString());
            salarioField.setText(modeloTabla.getValueAt(row, 6).toString());
            ubicacionField.setText(modeloTabla.getValueAt(row, 7).toString());
            estadoField.setText(modeloTabla.getValueAt(row, 8).toString());
        }

        private void eliminarEmpleado(int row) {
            int confirm = JOptionPane.showConfirmDialog(null, "¿Estás seguro de eliminar este empleado?",
                    "Confirmar eliminación", JOptionPane.YES_NO_OPTION);
            if (confirm == JOptionPane.YES_OPTION) {
                String docId = modeloTabla.getValueAt(row, 0).toString();
                Gson gson = new Gson();
                Consultor consultor = new Consultor();
                consultor.post("empleados/delete", new Gson().toJson(new IdWrapper(docId)));
                JOptionPane.showMessageDialog(null, "Empleado eliminado.");
                cargarEmpleados();
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
