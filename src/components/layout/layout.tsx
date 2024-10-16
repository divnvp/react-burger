import AppHeader from '../app-header/app-header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
