export interface PaymentModel {
  id: number;
  amount: number;
  discount: number;
  typeDiscount: string;
}
/* FORM */
export interface FormPaymenttModel {
  amount: number;
  discount: number;
  typeDiscount: string;
}

/*VALIDATIONS */
export interface FormPaymentValidations {
  amount: [(value: number) => boolean, string];
}