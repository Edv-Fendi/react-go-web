export interface CreateMessageRequest {
    roomId: string;
    message: string
}
export async function CreateMessage({ message, roomId }: CreateMessageRequest) {
    const response = await fetch(`http://localhost:8080/api/rooms/${roomId}/messages`, {
        method: 'POST',
        body: JSON.stringify({
            message,
        })
    })

    const data: { id: string } = await response.json()

    return { messageId: data.id }
}