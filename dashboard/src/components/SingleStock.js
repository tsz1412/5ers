import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Typography, Spin } from 'antd';

const { Title, Text } = Typography;

const SingleStock = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_STOCK_API_BASE_URL}quote/${symbol}?apikey=${process.env.REACT_APP_STOCK_API_TOKEN}`);
        setStockData(response.data[0]); // Access the first element in the response array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (loading) {
    return <Spin size="large" />;
  }

  if (!stockData) {
    return <Text>No stock data available.</Text>;
  }

  const {
    name,
    price,
    changesPercentage,
    change,
    dayLow,
    dayHigh,
    marketCap,
    exchange,
    volume,
  } = stockData;

  return (
    <Card style={{ width: 300, margin: 'auto', marginTop: '20px' }}>
      <Title level={3}>{name} ({symbol})</Title>
      <Text>Current Price: ${price.toFixed(2)}</Text><br />
      <Text style={{ color: changesPercentage < 0 ? 'red' : 'green' }}>
        Change: ${change.toFixed(2)} ({changesPercentage.toFixed(2)}%)
      </Text><br />
      <Text>Day Low: ${dayLow.toFixed(2)}</Text><br />
      <Text>Day High: ${dayHigh.toFixed(2)}</Text><br />
      <Text>Market Cap: ${marketCap.toLocaleString()}</Text><br />
      <Text>Volume: {volume.toLocaleString()}</Text><br />
      <Text>Exchange: {exchange}</Text><br />
      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={() => navigate(-1)}>Go Back</Button>
        {/* Navigation to another stock (Example: Go to AAPL stock) */}
      </div>
    </Card>
  );
};

export default SingleStock;
