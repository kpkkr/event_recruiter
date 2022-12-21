import SingleEvent from '../../../src/components/events/singleEvent';

const specificPage = ({data}) => <SingleEvent data={data} />;

export default specificPage;

export async function getStaticPaths(){
    const {allEvents} = await import('/data/data.json');
    const allPaths=  allEvents.map((path) =>{
        return{
            params:{
                categories:path.city,
                id: path.id                                         //same as file name
            }
        }
    });
    return{
        paths:allPaths,
        fallback:false,
    }
}


export async function getStaticProps(context){
    const id = context?.params.id;
    const {allEvents} = await import('/data/data.json');
    const Eventdata = allEvents.find((ev) => ev.id === id);
    return{
        props:{data:Eventdata}
    }
}