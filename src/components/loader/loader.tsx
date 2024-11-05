import loaderStyles from './loader.module.css';

export function Loader() {
  return (
    <div className={loaderStyles.grid}>
      <div className={loaderStyles.loader}></div>
    </div>
  );
}
