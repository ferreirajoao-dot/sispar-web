"use client"

import ComponentsNumberValidation from "@/ui/components/builder/components/components-number-validation";
import Modal from "react-bootstrap/Modal";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

export default function ModalNumberValidation({modal, setModal, redirectTo, onFinish}) {
    const router = useRouter();


    const onHide = async () => {
        if (onFinish) {
            await onFinish();
        }
        setModal(false);
        if (redirectTo) {
            router.replace(redirectTo);
            // toast.loading("Um momento, você será redirecionado...", {toastId: "1"});

        }
    }

    return (
        <Modal show={modal}
               backdrop={"static"}
               size={"lg"}
               centered={true}
        >
            <ComponentsNumberValidation onSkip={onHide}/>
        </Modal>
    )
}
