import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await fetch('http://localhost:3000/api/echo');
      const newData = await res.json();

      // Actualizar solo si los datos son diferentes de los últimos datos agregados
      if (apiData.length === 0 || JSON.stringify(apiData[apiData.length - 1]) !== JSON.stringify(newData)) {
        setApiData(currentData => [...currentData, newData]);
      }

    }, 1000); // Ajusta el intervalo según sea necesario

    return () => clearInterval(intervalId); // Limpiar en el desmontaje
  }, [apiData]);

  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">{globalData.blogTitle}</h1>
        <p className="text-1xl lg:text-1xl text-center mb-12">{globalData.blogDescription}</p>
        <div>
          <h2>Datos de la API:</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Acceso</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((data, index) => (
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.acceso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground variant="large" className="fixed top-20 opacity-40 dark:opacity-60" />
      <GradientBackground variant="small" className="absolute bottom-0 opacity-20 dark:opacity-10" />
    </Layout>
  );
}

export async function getServerSideProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
