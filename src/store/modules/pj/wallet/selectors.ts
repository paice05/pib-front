import { createSelector } from "reselect";

import { Wallet } from "./types";
// common selectors
import { getElements } from "../../common/selectors";
// application interface
import { ApplicationState } from "./../../../index";

export const stateWallet = (state: ApplicationState) => getElements<Wallet>(state.pj.wallet);

export const dataWallet = createSelector(stateWallet, (walletItems) =>
    walletItems.sort((a, b) => (a.date > b.date ? 1 : -1)).map((walletItem) => walletItem),
);

// total values received
export const totalValueReceived = createSelector(stateWallet, (walletItems) =>
    walletItems.filter((item) => item.operation === 1).reduce((acc, cur) => acc + cur.value, 0),
);

// total values rescued
export const totalValueRescued = createSelector(stateWallet, (walletItems) =>
    walletItems.filter((item) => item.operation !== 1).reduce((acc, cur) => acc + cur.value, 0),
);

export const totalValue = createSelector(totalValueReceived, totalValueRescued, (valueReceived, valeuRescued) =>
    Math.abs(valueReceived - valeuRescued),
);
