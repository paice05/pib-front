import React from "react";

import { useSelector, useDispatch } from "react-redux";

// actions
import { actions as actionsDebts } from "../../store/modules/pf/debt/actions";

// selectors
import { selectDebts, valueTotalDebts, amountDebts, debitsPaid } from "../../store/modules/pf/debt/selectors";

export const debtsContainer = (Component: React.ElementType) => {
    const Container: React.FC = () => {
        const dispatch = useDispatch();

        // selectors
        const debts = useSelector(selectDebts);
        const value = useSelector(valueTotalDebts);
        const amount = useSelector(amountDebts);
        const isDebitsPaid = useSelector(debitsPaid);

        // actions

        return (
            <Component
                payload={{
                    data: {
                        debts,
                        isDebitsPaid,
                    },
                    actions: {},
                    amount,
                    value,
                }}
            />
        );
    };

    return Container;
};
