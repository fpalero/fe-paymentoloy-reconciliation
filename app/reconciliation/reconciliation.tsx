import { useRef, useState } from 'react';
import IconFile from "../icons/IconFile";
import IconFileReady from "../icons/IconFileReady";
import type { TransactionReconciliation } from "../entities/TransactionReconciliation";
import FileUploadSection from "../components/FileUploadSection";
import ComparationTable from '~/components/ComparationTable';
import ReconciliationInfo from '~/components/ReconcilationInfo';

// This file is part of the app-welcome package
export function Reconciliation() {

  const [reconciliations, setReconciliations] = useState<TransactionReconciliation | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const onSubmit = async (tc: TransactionReconciliation, files: File[]) => {
    setReconciliations(tc);
    setSelectedFiles(files);
  };

  return (
    <div className="xl:container mx-auto mb-32">
      <div className="flex justify-center"
        style={{
          background: 'radial-gradient(circle, rgba(0, 0, 0, 1) 40%, rgba(252, 70, 107, 1) 100%)',
          height: '250px',

        }}>
        <h1 className="text-5xl sm:text-7x1 text-white uppercase pt-12">Reconciliation App</h1>
      </div>

      <FileUploadSection
        onSubmit={onSubmit}
      />
      {reconciliations && <ReconciliationInfo files={selectedFiles} reconciliations={reconciliations} />}
    </div>
  );
}
