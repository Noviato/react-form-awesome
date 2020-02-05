import React, {createRef, useState} from 'react';
import './App.css';
import {FormEngine} from "./formEngine";
import {formName, inputFields} from "./sampleConfig/sampleConfig.form";
import {FormComponentProps} from "antd/lib/form";
import {Button} from "antd";

const App: React.FC = () => {
    const formRef = createRef<FormComponentProps>();

    const [info, setInfo] = useState({
        name: 'Nguyen Hai Long',
        userName: 'anonyhostvn'
    });
    console.log(info);

    return (
            <div>
                <FormEngine
                    formName={formName}
                    inputFields={inputFields}
                    dataSource={info}
                    onFieldChangeFunc={(listFieldChanged) =>
                        listFieldChanged.forEach((temp) => {
                            setInfo({
                                ...info,
                                [temp.key]: temp.value
                            });
                    })}
                    onSubmit={(data: Object) => console.error(data)}
                    wrappedComponentRef={formRef}
                />

                <Button onClick={() => console.log(formRef)}> Click </Button>
                <Button onClick={() => {
                    setInfo({
                        ...info,
                        name: 'Nguyen hai An'
                    });
                }}> Click to change name </Button>
            </div>
    );
};

export default App;
