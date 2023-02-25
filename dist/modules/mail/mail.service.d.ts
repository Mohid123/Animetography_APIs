import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
import { User } from 'src/interface/user.interface';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, token: string): Promise<any>;
}
