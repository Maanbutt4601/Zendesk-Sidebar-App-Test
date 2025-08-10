import React, { useState } from 'react'

const TestEmailSelector = ({ onEmailChange, currentEmail }) => {
    const [isOpen, setIsOpen] = useState(false)

    const testEmails = [
        {
            email: 'Sincere@april.biz',
            name: 'Leanne Graham',
            scenario: '🏢 Enterprise Setup Issue',
            color: 'warning'
        },
        {
            email: 'Shanna@melissa.tv',
            name: 'Ervin Howell',
            scenario: '🚨 Critical Production Issue',
            color: 'error'
        },
        {
            email: 'Nathan@yesenia.net',
            name: 'Clementine Bauch',
            scenario: '💙 Appreciation & Thanks',
            color: 'success'
        },
        {
            email: 'Julianne.OConner@kory.org',
            name: 'Patricia Lebsack',
            scenario: '😤 Frustrated Customer',
            color: 'error'
        },
        {
            email: 'Lucio_Hettinger@annie.ca',
            name: 'Chelsey Dietrich',
            scenario: '❓ Technical Question',
            color: 'info'
        },
        {
            email: 'Karley_Dach@jasper.info',
            name: 'Kurtis Weissnat',
            scenario: '💡 Feature Request',
            color: 'info'
        },
        {
            email: 'invalid@test.com',
            name: 'Unknown User',
            scenario: '❌ Customer Not Found',
            color: 'error'
        }
    ]

    const currentScenario = testEmails.find(e => e.email === currentEmail) || testEmails[0]

    const handleEmailSelect = (email, name, scenario) => {
        onEmailChange(email, name, scenario)
        setIsOpen(false)
    }

    return (
        <div className="test-email-selector">
            <div className="selector-header">
                <span className="selector-label">🧪 Test Scenario:</span>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`current-scenario ${currentScenario.color}`}
                >
                    {currentScenario.scenario}
                    <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
                </button>
            </div>

            {isOpen && (
                <div className="scenario-dropdown">
                    {testEmails.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleEmailSelect(item.email, item.name, item.scenario)}
                            className={`scenario-option ${item.color} ${item.email === currentEmail ? 'active' : ''}`}
                        >
                            <div className="scenario-info">
                                <span className="scenario-name">{item.scenario}</span>
                                <span className="scenario-details">{item.name} • {item.email}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TestEmailSelector