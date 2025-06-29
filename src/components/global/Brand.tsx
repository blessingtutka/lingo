import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
export function Brand() {
    return (
        <Link to='/' className=' flex items-center gap-1.5'>
            <img src={logo} className='!size-8' />
            <span className='text-base font-semibold'>Lingo</span>
        </Link>
    );
}
