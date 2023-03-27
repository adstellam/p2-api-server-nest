"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleDTO = exports.IdObject = void 0;
const openapi = require("@nestjs/swagger");
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
;
class RoleDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { rolename: { required: true, type: () => String } };
    }
}
exports.RoleDTO = RoleDTO;
;
//# sourceMappingURL=roles.dto.js.map