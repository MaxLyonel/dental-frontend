import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setTheths } from '@/store';

export const useThethStore = () => {
  const { theths } = useSelector((state: any) => state.theths);
  const dispatch = useDispatch();

  const getTheths = async () => {
    console.log('OBTENIENDO DIENTES')
    const { data } = await coffeApi.get('/theth');
    console.log(data)
    dispatch(setTheths({ theths: data.theths }));
  }

  return {
    //* Propiedades
    theths,
    //* Métodos
    getTheths,
  }
}