import type { ChangeEvent } from "react";

import Button from "@mui/material/Button";
import cn from "classnames";

import "./InputFileUpload.scss";

type Props = {
    className?: string;
    disabled: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputFileUpload = ({ className, disabled, onChange }: Props) => {
    return (
        <Button
            className={cn("input-file-upload", className)}
            component="label"
            disabled={disabled}
            role={undefined}
            variant="contained"
            tabIndex={-1}
        >
            Upload video file
            <input
                className="input-file-upload__hidden-input"
                type="file"
                accept="video/*"
                onChange={onChange}
            />
        </Button>
    );
};
