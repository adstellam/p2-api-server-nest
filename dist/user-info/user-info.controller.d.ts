import { ConfigService } from '@nestjs/config';
import { UserInfoService } from 'src/user-info/user-info.service';
import { UserInfo } from 'src/user-info/user-info.enity';
export declare class UserInfoController {
    private configService;
    private userInfoService;
    cognitoJwtVerifier: any;
    constructor(configService: ConfigService, userInfoService: UserInfoService);
    get_user_info(auth_header: string, username: string): Promise<UserInfo>;
}
