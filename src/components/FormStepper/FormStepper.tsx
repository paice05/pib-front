import React from "react";

import { useHistory } from "react-router-dom";
import { FormikConfig, FormikValues, Formik, Form } from "formik";

import { FormikStepProps } from "./FormStep";

type Props = FormikConfig<FormikValues>;

const FormStepper: React.FC<Props> = (props) => {
    const { children } = props;

    const history = useHistory();

    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];

    const [step, setStep] = React.useState(0);

    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;

    const isLastStep = () => {
        return step === childrenArray.length - 1;
    };

    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    // last step
                    await props.onSubmit(values, helpers);
                } else {
                    setStep((prevState) => prevState + 1);
                }
            }}
        >
            <Form autoComplete="off">
                {currentChild}
                <div className="row">
                    <div className="col-6" style={{ display: "flex", justifyContent: "flex-end" }}>
                        {step > 0 ? (
                            <button className="btpadrao" onClick={() => setStep((prevState) => prevState - 1)}>
                                ANTERIOR
                            </button>
                        ) : (
                            <button className="btpadrao" onClick={() => history.push("/")}>
                                Login
                            </button>
                        )}
                    </div>
                    <div className="col-6">
                        <button className="btpadrao" type="submit">
                            {isLastStep() ? "FINALIZAR" : "PRÓXIMO"}
                        </button>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default FormStepper;