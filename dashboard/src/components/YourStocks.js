import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../stores/authStore';
import { useStocksStore } from '../stores/stocksStore';
import { Input, List, Button, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { confirm } = Modal;

const YourStocks = observer(() => {
  const authStore = useAuthStore();
  const stocksStore = useStocksStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null); // State to manage selected stock for modal

  useEffect(() => {
    stocksStore.fetchUserStocks(); // Fetch user stocks on mount
  }, [stocksStore]);

  useEffect(() => {
    if (!authStore.user) {
      authStore.fetchUserDetails(); // Fetch user details if not already present
    }
  }, [authStore]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_STOCK_API_BASE_URL}search?query=${searchQuery}&apikey=${process.env.REACT_APP_STOCK_API_TOKEN}`
      );

      // Filter out stocks that are already in the user's portfolio
      const filteredResults = response.data.filter(
        (result) => !stocksStore.userStocks.includes(result.symbol)
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleAddStock = async (symbol) => {
    try {
      await stocksStore.addStock(symbol);
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  const showDeleteConfirm = (symbol) => {
    confirm({
      title: 'Are you sure you want to remove this stock?',
      icon: <ExclamationCircleOutlined />,
      content: 'Once removed, this action cannot be undone.',
      okText: 'Yes, Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        handleRemoveStock(symbol);
      },
    });
  };

  const handleRemoveStock = async (symbol) => {
    try {
      await stocksStore.removeStock(symbol);
    } catch (error) {
      console.error('Error removing stock:', error);
    }
  };

  const handleSearchItemClick = async (symbol) => {
    await fetchStockDetails(symbol); // Fetch and show stock details in the modal
  };

  const fetchStockDetails = async (symbol) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_STOCK_API_BASE_URL}quote/${symbol}?apikey=${process.env.REACT_APP_STOCK_API_TOKEN}`
      );
      setSelectedStock(response.data[0]); // Assuming response.data is an array
      showModal(); // Show the modal with stock details
    } catch (error) {
      console.error('Error fetching stock details:', error);
    }
  };

  const showModal = () => {
    Modal.info({
      title: selectedStock ? `${selectedStock.name} (${selectedStock.symbol})` : 'Loading...',
      content: (
        <div>
          {selectedStock ? (
            <div>
              <p><strong>Price:</strong> ${selectedStock.price}</p>
              <p><strong>Change:</strong> {selectedStock.change} ({selectedStock.changesPercentage}%)</p>
              <p><strong>Day Low:</strong> ${selectedStock.dayLow}</p>
              <p><strong>Day High:</strong> ${selectedStock.dayHigh}</p>
              <p><strong>Market Cap:</strong> ${selectedStock.marketCap}</p>
              <p><strong>Volume:</strong> {selectedStock.volume}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ),
      onOk() {},
    });
  };

  const handleStockClick = (symbol) => {
    navigate(`/dashboard/stock/${symbol}`); // Navigate to single stock page
  };

  // Display a loading state until the user details are fetched
  if (!authStore.user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hey {authStore.user.username}, welcome to your stock portfolio.</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Search box */}
        <div style={{ width: '45%' }}>
          <Input.Search
            placeholder="Search for stock by symbol or name"
            enterButton="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
          />
          <List
            itemLayout="horizontal"
            dataSource={searchResults}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleSearchItemClick(item.symbol)} // Trigger popup on click
                actions={[
                  <Button
                    icon={<PlusOutlined />}
                    onClick={(event) => {
                      event.stopPropagation(); // Prevents triggering the item click
                      handleAddStock(item.symbol);
                    }}
                  >
                    Add
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={`${item.symbol} - ${item.name}`}
                  description={`${item.stockExchange} (${item.exchangeShortName})`}
                />
              </List.Item>
            )}
          />
        </div>

        {/* My Stocks */}
        <div style={{ width: '45%' }}>
          <h2>My Stocks</h2>
          <List
            itemLayout="horizontal"
            dataSource={stocksStore.userStocks.slice()}
            renderItem={(stock) => (
              <List.Item
                onClick={() => handleStockClick(stock)} // Redirects to SingleStock page
                actions={[
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    onClick={(event) => {
                      event.stopPropagation(); // Prevents triggering the item click
                      showDeleteConfirm(stock); // Shows confirmation modal before deletion
                    }}
                  >
                    Remove
                  </Button>
                ]}
              >
                <List.Item.Meta title={stock} />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
});

export default YourStocks;
