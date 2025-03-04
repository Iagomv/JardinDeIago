package UI.Plantas;

import java.awt.*;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.swing.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import Models.Jardin;
import Models.Planta.Planta;
import Models.Planta.PlantaConCantidad;
import PDF.InformeJardinApachePDFBox;
import Manager.Consultor;

public class ModuloJardines extends JPanel {
    private List<Planta> listaPlantas;
    private List<Planta> listaPlantasOriginal;

    private List<Jardin> listaJardines;
    private JComboBox<Jardin> jardinComboBox;
    private JComboBox<Planta> plantaComboBox;
    private DefaultListModel<String> jardinPlantasModel;
    private JList<String> jardinPlantasList;
    private JButton addButton, removeButton, updateButton, resetButton, generatePDF;

    public ModuloJardines() {
        cargarJardines();
        cargarPlantas();
        initUI();
    }

    private void cargarPlantas() {
        Consultor consultor = new Consultor();
        String respuesta = consultor.get("plantas/get");

        if (respuesta != null && respuesta.startsWith("[")) {
            Gson gson = new Gson();
            Type listType = new TypeToken<List<Planta>>() {
            }.getType();
            listaPlantasOriginal = gson.fromJson(respuesta, listType);
            listaPlantas = listaPlantasOriginal;

        } else {
            JOptionPane.showMessageDialog(this, "Error al obtener plantas: " + respuesta);
        }
    }

    private void cargarJardines() {
        Consultor consultor = new Consultor();
        String respuesta = consultor.get("jardines/get");

        if (respuesta != null && respuesta.startsWith("[")) {
            Gson gson = new Gson();
            Type listType = new TypeToken<List<Jardin>>() {
            }.getType();
            listaJardines = gson.fromJson(respuesta, listType);
        } else {
            JOptionPane.showMessageDialog(this, "Error al obtener jardines: " + respuesta);
        }
    }

    private void initUI() {
        // Set a FlowLayout for the entire panel with some horizontal and vertical gaps
        setLayout(new BorderLayout(10, 10)); // Use BorderLayout for better control of regions

        // Initialize components
        jardinComboBox = new JComboBox<>(listaJardines.toArray(new Jardin[0])); // Only bioma will be displayed
        plantaComboBox = new JComboBox<>(listaPlantas.toArray(new Planta[0])); // Only nombre will be displayed
        jardinPlantasModel = new DefaultListModel<>();
        jardinPlantasList = new JList<>(jardinPlantasModel);
        addButton = new JButton("Agregar Planta");
        removeButton = new JButton("Eliminar Planta");
        resetButton = new JButton("Reset Jardines");
        updateButton = new JButton("Actualizar jardin");
        generatePDF = new JButton("Generar PDF");

        // Set custom renderers for combo boxes
        jardinComboBox.setRenderer(new CustomJardinRenderer());
        plantaComboBox.setRenderer(new CustomPlantaRenderer());

        // Create top panel with FlowLayout for components
        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 15, 10)); // Add horizontal and vertical spacing
        topPanel.setPreferredSize(new Dimension(600, 70)); // Set a fixed size for the top panel

        // Add components to the top panel
        topPanel.add(new JLabel("Jardín:"));
        topPanel.add(jardinComboBox);
        topPanel.add(new JLabel("Planta:"));
        topPanel.add(plantaComboBox);
        topPanel.add(addButton);
        topPanel.add(removeButton);

        // Add the top panel to the main panel (North region in BorderLayout)
        add(topPanel, BorderLayout.NORTH);

        // Set the size and appearance of the jardinPlantasList inside a JScrollPane
        jardinPlantasList.setPreferredSize(new Dimension(600, 200));
        JScrollPane listScrollPane = new JScrollPane(jardinPlantasList);
        add(listScrollPane, BorderLayout.CENTER); // Add the scrollable list to the center region

        // Set size and alignment of the removeButton at the bottom
        JPanel bottomPanel = new JPanel();
        bottomPanel.setLayout(new FlowLayout(FlowLayout.CENTER, 10, 10));
        bottomPanel.add(updateButton);
        bottomPanel.add(resetButton);
        bottomPanel.add(generatePDF);

        // Add the bottom panel containing the remove button
        add(bottomPanel, BorderLayout.SOUTH);

        // Add action listeners for the combo boxes and buttons
        jardinComboBox.addActionListener(e -> actualizarListaPlantas());
        addButton.addActionListener(e -> agregarPlanta());
        removeButton.addActionListener(e -> eliminarPlanta());
        updateButton.addActionListener(e -> actualizarJardin((Jardin) jardinComboBox.getSelectedItem()));
        resetButton.addActionListener(e -> resetJardines());
        generatePDF.addActionListener(e -> generarInformeJardin());

        // Update the plant list if there are gardens available
        if (!listaJardines.isEmpty()) {
            actualizarListaPlantas();
        }
    }

    private void actualizarListaPlantas() {
        jardinPlantasModel.clear();
        Jardin selectedJardin = (Jardin) jardinComboBox.getSelectedItem();
        if (selectedJardin != null) {
            // (Optional) refresh the plantComboBox if filtering by bioma
            filtrarPlantas(selectedJardin.getBioma());
            for (Map.Entry<String, PlantaConCantidad> entry : selectedJardin.getPlantasJardin().entrySet()) {
                Planta p = entry.getValue().getPlanta();
                int cantidad = entry.getValue().getCantidad();
                jardinPlantasModel.addElement(p.getNombre() + " x" + cantidad);
            }
        }
        revalidate();
        repaint();
    }

    private void agregarPlanta() {
        Jardin selectedJardin = (Jardin) jardinComboBox.getSelectedItem();
        Planta selectedPlanta = (Planta) plantaComboBox.getSelectedItem();

        if (selectedJardin != null && selectedPlanta != null) {
            if (selectedJardin.getBioma().equalsIgnoreCase(selectedPlanta.getBioma())) {
                Map<String, PlantaConCantidad> plantasJardin = selectedJardin.getPlantasJardin();
                String plantId = selectedPlanta.getId();
                if (plantasJardin.containsKey(plantId)) {
                    PlantaConCantidad pcc = plantasJardin.get(plantId);
                    pcc.setCantidad(pcc.getCantidad() + 1);
                } else {
                    plantasJardin.put(plantId, new PlantaConCantidad(selectedPlanta, 1));
                }
                actualizarListaPlantas();
            } else {
                JOptionPane.showMessageDialog(this, "La planta no coincide con el bioma del jardín.");
            }
        }
    }

    private void eliminarPlanta() {
        Jardin selectedJardin = (Jardin) jardinComboBox.getSelectedItem();
        String selectedEntry = jardinPlantasList.getSelectedValue();

        if (selectedJardin != null && selectedEntry != null) {
            // Assuming the displayed string is in the form "Nombre xCantidad"
            String plantName = selectedEntry.split(" x")[0];
            String plantIdToRemove = null;
            for (Map.Entry<String, PlantaConCantidad> entry : selectedJardin.getPlantasJardin().entrySet()) {
                if (entry.getValue().getPlanta().getNombre().equals(plantName)) {
                    plantIdToRemove = entry.getKey();
                    break;
                }
            }
            if (plantIdToRemove != null) {
                PlantaConCantidad pcc = selectedJardin.getPlantasJardin().get(plantIdToRemove);
                if (pcc.getCantidad() > 1) {
                    pcc.setCantidad(pcc.getCantidad() - 1);
                } else {
                    selectedJardin.getPlantasJardin().remove(plantIdToRemove);
                }
                actualizarListaPlantas();
            }
        }
    }

    private void filtrarPlantas(String bioma) {
        listaPlantas = listaPlantasOriginal.stream().filter(p -> p.getBioma().equalsIgnoreCase(bioma))
                .collect(Collectors.toList());
        plantaComboBox.setModel(new DefaultComboBoxModel<>(listaPlantas.toArray(new Planta[0])));
    }

    private void actualizarJardin(Jardin jardin) {
        Consultor consultor = new Consultor();
        String jsonJardin = convertirJardinAJson(jardin);
        String respuesta = consultor.post("jardines/update", jsonJardin);

        if (respuesta != null && respuesta.contains("actualizada")) {
            JOptionPane.showMessageDialog(this, "Jardín actualizado correctamente.");
        } else {
            JOptionPane.showMessageDialog(this, "Error al actualizar el jardín: " + respuesta);
        }
        revalidate();
        repaint();
    }

    private void resetJardines() {
        for (Jardin jardin : listaJardines) {
            jardin.getPlantasJardin().clear();
            listaPlantasOriginal.stream()
                    .filter(p -> p.getBioma().equalsIgnoreCase(jardin.getBioma()))
                    .forEach(planta -> jardin.getPlantasJardin().putIfAbsent(planta.getId(),
                            new PlantaConCantidad(planta, 1)));
            actualizarJardin(jardin);

        }
    }

    private String convertirJardinAJson(Jardin jardin) {
        Gson gson = new Gson();
        return gson.toJson(jardin);
    }

    private void generarInformeJardin() {
        Jardin selectedJardin = (Jardin) jardinComboBox.getSelectedItem();

        if (selectedJardin != null) {
            InformeJardinApachePDFBox informe = new InformeJardinApachePDFBox();
            String outputPath = "informe_jardin_" + selectedJardin.getId() + ".pdf";
            informe.generarInforme(selectedJardin, outputPath);
        } else {
            JOptionPane.showMessageDialog(this, "Seleccione un jardín primero.");
        }
    }
}

class CustomJardinRenderer extends JLabel implements ListCellRenderer<Jardin> {
    @Override
    public Component getListCellRendererComponent(JList<? extends Jardin> list, Jardin value, int index,
            boolean isSelected, boolean cellHasFocus) {
        setText(value.getBioma()); // Only show the bioma
        if (isSelected) {
            setBackground(list.getSelectionBackground());
            setForeground(list.getSelectionForeground());
        } else {
            setBackground(list.getBackground());
            setForeground(list.getForeground());
        }
        setFont(list.getFont());
        setOpaque(true);
        return this;
    }
}

class CustomPlantaRenderer extends JLabel implements ListCellRenderer<Planta> {
    @Override
    public Component getListCellRendererComponent(JList<? extends Planta> list, Planta value, int index,
            boolean isSelected, boolean cellHasFocus) {
        setText(value.getNombre()); // Only show the nombre
        if (isSelected) {
            setBackground(list.getSelectionBackground());
            setForeground(list.getSelectionForeground());
        } else {
            setBackground(list.getBackground());
            setForeground(list.getForeground());
        }
        setFont(list.getFont());
        setOpaque(true);
        return this;
    }
}