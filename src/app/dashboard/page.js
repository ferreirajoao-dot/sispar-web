import ComponentDocuments from "@/ui/components/component-documents";
import ComponentResumeEntity from "@/ui/components/component-resume-entity";
import api from "@/services/api";
import _ from "lodash";

export default async function DashboardPage(props) {
    let entityFlowProcessIdentifier = null;
    let entityFlowProcess = null;
    let initialStatus = "PENDING-UPLOAD";
    let isApproved = false;

    try {
        const res = await api.get("/restrict/entity-flow/paginate");
        entityFlowProcessIdentifier = res.object?.data[0].identifier;
        entityFlowProcess = await api.get(`/restrict/entity-flow/${entityFlowProcessIdentifier}`);

        if (entityFlowProcess.object.status === "APPROVED") {
            isApproved = true;
        }

        const counts = _.countBy(entityFlowProcess.object.entity_documents, "status");

        const allStatus = ['WAITING-VALIDATION', 'PENDING-UPLOAD', 'RETURNED', 'APPROVED'];

        allStatus.forEach(key => {
            if (!counts.hasOwnProperty(key)) {
                counts[key] = 0;
            }
        });

        if (counts?.["WAITING-VALIDATION"] === 0) {
            if (counts?.["RETURNED"] > 0) {
                initialStatus = "RETURNED";
            } else {
                initialStatus = "APPROVED";
            }
        } else if (counts?.["RETURNED"] > 0) {
            initialStatus = "RETURNED";
        } else if (counts?.["RETURNED"] === 0 && entityFlowProcess?.object?.status === "RETURNED") {
            initialStatus = "WAITING-VALIDATION";
        } else if (counts["WAITING-VALIDATION"] > 0) {
            initialStatus = "WAITING-VALIDATION";
        }
    } catch (e) {
    }
    return (
        <div className={"mt-15"}>
            <div className={"container"}>
                <ComponentResumeEntity/>
            </div>
            <div className="container-fluid container-xxl">
                <ComponentDocuments serverData={{entityFlowProcessIdentifier, entityFlowProcess, initialStatus, isApproved}}/>
            </div>
        </div>
    )
}