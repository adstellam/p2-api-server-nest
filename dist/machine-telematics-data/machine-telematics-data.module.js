"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MachineTelematicsDataModule = void 0;
const common_1 = require("@nestjs/common");
const machine_telematics_data_controller_1 = require("./machine-telematics-data.controller");
const machine_telematics_data_service_1 = require("./machine-telematics-data.service");
let MachineTelematicsDataModule = class MachineTelematicsDataModule {
};
MachineTelematicsDataModule = __decorate([
    (0, common_1.Module)({
        controllers: [machine_telematics_data_controller_1.MachineTelematicsDataController],
        providers: [machine_telematics_data_service_1.MachineTelematicsDataService]
    })
], MachineTelematicsDataModule);
exports.MachineTelematicsDataModule = MachineTelematicsDataModule;
//# sourceMappingURL=machine-telematics-data.module.js.map