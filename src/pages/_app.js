import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
		<Component {...pageProps} />
    </>
  )
}

export default MyApp
