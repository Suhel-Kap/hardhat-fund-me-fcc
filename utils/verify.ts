import { run } from "hardhat";

export async function verify(_contractAddress: string, _args: any) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: _contractAddress,
            constructorArguments: _args,
        });
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Contract already verified!");
        } else {
            console.error(e);
        }
    }
}
