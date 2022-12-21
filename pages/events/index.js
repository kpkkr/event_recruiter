import Allevents from '../../src/components/events/eventsPage';

const EventsPage = ({data}) => {
    return <Allevents data = {data}/>;
    
};

export default EventsPage;

export async function getStaticProps(){
    const {events_categories} = await import('/data/data.json');
    
    return{
        props:{
            data: events_categories,
        },
    };
  }