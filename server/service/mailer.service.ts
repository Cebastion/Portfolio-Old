import { createTransport } from 'nodemailer'
import { IConfigService } from '../config/config.interface'
import { ImailOptions } from '../interface/mailOptions.interface'

export class MailerService {
  private email: string
  private offer: string
  private nameproject: string
  private mailOptions: ImailOptions
  private transporter: any

  constructor(email: string, offer: string, nameproject: string, private readonly configService: IConfigService) {
    this.email = email
    this.offer = offer
    this.nameproject = nameproject

    this.mailOptions = {
      from: 'kdimon2006@gmail.com',
      to: 'cebastion1488@gmail.com',
      subject: this.nameproject,
      text: `Email customer: ${this.email} \n\n ${this.offer}`,
    };

    this.transporter = createTransport({
      service: 'Gmail',
      auth: {
        user: this.configService.get('EMAIL'),
        pass: this.configService.get('PASSWORD'),
      },
    });
  }

  sendEmail() {
    this.transporter.sendMail(this.mailOptions, (error: any, info: { response: any }) => {
      if (error) {
        console.error(error)
        return { success: false, offer: 'Email sending failed' }
      } else {
        console.log('Email sent:', info.response)
        return { success: true, offer: 'Email sent successfully' }
      }
    });
  }
}