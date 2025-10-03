/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
// FIX: Corrected import path for ScreenMessage.
import { ScreenMessage } from './types-empirerts';

interface MessageDisplayProps {
    messages: ScreenMessage[];
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ messages }) => {
    return (
        <div className="screen-messages-container">
            {messages.map(msg => (
                <div key={msg.id} className="screen-message" style={{ animation: 'fadeOut 3s forwards' }}>
                    {msg.text}
                </div>
            ))}
        </div>
    );
};

export default MessageDisplay;