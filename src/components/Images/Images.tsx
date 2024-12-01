import cn from "classnames";

import { getAnchorDownloadAttribute } from "../../utils/getAnchorDownloadAttribute";
import "./Images.scss";

type Props = {
    className?: string;
    imagesData: string[];
};

export const Images = ({ imagesData, className }: Props) => {
    return (
        <div className={cn("images", className)}>
            {imagesData.map((imageUrl, index) => (
                <a
                    className="images__link"
                    key={imageUrl}
                    href={imageUrl}
                    download={getAnchorDownloadAttribute(index)}
                >
                    <span className="images__hidden-link-description">
                        Download image number {index + 1}
                    </span>
                    <img className="images__image" src={imageUrl} alt="" />
                </a>
            ))}
        </div>
    );
};
