import emailjs from '@emailjs/nodejs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EmailService {
  public emailjs;

  constructor(private readonly jwtService: JwtService) {
    this.emailjs = emailjs;
    this.emailjs.init({
      publicKey: process.env.EMAILJS_PUBLIC_KEY,
      privateKey: process.env.EMAILJS_PRIVATE_KEY,
    });
  }

  async sendVerifyEmail(
    data: { id: string; email: string },
    lang: 'en' | 'fr',
  ) {
    const template = {
      en: 'template_4u8p9b3',
      fr: 'template_snc2bgr',
    };
    const token = this.jwtService.sign(
      { userId: data.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: `${24 * 60 * 60}s`, // 24 hours
      },
    );

    await this.emailjs.send(process.env.EMAILJS_SERVICE_ID, template[lang], {
      link: `${process.env.BAKC_HOST}/auth/verify-email?token=${token}`,
    });
  }
}
