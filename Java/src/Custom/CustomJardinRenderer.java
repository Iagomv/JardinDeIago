package Custom;

import javax.swing.*;
import Models.Jardin;
import java.awt.*;

public class CustomJardinRenderer extends JLabel implements ListCellRenderer<Jardin> {
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