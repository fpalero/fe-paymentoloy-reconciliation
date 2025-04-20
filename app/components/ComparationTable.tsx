import type { Reconciliation } from "~/entities/Reconciliaiton";


interface ComparationTableProps {
    reconciliation: Reconciliation;
}

const ComparationTable: React.FC<ComparationTableProps> = ({ reconciliation }) => {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-neutral-700">
            <table className="rounded-xl min-w-full text-center text-sm font-light text-surface dark:text-white">
                <thead className="border-neutral-700 bg-neutral-500 font-medium dark:border-white/10 dark:text-neutral-800">
                    <tr>
                        <th scope="col" className="px-6 py-4">Total Records</th>
                        <th scope="col" className="px-6 py-4">Matched Records</th>
                        <th scope="col" className="px-6 py-4">Unmatched Records</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b text-gray-600 border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {reconciliation.totalRecords}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                            {reconciliation.matchedRecords}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                            {reconciliation.unmatchedRecords}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ComparationTable;