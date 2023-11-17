import { useDispatch } from 'react-redux';
import { coffeApi } from '@/services';
import Swal from 'sweetalert2';
import { setRegisterPayment } from '@/store';
import { saveAs } from 'file-saver';

export const usePaymentStore = () => {
  const dispatch = useDispatch();

  const postRegisterPayment = async (body: object) => {
    try {
      console.log('REGISTRANDO UN PAGO')
      const { data } = await coffeApi.post('/payment', body);
      console.log(data)
      dispatch(setRegisterPayment({ payment: data.payment }));
      Swal.fire('Pago registrado correctamente', '', 'success');
      const byteCharacters = atob(data.document);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      saveAs(blob, data.fileName);

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