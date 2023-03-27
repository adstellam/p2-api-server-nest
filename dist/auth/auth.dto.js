"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoJwtObject = exports.CognitoUserAttributes = exports.CognitoUserCredentials = void 0;
const openapi = require("@nestjs/swagger");
class CognitoUserCredentials {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.CognitoUserCredentials = CognitoUserCredentials;
;
class CognitoUserAttributes {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String }, password: { required: true, type: () => String }, email: { required: true, type: () => String } };
    }
}
exports.CognitoUserAttributes = CognitoUserAttributes;
;
class CognitoJwtObject {
    static _OPENAPI_METADATA_FACTORY() {
        return { jwt: { required: true, type: () => String } };
    }
}
exports.CognitoJwtObject = CognitoJwtObject;
//# sourceMappingURL=auth.dto.js.map