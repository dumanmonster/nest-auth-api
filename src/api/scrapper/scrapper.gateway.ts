import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
@WebSocketGateway(80, { namespace: 'scrapper' })
export class ScrapperGateway {}
