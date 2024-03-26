import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setPatients, setAddPatient, setUpdatePatient, setDeletePatient } from '@/store';
import Swal from 'sweetalert2';

export const usePatientStore = () => {
  const { patients } = useSelector((state: any) => state.patients);
  const dispatch = useDispatch();

  const getPatients = async () => {
    console.log('OBTENIENDO PACIENTES')
    const { data } = await coffeApi.get('/patient');
    console.log(data)
    dispatch(setPatients({ patients: data.patients }));
  }

  const postCreatePatient = async (body: object) => {
    try {
      console.log('CREANDO PACIENTE')
      console.log(body)
      const { data } = await coffeApi.post(`/patient`, body);
      console.log(data)
      dispatch(setAddPatient({ patient: data.patient }));
      Swal.fire('Ponente creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const putUpdatePatient = async (id: number, body: object) => {
    try {
      console.log('MODIFICANDO PACIENTE')
      const { data } = await coffeApi.put(`/patient/${id}`, body);
      console.log(data)
      dispatch(setUpdatePatient({ patient: data.patient }));
      Swal.fire('Se modifico el ponente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const deletePatient = async (id: number) => {
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
          const { data } = await coffeApi.delete(`/patient/${id}`);
          console.log(data)
          dispatch(setDeletePatient({ id }));
          Swal.fire(
            'Eliminado',
            'Usuario eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'Usuario esta a salvo :)',
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
    patients,
    //* Métodos
    getPatients,
    postCreatePatient,
    putUpdatePatient,
    deletePatient,
  }
}