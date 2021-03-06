import React from 'react'
import ContactPreview from '../cmps/Contact-Preview'
import { connect } from 'react-redux'
import contactActions from '../stores/contact/contact.actions'
import utilService from '../services/utils.service'


class ContactEdit extends React.Component {
    state = {
        contact: {
            name: '',
            phone: '',
            email: ''
        }
    }

    async componentDidMount() {
        const _id = this.props.match.params.id
        if (_id) {
            await this.props.loadCurrContact(_id);
            this.setState(() => {
                return {
                    contact: JSON.parse(JSON.stringify(this.props.contact))
                }
            })
        }
    }

    updateContact = (ev, field) => {
        const { value } = ev.target
        this.setState(prevState => {
            return {
                contact: {
                    ...prevState.contact,
                    [field]: value
                }
            }
        })
    }

    saveContact = async (ev) => {
        ev.preventDefault()
        await this.props.saveContact(this.state.contact)
        utilService.showToast('Contact edited successfully!','success')
        this.props.history.push('/contact')
    }

    render() {
        const { contact } = this.state
        return (
            <>
                <div className="contact-prev-edit">
                    <ContactPreview contact={this.state.contact} />
                </div>
                <form onSubmit={this.saveContact}>
                    <div className="form-fields">
                        <label> Name:
                    <input value={contact.name} onChange={(ev) => this.updateContact(ev, 'name')} type="text" />
                        </label>
                        <label>Phone:<input value={contact.phone} type="text" onChange={(ev) => this.updateContact(ev, 'phone')} />
                        </label>
                        <label> Email:
                    <input value={contact.email} onChange={(ev) => this.updateContact(ev, 'email')} type="email" />
                        </label>
                        <button>Save Contact</button>
                    </div>
                </form>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contact: state.contact.currContact
    }
}

const mapDispatchToProps = {
    saveContact: contactActions.saveContact,
    loadCurrContact: contactActions.loadCurrContact,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactEdit)