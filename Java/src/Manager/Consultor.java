package Manager;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Consultor {

    private final HttpClient client;
    private final String urlBase = "http://localhost:5000/api/";

    // Constructor que recibe la URL del endpoint
    public Consultor() {
        // Forzamos el uso de HTTP/1.1 y usamos la dirección IP 127.0.0.1 (si es
        // necesario)
        this.client = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();
    }

    // Método para realizar la solicitud GET y devolver la respuesta como String
    public String get(String url) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(urlBase + url))
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Código de estado: " + response.statusCode());
            System.out.println("Respuesta: " + response.body());
            return response.body();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Método POST para enviar un JSON y obtener la respuesta como String
    public String post(String url, String jsonPayload) {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(urlBase + url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Código de estado POST: " + response.statusCode());
            System.out.println("Respuesta POST: " + response.body());
            return response.body();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
