"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const openapi = require("@nestjs/swagger");
class Role {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, rolename: { required: true, type: () => String }, organization_name: { required: true, type: () => String }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
}
exports.Role = Role;
;
//# sourceMappingURL=roles.entity.js.map