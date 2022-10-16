import type { NextPage } from 'next';
import { Card, Text, Row, Col, Button } from '@nextui-org/react';

interface Props {
  title: string;
  label: string;
  imageUrl: string;
  price: number;
  rating: number;
}

const GumCard: NextPage<Props> = (props) => {
  const { title, label, imageUrl, price, rating } = props;

  return (
    <Card
      css={{
        height: '200px',
        width: '100%',
      }}
    >
      <Card.Header css={{ position: 'absolute', top: 5 }}>
        <Row>
          <Text size={32} weight='bold' color='white' transform='uppercase'>
            {rating} ⭐
          </Text>
        </Row>
        <Col>
          <Text size={16} weight='bold' color='primary' transform='uppercase'>
            {label}
          </Text>
          <Text h4 color='white'>
            {title}
          </Text>
        </Col>
      </Card.Header>
      <Card.Image src={imageUrl} />
      <Card.Footer
        isBlurred
        css={{ position: 'absolute', bgBlur: '#0f111466', bottom: 0 }}
      >
        <Row>
          <Col>
            <Text h4 color='white' size={18}>
              {price} TOKEN
            </Text>
          </Col>
          {/* <Text size={16}>{rating}⭐</Text> */}
          <Col>
            <Row justify='flex-end'>
              <Button auto flat rounded color='gradient'>
                <Text
                  css={{ color: 'inherit' }}
                  size={12}
                  weight='bold'
                  transform='uppercase'
                >
                  Add to cart
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default GumCard;
