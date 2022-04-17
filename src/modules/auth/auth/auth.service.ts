/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import { User } from 'src/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { encodeImageToBlurhash } from 'src/utils/utils';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly _usersService: Model<User>,
    private jwtService: JwtService) {}

  async loginToken() {
    const userData = {
      id: '6230c471434e4f306486e31w',
      email: "muhammadmohid141@gmail.com",
      admin: true
    }
    return this.generateToken(userData)
  }

    private generateToken(payload: any) {
      debugger
      return {
          access_token: `Bearer ${this.jwtService.sign(payload)}`
      }
  }

  async login(loginDto: any) {
    let user  = await this._usersService.findOne({email: loginDto.email});

    if(!user) {
      throw new UnauthorizedException('Incorrect Credentials')
    }
    debugger

    const isValidCredentials = await bcrypt.compare(loginDto.password, user.password);
    debugger

    if(isValidCredentials == true) {
      debugger
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
      return
    }
    loginDto._id = new Types.ObjectId().toString();
    debugger
    const newUser = new this._usersService(loginDto);
    if (newUser.avatar && newUser.avatar.length) {
      debugger
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
    return await new this._usersService(loginDto).save();
  }
}
