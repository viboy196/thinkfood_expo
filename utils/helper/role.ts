import { useAppSelector } from "../../redux/store/hooks";

export enum codeRole {
    admin = "admin",
    culinaryAdmin = "culinaryAdmin",
    businessAdmin = "businessAdmin",
    staff = "staff"
  }

export  const useAuth = (input?: ProtectedRouteType) => {
    //get item from localstorage
  
    const auth = useAppSelector((s) => s.auth);
  
    const checkAuth = auth.token !== undefined;
    if (input === undefined) {
      return {
        auth: checkAuth,
        CheckRole: true,
      };
    }
    const CheckRole = auth.appRole
      ? auth.appRole?.findIndex((it) => it.code === codeRole.admin) >= 0 ||
        auth.appRole?.findIndex((it) => it.code === input.roleRequired) >= 0
      : false;
  
    return {
      auth: checkAuth,
      CheckRole: CheckRole,
    };
  };
  
  //protected Route state
export type ProtectedRouteType = {
    roleRequired?: codeRole;
  };