import Swal, {SweetAlertIcon, SweetAlertOptions} from "sweetalert2";

interface NotifyOptionsProps {
    title: string;
    text: string;
    icon?: SweetAlertIcon;
    submitFn?: () => void | Promise<void>;
    confirmButtonText: string;
    denyButtonText?: string;
    confirmButtonType?: ConfirmButtonType;
}

type ConfirmButtonType = 'primary' | 'warning' | 'danger' | 'info' | 'success';

const notify = async (options: NotifyOptionsProps): Promise<any> => {
    const {
        title,
        text,
        icon = "info",
        submitFn,
        confirmButtonText,
        denyButtonText,
        confirmButtonType
    } = options

    const iconLabels: { [key in SweetAlertIcon]: string } = {
        success: 'success',
        error: 'danger',
        warning: 'warning',
        info: 'info',
        question: 'primary'
    };
    const buttonType = confirmButtonType || iconLabels[icon];

    try {
        let { value } = await Swal.fire({
            title: title,
            html: text,
            icon: icon as SweetAlertIcon,
            confirmButtonText: confirmButtonText,
            denyButtonText: denyButtonText ? denyButtonText : "Cancelar",
            showDenyButton: !!denyButtonText,
            showCancelButton: false,
            reverseButtons: false,
            customClass: {
                confirmButton: `btn btn-${buttonType}`,
                denyButton: `btn btn-outline  btn-outline-danger btn-active-light-danger`
            }
        });

        if (value) {
            try {
                if (submitFn) {
                    await submitFn();
                }
            } catch (e) {
                throw e;
            }
        } else {
            throw new Error("Value is undefined");
        }
    } catch (e) {
        throw e;
    }
};

export default notify;