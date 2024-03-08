import { React, useEffect, useState } from "react";
import { fetchDataWithRetries } from "../../Component/function/FunctionApi";
import { DeleteAdmins } from "../../Component/function/Delete/DeleteFunction"
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import "react-loading-skeleton/dist/skeleton.css";
import Edit from "../../Component/img/edit.png";
import {AddProfileTeacher} from "../../Component/function/AddProfileTeacher/AddProfileTeacher"
import { SkeletonRow } from "./Skeletonrow";


function CardProfile() {
    const [educationLevels, setEducationLevels] = useState("");
    const [certifications, setCertifications] = useState("");


    useEffect(() => {
        fetchDataWithRetries("certifications", setCertifications);
        fetchDataWithRetries("education-levels", setEducationLevels);

    }, []);

    const certification = certifications.certifications;
    const EducationLevels = educationLevels.education_levels;


    const DeleteEducation = async (id) => {
        DeleteAdmins(`education-levels/${id}`, "/teacherProfiles", "حذف هذه المستوي", "هل انت متاكد انك تريد حذف هذا المستوي")
    };

    const DeleteCertifications = async (id) => {
        DeleteAdmins(`certifications/${id}`, "/teacherProfiles", "حذف هذه الايجاز", "هل انت متاكد انك تريد حذف هذا الايجاز")
    };

    return (
        <div className="CardProfile" dir="rtl">
            <div className="sectionOne">
                <div className="titleCard">
                    <h2>
                        ايجازات المعلم
                    </h2>
                    <ion-icon name="add-circle-outline" onClick={()=> AddProfileTeacher("certifications", "/teacherProfiles" )} ></ion-icon>
                </div>
                {certification ? certification.map((res) => {
                    return (
                        <Accordion key={res.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{res.name}</Typography>
                            </AccordionSummary>
                            <div className='content'>
                                <AccordionDetails>
                                    <Typography>
                                        {res.description}
                                    </Typography>
                                </AccordionDetails>
                                <div className='image'>
                                    <ion-icon name="trash-outline" onClick={()=> DeleteCertifications(res.id)}></ion-icon>
                                    <img className="Edit" src={Edit} onClick={()=> AddProfileTeacher(`certifications/${res.id}`, "/teacherProfiles", res.name, res.description  )} alt="" />
                                </div>
                            </div>
                        </Accordion>
                    )
                }):(
                    <div className="SkeletonRow">
                        <SkeletonRow/>
                    </div>
                )}
            </div>
            <div className="sectionOne">
                <div className="titleCard">
                    <h2>
                        المستوي التعليمي
                    </h2>
                    <ion-icon name="add-circle-outline" onClick={()=> AddProfileTeacher("education-levels", "/teacherProfiles" )}></ion-icon>
                </div>
                {EducationLevels ? EducationLevels.map((res) => {
                    return (
                        <Accordion key={res.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{res.name}</Typography>
                            </AccordionSummary>
                            <div className='content'>
                                <AccordionDetails>
                                    <Typography>
                                        {res.description}
                                    </Typography>
                                </AccordionDetails>
                                <div className='image'>
                                    <ion-icon name="trash-outline" onClick={()=> DeleteEducation(res.id)}></ion-icon>
                                    <img className="Edit" src={Edit}  onClick={()=> AddProfileTeacher(`education-levels/${res.id}`, "/teacherProfiles", res.name, res.description )} alt="" />
                                </div>
                            </div>
                        </Accordion>
                    )
                }):(
                    <div className="SkeletonRow">
                        <SkeletonRow/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardProfile;
