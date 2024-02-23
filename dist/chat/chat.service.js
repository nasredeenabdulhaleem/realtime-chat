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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("./schemas/chat.schema");
let ChatService = class ChatService {
    constructor(chatModel) {
        this.chatModel = chatModel;
    }
    async createChat(body) {
        const { senderId, receiverId, content } = body;
        const createdChat = new this.chatModel({ senderId, receiverId, content });
        return createdChat.save();
    }
    async getChats(body) {
        const { senderId, receiverId } = body;
        return this.chatModel
            .find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        })
            .populate('senderId receiverId')
            .sort('timestamp')
            .exec();
    }
    async getChat(sender_id, receiver_id) {
        return this.chatModel
            .find({
            $or: [
                { senderId: sender_id, receiverId: receiver_id },
                { senderId: receiver_id, receiverId: sender_id },
            ],
        })
            .populate('senderId receiverId')
            .sort('timestamp')
            .exec();
    }
    async newgetChats(sender_id, receiver_id) {
        return this.chatModel
            .find({
            $or: [
                { senderId: sender_id, receiverId: receiver_id },
                { senderId: receiver_id, receiverId: sender_id },
            ],
        })
            .sort('timestamp')
            .exec();
    }
    async getAllUserChats(userId) {
        return this.chatModel
            .aggregate([
            {
                $match: {
                    $or: [{ senderId: userId }, { receiverId: userId }],
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $group: {
                    _id: {
                        $cond: [
                            { $eq: ['$senderId', userId] },
                            '$receiverId',
                            '$senderId',
                        ],
                    },
                    doc: { $first: '$$ROOT' },
                },
            },
            {
                $replaceRoot: { newRoot: '$doc' },
            },
        ])
            .exec();
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ChatService);
//# sourceMappingURL=chat.service.js.map