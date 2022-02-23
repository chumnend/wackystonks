import { useContext } from 'react';

import { ToastContext } from '../../components/providers/ToastProvider';

const useToast = () => useContext(ToastContext);

export default useToast;
