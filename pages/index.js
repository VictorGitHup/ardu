import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData, apiData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">{globalData.blogTitle}</h1>
        {/* Aquí puedes renderizar el contenido de los posts si lo necesitas */}
        {/* Añade los datos de la API aquí */}
        <div>
          <h2>Datos de la API:</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  // Obtén los posts y los datos globales como antes
  const posts = getPosts();
  const globalData = getGlobalData();

  // Realiza una solicitud a tu API
  const res = await fetch('https://idyllic-sable-39bc3a.netlify.app/api/echo');
  const apiData = await res.json();

  // Combina los datos de la API con los posts y datos globales
  return { props: { posts, globalData, apiData } };
}
