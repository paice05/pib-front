import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { ruleNegociationContainer } from "./RuleNegociationContainer";

import { Negociation } from "../../store/modules/pj/negociation/types";

// actions
import { actions as actionsNegociation } from "../../store/modules/pj/negociation/actions";

import Table from "../../components/Table/TableNegociation";

interface Props {
    payload: {
        data: Negociation[];
    };
}

const header = [
    { text: "Idade da \n Dívida", title: "Idade da Dívida", reference: "yaerDebit" },
    { text: "Juros", title: "Juros", reference: "interest" },
    { text: "Desconto", title: "Desconto", reference: "discount" },
    { text: "Máximo de \n Parcelas", title: "Máximo de Parcelas", reference: "maxPortion" },
    { text: "Atenuador", title: "Atenuador", reference: "attenuator" },
    { text: "Multa", title: "Multa", reference: "trafficTicket" },
    { text: "Reajuste", title: "Reajuste", reference: "readjustment" },
    { text: "Editar e \n Simular", title: "Editar e Simular", reference: "" },
];

const RuleNegociation: React.FC<Props> = ({ payload }) => {
    const { data } = payload;

    const dispatch = useDispatch();

    const [tbody, setTbody] = useState<Negociation[]>(data);
    const [lastColumn, setLastColum] = useState("");

    useEffect(() => {
        dispatch(actionsNegociation.loadNegociation());
    }, []);

    useEffect(() => {
        setTbody(payload.data);
    }, [payload.data]);

    const handleOrderByColumn = (column: string) => {
        if (lastColumn === column) {
            const response = tbody.map((item) => item).sort((a, b) => (a[column] < b[column] ? 1 : -1));

            setLastColum("");
            setTbody(response);
            return;
        }

        const response = tbody.map((item) => item).sort((a, b) => (a[column] > b[column] ? 1 : -1));

        setLastColum(column);
        setTbody(response);
    };

    return (
        <div className="page">
            <div className="container">
                <div className="descmod cadastro d-flex justify-content-between">
                    <div className="col-xs-12">
                        <b>Fique por dentro das negociações</b>
                        <h5>Selecione para ver mais detalhes</h5>
                    </div>
                </div>

                <Table thead={header} tbody={tbody} handleOrderByColumn={handleOrderByColumn} />
            </div>
        </div>
    );
};

export default ruleNegociationContainer(RuleNegociation);
