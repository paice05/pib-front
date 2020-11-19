import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { addDays } from "date-fns";

import { ApplicationState } from "../../../store";

// selectors
import { negociationByMonth } from "../../../store/modules/pj/negociation/selectors";

// components
import Billet from "./Billet";
import Card from "./Card";

// utils
import formatDate from "../../../utils/formatDate";
import formatPrice from "../../../utils/formatPrice";

import SweetAlert from "../../../components/SweetAlert";

const stylesErrosMessage: React.CSSProperties = {
    color: "#ff0000",
    fontSize: 11,
};

interface Props {
    debit: number;
    monthForRule: number;
}

interface State {
    payment: "billet" | "card";
    portion: string;
    datePayment: string;
    confirmWakeUp: boolean;
    modal: boolean;
    errors: object;
}

const Negociation: React.FC<Props> = (props) => {
    const { debit, monthForRule } = props;

    const [options, setOptions] = useState<number[]>([]);

    const negociation = useSelector((state: ApplicationState) => negociationByMonth(state, monthForRule));

    useEffect(() => {
        if (negociation) setOptions(Array.from({ length: negociation.maxPortion }).map((_, index) => index + 1));
    }, [negociation]);

    const [state, setState] = useState<State>({
        payment: "billet",
        portion: "",
        datePayment: "",
        confirmWakeUp: true, // TODO: fazer a logica inversa [começar com false]
        modal: false,
        errors: {},
    });

    console.log(state);

    const handleSetState = (key: string, value: string | boolean | object) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event;

        handleSetState("payment", target.value);
    };

    const handleSelectPortionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSetState("portion", event.target.value);
    };

    const handleSelectDatePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleSetState("datePayment", event.target.value);
    };

    const handleConfirmWakeUp = () => {
        if (!state.portion) {
            handleSetState("errors", {
                portion: "Parcelamento é obrigatório.",
            });

            return;
        }

        if (state.payment === "billet") {
            if (!state.datePayment) {
                handleSetState("errors", {
                    datePayment: "Data do vencimento é obrigatório.",
                });

                return;
            }
        }

        handleSetState("modal", !state.modal);
        handleSetState("errors", {});
    };

    const handleConfirm = () => {
        handleSetState("modal", !state.modal);
        handleSetState("confirmWakeUp", !state.confirmWakeUp);
    };
    const handleCancel = () => {
        handleSetState("modal", !state.modal);
    };

    const { payment, confirmWakeUp } = state;
    const discount = (debit * Number(negociation?.discount)) / 100;

    return (
        <div className="p-3">
            <div className="pagt font-weight-bold">Pagamento</div>
            <div className="row pagb1">
                <div className="col-md-6" style={{ borderRight: "1px #dedede solid" }}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="font-weight-bold">Forma de pagamento </div>

                            <label className="boleto">
                                <input
                                    disabled={!confirmWakeUp}
                                    type="radio"
                                    name="payment"
                                    value="billet"
                                    checked={payment === "billet"}
                                    onChange={handlePaymentChange}
                                />
                                Boleto
                            </label>
                            <br />
                            <label className="cartaoc">
                                <input
                                    disabled={!confirmWakeUp}
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    onChange={handlePaymentChange}
                                />
                                Cartão de Crédito
                            </label>
                            <br />
                            <label>
                                <div className="font-weight-bold">Parcelamento</div>
                                <br />
                                <select
                                    style={{ color: "#000" }}
                                    onChange={handleSelectPortionChange}
                                    className="sel parcelamentoSelect"
                                >
                                    <option style={{ color: "#000" }} value="">
                                        Escolha o plano
                                    </option>
                                    {options.map((value, index) => (
                                        <option style={{ color: "#000" }} key={value} value={value}>
                                            {index + 1} X {formatPrice((debit - discount) / (index + 1))}
                                        </option>
                                    ))}
                                </select>
                                {state.errors["portion"] && (
                                    <span style={stylesErrosMessage}> {state.errors["portion"]} </span>
                                )}
                            </label>
                            <br />
                            <label>
                                <div className="font-weight-bold">
                                    {state.payment === "card" ? "Data da Transação" : "Data de Vencimento"}
                                </div>
                                {state.payment === "card" ? (
                                    <div>
                                        <div style={{ color: "#000", padding: "7px 3px" }} className="sel">
                                            {formatDate(new Date())}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <select
                                            style={{ color: "#000" }}
                                            onChange={handleSelectDatePaymentChange}
                                            className="sel parcelamentoSelect"
                                        >
                                            <option style={{ color: "#000" }} value="">
                                                Escolha uma data
                                            </option>
                                            {Array.from({ length: 9 }).map((item, index) => (
                                                <option
                                                    key={index}
                                                    style={{ color: "#000" }}
                                                    value={formatDate(addDays(new Date(), index))}
                                                >
                                                    {formatDate(addDays(new Date(), index))}
                                                </option>
                                            ))}
                                        </select>
                                        {state.errors["datePayment"] && (
                                            <span style={stylesErrosMessage}> {state.errors["datePayment"]} </span>
                                        )}
                                    </>
                                )}
                            </label>
                        </div>

                        <div className="col-md-6">
                            <div className="font-weight-bold">Resumo de seu acordo</div>
                            <label>
                                <div className="font-weight-bold">Valor da dívida</div>
                                <input className="imp" disabled value={formatPrice(debit)} />
                            </label>
                            <div className="font-weight-bold">Valor do desconto ({`${negociation?.discount}%`})</div>
                            <label>
                                <input className="imp desconto disabled-bc" disabled value={formatPrice(discount)} />
                            </label>
                            <div className="font-weight-bold">Total</div>
                            <label>
                                <input className="imp disabled-bc" disabled value={formatPrice(debit - discount)} />
                            </label>
                            <button
                                style={{ border: "none" }}
                                className="cacordo confirmarAcordo font-weight-bold"
                                onClick={handleConfirmWakeUp}
                            >
                                Quero pagar
                            </button>
                        </div>
                    </div>
                </div>

                {payment === "billet" && (
                    <div className="col-md-6">
                        <Billet confirm={confirmWakeUp} />
                    </div>
                )}
                {payment === "card" && (
                    <div className="col-md-6">
                        <Card confirm={confirmWakeUp} />
                    </div>
                )}
            </div>

            {state.modal && (
                <SweetAlert
                    title="Deseja confirmar acordo?"
                    handleConfirm={handleConfirm}
                    handleCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default Negociation;
