import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import PropTypes from 'prop-types';
import './style.sass';

const CardComponent = ({ title, description }) => {
  return (
    <Card>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default CardComponent;