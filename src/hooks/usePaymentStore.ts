import { useDispatch } from 'react-redux';
import { coffeApi } from '@/services';
import Swal from 'sweetalert2';
import { setRegisterPayment } from '@/store';
import printJS from 'print-js';

export const usePaymentStore = () => {
  const dispatch = useDispatch();

  const postRegisterPayment = async (body: object) => {
    try {
      console.log('REGISTRANDO UN PAGO')
      const { data } = await coffeApi.post('/payment', body);
      console.log(data)
      dispatch(setRegisterPayment({ payment: data.payment, amountDue: data.amountDue }));
      const byteCharacters = atob(data.document);
      const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const pdfURL = URL.createObjectURL(blob);
      printJS(pdfURL)
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  return {
    //* Propiedades
    // permissions,
    //* Métodos
    postRegisterPayment,
  }
}