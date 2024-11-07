import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";

import Image from "next/image";
import {getOnlyBase64} from "@/utils/functions";
import {KTIcon} from "@/libs/KTIcon/KTIcon";
import pdfLight from "@images/default/pdf-light.svg"

const ComponentSelectFile = ({onAttachments, isMultiple = false, maxFiles}) => {
	const [files, setFiles] = useState([]);
	const [loadingFile, setLoadingFile] = useState(false);

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.length > 0 && setLoadingFile(true);
		let aux = files;

		acceptedFiles.forEach((file) => {
			const reader = new FileReader()
			let extension = file.type.split('/')


			reader.onabort = () => console.log('file reading was aborted')
			reader.onerror = () => console.log('file reading has failed')
			reader.onload = () => {
				setLoadingFile(false);
				let binaryStr = {
					base64: getOnlyBase64(reader.result),
					note: file.name,
					extension: extension[extension.length - 1].toUpperCase(),
					image: reader.result
				}
				if(aux.length === (maxFiles || 5)) {
					aux = []
					aux.push(binaryStr)

				} else {
					aux.push(binaryStr)
				}

				setFiles([...aux]);

				if (onAttachments) {
					console.log(binaryStr);
					onAttachments({
						allFiles: aux,
						lastAdded: binaryStr,
					})
				}
			};
			reader.readAsDataURL(file)
		})

	}, [])

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		fileRejections,
	} = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
			'image/*': ['.jpeg', '.jpg', '.png'],
		},
		maxFiles: maxFiles || 5,
		multiple: isMultiple,
	})

	const handleRemoveFile = (index) => {
		const aux = files;
		aux.splice(index, 1);

		if (onAttachments) {
			onAttachments({
				allFiles: aux,
				lastAdded: files[index],
			})
		}

		setFiles([...aux]);
	}

	return (
		<div>
			<div {...getRootProps()}>
				<input {...getInputProps()} />

				<div className={`dropzone shadow ${isDragActive ? 'bg-success-subtle ' : ''} min-h-50px`}
					 id="my-dropzones">
					<div className="dz-message needsclick justify-content-center">
						<div className="text-center">
							<KTIcon name={isDragActive ? "file-up" : "add-files"} className={`fs-2x ${isDragActive ? "text-success-emphasis" : "text-primary"}`}/>

							<div >
								<h3 className="fs-5 fw-bold text-gray-900 mb-1">
									{isDragActive ? "Solte o arquivo" : "Arraste ou clique para adicionar arquivos"}
								</h3>
								<span className={`fs-7 fw-semibold ${isDragActive ? "text-success-emphasis" : "text-primary"} opacity-75`}>
										{isDragActive ? "Para adicionar" : "Aceito somente PDF ou Imagem"}
									</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{files.length > 0 &&
				<div>
					<div className={"d-flex gap-2 align-items-center py-5"}>
						<h5 className={"mb-0"}>Arquivo adicionado</h5>
						<span className={"separator border-2 flex-grow-1"} style={{height:1}}/>
					</div>
					<div >
						{files.map((item, index) => {
							const isPdf = item?.image?.includes('/pdf');

							return (
								<div key={index} className={"mw-md-400px w-100 position-relative"}>
									<div className={isPdf ? "border p-4 rounded-3" : ""}>
										<div onClick={() => handleRemoveFile(index)}
											 className={"cursor-pointer w-100 text-center trash-icon"}>
											{isPdf ?
												<Image
													src={pdfLight}
													className="theme-light-show"
													alt="pdf"
												/>

												:
												<img src={item?.image}
													 alt=""
													 style={{
														 maxHeight: 230,
														 objectPosition: "50% 50%",
														 objectFit: 'cover'
													 }}
													 className={'rounded  w-100 position-relative'}
												/>
											}
											<span className={"d-flex flex-center position-absolute p-0"}
												  style={{top: 10, right: 10}}>
											<i className={'bi bi-trash-fill fs-5 icon '}></i>
										</span>
										</div>

										{item?.note &&
											<div className='text-center  mt-2 limit-rows clamp-2'>
												<span className='mw-250px '>{item?.note}</span>
											</div>
										}
									</div>
								</div>
							)
						})}
						{loadingFile &&
							<div className={'ms-0 m-3 card shadow-sm d-flex flex-center'}
								 style={{height: 100, width: 100}}>
								<span className="spinner-border spinner-border-sm align-middle ms-2"></span>
							</div>
						}
					</div>
				</div>
			}


			{fileRejections.map(({file}, index) => {
				let type = file.path.split('.')
				type = type[type.length - 1]

				return (
					<div className='mt-5 text-center text-danger' key={index}>
						<span className='px-2 py-1  rounded-1'>
							O tipo de arquivo <span className={'fw-bold text-uppercase'}>{type}</span> não é permitido
						</span>
					</div>
				)
			})}
		</div>
	)
}

export default ComponentSelectFile