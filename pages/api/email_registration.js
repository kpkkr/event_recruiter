import path from 'path';
import fs from 'fs';
function buildPath() {
    return path.join(process.cwd(), 'data', 'data.json');
}

function extract_data(filePath) {
    const jsonData = fs.readFileSync(filePath);
    const { events_categories, allEvents } = JSON.parse(jsonData);
    return { events_categories, allEvents };
}


export default function handler(req, res) {
    const { method } = req;
    const filePath = buildPath();
    const { events_categories, allEvents } = extract_data(filePath);
    if (!allEvents) {
        return res.status(404).json({
            message: 'No events found'
        })
    }
    if (method === 'POST') {
        const { email, eventID } = req.body;
        if (!email | !email.include('@')) {
            res.status(422).json({ message: 'invalid Email Address' });
            return;
        }
        const newallEvents = allEvents.map(ev => {
            if (ev.id === eventID) {
                if (ev.emails_registered.includes(email)) {
                    res.status(409).json({
                        message: 'Email already registered'
                    });
                    return {
                        ...ev,
                        emails_registered: [...ev.emails_registered]
                    };
                }
                return {
                    ...ev,
                    emails_registered: [...ev.emails_registered, email]
                };
            }
            return ev;
        });
        fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newallEvents }))
        res.status(201).json({ message: `You have been registered successfully for this event email: ${email}, event: ${eventID}.` })
    }

    // we add our code here
    // access the data.json file, extract AllEvents (give 404 if there are no events) -> loop through them -> find the one with same ID -> add email id in email_registered if that emailID is not present in email_registered/check the email format is right    
}
