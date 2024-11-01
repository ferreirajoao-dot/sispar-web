import React, {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Offcanvas} from "react-bootstrap";
import {getOnlyBase64} from "../../../utils/functions";

// import {KTIcon} from "@/ui/components/ts/KTIcon";

import placeholder from "../../../assets/images/photoPlaceholder.png"
import Image from "next/image";
// import WebCamComponent from "./WebCamComponent";

const FbSelectFile = ({attachments,multipleFiles, actionSheet, avatar, titleSelectedImage, onlyImage,styleSelectedFile, mode, showOnlyText = true, onlyBase64, openDirectlyFile, customText, dropCardImage, handleRemove, maxAttachments, sizeAvatar = 100}) => {
	const [files, setFiles] = useState([]);
	const [loadingFile, setLoadingFile] = useState(false);

	const [showActionSheet, setShowActionSheet] = useState(false);
	const [takePicture, setTakePicture] = useState(false);

	const handleClose = () => {
		setShowActionSheet(false);
	}
	const handleShow = () => {
		setShowActionSheet(true)
	};

	const onDrop = useCallback(acceptedFiles => {
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
				if(aux.length === (maxAttachments || 5)) {
					aux = []
					aux.push(binaryStr)

				} else {
					aux.push(binaryStr)

				}

				setFiles([...aux]);

				if (attachments) attachments(onlyBase64 ? binaryStr.base64 : aux);
			};
			reader.readAsDataURL(file)
		})
		setShowActionSheet(false);

	}, [])

	const {getRootProps, getInputProps, open, isDragActive, fileRejections,} = useDropzone(
		{
			onDrop,
			accept: onlyImage ? {'image/png': [], 'image/webp': [],'image/jpg': [],'image/jpeg': []} : {'application/pdf': []},
			noClick: actionSheet || false,
			maxFiles: maxAttachments || 5,
			multiple: multipleFiles,
		})

	const savePicture = (picture) => {
		let aux = files
		aux.push({base64: getOnlyBase64(picture), image:picture})
		attachments(getOnlyBase64(picture))
		setFiles([...aux])
		setTakePicture(false)
	}

	const handleTakePicture = () => {
		setShowActionSheet(false)
		setTakePicture(true);
	}

	const handleRemoveFile = (index) => {
		files.splice(index, 1);
		attachments(files)
		if (handleRemove) {
			handleRemove()
		}
		setFiles([...files]);
	}

	useEffect(() => {
		if (avatar) {
			setFiles([{image:avatar}])
		}
	}, []);
	return (
		<div className={'position-relative d-inline-block'}>

			<div {...getRootProps()} onClick={() => (actionSheet && window.innerWidth < 768) ? handleShow() : open()}>
				<input {...getInputProps()} />

				{(titleSelectedImage && (files.length > 0)) &&
					<h3 className={`text-ibrami-primary text-center`}>{titleSelectedImage}</h3>
				}
				{mode === "avatar" ?
					<div id="my-dropzones">
						<div className="dz-message needsclick justify-content-center">
							<div
								className={`symbol border border-hover-secondary symbol-${sizeAvatar}px symbol-circle cursor-pointer shadow-sm ${loadingFile ? 'border border-gray-500' : ''}`}>
								{(loadingFile) ?
									<div className={'d-flex flex-center symbol-label'}>
										<span className="spinner-border spinner-border-sm "></span>
									</div>
									:
									<>
										{files.length === 0 ?
											<>
												<Image width={100}
													   height={100}
													   style={{padding: 15, objectFit:"contain"}} alt="avatar"
													   src={placeholder}/>
											</> :
											<>
												{files.map((item, index) => (
													<Image key={index}
														   width={sizeAvatar}
														   height={sizeAvatar}
														   style={{objectFit:"cover", padding:2}}
														   alt="Avatar company"
														   src={item?.image }
													/>)
												)}
											</>
										}
									</>

								}
								<button className={'bg-body bg-primary border border-primary btn btn-icon btn-icon-gray-200 btn-sm btn-xs d-flex h-30px position-absolute rounded-circle w-30px'}
										type={"button"}
										style={{bottom: 0, right: 0}}>


									ICON
									{/*<KTIcon iconType={"solid"} iconName={files.length === 0 ? "plus" : "arrows-circle"} size={"2"}/>*/}
								</button>
							</div>
						</div>
					</div>
					:
					<>
						{!files.length > 0 &&
							<>
								{mode === "avatar" ?
									<div id="my-dropzones">
										<div className="dz-message needsclick justify-content-center">
											<div
												className={`symbol border border-hover-secondary symbol-100px symbol-circle cursor-pointer shadow-sm ${loadingFile ? 'border border-gray-500' : ''}`}>
												{loadingFile ?
													<div
														className={'d-flex flex-center min-h-125px min-w-125px rounded-circle'}>
												<span
													className="spinner-border spinner-border-sm align-middle ms-2"></span>
													</div>
													:

													<Image width={80}
														   height={80}
														   style={{objectFit:"contain", padding: files?.image ? 0 : 15}} alt="Avatar company"
														   src={files?.image || placeholder}/>
												}
												<button type={"button"}
														className={'bg-body bg-primary border border-primary btn btn-icon btn-icon-gray-200 btn-sm btn-xs d-flex h-30px position-absolute rounded-circle w-30px'}
														style={{bottom: 0, right: 0}}>
													icon
													{/*<KTIcon iconName={"plus"} size={"1"}/>*/}

												</button>
											</div>
										</div>
									</div>
									:
									<div className={`dropzone shadow ${isDragActive ? 'bg-light-subtle ' : ''} min-h-50px`}
										 id="my-dropzones">
										<div className="dz-message needsclick justify-content-center">
											<div className="text-center">
												<img
													src={dropCardImage}
													style={{maxWidth: 100}}
													className="theme-light-show mb-3"
													alt="pdf"
												/>
												<h3 className="fs-5 fw-bold text-primary mb-1">
													{!isDragActive ? (customText || 'Clique aqui para enviar o arquivo.') :
														<span className={'text-success px-2 py-1 rounded-1'}
															  style={{backgroundColor: '#c8e6c9'}}>
															Solte aqui o arquivo
														</span>
													}
												</h3>
												{showOnlyText &&
													<span className="fs-7 text-muted">Aceitamos somente <strong
														className={`fs-5`}>{onlyImage ? '*PNG, JPG, JPEG' : '*PDF'}</strong></span>
												}
											</div>
										</div>
									</div>
								}
							</>
						}
						{files.length > 0 &&
							<div className={'row justify-content-center'}>
								{files.map((item, index) =>
										<div key={index}
											 className={'col-12 g-2 d-flex justify-content-center align-items-center flex-column'}>
											<div className='position-relative w-100 justify-content-center  dropzone trash-icon d-flex'
												 style={styleSelectedFile ? styleSelectedFile : {cursor: 'pointer', minHeight: 300}}
												 onClick={() => handleRemoveFile(index)}>
												{item?.image?.includes('/pdf') ?
													<img
														src={""}
														className="theme-light-show"
														alt="pdf"
													/>

													:
													<img src={item?.image} alt=""
														 style={{maxHeight: 240, objectPosition: "50% 50%", objectFit: 'cover'}}
														 className={'rounded  w-100 position-relative'}/>
												}

												<span className={'position-absolute'} style={{
													height: "40px",
													width: "40px",
													top: "0",
													right: "0", left: "0", bottom: "0", margin: "auto"}}>
								<div className='p-2 rounded-circle '>
									{/*<BsFillTrashFill size={20}/>*/}
								</div>
							</span>
											</div>

											{item?.note &&
												<div className='mw-150px text-center mt-2' style={{maxWidth:250, overflow:"auto"}}>
													<span className=''>{item?.note}</span>
												</div>
											}


										</div>
								)}
								{loadingFile&&  <div className={'ms-0 m-3 card shadow-sm d-flex align-items-center justify-content-center'} style={{height: 100, width: 100}}>
									<span className="spinner-border spinner-border-sm align-middle ms-2"></span>
								</div>}
							</div>
						}
					</>
				}

			</div>



			{fileRejections.map(({ file }, index) => {
				let type = file.path.split('.')
				type = type[type.length - 1]

				return (
					<div className='text-center mt-2' key={index}>
						<span className='file-denied px-2 py-1  rounded-1'>
							O tipo de arquivo <span className={'fw-bold text-uppercase'}>{type}</span> não é permitido
						</span>
					</div>
				)
			})}

			<Offcanvas show={showActionSheet} onHide={handleClose} placement={"bottom"}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title className={`text-gray-600`}>Selecione uma opção:</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className={`d-flex flex-column gap-3`}>
					<div className={`d-flex element-focus p-2 rounded-2`} onClick={open}>
						<button className={`flex-grow-1 btn-reset d-flex align-items-center gap-2`} >
							{/*<BsImage size={24} className={`text-gray-600`}/> <span className={`fs-5 text-gray-600`}>Selecionar da galeria</span>*/}
						</button>
					</div>

					<div className={`d-flex element-focus p-2 rounded-2`} onClick={handleTakePicture}>
						<button className={`btn-reset d-flex align-items-center gap-2`} >
							{/*<BsFillCameraFill size={24} className={`text-gray-600`}/> <span className={`fs-5 text-gray-600`}>Tirar uma foto</span>*/}
						</button>
					</div>
				</Offcanvas.Body>
			</Offcanvas>

			{/*{takePicture &&*/}
			{/*	<WebCamComponent handleTakePicture={(e) => savePicture(e)} closeCamera={() => setTakePicture(false)}/>*/}
			{/*}*/}
		</div>
	)
}

export default FbSelectFile