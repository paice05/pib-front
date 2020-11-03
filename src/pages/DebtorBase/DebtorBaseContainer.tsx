import React from "react";

import { useSelector, useDispatch } from "react-redux";

// actions
import { actions as actionsDebtors } from "../../store/modules/pj/debtor/actions";

// selectors
import { dataDebtor } from "../../store/modules/pj/debtor/selectors";

export const debtorBaseContainer = (Component: React.ElementType) => {
    const Container: React.FC = () => {
        const dispatch = useDispatch();
        const debtors = useSelector(dataDebtor);

        const handleFilterSituation = (situation: number) => {
            if (situation === -1) return debtors;

            return debtors.filter((debtor) => debtor.situation === situation);
        };

        const handleLoadDebtors = () => {
            dispatch(actionsDebtors.loadNegociation());
        };

        return (
            <Component
                payload={{
                    data: debtors,
                    actions: {
                        handleLoadDebtors,
                    },
                    handleFilterSituation,
                }}
            />
        );
    };

    return Container;
};
