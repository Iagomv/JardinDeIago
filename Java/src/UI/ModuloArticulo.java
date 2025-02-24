package UI;

import Manager.Consultor;
import Models.Articulo;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableCellRenderer;
import java.awt.*;
import java.awt.event.*;
import java.lang.reflect.Type;
import java.util.List;

public class ModuloArticulo extends JPanel {
    private JTable tablaArticulos;
    private DefaultTableModel modeloTabla;
    private JPanel formularioPanel;

    // Campos del formulario
    private JTextField idField, nombreField, descripcionField, tipoField, precioField, stockField, imagenField;

    private int editandoFila = -1;
    private String currentId = "";

    public ModuloArticulo() {
        setLayout(new BorderLayout());

        // Definición de columnas: ID, Nombre, Descripción, Tipo, Precio, Stock, Imagen,
        // Editar, Eliminar
        String[] columnas = { "ID", "Nombre", "Descripción", "Tipo", "Precio", "Stock", "Imagen", "Editar",
                "Eliminar" };
        modeloTabla = new DefaultTableModel(columnas, 0) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return column == 7 || column == 8;
            }
        };

        tablaArticulos = new JTable(modeloTabla);
        tablaArticulos.getColumn("Editar").setCellRenderer(new ButtonRenderer());
        tablaArticulos.getColumn("Editar").setCellEditor(new ButtonEditor(new JCheckBox(), "Editar"));
        tablaArticulos.getColumn("Eliminar").setCellRenderer(new ButtonRenderer());
        tablaArticulos.getColumn("Eliminar").setCellEditor(new ButtonEditor(new JCheckBox(), "Eliminar"));

        add(new JScrollPane(tablaArticulos), BorderLayout.CENTER);

        // Formulario de agregar / editar artículos
        formularioPanel = new JPanel(new GridBagLayout());
        formularioPanel.setBorder(BorderFactory.createTitledBorder("Agregar / Editar Artículo"));
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        idField = new JTextField();
        idField.setEditable(false);
        nombreField = new JTextField();
        descripcionField = new JTextField();
        tipoField = new JTextField();
        precioField = new JTextField();
        stockField = new JTextField();
        imagenField = new JTextField();

        int row = 0;
        addFormField("ID:", idField, 0, row);
        addFormField("Nombre:", nombreField, 2, row++);
        addFormField("Descripción:", descripcionField, 0, row);
        addFormField("Tipo:", tipoField, 2, row++);
        addFormField("Precio:", precioField, 0, row);
        addFormField("Stock:", stockField, 2, row++);
        addFormField("Imagen URL:", imagenField, 0, row++);

        JButton botonGuardar = new JButton("Guardar");
        botonGuardar.addActionListener(this::agregarOActualizarArticulo);

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
        cargarArticulos();
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

    private void cargarArticulos() {
        Consultor consultor = new Consultor();
        String respuesta = consultor.get("articulos/get");

        if (respuesta != null && respuesta.startsWith("[")) {
            Gson gson = new Gson();
            Type listType = new TypeToken<List<Articulo>>() {
            }.getType();
            List<Articulo> articulos = gson.fromJson(respuesta, listType);

            modeloTabla.setRowCount(0);

            for (Articulo articulo : articulos) {
                modeloTabla.addRow(new Object[] {
                        articulo.getId(), // ID
                        articulo.getNombre(), // Nombre
                        articulo.getDescripcion(), // Descripción
                        articulo.getTipo(), // Tipo
                        articulo.getPrecio(), // Precio
                        articulo.getStock(), // Stock
                        articulo.getImagen(), // Imagen URL
                        "Editar", // Botón Editar
                        "Eliminar" // Botón Eliminar
                });
            }
        } else {
            JOptionPane.showMessageDialog(this, "Error al obtener artículos: " + respuesta);
        }
    }

    private void agregarOActualizarArticulo(ActionEvent e) {
        try {
            String id = idField.getText();
            String nombre = nombreField.getText();
            String descripcion = descripcionField.getText();
            String tipo = tipoField.getText();
            double precio = Double.parseDouble(precioField.getText());
            double stock = Double.parseDouble(stockField.getText());
            String imagen = imagenField.getText();

            Gson gson = new Gson();
            Articulo articulo = new Articulo(id, nombre, tipo, precio, stock, descripcion, imagen);

            Consultor consultor = new Consultor();
            String json = gson.toJson(articulo);

            if (!id.isEmpty()) {
                consultor.post("articulos/actualizar", json);
                JOptionPane.showMessageDialog(this, "Artículo actualizado exitosamente.");
            } else {
                consultor.post("articulos/post", json);
                JOptionPane.showMessageDialog(this, "Artículo agregado exitosamente.");
            }

            limpiarFormulario();
            cargarArticulos();
        } catch (NumberFormatException ex) {
            JOptionPane.showMessageDialog(this, "Error en los datos ingresados: " + ex.getMessage());
        }
    }

    private void limpiarFormulario() {
        JTextField[] fields = { idField, nombreField, descripcionField, tipoField, precioField, stockField,
                imagenField };
        for (JTextField field : fields) {
            field.setText("");
        }
    }

    // Renderizador de botones en la tabla
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

    // Editor de botones para acciones de editar y eliminar
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
                editarArticulo(row);
            } else if (label.equals("Eliminar")) {
                eliminarArticulo(row);
            }
            return button;
        }

        public Object getCellEditorValue() {
            return label;
        }

        private void editarArticulo(int row) {
            editandoFila = row;
            currentId = modeloTabla.getValueAt(row, 0).toString();
            idField.setText(currentId);
            nombreField.setText(modeloTabla.getValueAt(row, 1).toString());
            descripcionField.setText(modeloTabla.getValueAt(row, 2).toString());
            tipoField.setText(modeloTabla.getValueAt(row, 3).toString());
            precioField.setText(modeloTabla.getValueAt(row, 4).toString());
            stockField.setText(modeloTabla.getValueAt(row, 5).toString());
            imagenField.setText(modeloTabla.getValueAt(row, 6).toString());
        }

        private void eliminarArticulo(int row) {
            int confirm = JOptionPane.showConfirmDialog(null,
                    "¿Estás seguro de que deseas eliminar este artículo?", "Confirmar eliminación",
                    JOptionPane.YES_NO_OPTION);
            if (confirm == JOptionPane.YES_OPTION) {
                String id = modeloTabla.getValueAt(row, 0).toString();
                Consultor consultor = new Consultor();
                consultor.post("articulos/eliminar", new Gson().toJson(new IdWrapper(id)));
                cargarArticulos();
                JOptionPane.showMessageDialog(null, "Artículo eliminado.");
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
