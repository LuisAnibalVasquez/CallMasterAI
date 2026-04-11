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
exports.UserProvisioningAdapter = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const injection_tokens_1 = require("../../../identity/application/constants/injection-tokens");
const User_1 = require("../../../identity/domain/entities/User");
let UserProvisioningAdapter = class UserProvisioningAdapter {
    userRepository;
    roleRepository;
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async provisionInitialUser(data) {
        const role = await this.roleRepository.findByName(data.roleName);
        if (!role) {
            throw new Error(`Role ${data.roleName} not found`);
        }
        const user = new User_1.User((0, crypto_1.randomUUID)(), data.email, data.passwordHash, role.id, role.name, data.tenantId, data.mustChangePassword, new Date(), true, new Date(), null);
        await this.userRepository.save(user);
    }
};
exports.UserProvisioningAdapter = UserProvisioningAdapter;
exports.UserProvisioningAdapter = UserProvisioningAdapter = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(injection_tokens_1.IDENTITY_TOKENS.ROLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object])
], UserProvisioningAdapter);
//# sourceMappingURL=UserProvisioningAdapter.js.map