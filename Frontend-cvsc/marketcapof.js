// {
//   /* <div className="row text-white col-sm-12">
//   <div className="col-sm-3 ">
//     <div className="Trend-list mt-3">
//       <h4 className="text-center trend">Trend</h4>
//       <Table striped bordered hover variant="dark">
//         <thead></thead>
//         <tbody>
//           <tr>
//             <td>Shiba</td>
//             <td>
//               <a
//                 href="https://bscscan.com/address/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
//                 target="_blank">
//                 <img
//                   className="mx-2"
//                   src="https://etherscan.io/images/brandassets/etherscan-logo-light-circle.png"
//                   style={{ width: "17px" }}
//                   alt="contract"
//                 />
//               </a>

//               <img
//                 className="mx-2"
//                 src="https://octaplex.io/wp-content/uploads/2021/11/dextools-icon.png"
//                 style={{ width: "22px" }}
//                 alt="exchange"
//               />
//               <img
//                 className="mx-2"
//                 src="https://img.icons8.com/ios-filled/17/FFFFFF/telegram-app.png"
//                 alt="telegram"
//               />
//               <img
//                 className="mx-2"
//                 src="https://img.icons8.com/ios-glyphs/17/FFFFFF/twitter--v1.png"
//                 alt="twitter"
//               />
//             </td>
//             <td>
//               <img
//                 src="https://img.icons8.com/arcade/20/000000/experimental-star-arcade.png"
//                 alt="score"
//                 className="mx-2"
//               />
//               4
//             </td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//   </div>
//   <div className="col-sm-9 ">
//     <form className="form ">
//       <div className="mt-3">
//         <h2>Coin VS Coin</h2>
//       </div>
//       <div className="cvsc">
//         <input
//           placeholder="Coin name or Contract Address"
//           className="a-coin"
//           type="text"
//         />
//         <img
//           className="swap"
//           src="https://img.icons8.com/pastel-glyph/35/FFFFFF/swap-paths.png"
//           alt="swap"
//         />

//         <input
//           placeholder="Coin name or Contract Address"
//           className="a-coin"
//           type="text"
//         />
//       </div>
//     </form>
//     <CoinDetail />
//   </div>
//   </div> */
// }

// // second part

// <tr>
//   <td>
//     <img alt="metameskicon" className="mx-2" src={binance} />
//     Shiba
//   </td>
//   <td>0.00000004</td>
//   <td>$123.432.234,165</td>
//   <td>
//     {/* etherscan */}
//     <a target="_blank" href={etherscanLink} className="mx-2" rel="noreferrer">
//       <img
//         src={etherscan}
//         alt="etherscan
// "
//       />
//     </a>

//     {/* pancake */}
//     <a
//       target="_blank"
//       href="https://pancakeswap.finance/swap?outputCurrency=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
//       className="mx-2"
//       rel="noreferrer">
//       <img src={cake} alt="cakeicon" />
//     </a>
//     {/* metamesk */}
//     <a
//       target="_blank"
//       className="mx-2"
//       href="https://www.coinvscoin.io/"
//       rel="noreferrer">
//       <img
//         alt="metameskicon"
//         src="https://img.icons8.com/color/20/000000/metamask-logo.png"
//       />
//     </a>

//     {/* telegram */}

//     {cointelegram && (
//       <a
//         target="_blank"
//         href="https://icons8.com/icon/60014/twitter"
//         alt="telegram"
//         className="mx-2"
//         rel="noreferrer">
//         <img
//           alt="telegramicon"
//           src="https://img.icons8.com/ios-filled/20/22C3E6/telegram-app.png"
//         />
//       </a>
//     )}

//     {/* website */}
//     {coinwebsite && (
//       <a
//         target="_blank"
//         href="https://icons8.com/icon/60014/twitter"
//         className="mx-2"
//         rel="noreferrer">
//         <img
//           alt="websiteicon"
//           src="https://img.icons8.com/officel/20/000000/monitor.png"
//         />
//       </a>
//     )}

//     {/* twitter */}

//     {cointwitter && (
//       <a
//         target="_blank"
//         href="https://icons8.com/icon/60014/twitter"
//         alt="twitter"
//         className=" mx-2"
//         rel="noreferrer">
//         <img
//           alt="twittericon"
//           src="https://img.icons8.com/color/24/000000/twitter--v1.png"
//         />
//       </a>
//     )}
//   </td>
//   <td>
//     <h4>123</h4>
//   </td>
//   <td>
//     <button className="btn btn-success vote">Vote</button>
//   </td>
// </tr>;
// {
//   coins.map((item, key) => (
//     <tr>
//       <td>
//         <img
//           alt="metameskicon"
//           className="mx-2"
//           src={item.logo != null ? item.logo : binance}
//         />
//         {item.name}
//       </td>
//       <td>{item.price}</td>
//       <td>$123.432.234,165</td>
//       <td>
//         {/* etherscan */}
//         <a
//           target="_blank"
//           href={item.etherscanLink}
//           className="mx-2"
//           rel="noreferrer">
//           <img src={etherscan} alt="etherscan" />
//         </a>

//         {/* pancake */}
//         <a
//           target="_blank"
//           href={item.pancakeSwap}
//           className="mx-2"
//           rel="noreferrer">
//           <img src={cake} alt="cakeicon" />
//         </a>
//         {/* metamesk */}
//         <a
//           target="_blank"
//           className="mx-2"
//           href="https://www.coinvscoin.io/"
//           rel="noreferrer">
//           <img
//             alt="metameskicon"
//             src="https://img.icons8.com/color/20/000000/metamask-logo.png"
//           />
//         </a>

//         {/* telegram */}

//         {cointelegram && (
//           <a
//             target="_blank"
//             href={item.telegram}
//             alt="telegram"
//             className="mx-2"
//             rel="noreferrer">
//             <img
//               alt="telegramicon"
//               src="https://img.icons8.com/ios-filled/20/22C3E6/telegram-app.png"
//             />
//           </a>
//         )}

//         {/* website */}
//         {coinwebsite && (
//           <a
//             target="_blank"
//             href={item.website}
//             className="mx-2"
//             rel="noreferrer">
//             <img
//               alt="websiteicon"
//               src="https://img.icons8.com/officel/20/000000/monitor.png"
//             />
//           </a>
//         )}

//         {/* twitter */}

//         {cointwitter && (
//           <a
//             target="_blank"
//             href={item.website}
//             alt="twitter"
//             className=" mx-2"
//             rel="noreferrer">
//             <img
//               alt="twittericon"
//               src="https://img.icons8.com/color/24/000000/twitter--v1.png"
//             />
//           </a>
//         )}
//       </td>
//       <td>
//         <h4>{item.votePoint}</h4>
//       </td>
//       <td>
//         <button className="btn btn-success vote">Vote</button>
//       </td>
//     </tr>
//   ));
// }
