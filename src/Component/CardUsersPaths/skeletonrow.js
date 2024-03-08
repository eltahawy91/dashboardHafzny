import Skeleton from "react-loading-skeleton";
import editImg from "../img/tabler_edit.png";
import deleteImg from "../img/material-symbols_delete.png";
import addImg from "../../Component/img/icon-park-outline_add.png"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const SkeletonRow = () => (
    Array(5).fill().map((_, index) => (
        <div className='Card' key={index}>
            <div className='titleCard'>
                <div>
                    <Skeleton width={150} height={20} />
                    <Skeleton width={150} height={20} />
                </div>
                <div className='image'>
                    <div>
                        <img className="delete" src={deleteImg} alt="" />
                        <img className="Edit" src={editImg} alt="" />
                        <img className="add" src={addImg} alt="" />
                    </div>
                </div>
            </div>
            {Array(5).fill().map((_, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Skeleton width={200} height={20} />
                    </AccordionSummary>
                    <div className='content'>
                        <AccordionDetails>
                            <Typography>
                                <Skeleton width={180} height={15} />
                                <Skeleton width={180} height={15} />
                                <Skeleton width={180} height={15} />
                            </Typography>
                        </AccordionDetails>
                        <div className='image'>
                            <img className="delete" src={deleteImg} alt="" />
                            <img className="Edit" src={editImg} alt="" />
                        </div>
                    </div>
                </Accordion>
            ))}
        </div>

    )));
