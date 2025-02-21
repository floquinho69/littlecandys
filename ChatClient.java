import java.net.URI;
import java.util.Scanner;
import javax.websocket.*;

@ClientEndpoint
public class ChatClient {
    private static String username;

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("Conectado ao chat como " + username);
    }

    @OnMessage
    public void onMessage(String message) {
        System.out.println(message);
    }

    @OnClose
    public void onClose() {
        System.out.println("Desconectado do chat.");
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Digite seu nome (Mac, Caio, BlackMetal, Frank): ");
        username = scanner.nextLine();
        
        try {
            WebSocketContainer container = ContainerProvider.getWebSocketContainer();
            Session session = container.connectToServer(ChatClient.class, new URI("ws://localhost:3000"));

            System.out.println("Bem-vindo ao chat! Digite mensagens e pressione Enter para enviar.");
            while (true) {
                String message = scanner.nextLine();
                session.getBasicRemote().sendText("{\"name\":\"" + username + "\", \"message\":\"" + message + "\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            scanner.close();
        }
    }
}
