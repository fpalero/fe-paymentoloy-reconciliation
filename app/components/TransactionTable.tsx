import { use, useEffect, useState } from "react";
import type { Reconciliation } from "~/entities/Reconciliaiton";
import type { Transaction } from "~/entities/Transaction";


interface ComparationTableProps {
    reconciliation: Reconciliation;
    file: File
}

const ComparationTable: React.FC<ComparationTableProps> = ({ reconciliation, file }) => {
    const [isVisible, setVisibile] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<string>("hidden");
    const [correlations, setCorrealtions] = useState<Transaction[]>([]);
    const [selectedTransaction, setTransaction] = useState<Transaction | null>(null);
    const classTableButton = "inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"


    const onClick = (transaction: Transaction) => {

        getSimilarTransactions(transaction).then((result) => {

            if (result) {
                setVisibile(!isVisible);
                setTransaction(transaction);
                setShowModal(isVisible ? "relative z-10" : "hidden");
                setCorrealtions(result)
                console.log("result", result);
            }
        });
    }

    const modal = () => {
        return (
            <div className={showModal} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-fit">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex">
                                    
                                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                        <h3 className="text-4xl font-extrabold mb-10 text-gray-900" id="modal-title">Correlations: Transaction ID {selectedTransaction?.transactionID} </h3>
                                        <div className="mt-2">
                                            <table className="rounded-xl min-w-full text-center text-sm font-light text-surface dark:text-white">
                                                <thead className="border-neutral-700 bg-neutral-500 font-medium dark:border-white/10 dark:text-neutral-800">
                                                    <tr>
                                                        <th scope="col" className="px-1 py-4">Date</th>
                                                        <th scope="col" className="px-1 py-4">Transaction ID</th>
                                                        <th scope="col" className="px-1 py-4">Amount</th>
                                                        <th scope="col" className="px-1 py-4">Correlation</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {correlations.slice(0, 5).map((correlation, index) => (
                                                        <tr key={index} className="border-b dark:border-neutral-600 text-gray-600 border-neutral-200">
                                                            <td className="whitespace-nowrap px-1 py-4">
                                                                {correlation.transactionDate}
                                                            </td>
                                                            <td className="whitespace-nowrap px-1 py-4">
                                                                {correlation.transactionID}
                                                            </td>
                                                            <td className="whitespace-nowrap px-1 py-4">
                                                                {correlation.transactionAmount}
                                                            </td>
                                                            <td className="whitespace-nowrap px-1 py-4">
                                                                {correlation.correlation}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" onClick={() => { setVisibile(false); setShowModal("hidden") }} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const getSimilarTransactions = async (transaction: Transaction) => {
        console.log("getSimilarTransactions", transaction);
        console.log("File", file.name);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("transaction", JSON.stringify(transaction));

        const response = await fetch(process.env.VITE_API_URL + "/reconciliations/correlations", {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            return "Error: " + response.statusText;
        } else {
            const resultBody = await response.json();
            return resultBody;
        }
    }

    return (
        <div>
            {modal()}
            <div className="text-sm font-bold">Unmatched Reacords Table</div>
            <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-neutral-700">
                <table className="rounded-xl min-w-full text-center text-sm font-light text-surface dark:text-white">
                    <thead className="border-neutral-700 bg-neutral-500 font-medium dark:border-white/10 dark:text-neutral-800">
                        <tr>
                            <th scope="col" className="px-1 py-4">Date</th>
                            <th scope="col" className="px-1 py-4">Transaction ID</th>
                            <th scope="col" className="px-1 py-4">Amount</th>
                            <th scope="col" className="px-1 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reconciliation.unmatchedList.map((transaction, index) => (
                            <tr key={index} className="border-b dark:border-neutral-600 text-gray-600 border-neutral-200">
                                <td className="whitespace-nowrap px-1 py-4">
                                    {transaction.transactionDate}
                                </td>
                                <td className="whitespace-nowrap px-1 py-4">
                                    {transaction.transactionID}
                                </td>
                                <td className="whitespace-nowrap px-1 py-4">
                                    {transaction.transactionAmount}
                                </td>
                                <td className="whitespace-nowrap px-1 py-4">
                                    <button type="button" className={classTableButton} onClick={() => onClick(transaction)}>
                                        View
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparationTable;