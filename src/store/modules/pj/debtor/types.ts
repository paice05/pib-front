export enum types {
    LOAD_DEBTOR = "@pj/DEBTOR/LOAD_DEBTOR",
    LOAD_DEBTOR_INIT = "@pj/DEBTOR/LOAD_DEBTOR_INIT",
    LOAD_DEBTOR_SUCCESS = "@pj/DEBTOR/LOAD_DEBTOR_SUCCESS",
    LOAD_DEBTOR_FAILURE = "@pj/DEBTOR/LOAD_DEBTOR_FAILURE",

    ADD_DEBTOR = "@pj/DEBTOR/ADD_DEBTOR",
    ADD_DEBTOR_INIT = "@pj/DEBTOR/ADD_DEBTOR_INIT",
    ADD_DEBTOR_SUCCESS = "@pj/DEBTOR/ADD_DEBTOR_SUCCESS",
    ADD_DEBTOR_FAILURE = "@pj/DEBTOR/ADD_DEBTOR_FAILURE",

    REMOVE_DEBTOR = "@pj/DEBTOR/REMOVE_DEBTOR",
    REMOVE_DEBTOR_INIT = "@pj/DEBTOR/REMOVE_DEBTOR_INIT",
    REMOVE_DEBTOR_SUCCESS = "@pj/DEBTOR/REMOVE_DEBTOR_SUCCESS",
    REMOVE_DEBTOR_FAILURE = "@pj/DEBTOR/REMOVE_DEBTOR_FAILURE",

    UPDATE_DEBTOR = "@pj/DEBTOR/UPDATE_DEBTOR",
    UPDATE_DEBTOR_INIT = "@pj/DEBTOR/UPDATE_DEBTOR_INIT",
    UPDATE_DEBTOR_SUCCESS = "@pj/DEBTOR/UPDATE_DEBTOR_SUCCESS",
    UPDATE_DEBTOR_FAILURE = "@pj/DEBTOR/UPDATE_DEBTOR_FAILURE",
}

export interface Debtor {
    id: string;
    dateRegister: Date;
    document: string;
    name: string;
    debit: number;
    negociation: number;
    receipt: number;
    late: number;
    situation: number;
}

export interface ById {
    [key: string]: object;
}

export interface StateDebtor {
    byId: ById;
    allId: string[];
}