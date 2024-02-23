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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        let data;
        try {
            const createdUser = new this.userModel(createUserDto);
            const savedUser = await createdUser.save();
            return savedUser.toObject();
        }
        catch (error) {
            if (error instanceof mongodb_1.MongoError) {
                console.error('MongoDB error:', error.message);
                data = {
                    message: error.message,
                    code: error.code,
                };
                return data;
            }
            return { error: 'an error occured' };
        }
    }
    async getUserByChatId(chat_id) {
        try {
            const user = await this.userModel.findOne({ chat_id });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${chat_id} not found`);
            }
            return user;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Invalid user ID: ${chat_id}`);
        }
    }
    async getAllUsers() {
        try {
            return await this.userModel.find().exec();
        }
        catch (error) {
            throw error;
        }
    }
    async userExists(userId) {
        const user = await this.userModel.findById(userId).exec();
        return !!user;
    }
    async createUsers(createUserDtos) {
        try {
            const createdUsers = createUserDtos.map((dto) => new this.userModel(dto));
            return await Promise.all(createdUsers.map((user) => user.save()));
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map