import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setStageTypes } from '@/store';

export const useStageTypeStore = () => {
  const { stageTypes } = useSelector((state: any) => state.stageTypes);
  const dispatch = useDispatch();

  const getStageTypes = async () => {
    console.log('OBTENIENDO TIPOS DE ETAPAS')
    const { data } = await coffeApi.get('/stagetype');
    console.log(data)
    dispatch(setStageTypes({ stageTypes: data.stageTypes }));
  }

  return {
    //* Propiedades
    stageTypes,
    //* Métodos
    getStageTypes,
  }
}