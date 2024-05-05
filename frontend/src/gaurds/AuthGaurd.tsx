import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { TAuthGaurd } from '../interfaces/types';
import { ROUTES } from '../utils/constants';

const AuthGaurd = (props : TAuthGaurd) => {
    const { token } = useAppSelector(state => state.user);
    if (!token) {
        return <Navigate to={ROUTES.HOMEPAGE} />
    }
    return props.children
}

export default AuthGaurd
