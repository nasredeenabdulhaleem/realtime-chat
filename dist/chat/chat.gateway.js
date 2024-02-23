"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
let ChatGateway = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
        this.connectedClients = new Map();
    }
    afterInit(server) {
        console.log('WebSocket Initialized');
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            this.connectedClients.set(userId, client);
            console.log(`User ${userId} connected`);
        }
    }
    handleDisconnect(client) {
        const userId = this.findUserIdBySocket(client);
        if (userId) {
            this.connectedClients.delete(userId);
            console.log(`User ${userId} disconnected`);
        }
    }
    findUserIdBySocket(client) {
        for (const [userId, socket] of this.connectedClients) {
            if (socket === client) {
                return userId;
            }
        }
        return undefined;
    }
    getAllConnectedClients() {
        return Array.from(this.connectedClients.keys());
    }
    async handleMessage(message) {
        const { receiverId, content } = message;
        const receiverSocket = this.connectedClients.get(receiverId);
        console.log('message', content);
        await this.chatService.createChat(message);
        if (receiverSocket) {
            receiverSocket.emit('message', content);
        }
        this.server.emit('message', { msg: 'hello everybody' });
        this.server.emit('message', content);
        return { event: 'message', data: content };
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map