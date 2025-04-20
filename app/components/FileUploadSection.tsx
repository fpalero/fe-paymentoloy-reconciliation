import React, { useRef, useState } from "react";
import IconFile from "../icons/IconFile";
import IconFileReady from "../icons/IconFileReady";
import type { TransactionReconciliation } from "~/entities/TransactionReconciliation";

interface FileUploadSectionProps {
    onSubmit: (tc: TransactionReconciliation,  files: File[]) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
    onSubmit
}) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState("");
    const acceptedFileExtensions = ["csv"];

    const acceptedFileTypesString = acceptedFileExtensions
        .map((ext) => `.${ext}`)
        .join(",");

    // handleSubmit: This function is responsible for handling the form submission. 
    // It checks if any file is selected and clears any error messages.
    const handleSubmit = async () => {
        if (selectedFiles.length < 2) {
            setError("Two files ar required");
        } else if (!error) {
            const formData = new FormData();
            formData.append("afile", selectedFiles[0]);
            formData.append("bfile", selectedFiles[1]);

            const response = await fetch(process.env.VITE_API_URL + "/reconciliations/compares", {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
            } else {
                const resultBody = await response.json();
                onSubmit(resultBody, selectedFiles);
            }
        }

    }

    // handleFileChange: This function is triggered when files are selected using the file input. 
    // It processes the selected files.
    const handleFileChange = (event) => {
        const newFilesArray = Array.from(event.target.files);
        processFiles(newFilesArray);
    };

    // handleDrop: This function handles the drop event when files are dropped into 
    // the designated area for drag-and-drop.
    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        processFiles(droppedFiles);
    };

    // processFiles: This function processes the selected files, checking for duplicates and file types. It updates the state accordingly.
    const processFiles = (filesArray) => {
        let hasError = false;

        if (filesArray.length > 2 || selectedFiles.length + filesArray.length > 2) {
            setError("It is not possible to select more than 2 files");
            hasError = true;
        } else {
            const newSelectedFiles = [...selectedFiles];

            const fileTypeRegex = new RegExp(acceptedFileExtensions.join("|"), "i");
            console.log(fileTypeRegex, "fileTypeRegex");
            filesArray.forEach((file) => {
                if (newSelectedFiles.some((f) => f.name === file.name)) {
                    setError("File names must be unique");
                    hasError = true;
                } else if (!fileTypeRegex.test(file.name.split(".").pop())) {
                    setError(`Only ${acceptedFileExtensions.join(", ")} files are allowed`);
                    hasError = true;
                } else {
                    newSelectedFiles.push(file);
                }
            });

            if (!hasError) {
                setError("");
                setSelectedFiles(newSelectedFiles);
            }
        }
    };

    // handleFileDelete: This function handles the deletion of a selected file from the list.
    const handleFileDelete = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    // handleCustomButtonClick: This function triggers the click event of the hidden file input when the custom upload button is clicked.
    const handleCustomButtonClick = () => {
        // Trigger the click event of the hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="px-4 sw:w-2/3 lg:w-4xl mx-auto">
            <div className="rounded-lg shadow-lg text-black bg-white -m-24 py-10 md:py-12 px-4 md:px6">
                <div className="flex justify-center h-fit bg-gray-100">
                    <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center mb-4">
                            Upload Files
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                                className="min-h-[23rem] border-4 border-dashed border-blue-500 bg-blue-100 rounded-3xl p-4 flex flex-col justify-center items-center space-y-4"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(e)}
                            >
                                <IconFile />
                                <p className="text-lg font-semibold">Drag and Drop the files</p>
                                <p className="text-lg font-bold">or</p>
                                <button
                                    type="button"
                                    onClick={handleCustomButtonClick}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    Upload Files
                                </button>
                                <input
                                    type="file"
                                    id="files"
                                    name="files"
                                    multiple
                                    accept={acceptedFileTypesString}
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    onClick={(event) => {
                                        // Reset the input value to allow selecting the same file again
                                        event.target.value = null;
                                    }}
                                />
                            </div>

                            <div className="border-2 border-gray-300 rounded-3xl py-4 max-h-[23rem] overflow-auto">
                                {selectedFiles.length > 0 ? (
                                    <ul className="px-4">
                                        {selectedFiles.map((file, index) => (
                                            <li
                                                key={file.name}
                                                className="flex justify-between items-center border-b py-2"
                                            >

                                                <div className="flex items-center">
                                                    <IconFileReady />
                                                    <span className="text-base">{file.name}</span>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => handleFileDelete(index)}
                                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            d="M6 4l8 8M14 4l-8 8"
                                                        />
                                                    </svg>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="h-full flex justify-center items-center">
                                        <p className="text-lg font-semibold text-gray-500 text-center">
                                            No Files Uploaded Yet
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        <div className="flex justify-center mt-8">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                            >
                                Compare
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};
export default FileUploadSection;