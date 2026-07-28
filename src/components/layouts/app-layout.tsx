import { Link, NavLink, Outlet } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme';
import styles from './app-layout.module.scss';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

export const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <header className={styles.header}>
        <div className={styles.header__inner}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brand__title}>что посмотреть</span>
            <span className={styles.brand__tagline}>кино не для всех</span>
          </Link>

          <nav className={styles.nav}>
            <NavLink to="/movies" className={navLinkClass}>
              Каталог
            </NavLink>
            <NavLink to="/healing" className={navLinkClass}>
              Лечебник
            </NavLink>
          </nav>

          <ThemeToggle />
        </div>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
