import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddAdministrator, setDeleteAdministrator, setUpdateAdministrator, setAdministrators } from '@/store';
import Swal from 'sweetalert2';

export const useAdministratorStore = () => {
    const { administrators } = useSelector((state: any) => state.administrators);
    const dispatch = useDispatch();

    const getAdministrators = async () => {
        console.log('OBTENIENDO ADMINISTRADORES')
        const { data } = await coffeApi.get('/administrator');
        console.log(data)
        dispatch(setAdministrators({ administrators: data.administrators }));
    }

    const postCreateAdministrator = async (body: object) => {
        try {
            console.log('CREANDO ADMINISTRADOR')
            console.log(body)
            const { data } = await coffeApi.post(`/administrator`, body);
            console.log(data)
            dispatch(setAddAdministrator({ administrator: data.administrator }));
            Swal.fire('Usuario creado correctamente', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
        }
    }

    const putUpdateAdministrator = async (id: number, body: object) => {
        try {
            console.log('MODIFICANDO ADMINISTRADOR')
            const { data } = await coffeApi.put(`/administrator/${id}`, body);
            console.log(data)
            dispatch(setUpdateAdministrator({ administrator: data.administrator }));
            Swal.fire('Se modifico el usuario', '', 'success');
        } catch (error: any) {
            Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
        }
    }

    const deleteAdministrator = async (id: number) => {
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
                    console.log('ELIMINANDO ADMINISTRADOR')
                    const { data } = await coffeApi.delete(`/administrator/${id}`);
                    console.log(data)
                    dispatch(setDeleteAdministrator({ id }));
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
        administrators,
        //* Métodos
        getAdministrators,
        postCreateAdministrator,
        putUpdateAdministrator,
        deleteAdministrator,
    }
}