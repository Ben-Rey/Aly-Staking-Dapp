// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;
import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract EthUsdPrice {
    AggregatorV3Interface internal priceFeed;

    /** * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331 */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x9326BFA02ADD2366b30bacB125260Af641031331
        );
    }

    /**
     * @notice set a pair address
     *
     * @dev to set the adress of another pair on chainlink data feed
     *
     * @param _pair the address of the pair you want to set
     *
     *
     */

    function setAddr(address _pair) public {
        priceFeed = AggregatorV3Interface(_pair);
    }

    /**
     *
     * @dev to set the adress of another pair on chainlink data feed
     *
     * @return Returns the latest price
     *
     *@dev returns an int256 of latest price
     */

    function getLatestPrice() public view returns (int256) {
        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80
answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        return price;
    }
}
