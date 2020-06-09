import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/Button';
import { Form } from './styles/components/addWordForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


export default function SettingsForm(props) {
    const formRef = useRef();
    const [ values, setValues ] = useState({});

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({ ...values, [e.target.name]: e.target.value }));
    }
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClick, false);
        return () => {
            document.removeEventListener('mousedown', handleClick, false);
        }
    }, []);
    
    const handleClick = (e) => {
        if(!formRef.current.contains(e.target)) {
            props.closeForm();            
        }
    }

    const handleCheckBox = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setValues(values => ({ ...values, [name]: value }));

    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log("Hey, this form is submitted");
        props.closeForm();
        const settings = {
            testLength: parseInt(values.testLength) || 5,
            hideHints: values.hideHints || false,
            showTimer: values.showTimer || false,
            timerLength: parseInt(values.timerLength) || 0
        }
        console.log(settings);
        props.changeSettings(settings);
    }

    const { showForm, closeForm, wordCount } = props;
    return (
        <Form onSubmit={submitForm}>
            <div ref={formRef} className={showForm ? "showForm" : "hideForm"}>
                <div className="formContainer">
                    <FontAwesomeIcon 
                        icon={faTimes} 
                        className="icon" 
                        onClick={closeForm} />
                    <h2>Test Settings</h2>
                    <form>
                        <select 
                            value={values.testLength} 
                            onChange={handleChange}
                            name="testLength" 
                            required
                            id="testLength">
                            <option>Number of Questions</option>
                            {wordCount.filter((item, i) => (i + 1) % 5 === 0).map((num, i) => {
                                return (
                                    <option key={i} value={(i + 1) * 5}>{(i + 1) * 5}</option>
                                )
                            })}
                        </select>
                        <label
                            htmlFor="hideHints"
                        >Hide Hints:
                        <input 
                            name="hideHints"
                            type="checkbox"
                            id="hideHints"
                            value={values.hideHints}
                            onChange={handleCheckBox}
                        />
                        </label>
                        <label
                            htmlFor="showTimer"
                        >Show Timer:
                        <input 
                            name="showTimer"
                            type="checkbox"
                            id="showTimer"
                            value={values.showTimer}
                            onChange={handleCheckBox}
                        />
                        </label>
                        {values.showTimer 
                        ? <select 
                            value={values.timerLength} 
                            onChange={handleChange}
                            name="timerLength" 
                            required
                            id="timerLength">
                            <option>Length of Timer</option>
                            <option value="30">30 Seconds</option>
                            <option value="45">45 Seconds</option>
                            <option value="60">60 Seconds</option>
                            <option value="75">75 Seconds</option>
                            <option value="90">90 Seconds</option>
                            <option value="120">120 Seconds</option>
                        </select> 
                        : null}
                        <Button>Begin Test</Button>
                    </form>
                </div>
            </div>
        </Form>
    )
}

SettingsForm.propTypes = {
    showForm: PropTypes.bool,
    openForm: PropTypes.func,
    closeForm: PropTypes.func,
    wordCount: PropTypes.array,
    changeSettings: PropTypes.func,
}

