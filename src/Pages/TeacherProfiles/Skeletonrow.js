import Skeleton from "react-loading-skeleton";
import Edit from "../../Component/img/edit.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SkeletonRow = () =>
    Array(5)
        .fill()
        .map((_, index) => (
            <Accordion key={index}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        <Skeleton width={300} height={15} />
                    </Typography>
                </AccordionSummary>
                <div className="content">
                    <AccordionDetails>
                        <Typography>
                            <Skeleton width={240} height={15} />
                            <Skeleton width={240} height={15} />
                            <Skeleton width={240} height={15} />
                        </Typography>
                    </AccordionDetails>
                    <div className="image">
                        <ion-icon name="trash-outline"></ion-icon>
                        <img className="Edit" src={Edit} alt="" />
                    </div>
                </div>
            </Accordion>
        ));
