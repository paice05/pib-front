import React, { useState, useEffect } from "react";

import { Shopkeeper } from "../../../store/modules/association/shopkeeper/types";

import TheadItem from "./TheadItem";
import TbodyItem from "./TbodyItem";

import Pagination from "../../Pagination";

const perPage = 12;

interface PaginationSate {
    page: number;
    totalPage: number;
}

interface Thead {
    text: string;
    title: string;
    reference: string;
}

type Tbody = Shopkeeper;

interface Props {
    thead: Thead[];
    tbody: Tbody[];
    handleOrderByColumn(column: string): void;
    actions: {
        updateShopkeeper(id: string): void;
    };
}

const Tableshopkeepers: React.FC<Props> = ({ thead, tbody, handleOrderByColumn, actions }) => {
    const { updateShopkeeper } = actions;

    const [data, setData] = useState<Tbody[]>(tbody);

    const [pagination, setPagination] = useState<PaginationSate>({
        page: 1,
        totalPage: 0,
    });

    useEffect(() => {
        const page = pagination.page - 1;
        const start = page * perPage;
        const end = start + perPage;

        const part = tbody.slice(start, end);

        setData(part);
        setPagination((prevState) => ({
            ...prevState,
            totalPage: Math.ceil(tbody.length / perPage),
        }));
    }, [tbody, pagination.page]);

    const nextPage = () => {
        if (pagination.page >= pagination.totalPage) return;

        setPagination((prevState) => ({
            ...prevState,
            page: prevState.page + 1,
        }));
    };

    const prevPage = () => {
        if (pagination.page <= 1) return;

        setPagination((prevState) => ({
            ...prevState,
            page: prevState.page - 1,
        }));
    };

    const goToPage = (page: number) => {
        setPagination((prevState) => ({
            ...prevState,
            page,
        }));
    };

    return (
        <div className="table-regua barraRolagem">
            <span id="top"></span>
            <table className="tableListaRegras">
                <thead>
                    <tr className="bs-example">
                        {thead.map((item, index) => (
                            <TheadItem
                                key={index}
                                text={item.text}
                                title={item.title}
                                reference={item.reference}
                                handleOrderForColumn={handleOrderByColumn}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody className="listaCompletaRegras">
                    {data.map((item, index) => (
                        <TbodyItem key={item.id} {...item} updateShopkeeper={updateShopkeeper} />
                    ))}

                    {!data.length && (
                        <tr>
                            <td
                                className="text-center pt-3 pb-3"
                                style={{ borderBottom: 0, borderRadius: 0 }}
                                colSpan={thead.length}
                            >
                                Nenhuma lojista encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {tbody.length !== 0 && (
                <Pagination
                    page={pagination.page}
                    totalPage={pagination.totalPage}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    goToPage={goToPage}
                />
            )}
        </div>
    );
};

export default Tableshopkeepers;