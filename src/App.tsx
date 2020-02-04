import React from 'react';
import './App.css';
import FormEngine from "./formEngine";
import {formName, inputFields} from "./sampleConfig/sampleConfig.form";
import {getState, changeState} from './miniRedux/mainRedux';

const App: React.FC = () => {
    return (
            <div>
                <FormEngine
                    formName={formName}
                    inputFields={inputFields}
                    dataSource={getState()}
                    onFieldChangeFunc={(allFieldChanges) =>
                        allFieldChanges.forEach((temp: any) => {
                            changeState({
                                [temp.key]: temp.value
                            });
                    })}
                    onSubmit={(data: Object) => console.error(data)}
                />
            </div>
    );
};

export default App;
