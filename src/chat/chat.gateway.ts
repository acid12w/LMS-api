import { Logger, UseFilters, UsePipes, ValidationPipe } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { WebsocketExceptionFilter } from "./wsExceptionFilter";

import { Server, Socket } from "socket.io";
import { CreateMessageDtos } from "./dtos/ceate-message.dto";


let participants = [];

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000']
  }
})
@UseFilters(new WebsocketExceptionFilter())
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  
{
  private readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log("Initialized");
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.io.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`); 
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`); 
  }
  
  
  @SubscribeMessage("message")
  @UsePipes(new ValidationPipe())
  handleEvent(@MessageBody() message: CreateMessageDtos): any {          
    this.io.to(message.roomID).emit('message', {
          msg: 'message',
          content: message,
      });
    }
  @SubscribeMessage("join")
  joinRoom(@MessageBody() room: any,
      @ConnectedSocket() client: Socket,) {
        participants.push(room)
        const roomID = room.roomID
        client.join(roomID); 
        this.io.to(roomID).emit('participants', participants)  
    }

    @SubscribeMessage("leave")
    leaveRoom(@MessageBody() room: any,
        @ConnectedSocket() client: Socket,) {
          participants = participants.filter(el => el.name !== room.name);
      }
    } 
  

 

  