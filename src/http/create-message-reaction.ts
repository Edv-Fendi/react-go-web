export interface CreateMessageReactionRequest {
    roomId: string;
    messageId: string
}
export async function CreateMessageReaction({ messageId, roomId }: CreateMessageReactionRequest) {
    await fetch(`http://localhost:8080/api/rooms/${roomId}/messages/${messageId}/react`, {
        method: 'PATCH',

    })
}