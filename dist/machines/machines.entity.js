"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Machine = void 0;
const openapi = require("@nestjs/swagger");
class Machine {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, machine_name: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, machine_classification: { required: true, type: () => Object }, machine_model: { required: true, type: () => String }, machine_series: { required: true, type: () => Number }, machine_serial_number: { required: true, type: () => String }, active_configuration_json: { required: true, type: () => String }, inet_domain_name: { required: true, type: () => String }, archived: { required: true, type: () => Boolean }, created: { required: true, type: () => Date }, updated: { required: true, type: () => Date } };
    }
}
exports.Machine = Machine;
;
//# sourceMappingURL=machines.entity.js.map