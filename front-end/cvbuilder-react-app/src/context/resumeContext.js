import { createContext } from "react";

const ResumeContext = createContext({
    handleNext: () => { },
    baseInfo: {},
    contactInfo: {},
    docs: [],
    edus: [],
    jobs: []
})

export default ResumeContext;