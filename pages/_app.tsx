import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-full h-max bg-slate-50">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
