/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import { User } from 'src/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { encodeImageToBlurhash } from 'src/utils/utils';
import { MailService } from 'src/modules/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly _usersService: Model<User>,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async loginToken() {
    const userData = {
      id: '6230c471434e4f306486e31w',
      email: "muhammadmohid141@gmail.com",
      admin: true
    }
    return this.generateToken(userData)
  }

  private generateToken(payload: any) {
    return {
      access_token: `Bearer ${this.jwtService.sign(payload)}`
    }
  }

  async login(loginDto: any) {
    let user  = await this._usersService.findOne({email: loginDto.email});
    if(!user) {
      throw new UnauthorizedException('Incorrect Credentials')
    }
    const isValidCredentials = await bcrypt.compare(loginDto.password, user.password);
    if(!isValidCredentials) {
      throw new UnauthorizedException('Incorrect Credentials')
    }
    user = JSON.parse(JSON.stringify(user));
    delete user.password;
    const token = this.generateToken(user);
    return { user, token: token.access_token};
  }

  async signup(loginDto: any) {
    const user = await this._usersService.findOne({ email: loginDto.email });
    if(user) {
      throw new ForbiddenException('Email already exists');
    }
    loginDto._id = new Types.ObjectId().toString();
    const newUser = new this._usersService(loginDto);
    if (newUser.avatar && newUser.avatar.length) {
      for await (const mediaObj of newUser.avatar) {
          await new Promise(async (resolve, reject) => {
              try {
                  let mediaUrl = ''
                  mediaUrl = mediaObj.captureFileURL;
                  mediaObj['blurHash'] = await encodeImageToBlurhash(mediaUrl);
                  resolve({})
              }
              catch (err) {
                  reject(err)
              }
          })
      }
    }
    if(newUser.isWriter === true) {
      newUser.isWriter = false;
      const token = Math.floor(1000 + Math.random() * 9000).toString();
      await this.mailService.sendUserConfirmation(newUser, token);
    }
    return await new this._usersService(loginDto).save();
  }

  async confirmEmailAdress(id: string, user: any) {
    const oldUser = await this._usersService.findOne({ id: id }, {deletedCheck: false});
    if(!oldUser) {
      throw new NotFoundException('User does not exist')
    }
    user.isWriter = true;
    user.isVerified = true;
    await this._usersService.findOneAndUpdate({id: id}, user);
    return {message: 'Your account is now verified. You will now have access to Writer privileges'}
  }
}
