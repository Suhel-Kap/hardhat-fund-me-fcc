import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { verify } from "../utils/verify"

const deployFund: DeployFunction = async function ({
    getNamedAccounts,
    deployments,
    network,
}) {
    // extracted from HRE
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number = network.config.chainId!

    // const ethUsdPriceFeedAddress: string = networkConfig[chainId]
    //     .ethUsdPriceFeed!;

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[network.name].ethUsdPriceFeed!
    }

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations! || 1,
    })
    log("**********************************************")

    if (!developmentChains.includes(network.name)) {
        verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}
export default deployFund
deployFund.tags = ["all", "fundme"]
