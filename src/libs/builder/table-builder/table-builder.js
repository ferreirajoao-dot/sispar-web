import {Masks} from "@/helpers/helpers";
import {KTIcon} from "@/ui/components/ts/KTIcon";
import TBSwitch from "@/ui/components/builder/table-builder/components/tb-switch";
import TbAnimatedDropdown from "@/ui/components/builder/table-builder/components/tb-animated-dropdown";
import moment from "moment";
import NumberFormat from "react-number-format";
import Rating from "@/ui/components/Rating";

export default function TableBuilder(props) {
    const { columns, data, isLoading } = props

    const getNestedValue = (obj, path) => {
        if (!path || typeof path !== 'string') {
            return undefined;
        }
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    return (
        <div id="" className="table-responsive h-100">
            <table className="table align-middle table-striped table-row-dashed fs-6 gy-3 gs-1 dataTable  position-relative">
                <thead>
                    <tr role="row" className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                        {columns.map(({
                                          label,
                                          accessor,
                                          sortable,
                                          checkbox,
                                          fixed,
                                          className,
                                          type,
                                              ...props
                                          }, indexColumns) => {
                                const cl =  ""
                                const yo = ""

                                if (props?.hidden) {
                                    return <React.Fragment key={indexColumns + 'column'}></React.Fragment>
                                }

                                if (checkbox) {
                                    return (
                                        <th key={indexColumns + accessor +'column'}>
                                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                                                <input className="form-check-input"
                                                       type="checkbox"
                                                       defaultValue={1}
                                                />
                                            </div>
                                        </th>
                                    );
                                }

                                return (
                                    <th key={indexColumns + accessor + 'column'}
                                        className={`${type === "actions" ? "text-end " : ""} ${className || ""}`}
                                        style={fixed ? {
                                            position: "sticky",
                                            right: 0,
                                            ...props.style
                                        } : {...props.style}}
                                >
                                <div className={yo}>
                                    <i className={cl + " fs-12 text-muted"}></i>
                                    {label}
                                </div>
                            </th>);
                        })}
                    </tr>
                </thead>

                <tbody className="fw-semibold text-gray-600">
                    {(isLoading) &&
                       <tr>
                           <td colSpan={columns.length}>
                               <div style={{inset: 0}}
                                    className={'d-flex gap-2 mt-12 flex-center position-absolute fw-semibold text-gray-700'}>
                                   <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                                   <span className={"fs-3"}>Carregando...</span>
                               </div>
                           </td>
                       </tr>
                    }
                    {data?.map((item, indexData) => {
                        return (
                            <tr key={indexData}>
                                {columns.map(({
                                                  label,
                                                  accessor,
                                                  checkbox,
                                                  link,
                                                  linkId,
                                                  actions,
                                                  image,
                                                  type,
                                                  ...propsColumn
                                }, indexBody) => {
                                    let value = getNestedValue(item, accessor);

                                    let position = item


                                    if (propsColumn?.cell) {
                                        return (
                                            <td key={indexBody}>
                                                {propsColumn.cell(position)}
                                            </td>
                                        )
                                    } else if (type === "switch") {
                                        return (
                                            <td key={indexBody}>
                                                {/*Quando clicar no switch retorna o value e a posicao clicada*/}
                                                <TBSwitch onChange={(checked) => {
                                                    if ( propsColumn?.onChange) {
                                                        propsColumn?.onChange(checked, position)
                                                    }
                                                }} isChecked={value}/>
                                            </td>
                                        )
                                    } else if (type === "currency") {
                                        return (
                                            <td key={indexBody}>
                                                R$ {Masks.realCurrency(value)}
                                            </td>
                                        )
                                    } else if (type === "number-format") {
                                        let mask = ""

                                        switch (propsColumn?.mask) {
                                            case 'cpf':
                                                mask = "###.###.###-##"
                                                break;
                                            default:
                                                mask = "";
                                        }

                                        return (
                                            <td key={indexBody}>
                                                <NumberFormat value={value || ""}
                                                              displayType={'text'}
                                                              format={mask}
                                                />
                                            </td>
                                        )
                                    } else if (type === "actions") {
                                        return (
                                            <td className={"text-end"} key={indexBody}>
                                                <TbAnimatedDropdown selected={position}
                                                                    {...props}
                                                />
                                            </td>
                                        )
                                    } else if (type === "date-time") {
                                        return (
                                            <td className={propsColumn?.td?.className || ""} key={indexBody}>
                                                {moment(value).format(propsColumn?.format || "DD/MM/YYYY HH:mm")}
                                            </td>
                                        )
                                    } else {

                                    }

                                    if (value) {
                                        return (
                                            <td key={indexBody}>
                                                {value}
                                            </td>
                                        )
                                    }

                                    return (
                                        <td key={indexBody}>
                                            __
                                        </td>
                                    )

                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot/>
            </table>
            {data?.length > 0 &&
                <div className={"fs-7 mt-4 text-gray-700"}>
                    <span>Exibindo {data?.length} registro(s)</span>
                </div>
            }
        </div>
    )
}
