import { createContext } from "react";

const ResumeContext = createContext({
    activeStep: 0,
    setactiveStep: () => { },
    handleNext: () => { },
    baseInfo: {},
    setbaseInfo: () => { },
    contactInfo: {},
    setcontactInfo: () => { }
})

export default ResumeContext;