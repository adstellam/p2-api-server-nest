"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineDTO = exports.IdObject = exports.ContextItemRecord = void 0;
const openapi = require("@nestjs/swagger");
class ContextItemRecord {
    static _OPENAPI_METADATA_FACTORY() {
        return { context_key: { required: true, type: () => String }, context_value: { required: true, type: () => String } };
    }
}
exports.ContextItemRecord = ContextItemRecord;
;
class IdObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String } };
    }
}
exports.IdObject = IdObject;
;
class MachineDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { machine_name: { required: true, type: () => String }, brand_id: { required: true, type: () => String }, machine_type: { required: true, enum: require("../enums").DeviceElementTypeEnum }, machine_classification: { required: false, type: () => String }, machine_model: { required: false, type: () => String }, series: { required: false, type: () => Number }, serial_number: { required: false, type: () => String }, active_configuration_id: { required: false, type: () => String }, inet_domain_name: { required: false, type: () => String }, parent_device_id: { required: false, type: () => String }, archived: { required: true, type: () => Boolean } };
    }
}
exports.MachineDTO = MachineDTO;
;
//# sourceMappingURL=machines.dto.js.map