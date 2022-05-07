import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const submitFeedback = new SubmitFeedbackUseCase(
	{
		create: async () => {},
	},
	{
		sendMail: async () => {},
	}
);

describe("Submit Feedback", () => {
	it("should be able to submit a feedback", async () => {
		// Esperamos que a função dê certo e não dispare erro
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "example comment",
				screenshot: "data:image/png;base64,98981989",
			})
		).resolves.not.toThrow();
	});

	it("should not be able to submit feedback without type", async () => {
		await expect(
			submitFeedback.execute({
				type: "",
				comment: "example comment",
				screenshot: "data:image/png;base64,98981989",
			})
		).rejects.toThrow("Type is required");
	});

	it("should not be able to submit feedback without comment", async () => {
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "",
				screenshot: "data:image/png;base64,98981989",
			})
		).rejects.toThrow("Comment is required");
	});

	it("should not be able to submit feedback with an invalid screenshot", async () => {
		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "example comment",
				screenshot: "aaaa.jpg",
			})
		).rejects.toThrow("Invalid screenshot format");
	});
});
