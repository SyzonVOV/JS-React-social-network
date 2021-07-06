import React, {ChangeEvent, Component, FocusEvent} from 'react';

type TProps = {
    status: string
    handleUpdateStatus: (arg: string) => void


}
type TState = {
    editMode: boolean,
    status: string,
}

class ProfileStatusMessage extends Component<TProps, TState> {
    state = {
        editMode: false,
        status: this.props.status,
    }

    componentDidUpdate(prevProps: TProps, prevState: TState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            })
        }
    }

    handleActivateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    handleStatusChange = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: value,
        })
    }

    handleDeactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.handleUpdateStatus(this.state.status)
    }

    handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        event.target.select();
    }

    render() {
        const {editMode, status} = this.state;
        return (
            <div>
                <b>Status: </b>
                {editMode
                    ? <><input onFocus={this.handleFocus} onChange={this.handleStatusChange} defaultValue={status}/>
                        <button onClick={this.handleDeactivateEditMode}>Save</button>
                    </>
                    : <><span onDoubleClick={this.handleActivateEditMode}>{status || 'No status'}</span></>}


            </div>
        );
    }
}

export default ProfileStatusMessage;
