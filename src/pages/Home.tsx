import logo from '../assets/logo-white.png';

function Home() {
    return (
        <div className='=h-full p-3 home-bg flex flex-col items-center justify-center'>
            <img className='size-32' src={logo} />
            <h1 className='text-white text-6xl text-center'>Welcome to Lingo</h1>
        </div>
    );
}

export default Home;
