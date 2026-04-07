"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
class BaseEntity {
    id;
    createdAt;
    constructor(id, createdAt) {
        this.id = id;
        this.createdAt = createdAt ?? new Date();
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=base.entity.js.map