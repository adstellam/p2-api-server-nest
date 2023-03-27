"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const openapi = require("@nestjs/swagger");
class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, username: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, role_ids: { required: true, type: () => [String] }, role_names: { required: true, type: () => [String] }, permissions_list: { required: true, type: () => [Object] }, last_name: { required: true, type: () => String }, first_name: { required: true, type: () => String }, affiliated_entity: { required: true, type: () => String }, job_title: { required: true, type: () => String }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
}
exports.User = User;
//# sourceMappingURL=users.entity.js.map