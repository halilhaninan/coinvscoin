import React from "react";
import "./CoinDetail.css";

const CoinDetail = () => {
  return (
    <div className="detail col-sm-12 row  ">
      <div class="test">
        <div class="row">
          <div class="col-sm">One of three columns</div>
          <div class="col-sm">One of three columns</div>
          <div class="col-sm">One of three columns</div>
        </div>
      </div>
      <div className="acoin-detail col-sm-6  ">
        <div class="wrapper ">
          <div class="overviewInfo2 ">
            <div class="productinfo row">
              <div class="grouptext col-sm">
                <h4>COIN</h4>
                <p>Ethereum</p>
              </div>
              <div class="grouptext col-sm">
                <h4>PRICE</h4>
                <p>$50</p>
              </div>
              <div class="grouptext col-sm">
                <h4>MarketCap</h4>
                <p>$50</p>
              </div>
              <div className="row mt-5">
                <div class="grouptext col-sm">
                  <h4>Tax</h4>
                  <p>Buy: 1%</p>
                  <p>Sell: 1%</p>
                </div>
                <div class="grouptext col-sm">
                  <h4>Holder</h4>
                  <p>1231231</p>
                </div>
                <div class="grouptext col-sm">
                  <h4>Upvote</h4>
                  <p> send upvote </p>
                </div>
              </div>
              <div className="row mt-5">
                <div class="grouptext col-sm">
                  <h4>Gas Price</h4>
                  <p>Buy 123,523</p>
                  <p>Sell: 1%</p>
                </div>
                <div class="grouptext col-sm">
                  <h4>Holder</h4>
                  <p>1231231</p>
                </div>
                <div class="grouptext col-sm">
                  <h4>Honeypot Detector </h4>
                  <p>Coming Soon </p>
                </div>
              </div>
              <div class="grouptext row mt-5 ">
                <h4>CONTACT</h4>
                <p>Contract:</p>
                <p>PancakeSwap:</p>
                <p>Dextools:</p>
                <p>Website:</p>
                <p>Telegram:</p>
                <p>Twitter:</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bcoin-detail col-sm-6   ">
        <div class="wrapper ">
          <div class="overviewInfo2 ">
            <div class="productinfo">
              <div class="grouptext">
                <h4>COIN</h4>
                <p>Ethereum</p>
              </div>
              <div class="grouptext">
                <h4>PRICE</h4>
                <p>$50</p>
              </div>
              <div class="grouptext">
                <h4>MarketCap</h4>
                <p>$50</p>
              </div>
              <div class="grouptext">
                <h4>CONTACT</h4>
                <p>DexTools:</p>
                <p>Contract:</p>
                <p>Website:</p>
                <p>Telegram:</p>
                <p>Twitter:</p>
              </div>

              <div class="grouptext">
                <h4>Tax</h4>
                <p>Buy: 1%</p>
                <p>Sell: 1%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
