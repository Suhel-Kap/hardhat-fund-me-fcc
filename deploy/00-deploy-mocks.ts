import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig } from "../helper-hardhat-config";
import { developmentChains } from "../helper-hardhat-config";

const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

const deployMocks: DeployFunction = async function({
    getNamedAccounts,
    deployments,
    network,
}) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId: number = network.config.chainId!;

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mock...");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        });
        log("Mocks deployed!");
        log("**********************************************");
    }
};

export default deployMocks;
deployMocks.tags = ["all", "mocks"];
