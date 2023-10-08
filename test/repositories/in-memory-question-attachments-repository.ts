import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/questions-attachments-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';

export class InMemoryQuestionAttachmentRepository implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string) {
    const questionAttachment = this.items
      .filter((item) => item.questionId.toString() === questionId);

    return questionAttachment;
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items
      .filter((item) => item.questionId.toString() !== questionId);

    this.items = questionAttachments;
  }
}
