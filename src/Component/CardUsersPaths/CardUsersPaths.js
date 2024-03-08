import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchDataWithRetries } from "../../Component/function/FunctionApi"
import deleteImg from "../../Component/img/material-symbols_delete.png";
import editImg from "../../Component/img/tabler_edit.png"
import addImg from "../../Component/img/icon-park-outline_add.png"
import { DeleteAdmins } from "../function/Delete/DeleteFunction";
import {Paths} from "../function/UserPaths/UsersPathsfunction"
import active from "../../Component/img/circle.png"
import NotActive from "../../Component/img/record.png"
import {SkeletonRow} from "./skeletonrow"
import "./CardUsersPaths.css"

function CardUsersPaths() {
    const [data, setData] = useState("")
    useEffect(() => {
        fetchDataWithRetries("paths", setData)
    }, [])
    const dataCard = data.paths

    const DeletePaths = async (id) => {
        DeleteAdmins(
            `paths/${id}`,
            `/usersPaths`,
            "حذف هذا المسار",
            "هل انت متاكد انك تريد الحذف"
        );
    };

    const DeletePathsItems = async (id) => {
        DeleteAdmins(
            `paths/items/${id}`,
            `/usersPaths`,
            "حذف هذا المسار",
            "هل انت متاكد انك تريد الحذف"
        );
    };

    return (
        <div className="CardUser">
            {dataCard ?
                dataCard.map((Cards) => {
                    return (
                        <div className='Card' key={Cards.id}>
                            <div className='titleCard'>
                                <div>
                                    <h2>{Cards.status === "active" ? <img className="active" src={NotActive} alt="" /> : <img className="active" src={active} alt="" />}
                                    {Cards.title} 
                                    </h2>
                                    <p>{Cards.description}</p>
                                </div>
                                <div className='image'>
                                    <div>
                                        <img className="add" onClick={() => Paths("paths/items", Cards.id,"",true)} src={addImg} alt="" />
                                        <img className="Edit" onClick={() => Paths( `paths/${Cards.id}` ,Cards.id, dataCard )} src={editImg} alt="" />
                                        <img className="delete" onClick={() => DeletePaths(Cards.id)} src={deleteImg} alt="" />
                                    </div>
                                </div>
                            </div>
                            {Cards.path_items.map((res) => {
                                return (
                                    <Accordion key={res.id}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                        <Typography>{res.status === "active" ? <img className="active" src={NotActive} alt="" /> : <img className="active" src={active} alt="" />} {res.title}</Typography>
                                        </AccordionSummary>
                                        <div className='content'>
                                            <AccordionDetails>
                                                <Typography>
                                                    {res.description}
                                                </Typography>
                                            </AccordionDetails>
                                            <div className='image'>
                                                <img className="Edit" onClick={() => Paths(`paths/items/${res.id}`,res.id, Cards.path_items)} src={editImg} alt="" />
                                                <img className="delete" onClick={() => DeletePathsItems(res.id)} src={deleteImg} alt="" />
                                            </div>
                                        </div>
                                        
                                    </Accordion>
                                )
                            })}
                        </div>
                    )
                }):(
                    <SkeletonRow />
                )}
        </div>
    );
}

export default CardUsersPaths;
