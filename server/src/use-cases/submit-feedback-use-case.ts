import { MailAdapter } from "../adapters/mail.adapters";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

// Camada que lida com a regra de negócio da aplicação
interface SubmitFeedbackUseCaseRequest {
	type: string;
	comment: string;
	screenshot?: string;
}

// Agora no caso de uso não tem nenhuma referência ao Prisma
export class SubmitFeedbackUseCase {
	// Constructor ja instancia o feedbackRepository
	constructor(
		private feedbackRepository: FeedbacksRepository,
		private mailAdapter: MailAdapter
	) {}

	async execute(request: SubmitFeedbackUseCaseRequest) {
		const { type, comment, screenshot } = request;

		if (!type) {
			throw new Error("Type is required");
		}

		if (!comment) {
			throw new Error("Comment is required");
		}

		if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
			throw new Error("Invalid screenshot format");
		}

		await this.feedbackRepository.create({
			type,
			comment,
			screenshot,
		});

		await this.mailAdapter.sendMail({
			subject: "Novo feedback",
			body: [
				`<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
				`<p>Tipo do feedback: ${type}</p>`,
				`<p>Comentário: ${comment}</p>`,
				screenshot ? `<img src={${screenshot}}/>` : "",
				`</div>`,
			].join("\n"),
		});
	}
}
