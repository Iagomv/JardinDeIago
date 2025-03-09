package PDF;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import Models.Jardin;
import Models.Planta.PlantaConCantidad;
import Models.Planta.Planta;
import java.io.File;
import java.io.IOException;
import java.util.Map;

public class InformeJardinApachePDFBox {

    private static final float MARGIN = 50;
    private static final float Y_START = 750;
    private static final float LEADING = 14.5f; // Line spacing

    public void generarInforme(Jardin jardin, String outputPath) {
        try {
            // Create a new PDF document
            PDDocument document = new PDDocument();
            PDPage page = new PDPage();
            document.addPage(page);
            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            // Start writing content to the document
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
            contentStream.newLineAtOffset(MARGIN, Y_START);
            contentStream.setLeading(LEADING);

            // Header Section - Company Info
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 18);
            contentStream.showText("Oasis.sl");
            contentStream.newLine();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 14);
            contentStream.showText("Informe del Estado del Jardín");
            contentStream.newLine();
            contentStream.newLine(); // Space after the title

            // Empresa Información Ficticia
            contentStream.setFont(PDType1Font.HELVETICA, 12);
            contentStream.showText("Correo electrónico: contacto@oasis.sl");
            contentStream.newLine();
            contentStream.showText("CIF: B12345678");
            contentStream.newLine();
            contentStream.showText("Dirección: Calle del Sol, 123, 28001 Madrid, España");
            contentStream.newLine();
            contentStream.showText("Teléfono: +34 912 345 678");
            contentStream.newLine();
            contentStream.newLine(); // Space after company information

            // General Garden Information
            contentStream.setFont(PDType1Font.HELVETICA, 12);
            contentStream.showText("ID del Jardín: " + jardin.getId());
            contentStream.newLine();
            contentStream.showText("Bioma: " + jardin.getBioma());
            contentStream.newLine();
            contentStream.showText("Temperatura: " + jardin.getTemperatura() + "°C");
            contentStream.newLine();
            contentStream.showText("Humedad: " + jardin.getHumedad() + "%");
            contentStream.newLine();
            contentStream.showText("Agua: " + jardin.getAgua() + "%");
            contentStream.newLine();
            contentStream.showText("Calor: " + jardin.getCalor() + "°C");
            contentStream.newLine();
            contentStream.newLine(); // Space after the garden info

            // Table Header
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);
            contentStream.showText(String.format("%-20s %-15s %-10s %-10s", "Nombre", "Bioma", "Cantidad", "Precio"));
            contentStream.newLine();
            contentStream.showText("-------------------------------------------------------------");
            contentStream.newLine();
            contentStream.setFont(PDType1Font.HELVETICA, 12);

            // Plant Data
            for (Map.Entry<String, PlantaConCantidad> entry : jardin.getPlantasJardin().entrySet()) {
                PlantaConCantidad plantaConCantidad = entry.getValue();
                Planta planta = plantaConCantidad.getPlanta();

                String formattedRow = String.format("%-20s %-15s %-10d $%-10.2f",
                        planta.getNombre(),
                        planta.getBioma(),
                        plantaConCantidad.getCantidad(),
                        planta.getPrecio());

                contentStream.showText(formattedRow);
                contentStream.newLine();
            }

            // End content stream
            contentStream.endText();
            contentStream.close();

            // Save the document
            document.save(new File(outputPath));
            document.close();

            System.out.println("Informe PDF generado con éxito en: " + outputPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
