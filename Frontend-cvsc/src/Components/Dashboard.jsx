import React, { useState, useEffect, useCallback, CSSProperties } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import etherscan from "./images/etherscan.png";
import cake from "./images/cake.png";
import binance from "./images/binance.png";
import honeypot from "./images/honeypot.png";
import "./Dashboard.css";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ClipLoader from "react-spinners/ClipLoader";
import Navbarr from "./Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const kullanici = JSON.parse(localStorage.getItem("user"));

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  // const handleClick = () => {
  //   setOpen(true);
  // };
  // let [color, setColor] = useState("#ffffff");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [daily, setDaily] = useState(false);
  const [weekly, setWeekly] = useState(false);
  const [allTime, setAllTime] = useState(true);

  const [disabledD, setDisabledD] = useState(false);
  const [disabledW, setDisabledW] = useState(false);
  const [disabledA, setDisabledA] = useState(true);

  var hours = 1;
  var now = new Date().getTime();
  var setupTime = localStorage.getItem("setupTime");

  const newVoteS = (now - setupTime) / 1000 / 60;

  let newVoteM = newVoteS.toFixed(0);
  let newVote = 60 - newVoteM;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sentVote = useCallback((vote) => {
    console.log(vote);
    if (setupTime == null) {
      localStorage.setItem("setupTime", now);

      axios
        .post(`https://backend-cvsc.vercel.app/api/vote`, vote)
        .then((response) => {
          console.log(response);
          toast.success(`Your vote accepted !! ${vote.contractAddress}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (now - setupTime > hours * 60 * 60 * 1000) {
        localStorage.setItem("setupTime", now);
        axios
          .post(`https://backend-cvsc.vercel.app/api/vote`, vote)
          .then((response) => {
            console.log(response);
            toast.success(`Your vote accepted !! ${vote.contractAddress}`);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  });

  var dailyTimeObj = new Date().getTime() + 24 * 60 * 60 * 1000;
  var weeklyTimeObj = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

  var dailyTime = JSON.stringify(dailyTimeObj);
  var weeklyTime = JSON.stringify(weeklyTimeObj);

  console.log(dailyTime, "dailytime");

  useEffect(() => {
    axios
      .get("https://backend-cvsc.vercel.app/coin/")
      .then((response) => {
        setCoins(
          response.data.map((item) => {
            console.log(typeof "item.votes[0]", "item voteeeeeesssss");
            // console.log(response);
            return {
              contractAddress: item.contractAddress,
              logo: item.logo,
              name: item?.name,
              price: item?.price,
              marketCap: item?.marketcap,
              etherscan: item.etherscan,
              pancakeSwap: item.pancakeSwap,
              telegram: item.telegram,
              website: item.website,
              twitter: item.twitter,
              vote: item?.vote,
              votes: item?.votes,
            };
          })
        );
      })

      .catch((error) => {
        console.log("ERROR !!!", error);
      });
  }, [sentVote]);

  useEffect(() => {
    axios
      .get("hhttps://backend-cvsc.vercel.app/coin/")
      // .then((response) => console.log("axios then", response.data.coins))
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  // console.log(coins, "api response");

  // console.log(daily, weekly, allTime);

  return (
    <div className="container-fluid">
      <Navbarr />

      <div className="container mt-5 tablediv ">
        <button
          disabled={disabledD}
          onClick={() => {
            setDisabledD(true);
            setDisabledW(false);
            setDisabledA(false);
            setLoading(true);
            setDaily(true);
            setWeekly(false);
            setAllTime(false);
          }}
          className="dailyButton">
          Daily
        </button>
        <button
          disabled={disabledW}
          onClick={() => {
            setDisabledD(false);
            setDisabledW(true);
            setDisabledA(false);
            setLoading(true);
            setDaily(false);
            setWeekly(true);
            setAllTime(false);
          }}
          className="dailyButton">
          Weekly
        </button>
        <button
          disabled={disabledA}
          onClick={() => {
            setDisabledD(false);
            setDisabledW(false);
            setDisabledA(true);
            setLoading(true);
            setDaily(false);
            setWeekly(false);
            setAllTime(true);
          }}
          className="alltimeButton">
          All Time
        </button>

        {daily && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>Social Media</th>
                <th>Vote</th>
                {kullanici == null ? (
                  <th>Suffrage: ∞</th>
                ) : (
                  <th
                    style={
                      newVote > 0
                        ? { backgroundColor: "#EA4335" }
                        : { backgroundColor: "green" }
                    }>
                    Suffrage:{newVote} min
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {coins.map((item, key) => (
                <tr>
                  {item.votes[0] < dailyTime ? (
                    <>
                      <td className="positionFixed">
                        <img
                          alt="a"
                          className="mx-2"
                          width="24"
                          height="24"
                          src={item.logo != null ? item.logo : binance}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.marketCap}</td>
                      <td>
                        {/* etherscan */}
                        <a
                          target="_blank"
                          href={`https://bscscan.com/token/${item.contractAddress} `}
                          className="mx-2"
                          rel="noreferrer">
                          <img src={etherscan} alt="etherscan" />
                        </a>

                        {/* pancake */}
                        <a
                          target="_blank"
                          href={`https://pancakeswap.finance/swap?outputCurrency=${item.contractAddress} `}
                          className="mx-2"
                          rel="noreferrer">
                          <img src={cake} alt="cakeicon" />
                        </a>
                        {/* metamesk */}
                        <a
                          target="_blank"
                          className="mx-2"
                          href="https://www.coinvscoin.io/"
                          rel="noreferrer">
                          <img
                            alt="metameskicon"
                            src="https://img.icons8.com/color/20/000000/metamask-logo.png"
                          />
                        </a>
                        {/* poocoin */}
                        <a
                          target="_blank"
                          className="mx-2"
                          href={`https://poocoin.app/tokens/${item.contractAddress}`}
                          rel="noreferrer">
                          <img
                            width="20"
                            height="20"
                            alt="poocoinico"
                            src="https://poocoin.app/images/logo/poocoin512.png"
                          />
                        </a>
                        {/* honeypot */}
                        <a
                          target="_blank"
                          className="mx-2"
                          href={`https://honeypot.is/?address=${item.contractAddress}`}
                          rel="noreferrer">
                          <img
                            width="20"
                            height="20"
                            alt="poocoinico"
                            src={honeypot}
                          />
                        </a>
                        {/* telegram */}

                        {item.telegram != null && (
                          <a
                            target="_blank"
                            href={item.telegram}
                            alt="telegram"
                            className="mx-2"
                            rel="noreferrer">
                            <img
                              alt="telegramicon"
                              src="https://img.icons8.com/ios-filled/20/22C3E6/telegram-app.png"
                            />
                          </a>
                        )}

                        {/* website */}
                        {item.website != null && (
                          <a
                            target="_blank"
                            href={item.website}
                            className="mx-2"
                            rel="noreferrer">
                            <img
                              alt="websiteicon"
                              src="https://img.icons8.com/officel/20/000000/monitor.png"
                            />
                          </a>
                        )}

                        {/* twitter */}

                        <a
                          target="_blank"
                          href={item.website}
                          alt="twitter"
                          className=" mx-2"
                          rel="noreferrer">
                          <img
                            alt="twittericon"
                            src="https://img.icons8.com/color/24/000000/twitter--v1.png"
                          />
                        </a>
                      </td>
                      <td>
                        <h5>{item.vote}</h5>
                      </td>
                      <td>
                        {kullanici == null ? (
                          <>
                            <button
                              disabled={true}
                              value={{
                                contractAddress: item.contractAddress,
                                vote: item.vote,
                              }}
                              onClick={() => {
                                sentVote({
                                  contractAddress: "",
                                  vote: "",
                                });
                              }}
                              className="btn btn-success vote">
                              Vote
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              key="123"
                              disabled={
                                now - setupTime > hours * 60 * 60 * 1000
                                  ? false
                                  : true
                              }
                              value={{
                                contractAddress: item.contractAddress,
                                vote: item.vote,
                              }}
                              onClick={() => {
                                sentVote({
                                  contractAddress: item.contractAddress,
                                  vote: item.vote + 1,
                                });
                              }}
                              className="btn btn-success vote">
                              Vote
                            </button>
                          </>
                        )}
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {weekly && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>Social Media</th>
                <th>Vote</th>
                {kullanici == null ? (
                  <th>Suffrage: ∞</th>
                ) : (
                  <th
                    style={
                      newVote > 0
                        ? { backgroundColor: "#EA4335" }
                        : { backgroundColor: "green" }
                    }>
                    Suffrage:{newVote} min
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {coins.map((item, key) => (
                <tr>
                  {item.votes[0] < weeklyTime ? (
                    <>
                      <td className="positionFixed">
                        <img
                          alt="a"
                          className="mx-2"
                          width="24"
                          height="24"
                          src={item.logo != null ? item.logo : binance}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.marketCap}</td>
                      <td>
                        {/* etherscan */}
                        <a
                          target="_blank"
                          href={`https://bscscan.com/token/${item.contractAddress} `}
                          className="mx-2"
                          rel="noreferrer">
                          <img src={etherscan} alt="etherscan" />
                        </a>

                        {/* pancake */}
                        <a
                          target="_blank"
                          href={`https://pancakeswap.finance/swap?outputCurrency=${item.contractAddress} `}
                          className="mx-2"
                          rel="noreferrer">
                          <img src={cake} alt="cakeicon" />
                        </a>
                        {/* metamesk */}
                        <a
                          target="_blank"
                          className="mx-2"
                          href="https://www.coinvscoin.io/"
                          rel="noreferrer">
                          <img
                            alt="metameskicon"
                            src="https://img.icons8.com/color/20/000000/metamask-logo.png"
                          />
                        </a>

                        {/* poocoin */}
                        <a
                          target="_blank"
                          className="mx-2"
                          href={`https://poocoin.app/tokens/${item.contractAddress}`}
                          rel="noreferrer">
                          <img
                            width="20"
                            height="20"
                            alt="poocoinico"
                            src="https://poocoin.app/images/logo/poocoin512.png"
                          />
                        </a>

                        {/* honeypot */}
                        <a
                          target="_blank"
                          className="mx-2"
                          href={`https://honeypot.is/?address=${item.contractAddress}`}
                          rel="noreferrer">
                          <img
                            width="20"
                            height="20"
                            alt="poocoinico"
                            src={honeypot}
                          />
                        </a>

                        {/* telegram */}

                        {item.telegram != null && (
                          <a
                            target="_blank"
                            href={item.telegram}
                            alt="telegram"
                            className="mx-2"
                            rel="noreferrer">
                            <img
                              alt="telegramicon"
                              src="https://img.icons8.com/ios-filled/20/22C3E6/telegram-app.png"
                            />
                          </a>
                        )}

                        {/* website */}
                        {item.website != null && (
                          <a
                            target="_blank"
                            href={item.website}
                            className="mx-2"
                            rel="noreferrer">
                            <img
                              alt="websiteicon"
                              src="https://img.icons8.com/officel/20/000000/monitor.png"
                            />
                          </a>
                        )}

                        {/* twitter */}

                        <a
                          target="_blank"
                          href={item.website}
                          alt="twitter"
                          className=" mx-2"
                          rel="noreferrer">
                          <img
                            alt="twittericon"
                            src="https://img.icons8.com/color/24/000000/twitter--v1.png"
                          />
                        </a>
                      </td>
                      <td>
                        <h5>{item.vote}</h5>
                      </td>
                      <td>
                        {kullanici == null ? (
                          <>
                            <button
                              disabled={true}
                              value={{
                                contractAddress: item.contractAddress,
                                vote: item.vote,
                              }}
                              onClick={() => {
                                sentVote({
                                  contractAddress: "",
                                  vote: "",
                                });
                              }}
                              className="btn btn-success vote">
                              Vote
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              key="123"
                              disabled={
                                now - setupTime > hours * 60 * 60 * 1000
                                  ? false
                                  : true
                              }
                              value={{
                                contractAddress: item.contractAddress,
                                vote: item.vote,
                              }}
                              onClick={() => {
                                sentVote({
                                  contractAddress: item.contractAddress,
                                  vote: item.vote + 1,
                                });
                              }}
                              className="btn btn-success vote">
                              Vote
                            </button>
                          </>
                        )}
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {allTime && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>Social Media</th>
                <th>Vote</th>
                {kullanici == null ? (
                  <th>Suffrage: ∞</th>
                ) : (
                  <th
                    style={
                      newVote > 0
                        ? { backgroundColor: "#EA4335" }
                        : { backgroundColor: "green" }
                    }>
                    Suffrage:{newVote} min
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>Bitcoin test</td>
                <td>asd</td>
                <td>asd</td>
                <td>asd</td>
                <td>test</td>
                <td>sponsored</td>
              </tr>
              <tr>
                <td>Ethereum</td>
                <td>asd</td>
                <td>asd</td>
                <td>asd</td>
                <td>test</td>
                <td>sponsored</td>
              </tr>
              <tr>
                <td>Binance Coin</td>
                <td>asd</td>
                <td>asd</td>
                <td>asd</td>
                <td>test</td>
                <td>sponsored</td>
              </tr> */}
              {coins.map((item, key) => (
                <tr>
                  <td className="positionFixed">
                    <img
                      alt="a"
                      className="mx-2"
                      width="24"
                      height="24"
                      src={item.logo != null ? item.logo : binance}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.marketCap}</td>
                  <td>
                    {/* etherscan */}
                    <a
                      target="_blank"
                      href={`https://bscscan.com/token/${item.contractAddress} `}
                      className="mx-2"
                      rel="noreferrer">
                      <img src={etherscan} alt="etherscan" />
                    </a>

                    {/* pancake */}
                    <a
                      target="_blank"
                      href={`https://pancakeswap.finance/swap?outputCurrency=${item.contractAddress} `}
                      className="mx-2"
                      rel="noreferrer">
                      <img src={cake} alt="cakeicon" />
                    </a>
                    {/* metamesk */}
                    <a
                      target="_blank"
                      className="mx-2"
                      href="https://www.coinvscoin.io/"
                      rel="noreferrer">
                      <img
                        alt="metameskicon"
                        src="https://img.icons8.com/color/20/000000/metamask-logo.png"
                      />
                    </a>

                    {/* poocoin */}
                    <a
                      target="_blank"
                      className="mx-2"
                      href={`https://poocoin.app/tokens/${item.contractAddress}`}
                      rel="noreferrer">
                      <img
                        width="20"
                        height="20"
                        alt="poocoinico"
                        src="https://poocoin.app/images/logo/poocoin512.png"
                      />
                    </a>

                    {/* honeypot */}
                    <a
                      target="_blank"
                      className="mx-2"
                      href={`https://honeypot.is/?address=${item.contractAddress}`}
                      rel="noreferrer">
                      <img
                        width="20"
                        height="20"
                        alt="poocoinico"
                        src={honeypot}
                      />
                    </a>

                    {/* telegram */}

                    {item.telegram != null && (
                      <a
                        target="_blank"
                        href={item.telegram}
                        alt="telegram"
                        className="mx-2"
                        rel="noreferrer">
                        <img
                          alt="telegramicon"
                          src="https://img.icons8.com/ios-filled/20/22C3E6/telegram-app.png"
                        />
                      </a>
                    )}

                    {/* website */}
                    {item.website != null && (
                      <a
                        target="_blank"
                        href={item.website}
                        className="mx-2"
                        rel="noreferrer">
                        <img
                          alt="websiteicon"
                          src="https://img.icons8.com/officel/20/000000/monitor.png"
                        />
                      </a>
                    )}

                    {/* twitter */}

                    <a
                      target="_blank"
                      href={item.website}
                      alt="twitter"
                      className=" mx-2"
                      rel="noreferrer">
                      <img
                        alt="twittericon"
                        src="https://img.icons8.com/color/24/000000/twitter--v1.png"
                      />
                    </a>
                  </td>
                  <td>
                    <h6>{item.vote}</h6>
                  </td>
                  <td>
                    {!kullanici ? (
                      <>
                        <button
                          disabled={true}
                          value={{
                            contractAddress: item.contractAddress,
                            vote: item.vote,
                          }}
                          onClick={() => {
                            sentVote({
                              contractAddress: "",
                              vote: "",
                            });
                          }}
                          className="btn btn-success vote">
                          Vote
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          key="123"
                          disabled={
                            now - setupTime > hours * 60 * 60 * 1000
                              ? false
                              : true
                          }
                          value={{
                            contractAddress: item.contractAddress,
                            vote: item.vote,
                          }}
                          onClick={() => {
                            sentVote({
                              contractAddress: item.contractAddress,
                              vote: item.vote + 1,
                            });
                          }}
                          className="btn btn-success vote">
                          Vote
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <ClipLoader
          className="justify-content-center d-flex"
          color="#ffffff"
          loading={loading}
          cssOverride={override}
          size={100}
        />
      </div>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
            You are viewing daily ratings
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default Dashboard;
