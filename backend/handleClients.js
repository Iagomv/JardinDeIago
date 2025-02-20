const connectedClients = new Set()

export const handleClientConnections = (ioServerB) => {
  ioServerB.on('connection', (socket) => {
    console.log(`🟢 Cliente conectado: ${socket.id}`)
    connectedClients.add(socket.id)

    socket.on('disconnect', () => {
      console.log(`🔴 Cliente desconectado: ${socket.id}`)
      connectedClients.delete(socket.id)
    })
  })
}
