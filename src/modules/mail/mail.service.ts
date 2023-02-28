/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { response } from 'express';
import { User } from 'src/interface/user.interface';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmation(user: User, token: string) {
        const url = `animetography-blog.com/auth/confirm?id=${user.id}&token=${token}`;
        return await this.mailerService.sendMail({
          to: user.email,
          from: '"Admin"',
          subject: 'Email Confirmation',
          template: './confirmation',
          context: {
            name: user.firstName + ' ' + user.lastName,
            url,
          },
        }).then((response: any) => {
            return response
        })
        .catch((err: any) => {
            throw new BadRequestException(err)
        });
      }
}
