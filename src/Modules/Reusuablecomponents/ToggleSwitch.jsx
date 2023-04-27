import React, { Component } from 'react';
import '../../Assets/css/ReusuableComponents/ToggleSwitch.css'

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleleft: false,
            toggleright: false
        };
        //   this.toggleState = this.toggleState.bind(this);

    }

    toggleState = (toggleoption) => {

        const rightToggle = this.props.toggleright
        const leftToggle = this.props.toggleleft

        if (toggleoption === "ASK") {
            this.setState({
                toggleright: !rightToggle,
                toggleleft: leftToggle,

            });
        }
        else {
            this.setState({
                toggleleft: !leftToggle,
                toggleright: rightToggle,

            })
        }
        this.props.setPostOption(toggleoption)
    }

    render() {
        return (
            <form className="switch-field">
                <div className="togglediv">
                    <input
                        type="radio"
                        id="switch_left"
                        name="switchToggle"
                        value={this.props.leftLabel}
                        onChange={() => this.toggleState(this.props.leftLabel)}
                        checked={this.state.toggleright}
                    />
                    <label htmlFor="switch_left" className="leftlabel">{this.props.leftLabel}</label>

                    <input
                        type="radio"
                        id="switch_right"
                        name="switchToggle"
                        value={this.props.rightLabel}
                        onChange={() => this.toggleState(this.props.rightLabel)}
                        checked={this.state.toggleleft}

                    />
                    <label htmlFor="switch_right" className="rightlabel">{this.props.rightLabel}</label>
                </div>
            </form>
        );
    }
}

export default Toggle
