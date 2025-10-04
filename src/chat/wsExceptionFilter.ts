import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class WebsocketExceptionFilter extends BaseWsExceptionFilter {
  catch(_exception: WsException, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient();
    socket.emit('exception', {
        status: 'error',
        message: 'ws message is invalid'
    })
  }
}