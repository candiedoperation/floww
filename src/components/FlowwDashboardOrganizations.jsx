/*
    Floww
    Copyright (C) 2022  Atheesh Thirumalairajan <howdy@atheesh.org>
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, OutlinedInput, Typography } from '@mui/material';
import axios from 'axios';
import { serverURL } from '../middleware/FlowwServerParamConn';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';

const OrganizationsEditModal = (props) => {
    const [orgEditStates, setOrgEditStates] = React.useState({});
    const [accordionState, setAccordionState] = React.useState(0);
    const [organization, setOrganization] = React.useState({});

    React.useEffect(() => {
        /* UPDATE STATES OF TEMPLATE TEXT FIELDS */
        if (props.organization.contact != undefined) {
            props.organization.contact.email.map((email, index) => {
                updateOrgEditState(`orgEmail${index}`, email)
            })

            props.organization.contact.tel.map((tel, index) => {
                updateOrgEditState(`orgTel${index}`, tel)
            })
        }
    }, [props.organization]);

    const updateOrgEditState = (id, value) => {
        setOrgEditStates((orgEditStates) => ({
            ...orgEditStates,
            [id]: value
        }))
    }

    const handleSubmit = (target) => {
        switch (target) {
            case 'orgName': {

            }
        }
    }

    return (
        <Dialog fullWidth open={props.open} onClose={props.onClose}>
            <DialogTitle>{props.organization.name}</DialogTitle>
            <DialogContent>
                <Accordion onChange={() => { (accordionState === 1) ? setAccordionState(0) : setAccordionState(1) }} expanded={(accordionState === 1)}>
                    <AccordionSummary sx={{ ".MuiAccordionSummary-content": { width: '90%' } }} expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Name</Typography>
                        <Typography sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.organization.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <OutlinedInput
                            sx={{ width: '100%' }}
                            endAdornment={<IconButton disabled={(orgEditStates["orgName"]) ? false : true} onClick={() => { handleSubmit('orgName') }}><CheckIcon /></IconButton>}
                            placeholder='Update Organization Name'
                            value={orgEditStates["orgName"]}
                            onChange={(e) => { updateOrgEditState("orgName", e.target.value) }}>
                        </OutlinedInput>
                    </AccordionDetails>
                </Accordion>
                <Accordion onChange={() => { (accordionState === 2) ? setAccordionState(0) : setAccordionState(2) }} expanded={(accordionState === 2)}>
                    <AccordionSummary sx={{ ".MuiAccordionSummary-content": { width: '90%' } }} expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Email</Typography>
                        <Typography sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(props.organization.contact) ? props.organization.contact.email.join(" ") : "None"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {(!props.organization.contact) ? <></> :
                            props.organization.contact.email.map((email, index) => {
                                return (
                                    <OutlinedInput
                                        sx={{ width: '100%', marginBottom: '10px' }}
                                        endAdornment={<IconButton disabled={(orgEditStates[`orgEmail${index}`]) ? false : true} onClick={() => { handleSubmit(`orgEmail${index}`) }}><CheckIcon /></IconButton>}
                                        placeholder='Edit Email Address'
                                        value={orgEditStates[`orgEmail${index}`]}
                                        onChange={(e) => { updateOrgEditState(`orgEmail${index}`, e.target.value) }}>
                                    </OutlinedInput>
                                )
                            })}
                        <OutlinedInput
                            sx={{ width: '100%' }}
                            endAdornment={<IconButton disabled={(orgEditStates["orgEmailNew"]) ? false : true} onClick={() => { handleSubmit('orgEmailNew') }}><CheckIcon /></IconButton>}
                            placeholder='Add an Email Address'
                            value={orgEditStates["orgEmailNew"]}
                            onChange={(e) => { updateOrgEditState("orgEmailNew", e.target.value) }}>
                        </OutlinedInput>
                    </AccordionDetails>
                </Accordion>
                <Accordion onChange={() => { (accordionState === 3) ? setAccordionState(0) : setAccordionState(3) }} expanded={(accordionState === 3)}>
                    <AccordionSummary sx={{ ".MuiAccordionSummary-content": { width: '90%' } }} expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Phone</Typography>
                        <Typography sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(props.organization.contact) ? (props.organization.contact.tel.length > 0) ? props.organization.contact.tel.join(", ") : "None" : "None"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {(!props.organization.contact) ? <></> :
                            props.organization.contact.tel.map((tel, index) => {
                                return (
                                    <OutlinedInput
                                        sx={{ width: '100%', marginBottom: '10px' }}
                                        endAdornment={<IconButton disabled={(orgEditStates[`orgTel${index}`]) ? false : true} onClick={() => { handleSubmit(`orgTel${index}`) }}><CheckIcon /></IconButton>}
                                        placeholder='Edit Phone Number'
                                        value={orgEditStates[`orgTel${index}`]}
                                        onChange={(e) => { updateOrgEditState(`orgTel${index}`, e.target.value) }}>
                                    </OutlinedInput>
                                )
                            })}
                        <OutlinedInput
                            sx={{ width: '100%' }}
                            endAdornment={<IconButton disabled={(orgEditStates["orgTelNew"]) ? false : true} onClick={() => { handleSubmit('orgTelNew') }}><CheckIcon /></IconButton>}
                            placeholder='Add a Phone Number'
                            value={orgEditStates["orgTelNew"]}
                            onChange={(e) => { updateOrgEditState("orgTelNew", e.target.value) }}>
                        </OutlinedInput>
                    </AccordionDetails>
                </Accordion>
                <Accordion onChange={() => { (accordionState === 4) ? setAccordionState(0) : setAccordionState(4) }} expanded={(accordionState === 4)}>
                    <AccordionSummary sx={{ ".MuiAccordionSummary-content": { width: '90%' } }} expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Admins</Typography>
                        <Typography sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis' }}>Click to View</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        
                    </AccordionDetails>
                </Accordion>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

const FlowwDashboardOrganizations = (props) => {
    const [organizations, setOrganizations] = React.useState([]);
    const [collapseOpen, setCollapseOpen] = React.useState(0);
    const [orgEditModalOpen, setOrgEditModalOpen] = React.useState(false);
    const [orgEditModalChoice, setOrgEditModalChoice] = React.useState({});

    React.useEffect(() => {
        axios
            .get(`${serverURL}/api/user/memberoforg`,
                { withCredentials: true }
            )
            .then((res) => {
                setOrganizations((organizations) => res.data);
            })
            .catch((res) => {
                //Alert
            })
    }, []);

    const handleCollapse = (trigger) => {
        if (trigger == collapseOpen) {
            setCollapseOpen(0);
        } else {
            setCollapseOpen(trigger);
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%', width: '100%' }}>
            <OrganizationsEditModal organization={orgEditModalChoice} open={orgEditModalOpen} onClose={() => { setOrgEditModalOpen(false) }} />
            <Box>
                <Box sx={{ display: 'flex' }}>
                    <Button variant="contained" startIcon={<AddIcon />}>Create Organization</Button>
                </Box>
                <Typography variant='h4' sx={{ fontWeight: 'medium', color: 'text.secondary', paddingTop: '15px' }}>You're a part of...</Typography>
            </Box>
            <List sx={{ overflow: 'scroll', flexGrow: 1 }}>
                {
                    (!organizations.length > 0) ?
                        <Typography variant="h5">No Organizations. Create one, or ask someone to add you.</Typography> :
                        organizations.map((organization) => {
                            return (
                                <>
                                    <ListItemButton onClick={() => { handleCollapse(organization.name); }}>
                                        {(collapseOpen === organization.name) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        <ListItemText sx={{ marginLeft: '10px' }} primary={organization.name} secondary={organization.contact.email[0]} />
                                        {
                                            (organization.administrators.find(({ _id }) => _id === props.userData.id)) ?
                                            <IconButton onClick={() => { setOrgEditModalChoice(organization); setOrgEditModalOpen(true); }}><EditIcon /></IconButton> : 
                                            <></>
                                        }
                                    </ListItemButton>
                                    <Collapse sx={{ marginLeft: '35px' }} in={(collapseOpen === organization.name) ? true : false} unmountOnExit>
                                        {
                                            (!organization.subOrganizations.length > 0) ?
                                                <ListItem>
                                                    <ListItemIcon><WarningIcon /></ListItemIcon>
                                                    <ListItemText primary="Sub-Organizations aren't a part of this organization" secondary="They represent a school in a school district" />
                                                </ListItem> :
                                                organization.subOrganizations.map((subOrganization) => {
                                                    return (
                                                        <h1>1</h1>
                                                    )
                                                })
                                        }
                                    </Collapse>
                                </>
                            )
                        })
                }
            </List>
        </Box>
    )
}

export default FlowwDashboardOrganizations;