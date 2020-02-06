import {Input} from "antd";
import {inputFieldsType} from "../formEngine";

export const inputFields: inputFieldsType = [
    {
        size: 12,
        key: 'name',
        Element: Input,
        propsElement: {},
        fieldDecorator: {
            rules: [
                {
                    required: true,
                    message: 'Must fill this field'
                }
            ]
        }
    },
    {
        size: 12,
        key: 'userName',
        Element: Input,
        propsElement: {},
        fieldDecorator: {}
    }
];

export const formName = 'my-form';