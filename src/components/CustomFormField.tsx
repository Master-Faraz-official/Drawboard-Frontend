/* eslint-disable no-unused-vars */
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useState } from "react";


export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PASSWORD = "password",
}


interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    className?: string,
    children?: React.ReactNode;
    fieldType: FormFieldType;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
    const [showPassword, setShowPassword] = useState(false);
    switch (props.fieldType) {


        case FormFieldType.INPUT:
            return (
                <div className={`flex rounded-md border `}>
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || "icon"}
                            className="ml-2"
                        />
                    )}

                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            {...field}
                            className="text-[14px] leading-[18px] font-medium focus-visible:ring-0 focus-visible:ring-offset-0 text-dark-700 border-0"
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.PASSWORD:
            return (
                <div className={`flex rounded-md border `}>
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || "icon"}
                            className="ml-2"
                        />
                    )}

                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="text-[14px] leading-[18px] font-medium focus-visible:ring-0 focus-visible:ring-offset-0 text-dark-700 border-0"
                        />
                    </FormControl>
                    <button
                        type="button"
                        className=" px-1"

                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20}  className="text-[#919090]"/> : <Eye size={20}className="text-[#666666]" />}
                    </button>
                </div>
            );



        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={props.placeholder}
                        {...field}
                        className=" placeholder:text-dark-600 border-dark-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
                        disabled={props.disabled}
                    />
                </FormControl>
            );


        default:
            return null;
    }
};

const CustomFormField = (props: CustomProps) => {
    const { control, name, label, className } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={`${className}`}>
                    {label && (
                        <FormLabel className="text-[14px] leading-[18px] font-medium ">{label}</FormLabel>
                    )}
                    <RenderInput field={field} props={props} />

                    <FormMessage className="text-red-400" />
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;