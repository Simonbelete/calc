import React from 'react';
import Navbar from 'components/Navbar';
import HomeBody from 'components/HomeBody';
import AuthorizeSSR from 'hoc/AuthorizeSSR';


const Index = () => {
  return (
    <>
      <Navbar />
      <HomeBody />
    </>
  )
}

export default Index;
export const getServerSideProps = AuthorizeSSR(() => {
  return { props: {} };
}, false);