import React, { useState, useEffect, useContext } from 'react';
import "./styles.css";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AppContext } from '../AppContext';
import 'react-circular-progressbar/dist/styles.css';

export const MainPage = () => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [countDownTimer, setCountDownTimer] = useState(60);
  const { asset } = useContext(AppContext);
  const [tickerData, setTickerData] = useState([]);
  const [tickerData2, setTickerData2] = useState([]);
  const [tickerData3, setTickerData3] = useState([]);
  const [tickerData4, setTickerData4] = useState([]);
  const [tickerData5, setTickerData5] = useState([]);
  const [averagePrice, setAveragePrice] = useState(0);
  const [maxDifference, setMaxDifference] = useState(0);

  useEffect(() => {
    if (countDownTimer === 0) {
        window.location.reload();
      }
    if (countDownTimer === 0) setCountDownTimer(60);
    countDownTimer > 0 && setTimeout(() => setCountDownTimer(countDownTimer - 1), 1000);
  }, [countDownTimer]);
  useEffect(() => {
    if (tickerData.length > 0) {
      const sum = tickerData.reduce((total, item) => total + item.last, 0);
      const average = sum / tickerData.length;
      setAveragePrice(average.toFixed(0));
    }
  }, [tickerData]);
  useEffect(() => {
    if (tickerData.length > 0) {
      const maxDiff = Math.max(...tickerData.map(item => item.difference));
      setMaxDifference(maxDiff.toFixed(2));
    }
  }, [tickerData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://quadbbackend.onrender.com/tickersdetails');
        const data = await response.json();
        const filteredData = data.filter(item => item.base_unit.toUpperCase() === asset.toUpperCase());
        setTickerData(filteredData);
      } catch (error) {
        console.log('Error fetching ticker data:', error);
      }
    };

    fetchData();
  }, [asset]);

  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const response = await fetch('https://quadbbackend.onrender.com/tickersdetails');
        const data = await response.json();
        const filteredData = data.filter(item => item.base_unit.toUpperCase() === asset.toUpperCase());
        setTickerData2(filteredData);
      } catch (error) {
        console.log('Error fetching ticker data 2:', error);
      }
    };

    fetchData2();
  }, [asset]);
  useEffect(() => {
    const fetchData3 = async () => {
      try {
        const response = await fetch('https://quadbbackend.onrender.com/tickersdetails');
        const data = await response.json();
        const filteredData = data.filter(item => item.base_unit.toUpperCase() === asset.toUpperCase());
        setTickerData3(filteredData);
      } catch (error) {
        console.log('Error fetching ticker data 3:', error);
      }
    };

    fetchData3();
  }, [asset]);
  useEffect(() => {
    const fetchData4 = async () => {
      try {
        const response = await fetch('https://quadbbackend.onrender.com/zebapitickersdetails');
        const data = await response.json();
        const filteredData = data.filter(item => item.virtualCurrency.toUpperCase() === asset.toUpperCase());
        setTickerData4(filteredData);
      } catch (error) {
        console.log('Error fetching ticker data 4:', error);
      }
    };

    fetchData4();
  }, [asset]);
  useEffect(() => {
    const fetchData5 = async () => {
      try {
        const response = await fetch('https://quadbbackend.onrender.com/zebapitickersdetails');
        const data = await response.json();
        const filteredData = data.filter(item => item.virtualCurrency.toUpperCase() === asset.toUpperCase());
        setTickerData5(filteredData);
      } catch (error) {
        console.log('Error fetching ticker data 5:', error);
      }
    };

    fetchData5();
  }, [asset]);

  const onThemeButtonClick = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <React.Fragment>
      <div className={("theme-") + (isLightTheme ? "light" : "dark")}>
        <Header isLightTheme={isLightTheme} onThemeButtonClick={onThemeButtonClick} countDownTimer={countDownTimer} />
        <div className="Container-fluid" style={{ padding: "0px 30px" }}>
          <div className="d-flex justify-content-around align-items-center average-header" style={{ padding: "10px 0px" }}>
            <div className="text-center">
              <div className="average-header-maintext color-green">{maxDifference} %</div>
              <div className="average-header-subHeading">5 Mins</div>
            </div>
            <div className="text-center">
              <div className="average-header-maintext color-green">{(maxDifference*2).toFixed(2)}%</div>
              <div className="average-header-subHeading">1 Hour</div>
            </div>
            <div style={{ maxWidth: "40%" }}>
              <div className="text-center font-32 average-block">
                <div className="average-subText">
                  <span className="subText-heading">Best Price to Trade</span>
                </div>
                <div className="average-heading" style={{ paddingBottom: "10px" }}>₹ {averagePrice}</div>
                <div className="average-subText">Average {asset}/INR net price including commission</div>
              </div>
            </div>
            <div className="text-center">
              <div className="average-header-maintext color-green">{(maxDifference*5).toFixed(2)} %</div>
              <div className="average-header-subHeading">1 Day</div>
            </div>
            <div className="text-center">
              <div className="average-header-maintext color-green">{(maxDifference*7).toFixed(2)} %</div>
              <div className="average-header-subHeading">7 Days</div>
            </div>
          </div>
        </div>
        <div className="fiat-crypto-table table-responsive" style={{ margin: "30px" }}>
          <table className="table table-striped table-hover table-borderless">
            <thead className="thead-dark">
              <tr>
                <th><h4><span class="pointer">#</span></h4></th>
                <th><h4><span class="pointer">Platform</span></h4></th>
                <th><h4><span className="pointer">Last Traded Price</span></h4></th>
                <th><h4><span className="pointer">Buy/Sell Price</span></h4></th>
                <th><h4><span className="pointer">Difference</span></h4></th>
                <th><h4><span className="pointer">Savings</span></h4></th>
              </tr>
            </thead>
            <tbody>
              {tickerData.map((item, index) => (
                <tr key={index}>
                  <td class="align-middle"><h4 class="table-text">1</h4></td>
                  <td class="align-middle">
                    <a target="_blank" href="">
                      <h4 class="table-text">
                        <img src="wazix.png" class="exchange-logo" ></img>
                        <span class="exchange-name ">WazirX</span>
                      </h4>
                    </a>
                  </td>
                  <td>{item.last.toFixed(0)}</td>
                  <td>{item.buy.toFixed(0)}/{item.sell.toFixed(0)}</td>
                  <td className={item.difference < 0 ? 'text-danger' : ''}>{item.difference.toFixed(2)} %</td>
                  <td>{item.saving}</td>
                </tr>
              ))}
              {tickerData2.map((item, index) => (
                <tr key={index}>
                  <td class="align-middle"><h4 class="table-text">2</h4></td>
                  <td class="align-middle">
                    <a target="_blank" href="https://bit.ly/2BJxccc">
                      <h4 class="table-text">
                        <img src="bitbns.png" class="exchange-logo" />
                        <span class="exchange-name ">Bitbns</span>
                      </h4>
                    </a>
                  </td>
                  <td>{item.last.toFixed(0)}</td>
                  <td>{item.buy.toFixed(0)}/{item.sell.toFixed(0)}</td>
                  <td className={item.difference < 0 ? 'text-danger' : ''}>{item.difference.toFixed(2)} %</td>
                  <td>{item.saving}</td>
                </tr>
              ))}
              {tickerData3.map((item, index) => (
                <tr key={index}>
                  <td class="align-middle"><h4 class="table-text">3</h4></td>
                            <td class="align-middle"><a target="_blank" href=" "><h4 class="table-text">
                                <img src="Colodax.png" class="exchange-logo" /><span class="exchange-name ">Colodax</span></h4></a></td>
                           
                                <td>{item.last.toFixed(0)}</td>
                  <td>{item.buy.toFixed(0)}/{item.sell.toFixed(0)}</td>
                  <td className={item.difference < 0 ? 'text-danger' : ''}>{item.difference.toFixed(2)} %</td>
                  <td>{item.saving}</td>
                </tr>
              ))}
              {tickerData4.map((item, index) => (
                <tr key={index}>
                  <td class="align-middle"><h4 class="table-text">4</h4></td>
                            <td class="align-middle"><a target="_blank" href=" "><h4 class="table-text">
                                <img src="Zebpay.png" class="exchange-logo" /><span class="exchange-name ">Zebpay</span></h4></a></td>
                    
                                <td>{item.buy.toFixed(0)}</td>
                  <td>{item.sell.toFixed(0)}/{item.buy.toFixed(0)}</td>
                  <td className={item.difference < 0 ? 'text-danger' : ''}>{item.difference.toFixed(2)} %</td>
                  <td>{item.saving.toFixed(0)}</td>
                </tr>
              ))}
              {tickerData5.map((item, index) => (
                <tr key={index}>
                    <td class="align-middle"><h4 class="table-text">5</h4></td>
                            <td class="align-middle"><a target="_blank" href=""><h4 class="table-text">
                                <img src="coinDCX.png" class="exchange-logo" /><span class="exchange-name">CoinDCX</span></h4></a></td>
            
                  
                                <td>{item.sell.toFixed(0)}</td>
                  <td>{item.buy.toFixed(0)}/{item.sell.toFixed(0)}</td>
                  <td className={item.difference < 0 ? 'text-danger' : ''}>{item.difference.toFixed(2)} %</td>
                  <td>{item.saving.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Footer />
        <div className="d-flex justify-content-center" style={{ border: "solid 1px #191d28", backgroundColor: "#191d28", position: "fixed", left: "0", alignItems: "center", width: "100vw", height: "47px", bottom: "0", zIndex: "8" }}>
          <button className="add-button btn btn-outline-info" style={{ display: "block" }}>Add hodlinfo to home screen</button>
        </div>
      </div>
    </React.Fragment>
  );
};






