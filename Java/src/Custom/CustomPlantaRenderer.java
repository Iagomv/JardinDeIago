package Custom;

import javax.swing.*;
import Models.Jardin;
import Models.Planta.Planta;

import java.awt.*;

public class CustomPlantaRenderer extends JLabel implements ListCellRenderer<Planta> {
    @Override
    public Component getListCellRendererComponent(JList<? extends Planta> list, Planta value, int index,
            boolean isSelected, boolean cellHasFocus) {
        setText(value.getNombre()); 
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