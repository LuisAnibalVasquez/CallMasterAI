"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
class Tenant {
    id;
    name;
    phone;
    adminEmail;
    isActive;
    incurredSpend;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.phone = props.phone;
        this.adminEmail = props.adminEmail;
        this.isActive = props.isActive ?? true;
        this.incurredSpend = props.incurredSpend ?? 0;
    }
}
exports.Tenant = Tenant;
//# sourceMappingURL=Tenant.js.map