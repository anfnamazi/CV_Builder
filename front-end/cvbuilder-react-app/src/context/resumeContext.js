import { createContext } from "react";

const ResumeContext = createContext({
    handleNext: () => { },
    baseInfo: {},
    contactInfo: {},
    docs: [],
    edus: [],
    jobs: [],
    researches: [],
    projects: [],
    initializeData: () => { }
})

export default ResumeContext;