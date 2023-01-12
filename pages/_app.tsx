import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-full h-[1500px] bg-slate-50">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
