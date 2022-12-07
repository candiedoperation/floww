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
                <Accordion>
                    <AccordionSummary sx={{ ".MuiAccordionSummary-content": { width: '90%' } }} expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Name</Typography>
                        <Typography sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.organization.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <OutlinedInput
                            sx={{ width: '100%' }}
                            endAdornment={<IconButton disabled={(orgEditStates["orgName"]) ? false : true} onClick={() => { handleSubmit('orgName') }}><CheckIcon /></IconButton>}
                            placeholder='Organization Name'
                            value={orgEditStates["orgName"]}
                            onChange={(e) => { updateOrgEditState("orgName", e.target.value) }}>
                        </OutlinedInput>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary sx={{ ".MuiAccordionSummary-content": { width: '90%' } }} expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Email</Typography>
                        <Typography sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(props.organization.contact) ? props.organization.contact.email.join(" ") : "None"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <OutlinedInput
                            sx={{ width: '100%' }}
                            endAdornment={<IconButton disabled={(orgEditStates["orgName"]) ? false : true} onClick={() => { handleSubmit('orgName') }}><CheckIcon /></IconButton>}
                            placeholder='Organization Name'
                            value={orgEditStates["orgName"]}
                            onChange={(e) => { updateOrgEditState("orgName", e.target.value) }}>
                        </OutlinedInput>
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
                                        {(organization.administrators.indexOf(props.userData.id) > -1) ? <IconButton onClick={() => { setOrgEditModalChoice(organization); setOrgEditModalOpen(true); }}><EditIcon /></IconButton> : <></>}
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