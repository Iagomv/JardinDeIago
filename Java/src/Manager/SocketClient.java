package Manager;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;
import org.json.JSONObject;
import UI.Registros.ModuloDashboard; // Import UI class

public class SocketClient {
    private Socket socket;
    private ModuloDashboard dashboard; // Reference to UI component

    public SocketClient(ModuloDashboard dashboard) {
        this.dashboard = dashboard; // Store reference to update UI

        try {
            // Connect to the WebSocket server
            socket = IO.socket("http://localhost:5000");

            // Event: When connected
            socket.on(Socket.EVENT_CONNECT, args -> {
                System.out.println("Connected to the server");
                socket.emit("registerClient", "JavaClient");
            });

            // Event: Receive server data
            socket.on("datosActualizados", args -> {
                if (args.length > 0 && args[0] instanceof JSONObject) {
                    JSONObject json = (JSONObject) args[0];
                    System.out.println("Received JSON from server: " + json.toString());

                    // Update UI with received data
                    dashboard.updateData(json);
                }
            });

            // Event: When disconnected
            socket.on(Socket.EVENT_DISCONNECT, args -> {
                System.out.println("Disconnected from the server");
            });

            // Connect to server
            socket.connect();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
