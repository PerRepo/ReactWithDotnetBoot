import React from 'react'
import RemoveAllContact from './RemoveAllContact'
import AddRandomCpmponent from './AddRandomCpmponent'
import AddContact from './AddContact'
import GeneralContext from './GeneralContext'
import Header from '../Layout/Header'
import FavoriteContact from './FavoriteContact'

class ContactIndex extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            contactsList: [{
                id: 1,
                name: "Ben Parker",
                phone: "666-666-7770",
                email: "ben@dotnetmastery.com",
                isFavorite: false,
            },
            {
                id: 2,
                name: "Kathy Patrick",
                phone: "111-222-0000",
                email: "kathy@dotnetmastery.com",
                isFavorite: true,
            },
            {
                id: 3,
                name: "Paul Show",
                phone: "999-222-1111",
                email: "paul@dotnetmastery.com",
                isFavorite: true,
            }]
        }
    }

    handleAddContact = (newContact) => {
        if (newContact.name == "") {
            return { status: "failure", msg: "Please Enter a valid Name" };
        } else if (newContact.phone == "") {
            return { status: "failure", msg: "Please Enter a valid Phone Number" };
        }
        const duplicateRecord = this.state.contactsList.filter((x) => {
            if (x.name == newContact.name || x.phone == newContact.phone) {
                return true;
            }
        });

        if (duplicateRecord.length > 0) {
            return { status: "failure", msg: "Duplicate Record" };
        } else {
            const newFinalContact = {
                ...newContact,
                id: this.state.contactsList[this.state.contactsList.length - 1].id + 1,
                isFavorite: false,
            };
            this.setState((prevState) => {
                return {
                    contactsList: prevState.contactsList.concat([newFinalContact]),
                };
            });
            return { status: "success", msg: "Contact was added successfully" };
        }
    };

    render() {
        return (

            <div>
                <div className='container' style={{ minHeight: "85vh" }}>
                    <div className='row py-3'>
                        <div className='col-4 offset-2'>
                            <AddRandomCpmponent />
                        </div>
                        <div className="col-4">
                            <RemoveAllContact />
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <AddContact handleAddContact={this.handleAddContact} />
                            </div>
                        </div>
                        <div className="row py-2">
                            <div className="col-8 offset-2 row">
                                <FavoriteContact
                                    contacts={this.state.contactsList.filter(
                                        (u) => u.isFavorite === true
                                    )}
                                />
                            </div>
                        </div>
                        <div className='row py-2'>
                            <div className="col-8 offset-2 row">
                                <GeneralContext
                                    contacts={this.state.contactsList.filter(
                                        (u) => u.isFavorite === false
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactIndex
