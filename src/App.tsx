import { useFields } from './hooks/useFields';
import { useGenerateFrames } from './hooks/useGenerateFrames';
import { getAnchorDownloadAttribute } from './utils/getAnchorDownloadAttribute';
import './App.css';

function App() {
    const {
        handleChangeTime,
        startTime,
        endTime,
        startError,
    } = useFields();

    const {
        images,
        loading,
        onInputFile,
    } = useGenerateFrames();

    return (
        <>
            {images && (
                <div className="timeline">
                    {images.map((imageUrl, index) => (
                        <a
                            className="link"
                            key={imageUrl}
                            href={imageUrl}
                            download={getAnchorDownloadAttribute(index)}
                        >
                            <span className="hidden-link-description">
                                Download image number {index + 1}
                            </span>
                            <img className="image" src={imageUrl} alt="" />
                        </a>
                    ))}
                </div>
            )}
        </>
    )
}

export default App;
