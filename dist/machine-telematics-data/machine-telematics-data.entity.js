"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineTelematicsData = void 0;
const openapi = require("@nestjs/swagger");
class MachineTelematicsData {
    static _OPENAPI_METADATA_FACTORY() {
        return { machine_id: { required: true, type: () => String }, machine_name: { required: true, type: () => String }, ts: { required: true, type: () => Date }, odometer_meter_per_second: { required: true, type: () => Number }, odometer_meter: { required: true, type: () => Number }, oil_temp_celsius: { required: true, type: () => Number }, voltage: { required: true, type: () => Number } };
    }
}
exports.MachineTelematicsData = MachineTelematicsData;
;
//# sourceMappingURL=machine-telematics-data.entity.js.map