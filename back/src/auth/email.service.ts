import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import NodeMailer from 'nodemailer';
import { ServiceUnavailableException } from '@nestjs/common';

@Injectable()
export class EmailService {
  public transporter;

  constructor(private readonly jwtService: JwtService) {
    this.transporter = NodeMailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async sendVerifyEmail(
    data: { id: string; email: string },
    lang: 'en' | 'fr',
  ) {
    const token = this.jwtService.sign(
      { userId: data.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: `${24 * 60 * 60}s`, // 24 hours
      },
    );
    const template = {
      en: {
        subject: 'Verify your email',
        html: `<a href="${process.env.BACK_HOST}/auth/verify-email?token=${token}&lang=${lang}">Verify your email</a>`,
      },
      fr: {
        subject: 'Verifier votre email',
        html: `<a href="${process.env.BACK_HOST}/auth/verify-email?token=${token}&lang=${lang}">Verifier votre email</a>`,
      },
    };
    const mailOptions = {
      from: {
        name: 'Hypertube',
        address: process.env.GMAIL_ID,
      },
      to: data.email,
      subject: template[lang].subject,
      html: template[lang].html,
    };
    try {
      await this.transporter.sendMail(mailOptions);
      Logger.log('Email sent to ' + data.email);
      Logger.log(template[lang].html);
    } catch (error) {
      throw new ServiceUnavailableException("Can't send email");
    }
  }
}
