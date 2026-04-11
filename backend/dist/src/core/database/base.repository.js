"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
class BaseRepository extends typeorm_1.Repository {
    tenantContextService;
    constructor(target, manager, queryRunner, tenantContextService) {
        super(target, manager, queryRunner);
        this.tenantContextService = tenantContextService;
    }
    get tenantId() {
        return this.tenantContextService.getTenantId();
    }
    appendTenantIdToWhere(options) {
        const tenantId = this.tenantId;
        if (!tenantId) {
            return options || {};
        }
        const opts = options || {};
        opts.where = { ...opts.where, tenant_id: tenantId };
        return opts;
    }
    find(options) {
        return super.find(this.appendTenantIdToWhere(options));
    }
    findOne(options) {
        return super.findOne(this.appendTenantIdToWhere(options));
    }
    save(entityOrEntities, options) {
        const tenantId = this.tenantId;
        if (tenantId) {
            if (Array.isArray(entityOrEntities)) {
                entityOrEntities.forEach((e) => (e.tenant_id = tenantId));
            }
            else {
                entityOrEntities.tenant_id = tenantId;
            }
        }
        return super.save(entityOrEntities, options);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map