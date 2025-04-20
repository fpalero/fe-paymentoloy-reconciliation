import React from 'react';
import ComparationTable from './ComparationTable';
import type { TransactionReconciliation } from '~/entities/TransactionReconciliation';
import TransactionTable from './TransactionTable';

interface ReconciliationInfoProps {
    reconciliations: TransactionReconciliation;
    files: File[];
}

const ReconciliationInfo: React.FC<ReconciliationInfoProps> = ({ reconciliations, files }) => {
    const classCard = "min-h-[23rem] border-4 border-black rounded-3xl p-4 flex flex-col items-center space-y-4";
    const classCardFileText = "text-sm font-bold";

    return (
        <div className="px-4 sw:w-2/3 lg:w-4xl mx-auto">
            <div className="rounded-lg shadow-lg text-black bg-white -m-24 py-10 md:py-12 px-4 md:px6">
                <div className="flex justify-center h-fit bg-gray-100">
                    <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center mb-2.5">Reconciliation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={classCard}>
                                <div className={classCardFileText}>{reconciliations.comparationA.fileName}</div>
                                <ComparationTable reconciliation={reconciliations.comparationA} />
                                <TransactionTable file={files[1]}reconciliation={reconciliations.comparationA} />
                            </div>
                            <div className={classCard}>
                                <div className={classCardFileText}>{reconciliations.comparationB.fileName}</div>
                                <ComparationTable reconciliation={reconciliations.comparationB} />
                                <TransactionTable file={files[0]} reconciliation={reconciliations.comparationB} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReconciliationInfo;