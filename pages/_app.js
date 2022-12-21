import '../styles/normal.css'
import '../styles/globals.css'

import MainLayout  from '../src/components/layout/mainLayout';
// this file is the application shell, it is the root app the component recieved through props is the page itself whatever we code here will be present in all the pages present in project.
export default function App({ Component, pageProps }) {
  return (
    <>     
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
    </>
  );
}
