package UI.Plantas;

import Manager.Consultor;
import Models.Planta.Agua;
import Models.Planta.Calor;
import Models.Planta.Planta;
import Models.Planta.Temperatura;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableCellRenderer;
import java.awt.*;
import java.awt.event.*;
import java.lang.reflect.Type;
import java.util.List;

public class ModuloPlanta extends JPanel {
    private JTable tablaPlantas;
    private DefaultTableModel modeloTabla;
    private JPanel formularioPanel;

    private JTextField idField, nombreField, humedadMinField, humedadMaxField,
            temperaturaMinField, temperaturaMaxField,
            calorMinField, calorMaxField,
            aguaMinField, aguaMaxField,
            precioField, imagenField, biomaField;

    private int editandoFila = -1;
    private String currentId = "";

    public ModuloPlanta() {
        setLayout(new BorderLayout());

        String[] columnas = { "id", "Nombre", "Humedad", "Temperatura", "Calor", "Agua", "Precio", "Imagen", "Bioma",
                "Editar", "Eliminar" };
        modeloTabla = new DefaultTableModel(columnas, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return column == 9 || column == 10;
            }
        };
        tablaPlantas = new JTable(modeloTabla);
        tablaPlantas.getColumn("Editar").setCellRenderer(new ButtonRenderer());
        tablaPlantas.getColumn("Editar").setCellEditor(new ButtonEditor(new JCheckBox(), "Editar"));
        tablaPlantas.getColumn("Eliminar").setCellRenderer(new ButtonRenderer());
        tablaPlantas.getColumn("Eliminar").setCellEditor(new ButtonEditor(new JCheckBox(), "Eliminar"));

        add(new JScrollPane(tablaPlantas), BorderLayout.CENTER);

        formularioPanel = new JPanel(new GridBagLayout());
        formularioPanel.setBorder(BorderFactory.createTitledBorder("Agregar / Editar Planta"));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        idField = new JTextField();
        idField.setEditable(false);
        nombreField = new JTextField();
        humedadMinField = new JTextField();
        humedadMaxField = new JTextField();
        temperaturaMinField = new JTextField();
        temperaturaMaxField = new JTextField();
        calorMinField = new JTextField();
        calorMaxField = new JTextField();
        aguaMinField = new JTextField();
        aguaMaxField = new JTextField();
        precioField = new JTextField();
        imagenField = new JTextField();
        biomaField = new JTextField();

        int row = 0;
        addFormField("ID:", idField, 0, row);
        addFormField("Nombre:", nombreField, 2, row);
        addFormField("Humedad Min:", humedadMinField, 4, row++);
        addFormField("Humedad Max:", humedadMaxField, 0, row);
        addFormField("Temperatura Min:", temperaturaMinField, 2, row);
        addFormField("Temperatura Max:", temperaturaMaxField, 4, row++);
        addFormField("Calor Min:", calorMinField, 0, row);
        addFormField("Calor Max:", calorMaxField, 2, row);
        addFormField("Agua Min:", aguaMinField, 4, row++);
        addFormField("Agua Max:", aguaMaxField, 0, row);
        addFormField("Precio:", precioField, 2, row);
        addFormField("Imagen URL:", imagenField, 4, row++);
        addFormField("Bioma:", biomaField, 0, row);

        JButton botonGuardar = new JButton("Guardar");
        botonGuardar.addActionListener(this::agregarOActualizarPlanta);

        JButton botonLimpiar = new JButton("Limpiar");
        botonLimpiar.addActionListener(e -> limpiarFormulario());

        JPanel botonesPanel = new JPanel();
        botonesPanel.add(botonGuardar);
        botonesPanel.add(botonLimpiar);

        GridBagConstraints botonGbc = new GridBagConstraints();
        botonGbc.gridx = 0;
        botonGbc.gridy = ++row;
        botonGbc.gridwidth = 5;
        botonGbc.anchor = GridBagConstraints.CENTER;
        formularioPanel.add(botonesPanel, botonGbc);

        add(formularioPanel, BorderLayout.SOUTH);
        cargarPlantas();
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

    private void cargarPlantas() {
        Consultor consultor = new Consultor();
        String respuesta = consultor.get("plantas/get");

        if (respuesta != null && respuesta.startsWith("[")) {
            Gson gson = new Gson();
            Type listType = new TypeToken<List<Planta>>() {
            }.getType();
            List<Planta> plantas = gson.fromJson(respuesta, listType);

            modeloTabla.setRowCount(0);

            for (Planta planta : plantas) {
                modeloTabla.addRow(new Object[] {
                        planta.id,
                        planta.nombre,
                        planta.humedad,
                        planta.temperatura,
                        planta.calor,
                        planta.agua,
                        planta.precio,
                        planta.imagen,
                        planta.bioma,
                        "Editar",
                        "Eliminar"
                });
            }
            revalidate();
            repaint();
        } else {
            JOptionPane.showMessageDialog(this, "Error al obtener plantas: " + respuesta);
        }
    }

    private void agregarOActualizarPlanta(ActionEvent e) {
        try {
            String id = idField.getText();
            String nombre = nombreField.getText();
            int humedadMin = Integer.parseInt(humedadMinField.getText());
            int humedadMax = Integer.parseInt(humedadMaxField.getText());
            int temperaturaMin = Integer.parseInt(temperaturaMinField.getText());
            int temperaturaMax = Integer.parseInt(temperaturaMaxField.getText());
            double calorMin = Double.parseDouble(calorMinField.getText());
            double calorMax = Double.parseDouble(calorMaxField.getText());
            int aguaMin = Integer.parseInt(aguaMinField.getText());
            int aguaMax = Integer.parseInt(aguaMaxField.getText());
            double precio = Double.parseDouble(precioField.getText());
            String imagen = imagenField.getText();
            String bioma = biomaField.getText();

            Gson gson = new Gson();
            Planta planta = new Planta(
                    id,
                    nombre,
                    new Models.Planta.Humedad(humedadMin, humedadMax),
                    new Temperatura(temperaturaMin, temperaturaMax),
                    new Calor(calorMin, calorMax),
                    new Agua(aguaMin, aguaMax),
                    precio,
                    imagen,
                    bioma);

            Consultor consultor = new Consultor();
            String json = gson.toJson(planta);

            if (!id.isEmpty()) {
                consultor.post("plantas/actualizar", json);
                JOptionPane.showMessageDialog(this, "Planta actualizada exitosamente.");
            } else {
                consultor.post("plantas/nueva", json);
                JOptionPane.showMessageDialog(this, "Planta agregada exitosamente.");
            }

            limpiarFormulario();
            cargarPlantas();

        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Error en los datos ingresados: " + ex.getMessage());
        }
    }

    private void limpiarFormulario() {
        JTextField[] fields = { idField, nombreField, humedadMinField, humedadMaxField, temperaturaMinField,
                temperaturaMaxField,
                calorMinField, calorMaxField, aguaMinField, aguaMaxField, precioField, imagenField, biomaField };
        for (JTextField field : fields) {
            field.setText("");
        }
    }

    class ButtonRenderer extends JButton implements TableCellRenderer {
        public ButtonRenderer() {
            setOpaque(true);
        }

        public Component getTableCellRendererComponent(JTable table, Object value,
                boolean isSelected, boolean hasFocus, int row, int column) {
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

        public Component getTableCellEditorComponent(JTable table, Object value,
                boolean isSelected, int row, int column) {
            button.setText(label);

            if (label.equals("Editar")) {
                editarPlanta(row);
            } else if (label.equals("Eliminar")) {
                eliminarPlanta(row);
            }
            return button;
        }

        public Object getCellEditorValue() {
            return label;
        }

        private void editarPlanta(int row) {
            editandoFila = row;
            currentId = modeloTabla.getValueAt(row, 0).toString();
            idField.setText(currentId);
            nombreField.setText(modeloTabla.getValueAt(row, 1).toString());
            String[] humedad = modeloTabla.getValueAt(row, 2).toString().split("-");
            humedadMinField.setText(humedad[0].trim());
            humedadMaxField.setText(humedad[1].trim());
            String[] temperatura = modeloTabla.getValueAt(row, 3).toString().split("-");
            temperaturaMinField.setText(temperatura[0].trim());
            temperaturaMaxField.setText(temperatura[1].trim());
            String[] calor = modeloTabla.getValueAt(row, 4).toString().split("-");
            calorMinField.setText(calor[0].trim());
            calorMaxField.setText(calor[1].trim());
            String[] agua = modeloTabla.getValueAt(row, 5).toString().split("-");
            aguaMinField.setText(agua[0].trim());
            aguaMaxField.setText(agua[1].trim());
            precioField.setText(modeloTabla.getValueAt(row, 6).toString());
            imagenField.setText(modeloTabla.getValueAt(row, 7).toString());
            biomaField.setText(modeloTabla.getValueAt(row, 8).toString());
        }

        private void eliminarPlanta(int row) {
            int confirm = JOptionPane.showConfirmDialog(null,
                    "¿Estás seguro de que deseas eliminar esta planta?", "Confirmar eliminación",
                    JOptionPane.YES_NO_OPTION);
            if (confirm == JOptionPane.YES_OPTION) {
                String id = modeloTabla.getValueAt(row, 0).toString();
                Consultor consultor = new Consultor();
                consultor.post("plantas/eliminar", new Gson().toJson(new IdWrapper(id)));
                cargarPlantas();
                JOptionPane.showMessageDialog(null, "Planta eliminada.");
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
