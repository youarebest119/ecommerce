import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { TNoGaurd } from '../interfaces/types';
import { ROUTES } from '../utils/constants';

const NoGaurd = (props: TNoGaurd) => {
    const { token } = useAppSelector(state => state.user);
    if (token) {
        return <Navigate to={ROUTES.HOMEPAGE} />
    }
    return props.children
}

export default NoGaurd
