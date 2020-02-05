import React, {forwardRef, useImperativeHandle} from 'react';
import {Button, Col, Form, Row} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import {GetFieldDecoratorOptions, WrappedFormUtils} from "antd/es/form/Form";

type inputConfig = {
    size: number,
    key: string,
    Element: any,
    propsElement: Object,
    fieldDecorator: GetFieldDecoratorOptions
};

export declare type inputFieldsType = Array<inputConfig>;

export declare type fieldChangeType = {
    key: string,
    value: any
}

interface FormBodyProps extends FormComponentProps {
    inputFields: inputFieldsType,
    onSubmit: (data: Object) => void,
    formName: string,
    dataSource: Object,
    onFieldChangeFunc: (listFieldChanged: Array<fieldChangeType>) => void,
}

const FormBody = forwardRef<FormComponentProps, FormBodyProps>(
    ({form: {getFieldDecorator, validateFieldsAndScroll}, inputFields, onSubmit, form} : FormBodyProps & {form : WrappedFormUtils}, ref) => {
        useImperativeHandle(ref, () => ({form}));

        const handleSubmit = () => {
            validateFieldsAndScroll((err: any, values: any) => {
                if (!err) onSubmit(values);
            });
        };

        return (
            <Form>
                <Row gutter={24}>
                {
                    inputFields.map(({size, key, Element, propsElement: {...propsElement}, fieldDecorator}) => (
                        <Col span={size} key={key}>
                            <Form.Item>
                                {
                                    getFieldDecorator(
                                        key,
                                        fieldDecorator
                                    )(
                                        <Element {...propsElement}/>
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
});

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

export const FormEngine = Form.create<FormBodyProps>({
        name: `awesome-form`,
        mapPropsToFields: ({dataSource}) => {
            return {
                ...transformDataSourceToMapPropsToFields(dataSource)
            };
        },
        onFieldsChange: ({onFieldChangeFunc}, fields) => {
            onFieldChangeFunc(Object.entries(fields).map(
                ([key,value] : [string,any]) : any => {
                    return {
                        key: value.name,
                        value: value.value
                    }
                }
            ));
        }
})(FormBody);