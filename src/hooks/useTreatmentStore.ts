import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setTreatments, setAddTreatment, setUpdateTreatment, setUpdatePatient } from '@/store';
import Swal from 'sweetalert2';

export const useTreatmentStore = () => {
  const { treatments } = useSelector((state: any) => state.treatments);
  const dispatch = useDispatch();

  const getTreatments = async () => {
    console.log('OBTENIENDO TRATAMIENTOS')
    const { data } = await coffeApi.get('/treatment');
    console.log(data)
    dispatch(setTreatments({ treatments: data.treatments }));
  }

  const postCreateTreatment = async (body: object) => {
    try {
      console.log('CREANDO UN TRATAMIENTO')
      console.log(body)
      const { data } = await coffeApi.post(`/treatment`, body);
      console.log(data)
      dispatch(setAddTreatment({ treatment: data.treatment }));
      Swal.fire('Evento creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const putUpdateTreatment = async (id: number, body: object) => {
    try {
      console.log('MODIFICANDO TRATAMIENTO')
      const { data } = await coffeApi.put(`/treatment/${id}`, body);
      console.log(data)
      dispatch(setUpdatePatient({ patient: data.patient }));
      Swal.fire('Se modifico el evento', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const deleteTreatment = async (id: number) => {
    try {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: '¡No, cancelar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log('ELIMINANDO PACIENTE')
          const { data } = await coffeApi.delete(`/treatment/${id}`);
          console.log(data)
          dispatch(setUpdatePatient({ patient: data.patient }));
          Swal.fire(
            'Eliminado',
            'Evento eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'Evento esta a salvo :)',
            'error'
          )
        }
      });
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  return {
    //* Propiedades
    treatments,
    //* Métodos
    getTreatments,
    postCreateTreatment,
    putUpdateTreatment,
    deleteTreatment,
  }
}