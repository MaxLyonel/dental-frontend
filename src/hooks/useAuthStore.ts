import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { coffeApi } from "@/services";
import { onLogin, onLogout, setRoleUser } from "@/store";

export const useAuthStore = () => {
  const { status, user, roleUser } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/auth', body);
      console.log(data)
      localStorage.setItem('token', data.token);
      // localStorage.setItem('refresh', data.refresh);
      const user = `${data.administrator.user.name} ${data.administrator.user.lastName}`;
      localStorage.setItem('user', user);
      dispatch(onLogin(user));
      localStorage.setItem('role', JSON.stringify(data.administrator.role));
      dispatch(setRoleUser({ role: data.administrator.role }))
    } catch (error: any) {
      dispatch(onLogout());
      console.log(error.response.data)
      Swal.fire('Oops ocurrio algo', JSON.stringify(error.response.data.detail), 'error');
    }
  }

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = localStorage.getItem('user')
      dispatch(onLogin(user));
      const role = JSON.parse(localStorage.getItem('role')!)
      dispatch(setRoleUser({ role: role }));
    } else {
      localStorage.clear();
      dispatch(onLogout());
    }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  }



  return {
    //* Propiedades
    status,
    user,
    roleUser,
    //* Métodos
    startLogin,
    checkAuthToken,
    startLogout,
  }

}
