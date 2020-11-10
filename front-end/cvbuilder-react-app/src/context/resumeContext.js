import { createContext } from "react";

const ResumeContext = createContext({
    handleNext: () => { },
    baseInfo: {},
    contactInfo: {},
    docs: [],
})

export default ResumeContext;