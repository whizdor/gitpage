import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import React, { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectList } from "./ProjectList"
import projImg1 from "../assets/img/1.jpg";
import projImg2 from "../assets/img/2.jpg";
import projImg3 from "../assets/img/3.jpg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import DateFilter from './DateFilter';
import Papa from 'papaparse';
import { useEffect } from 'react';
import Data from './unt.csv';

export const Projects = () => {

    const [projects, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(Data);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csvData = decoder.decode(result.value);
            const parsedData = Papa.parse(csvData, {
                header: true,
                skipEmptyLines: true
            }).data;
            setData(parsedData);
        };
        fetchData();
    }, []);

    const [selectedOption, setSelectedOption] = useState('option1');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [view, setView] = useState(true)
    const toggleView = () => {
        setView(prev => !prev)
    }
    const [filteredItems, setFilteredItems] = useState(projects);
    const handleFilter = (startDate, endDate) => {
            const filtered = projects.filter((item) => {
                const deadline = new Date(item.deadline);
                return ((!startDate || deadline >= startDate) && (!endDate || deadline <= endDate));
            });

        setFilteredItems(filtered);
    };

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col size={12}>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                    {/* <h2>Projects</h2>
                                    <p>Google Developer Student Clubs (GDSC) projects encompass a diverse range of innovative initiatives driven by the collaborative efforts of student developers. These projects reflect the GDSC mission to foster technological skills and problem-solving abilities among students while creating a positive impact on their communities and the world. GDSC projects often span various domains, including mobile app development, web applications, machine learning, and more.</p> */}
                                    <div className="d-flex justify-content-center">
                                        <DateFilter onFilter={handleFilter} />
                                        </div>
                                    <div className="d-flex justify-content-center">
                                    <div className="proj-filter-radio">
                                    
                                        <Row >
                                        
                                        <div className="toggler"  >
                                            <p className="toggler-grid">Grid</p>
                                            <div className={view ? "grid" : "list"} onClick={toggleView}>
                                                <div className="toggler-slider-circle"></div>
                                            </div>
                                            <p className="toggler-list">List</p>
                                        </div>
                                        </Row>
                                    </div>
                                    </div>

                                    {view ? <Row>
                                        {
                                            filteredItems.map((project, index) => {
                                                return (
                                                    <ProjectCard
                                                        key={index}
                                                        {...project}
                                                    />
                                                )
                                            })
                                        }
                                    </Row> :
                                        <div>
                                            <div className="proj-list-header" >
                                                <p className="proj-list-header-index">Name</p>
                                                <p className="proj-list-header-deadline">Deadline</p>
                                                <p className="proj-list-header-deadline">Participants</p>
                                            </div>
                                            {
                                                
                                                filteredItems.map((filtered, index) => {
                                                    return (
                                                        <ProjectList
                                                            key={index}
                                                            {...filtered}
                                                            // index={index}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>}

                                </div>}

                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}