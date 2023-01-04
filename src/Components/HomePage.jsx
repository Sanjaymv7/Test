import React, { useState, useRef, useEffect } from "react";
import { Data } from "../Data/Data";
import "../css/Homepage.css";
const HomePage = () => {
  const [counter, setCounter] = useState(0);
  let [cartData, setCardData] = useState([]);
  let [totalPrice, setPrice] = useState(0);
  let [totalWeight, setWeight] = useState(0);
  let [finalPackage, setfinalPackage] = useState([]);

  const handleCheck = (event, index, item) => {
    if (event.target.checked) {
      addToCart(index, item);
    } else {
      removeFromCart(index, item);
    }
  };

  const addToCart = (index, item) => {
    cartData.push(item);
    setCounter(counter + 1);
  };

  useEffect(() => {
    setCardData(cartData);
  }, [cartData]);

  const removeFromCart = (index, item) => {
    let Index = cartData.findIndex((Element) => {
      if (Element.Name == item.Name) {
        return true;
      }
    });
    cartData.splice(Index, 1);
    const newData = cartData.filter((data) => data.id !== cartData.id);
    setCardData(newData);
  };

  const handleSubmit = () => {
    let price = 0;
    let weight = 0;
    let packageData = cartData;
    let pushedData = [];
    let updatedData = [];
    let j = 0;
    let i = 0;
    pushedData[i] = new Array();
    updatedData[j] = new Array();
    packageData.forEach((a) => {
      price = price + parseInt(a.Price);
      weight = weight + parseInt(a.Weight);
      if (price <= 250) {
        pushedData[i].push(a);
      } else {
        price = parseInt(a.Price);
        i = i + 1;
        pushedData[i] = new Array();
        pushedData[i].push(a);
      }
    });
    setfinalPackage(pushedData);
  };

  const handleReset = () => {
    setCardData([]);
    var input = document.querySelectorAll(".checkbox");
    for (let i = 0; i < input.length; i++) {
      input[i].checked = false;
    }
  };

  console.log(finalPackage);
  return (
    <div className="row">
      <div className="column">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price($)</th>
              <th>Weight(g)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => {
              return (
                <tr key={item.Name}>
                  <td>{item.Name}</td>
                  <td>{item.Price}</td>
                  <td>{item.Weight}</td>
                  <td>
                    <input
                      className="checkbox"
                      type="checkbox"
                      onChange={(e) => handleCheck(e, index, item)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="column">
        <table>
          <thead>
            CART
            <tr>
              <th>Name</th>
              <th>Price($)</th>
              <th>Weight(g)</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((item, index) => {
              return (
                <tr key={item.Name}>
                  <td>{item.Name}</td>
                  <td>{item.Price}</td>
                  <td>{item.Weight}</td>
                </tr>
              );
            })}
            <button
              onClick={() => {
                handleReset();
              }}
            >
              Reset
            </button>
          </tbody>
        </table>
        <div>
          {cartData.map((item, index) => {
            totalPrice = totalPrice + parseInt(item.Price);
            totalWeight = totalWeight + parseInt(item.Weight);
          })}
          <li>Total Price = {totalPrice}</li>
          <li>Total Weight = {totalWeight}</li>
          <button onClick={() => handleSubmit()}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
