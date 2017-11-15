export class FeedbackViewModel {
  senderName: string = "";
  errorTypes: ErrorType[] = [];
  note: string = "";
  email: string = "";
}

export class ErrorType {
  name: string = "";
  isSelected: boolean = false;
}