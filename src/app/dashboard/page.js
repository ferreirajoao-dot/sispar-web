import ComponentDocuments from "@/ui/components/component-documents";
import ComponentResumeEntity from "@/ui/components/component-resume-entity";
import api from "@/services/api";

export default async function DashboardPage(props) {
    let entityFlowProcessIdentifier = null;
    let entityFlowProcess = null;

    try {
        const res = await api.get("/restrict/entity-flow/paginate");
        entityFlowProcessIdentifier = res.object?.data[0].identifier;
        entityFlowProcess = await api.get(`/restrict/entity-flow/${entityFlowProcessIdentifier}`);

    } catch (e) {
    }
    return (
        <div className={"mt-15"}>
            <div className={"container"}>
                <ComponentResumeEntity/>
            </div>
            <div className="container-fluid container-xxl">
                <ComponentDocuments serverData={{entityFlowProcessIdentifier, entityFlowProcess}}/>
            </div>
        </div>
    )
}