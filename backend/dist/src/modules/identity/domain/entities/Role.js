"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    id;
    name;
    description;
    createdAt;
    updatedAt;
    constructor(id, name, description = null, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Role = Role;
//# sourceMappingURL=Role.js.map