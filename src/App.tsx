import Skeleton from "@mui/material/Skeleton";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useFields } from "./hooks/useFields";
import { useGenerateFrames } from "./hooks/useGenerateFrames";
import { InputFileUpload } from "./components/InputFileUpload/InputFileUpload";
import { Field } from "./components/Field/Field";
import { Images } from "./components/Images/Images";
import "./App.scss";

function App() {
    const {
        amount,
        startTime,
        endTime,
        startTimeValue,
        endTimeValue,
        amountValue,
        startError,
        generationType,
        handleChangeSettings,
        handleChangeType,
    } = useFields();

    const { imagesData, loading, onInputFile } = useGenerateFrames({
        amount,
        startTime,
        endTime,
        generationType,
    });

    return (
        <main className="main">
            <div className="main__fields">
                <Field
                    variant="outlined"
                    type="number"
                    size="small"
                    label="start time of the video to extract frames"
                    name="start"
                    disabled={loading}
                    value={startTimeValue}
                    error={startError}
                    onChange={handleChangeSettings}
                />
                <Field
                    variant="outlined"
                    type="number"
                    size="small"
                    label="end time of the video to extract frames"
                    name="end"
                    disabled={loading}
                    value={endTimeValue}
                    onChange={handleChangeSettings}
                />
                <Field
                    variant="outlined"
                    type="number"
                    size="small"
                    label="number frames to extract"
                    name="amount"
                    disabled={loading}
                    value={amountValue}
                    onChange={handleChangeSettings}
                />
                <RadioGroup
                    className="main__radio-group"
                    aria-labelledby="generation-frames-type-radio-buttons-group"
                    name="generation-frames-type"
                    value={generationType}
                    onChange={handleChangeType}
                >
                    <div>
                        <FormControlLabel
                            value="fps"
                            disabled={loading}
                            control={<Radio />}
                            label="fps - frames are evenly distributed within each second"
                        />
                        <p className="main__fps-warning">
                            Selecting a large time range for frame extraction in
                            the ‘fps’ mode may result in generating a very large
                            number of frames.
                        </p>
                    </div>
                    <FormControlLabel
                        value="totalFrames"
                        disabled={loading}
                        control={<Radio />}
                        label="total - frames are evenly distributed across the specified time range."
                    />
                </RadioGroup>
            </div>
            <InputFileUpload
                className="main__file-upload"
                onChange={onInputFile}
                disabled={loading || startError}
            />
            {loading && (
                <Skeleton
                    className="main__skeleton"
                    variant="rectangular"
                    height={135}
                />
            )}
            {imagesData && imagesData.length > 0 && (
                <Images imagesData={imagesData} />
            )}
        </main>
    );
}

export default App;
