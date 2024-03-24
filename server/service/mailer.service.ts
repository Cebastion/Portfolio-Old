import { createTransport } from 'nodemailer'
import { ImailOptions } from '../interface/mailOptions.interface'

export class MailerService {
  private email: string
  private offer: string
  private nameproject: string
  private mailOptions: ImailOptions
  private transporter: any

  constructor(email: string, offer: string, nameproject: string) {
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
        user: 'kdimon2006@gmail.com',
        pass: 'jezavzrvubmsquyq',
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