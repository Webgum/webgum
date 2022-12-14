import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '../../assets/herosection.png';
import styles from './herosection.module.scss';

const HeroSection = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section1}>
        <h1 className={styles.title}>
          <span className={styles.title2}>Earn with ease</span>
          <br />
          no bullshit fees.
        </h1>
        <p className={styles.subtitle}>
          Webgum makes listing your products quick and easy, all with minimal
          fees when compared to other leading platforms. Get paid instantly with
          every sale!
        </p>
        <div className={styles.sellBtn}>
          <Link href="/user">Start Selling</Link>
        </div>
      </section>
      <section className={styles.section2}>
        <Image
          src={HeroImage}
          objectFit='cover'
          layout='fill'
          className={styles.heroimg}
          alt='hero image'
        />
      </section>
    </div>
  );
};

export default HeroSection;
