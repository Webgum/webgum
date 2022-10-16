import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Container, Navbar, Button, Text, Grid, Col } from '@nextui-org/react';
import GumCard from '../components/gumCard';

const Home: NextPage = () => {
  return (
    <Container>
      {/*Navbar */}
      <Navbar isCompact variant={'static'}>
        <Navbar.Brand>
          <Text b color='inherit'>
            webgum
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <Navbar.Link href='#'>Link</Navbar.Link>
          <Navbar.Link href='#'>Link</Navbar.Link>
          <Navbar.Link href='#'>Link</Navbar.Link>
          <Navbar.Link href='#'>Link</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link href='#'>View Products</Navbar.Link>
          <Navbar.Item>
            <Button auto flat href='#'>
              Start Selling
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      {/* Jumbotron */}
      <Grid.Container
        justify='center'
        css={{
          height: '500px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1513786704796-b35842f0dca6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGF1cm9yYSUyMGJvcmVhbGlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60)',
        }}
      >
        <Grid xs={12} sm={6} alignItems='center' css={{ width: '100%' }}>
          <Col css={{ width: '100%' }}>
            <Text
              weight={'bold'}
              size={70}
              css={{ textAlign: 'center', color: 'white' }}
            >
              Sell your products online
            </Text>
            <Button
              size='md'
              shadow
              color='gradient'
              css={{ width: '100%', marginTop: '20px' }}
            >
              Start Selling
            </Button>
          </Col>
        </Grid>
      </Grid.Container>

      {/* 3 displaying product cards */}
      <Grid.Container gap={2}>
        <Grid xs={12} sm={4}>
          <GumCard
            label='New Product'
            title='Management: For Cats'
            imageUrl='https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=700&q=60'
            price={1}
            rating={4.9}
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <GumCard
            label='New Product'
            title='Crypto for Cats'
            imageUrl='https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1229&q=80'
            price={1}
            rating={3}
          />
        </Grid>
        <Grid xs={12} sm={4}>
          <GumCard
            label='New Product'
            title='Mathmatics for Cats'
            imageUrl='https://images.unsplash.com/photo-1491485880348-85d48a9e5312?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            price={1}
            rating={5}
          />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Home;
