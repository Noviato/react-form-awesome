import React from 'react';
import {Button, Col, Form, Row} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import {GetFieldDecoratorOptions, WrappedFormUtils} from "antd/es/form/Form";

interface FormBodyProps extends FormComponentProps {
    inputFields: inputFieldsType,
    onSubmit: (data: Object) => void
}

const FormBody = ({form: {getFieldDecorator, validateFieldsAndScroll}, inputFields, onSubmit} : FormBodyPropsType) => {
    const handleSubmit = () => {
        validateFieldsAndScroll((err: any, values: any) => {
            if (!err) onSubmit(values);
        });
    };

    return (
        <Form>
            <Row gutter={24}>
            {
                inputFields.map(({size, key, element, propsElement, fieldDecorator}) => (
                    <Col span={size} key={key}>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    key,
                                    fieldDecorator
                                )(
                                    element
                                    )
                            }
                        </Form.Item>
                    </Col>
                ))
            }
            </Row>
            <Form.Item>
                <Button onClick={handleSubmit}> Submit </Button>
            </Form.Item>
        </Form>
    );
};

type FormBodyPropsType  = {
    form: WrappedFormUtils
} & FormBodyProps;

type inputConfig = {
    size: number,
    key: string,
    element: Object,
    propsElement: Object,
    fieldDecorator: GetFieldDecoratorOptions
};

export declare type inputFieldsType = Array<inputConfig>;

export declare type FormConfigType = {
    formName: string,
    inputFields: inputFieldsType,
    dataSource: Object,
    onFieldChangeFunc: (listFieldChanged: Array<object>) => void,
    onSubmit: (data: Object) => void
};

const transformDataSourceToMapPropsToFields = (dataSource : Object) => {
    let res = {};
    Object.entries(dataSource).forEach(
        ([key, value] : [string, any]) => {
            res = {
                ...res,
                [key] : Form.createFormField({value})
            }
        });
    return res;
};

const FormEngine = ({formName, inputFields, dataSource, onFieldChangeFunc, onSubmit} : FormConfigType) => {
    const FormEngine = Form.create<FormBodyProps>({
        name: `${formName}-ant`,
        mapPropsToFields: (props) => {
            return {
                ...transformDataSourceToMapPropsToFields(dataSource)
            };
        },
        onFieldsChange: (props, fields, allFields) => {
            onFieldChangeFunc(Object.entries(fields).map(
                ([key,value] : [string,any]) : any => {
                    return {
                        key: value.name,
                        value: value.value
                    }
                }
            ));
        }
    })(
        FormBody
    );
    return <FormEngine inputFields={inputFields} onSubmit={onSubmit}/>;
};

export default FormEngine;