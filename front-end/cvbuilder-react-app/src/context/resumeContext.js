import { createContext } from "react";

const ResumeContext = createContext({ activeStep: 0, setactiveStep: () => { }, handleNext: () => { } })

export default ResumeContext;