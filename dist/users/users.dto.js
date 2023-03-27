"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = exports.IdObject = void 0;
const openapi = require("@nestjs/swagger");
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
;
class UserDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, role_ids: { required: true, type: () => [String] }, affiliated_entity: { required: true, type: () => String }, last_name: { required: false, type: () => String }, first_name: { required: false, type: () => String }, job_title: { required: false, type: () => String } };
    }
}
exports.UserDTO = UserDTO;
;
//# sourceMappingURL=users.dto.js.map