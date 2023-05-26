import { BigNumber } from "ethers";
import { Operation } from "src/simulation/simulation.types";

import { Token, TransactionOptions } from "../types";

import { ApprovalHandlerOptions } from "./ApprovalHandler.interface";
import { BaseTxHandler } from "./TxHandler";
import { IBatchTxHandler } from "./TxHandler.interface";

export default class BulkerTxHandler extends BaseTxHandler implements IBatchTxHandler {
  public handleBatchTransaction(
    operations: Operation[],
    options?: TransactionOptions | undefined
  ): Promise<any> {
    return Promise.reject("TODO: to implement");
  }

  public async handleApproval(token: Token, amount: BigNumber, options?: ApprovalHandlerOptions) {
    return Promise.reject("TODO: to implement");
  }

  public async handlePermit2Approval(
    token: Token,
    amount: BigNumber,
    deadline: BigNumber,
    nonce: BigNumber,
    options?: ApprovalHandlerOptions
  ) {
    // TODO: to implement (same as the Web3TxHandler ?)
    return Promise.reject("TODO: to implement");
  }
}
