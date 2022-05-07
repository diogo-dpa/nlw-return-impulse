import { MailAdapter, SendMailData } from "../mail.adapters";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "",
		pass: "",
	},
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData) {
		await transport.sendMail({
			from: "Equipe Feedget <oi@feedget.com>",
			to: "Diogo Almazan <diogodpa@outlook.com>",
			subject,
			html: body,
		});
	}
}
