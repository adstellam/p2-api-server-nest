"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachinePosData = void 0;
const openapi = require("@nestjs/swagger");
class MachinePosData {
    static _OPENAPI_METADATA_FACTORY() {
        return { machine_id: { required: true, type: () => String }, machine_name: { required: true, type: () => String }, ts: { required: true, type: () => Date }, position: { required: true, type: () => Object } };
    }
}
exports.MachinePosData = MachinePosData;
;
//# sourceMappingURL=machine-pos-data.entity.js.map