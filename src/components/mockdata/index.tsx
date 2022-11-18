// import styles from './mockdata.module.scss';

import { Card, Grid, Text, Row } from '@nextui-org/react';
import { useState } from 'react';

const MockData = () => {
  const listingData = [
    {
      id: 1,
      title: 'First course title',
      description:
        'First course description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
      image:
        'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80',
      price: '$10',
    },
    {
      id: 2,
      title: 'Second course title',
      description: 'Second course description',
      image:
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      price: '$20',
    },
    {
      id: 3,
      title: 'Third course title',
      description: 'Third course description',
      image:
        'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      price: '$30',
    },
    {
      id: 4,
      title: 'Fourth course title',
      description: 'Fourth course description',
      image:
        'https://images.unsplash.com/photo-1639737496523-ea268d39924d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      price: '$40',
    },
    {
      id: 5,
      title: 'Fifth course title',
      description: 'Fifth course description',
      image:
        'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      price: '$50',
    },
    {
      id: 6,
      title: 'Sixth course title',
      description: 'Sixth course description',
      image:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      price: '$60',
    },
    {
      id: 7,
      title: 'Seventh course title',
      description: 'Seventh course description',
      image:
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      price: '$70',
    },
    {
      id: 8,
      title: 'Eighth course title',
      description: 'Eighth course description',
      image:
        'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      price: '$80',
    },
    {
      id: 9,
      title: 'Ninth course title',
      description: 'Ninth course description',
      image:
        'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      price: '$90',
    },
  ];

  const [gotoMain, setGotoMain] = useState(false);

  return (
    <div>
      <Grid.Container
        gap={2}
        justify='flex-start'
        css={{
          marginTop: '2rem',
        }}
      >
        {listingData.map((listing) => (
          <Grid xs={6} sm={3} key={listing.id}>
            <Card isPressable isHoverable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={listing.image}
                  objectFit='cover'
                  width='100%'
                  height={200}
                  alt={listing.title}
                />
              </Card.Body>
              <Card.Footer
                css={{ justifyItems: 'flex-start', backgroundColor: '#945bdd' }}
              >
                <Row wrap='wrap' justify='space-between' align='center'>
                  <Text
                    b
                    css={{
                      color: 'white',
                    }}
                  >
                    {listing.title}
                  </Text>
                  <Text
                    css={{
                      fontWeight: 300,
                      fontSize: '0.875rem',
                      color: 'white',
                    }}
                  >
                    {listing.price}
                  </Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
};

export default MockData;
