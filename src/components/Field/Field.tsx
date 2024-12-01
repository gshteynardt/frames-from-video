import TextField, { TextFieldProps } from "@mui/material/TextField";

import cn from "classnames";

import "./Field.scss";

export const Field = ({ label, className, ...props }: TextFieldProps) => {
    return (
        <div className={cn("field", className)}>
            <TextField {...props} className={cn("field__input")} />
            <span>{label}</span>
        </div>
    );
};
