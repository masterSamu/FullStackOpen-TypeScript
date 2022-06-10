import diagnoses from "../../data/diagnosesData";
import { Diagnose } from "../types";

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default { getEntries };
