import Link from 'next/link';
import Image from 'next/image';
export const HeaderPage = () => (
    <header>
      <div><div className='topNav'>
        <Image src = {'/images/logo_black.png'} width = {50} height = {50} alt = {'logo'} />
        <nav>
          <ul><li><Link href='/' passHref>Home</Link></li>
          <li><Link href='/events' passHref>Events</Link></li>
          <li><Link href='/about_us' passHref>About Us</Link></li></ul>
        </nav>
      </div></div>
      <p>Lorem ipsum dolor sit amet</p>
    </header>
)