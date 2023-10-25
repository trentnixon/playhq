const FetchTest = ({associations})=>{
 
    return(
        <>
        Fetch FetchTest

        {
            associations.data.map((ass,i)=>{
                return( 
                    <div key={i}>
                            <h1>{ass.attributes.Name}</h1>
                    </div>
                )
            })
        }

        </>
    )

}
export default FetchTest;