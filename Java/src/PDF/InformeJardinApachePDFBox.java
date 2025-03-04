package PDF;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import Models.Jardin;
import Models.Planta.PlantaConCantidad;
import UI.Plantas.ModuloJardines;
import Models.Planta.Planta;
import java.io.File;
import java.io.IOException;
import java.util.Map;

public class InformeJardinApachePDFBox {

    public void generarInforme(Jardin jardin, String outputPath) {
        try {
            // Create a new PDF document
            PDDocument document = new PDDocument();

            // Create a new page
            PDPage page = new PDPage();
            document.addPage(page);

            // Create a content stream to write to the page
            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            // Start writing content to the document
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12); // Set font before writing text
            contentStream.newLineAtOffset(50, 750); // Set the starting position on the page
            contentStream.setLeading(14.5f); // Set line spacing for new lines

            // Title of the document
            contentStream.showText("Informe del Estado del Jardín");
            contentStream.newLine();

            // Add general garden information
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

            contentStream.newLine(); // Add an extra space between sections

            // Add a table header
            contentStream.showText("Nombre        | Bioma       | Cantidad | Precio");
            contentStream.newLine();

            // Add plant data
            for (Map.Entry<String, PlantaConCantidad> entry : jardin.getPlantasJardin().entrySet()) {
                PlantaConCantidad plantaConCantidad = entry.getValue();
                Planta planta = plantaConCantidad.getPlanta();

                contentStream.showText(planta.getNombre() + " | " +
                        planta.getBioma() + " | " +
                        plantaConCantidad.getCantidad() + " | $" +
                        planta.getPrecio());
                contentStream.newLine();
            }

            // End the content stream and save the document
            contentStream.endText();
            contentStream.close();

            // Save the document to the specified output file
            document.save(new File(outputPath));
            document.close();

            System.out.println("Informe PDF generado con éxito en: " + outputPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
