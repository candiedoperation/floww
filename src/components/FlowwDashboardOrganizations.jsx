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
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import WarningIcon from '@mui/icons-material/Warning';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, OutlinedInput, Typography, alpha } from '@mui/material';
import axios from 'axios';
import { serverURL } from '../middleware/FlowwServerParamConn';
import * as React from 'react';
import { MD5 } from 'crypto-js';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

const OrganizationsEditModal = (props) => {
    const [isConnecting, setIsConnecting] = React.useState(false);
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

    const handleSubmit = (target, data) => {
        setIsConnecting(true);
        axios
            .post(
                `${serverURL}/api/orgz/${target}`, data,
                { withCredentials: true }
            )
            .then((res) => {
                setAccordionState(0);
                setOrgEditStates((orgEditStates) => ({}));
                setIsConnecting(false);
                props.fetchOrganizations();
            })
            .catch((res) => {
                //Alert
            })
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
                            disabled={isConnecting}
                            endAdornment={<IconButton disabled={!isConnecting && (orgEditStates["orgName"]) ? false : true} onClick={() => { handleSubmit('updatename', { name: orgEditStates["orgName"], orgId: props.organization._id }) }}><CheckIcon /></IconButton>}
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
                                        disabled={isConnecting}
                                        sx={{ width: '100%', marginBottom: '10px' }}
                                        placeholder='Edit Email Address'
                                        value={orgEditStates[`orgEmail${index}`]}
                                        onChange={(e) => { updateOrgEditState(`orgEmail${index}`, e.target.value) }}
                                        endAdornment={
                                            <Box sx={{ display: 'flex' }}>
                                                <IconButton disabled={(!isConnecting && orgEditStates[`orgEmail${index}`] && orgEditStates[`orgEmail${index}`] != email) ? false : true} onClick={() => { handleSubmit('updateemail', { orgId: props.organization._id, oldEmail: email, newEmail: orgEditStates[`orgEmail${index}`] }) }}><CheckIcon /></IconButton>
                                                <IconButton disabled={(!isConnecting && props.organization.contact.email.length > 1) ? false : true} sx={{ color: 'error.main', ":hover": { backgroundColor: (theme) => alpha(theme.palette.error.dark, 0.2) } }} onClick={() => { handleSubmit('deleteemail', { orgId: props.organization._id, email: email }) }}><DeleteIcon sx={{ color: 'inherit' }} /></IconButton>
                                            </Box>
                                        }
                                    >
                                    </OutlinedInput>
                                )
                            })}
                        <OutlinedInput
                            disabled={isConnecting}
                            sx={{ width: '100%' }}
                            endAdornment={<IconButton disabled={!isConnecting && (orgEditStates["orgEmailNew"]) ? false : true} onClick={() => { handleSubmit('addemail', { orgId: props.organization._id, email: orgEditStates[`orgEmailNew`] }) }}><CheckIcon /></IconButton>}
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
                                        disabled={isConnecting}
                                        sx={{ width: '100%', marginBottom: '10px' }}
                                        placeholder='Edit Phone Number'
                                        value={orgEditStates[`orgTel${index}`]}
                                        onChange={(e) => { updateOrgEditState(`orgTel${index}`, e.target.value) }}
                                        endAdornment={
                                            <Box sx={{ display: 'flex' }}>
                                                <IconButton disabled={!isConnecting && (orgEditStates[`orgTel${index}`] && orgEditStates[`orgTel${index}`] != tel) ? false : true} onClick={() => { handleSubmit('updatetel', { orgId: props.organization._id, oldTel: tel, newTel: orgEditStates[`orgTel${index}`] }) }}><CheckIcon /></IconButton>
                                                <IconButton disabled={(!isConnecting && props.organization.contact.tel.length > 1) ? false : true} sx={{ color: 'error.main', ":hover": { backgroundColor: (theme) => alpha(theme.palette.error.dark, 0.2) } }} onClick={() => { handleSubmit('deletetel', { orgId: props.organization._id, tel: tel }) }}><DeleteIcon sx={{ color: 'inherit' }} /></IconButton>
                                            </Box>
                                        }
                                    >
                                    </OutlinedInput>
                                )
                            })}
                        <OutlinedInput
                            disabled={isConnecting}
                            sx={{ width: '100%' }}
                            endAdornment={<IconButton disabled={!isConnecting && (orgEditStates["orgTelNew"]) ? false : true} onClick={() => { handleSubmit('addtel', { orgId: props.organization._id, tel: orgEditStates[`orgTelNew`] }) }}><CheckIcon /></IconButton>}
                            placeholder='Add a Phone Number'
                            value={orgEditStates["orgTelNew"]}
                            onChange={(e) => { updateOrgEditState("orgTelNew", e.target.value) }}>
                        </OutlinedInput>
                    </AccordionDetails>
                </Accordion>
                <Accordion onChange={() => { (accordionState === 4) ? setAccordionState(0) : setAccordionState(4) }} expanded={(accordionState === 4)}>
                    <AccordionSummary sx={{ ".MuiAccordionSummary-content": { width: '90%' } }} expandIcon={<ExpandMoreIcon />}>
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Admins</Typography>
                        <Typography sx={{ color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(props.organization.administrators) ? `You${(props.organization.administrators.length > 1) ? `, ${props.organization.administrators.length - 1} Others` : ""}` : "You"}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <OutlinedInput
                            disabled={isConnecting}
                            sx={{ width: '100%' }}
                            endAdornment={<IconButton disabled={!isConnecting && (orgEditStates["orgInviteAdmin"]) ? false : true} onClick={() => { handleSubmit('inviteadmin', { orgId: props.organization._id, adminEmail: orgEditStates["orgInviteAdmin"] }) }}><SendIcon /></IconButton>}
                            placeholder='Invite an Admin'
                            value={orgEditStates["orgInviteAdmin"]}
                            onChange={(e) => { updateOrgEditState("orgInviteAdmin", e.target.value) }}>
                        </OutlinedInput>
                        <List>
                            <ListSubheader>Invited Admins</ListSubheader>
                            {
                                (!props.organization.invitedAdministrators || props.organization.invitedAdministrators.length < 1) ?
                                    <ListItem>
                                        <ListItemIcon><WarningIcon /></ListItemIcon>
                                        <ListItemText primary="There isn't anyone"></ListItemText>
                                    </ListItem> :
                                    props.organization.invitedAdministrators.map((invitedAdmin) => {
                                        return (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={`https://www.gravatar.com/avatar/${MD5(invitedAdmin.invitee.email.toLowerCase())}`}>{invitedAdmin.invitee.fullName.charAt(0)}</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={invitedAdmin.invitee.fullName}
                                                    secondary={invitedAdmin.invitee.email}
                                                />
                                                <IconButton disabled={isConnecting} sx={{ color: 'error.main', ":hover": { backgroundColor: (theme) => alpha(theme.palette.error.dark, 0.2) } }} onClick={() => { handleSubmit('inviteadminreject', { orgId: props.organization._id, inviteId: invitedAdmin.inviteId }) }}><CancelIcon sx={{ color: 'inherit' }} /></IconButton>
                                            </ListItem>
                                        )
                                    })
                            }
                            <ListSubheader>Current Admins</ListSubheader>
                            {
                                (!props.organization.administrators) ?
                                    <></> :
                                    props.organization.administrators.map((admin) => {
                                        return (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={`https://www.gravatar.com/avatar/${MD5(admin.email.toLowerCase())}`}>{admin.fullName.charAt(0)}</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={admin.fullName}
                                                    secondary={admin.email}
                                                />
                                                <IconButton disabled={(!isConnecting && props.organization.administrators.length > 1) ? false : true} sx={{ color: 'error.main', ":hover": { backgroundColor: (theme) => alpha(theme.palette.error.dark, 0.2) } }} onClick={() => { handleSubmit('delAdmin', admin._id) }}><DeleteIcon sx={{ color: 'inherit' }} /></IconButton>
                                            </ListItem>
                                        )
                                    })
                            }
                        </List>
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

    const fetchOrganizations = () => {
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
            .finally(() => {
                setOrgEditModalOpen(false);
            })
    }

    const handleCollapse = (trigger) => {
        if (trigger == collapseOpen) {
            setCollapseOpen(0);
        } else {
            setCollapseOpen(trigger);
        }
    }

    React.useEffect(() => {
        fetchOrganizations();
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%', width: '100%' }}>
            <OrganizationsEditModal fetchOrganizations={fetchOrganizations} organization={orgEditModalChoice} open={orgEditModalOpen} onClose={() => { setOrgEditModalOpen(false) }} />
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