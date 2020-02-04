import React from "react";
import {Input, Select} from "antd";
import { inputFieldsType} from "../formEngine";

export const inputFields : inputFieldsType = [
    {
        size: 12,
        key: 'name',
        element: <Input/>,
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
        element: <Input/>,
        propsElement: {},
        fieldDecorator: {}
    },
    {
        size: 12,
        key: 'type',
        element:
            (<Select>
                <Select.Option key={'stock'}>
                    stock
                </Select.Option>
                <Select.Option key={'bonds'}>
                    bonds
                </Select.Option>
            </Select>),
        propsElement: {},
        fieldDecorator: {
            initialValue: 'stock'
        }
    }
];

export const formName = 'my-form';