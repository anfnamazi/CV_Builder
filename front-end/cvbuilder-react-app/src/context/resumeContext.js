import { createContext } from "react";

const ResumeContext = createContext({
    handleNext: () => { },
    allResume: {},
    initializeData: () => { }
})

export default ResumeContext;